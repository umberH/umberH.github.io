---
layout: post
sublayout: post.html
title: "NanoGPU Code Analysis: Learning Deep Learning from Scratch"
date: 2025-03-22 11:00:00 +1000
categories: Deep-Learning Code-Analysis
---

Andrej Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT) is a masterclass in clean, educational deep learning code. At just ~300 lines of code, it implements a complete GPT model that you can train and use. This post dives deep into the code, explaining design decisions and learning principles embedded in every line.

## What is nanoGPT?

nanoGPT is a minimalist implementation of GPT (Generative Pre-trained Transformer) that:
- Trains a character-level language model
- Implements the full transformer architecture
- Achieves respectable performance
- Remains understandable and hackable

**Philosophy**: "The best way to learn is to implement from scratch."

## Repository Structure

```
nanoGPT/
├── train.py          # Training loop
├── model.py          # GPT model implementation
├── config/           # Hyperparameter configs
│   ├── train_shakespeare_char.py
│   └── train_gpt2.py
├── data/             # Dataset preparation
│   └── shakespeare/
└── README.md
```

**Total lines**: ~300 (excluding configs and data)

## Deep Dive: model.py

Let's analyze the core model implementation.

### Imports & Setup

```python
import math
import inspect
from dataclasses import dataclass

import torch
import torch.nn as nn
from torch.nn import functional as F
```

**Why `dataclass`?** Clean configuration objects without boilerplate.

**Why minimal imports?** Teaching principle - see all dependencies explicitly.

### Configuration

```python
@dataclass
class GPTConfig:
    block_size: int = 1024       # max sequence length
    vocab_size: int = 50304      # GPT-2 vocab_size of 50257, padded up to nearest multiple of 64 for efficiency
    n_layer: int = 12            # number of transformer blocks
    n_head: int = 12             # number of attention heads
    n_embd: int = 768            # embedding dimension
    dropout: float = 0.0         # dropout probability
    bias: bool = True            # use bias in Linears and LayerNorms?
```

**Key insights**:

1. **`vocab_size = 50304`**: Padded to multiple of 64 for GPU efficiency
   - Original GPT-2: 50,257 tokens
   - Padding improves memory alignment and CUDA kernel performance

2. **`n_embd = 768`**: Divisible by `n_head = 12` (each head gets 64 dims)
   - 64 dimensions per head is a sweet spot for attention computation

3. **`bias` parameter**: Toggle for bias terms
   - Recent research shows transformers work well without bias
   - Saves parameters and computation

### Attention Implementation

The heart of the transformer:

```python
class CausalSelfAttention(nn.Module):

    def __init__(self, config):
        super().__init__()
        assert config.n_embd % config.n_head == 0

        # key, query, value projections for all heads, but in a batch
        self.c_attn = nn.Linear(config.n_embd, 3 * config.n_embd, bias=config.bias)

        # output projection
        self.c_proj = nn.Linear(config.n_embd, config.n_embd, bias=config.bias)

        # regularization
        self.attn_dropout = nn.Dropout(config.dropout)
        self.resid_dropout = nn.Dropout(config.dropout)
        self.n_head = config.n_head
        self.n_embd = config.n_embd
        self.dropout = config.dropout

        # flash attention make GPU go brrrrr but support is only in PyTorch >= 2.0
        self.flash = hasattr(torch.nn.functional, 'scaled_dot_product_attention')
        if not self.flash:
            print("WARNING: using slow attention. Flash Attention requires PyTorch >= 2.0")
            # causal mask to ensure that attention is only applied to the left in the input sequence
            self.register_buffer("bias", torch.tril(torch.ones(config.block_size, config.block_size))
                                        .view(1, 1, config.block_size, config.block_size))
```

**Design decisions**:

1. **Single linear layer for Q, K, V**: `3 * config.n_embd`
   - More efficient than 3 separate layers
   - One matrix multiply instead of three

2. **Flash Attention detection**:
   ```python
   self.flash = hasattr(torch.nn.functional, 'scaled_dot_product_attention')
   ```
   - Automatically uses Flash Attention if available
   - 2-3x faster, uses less memory
   - Falls back gracefully if not supported

3. **Causal mask as buffer**:
   ```python
   self.register_buffer("bias", torch.tril(torch.ones(...)))
   ```
   - `register_buffer`: Part of model state but not a parameter
   - Saved/loaded with model but not updated by optimizer
   - `torch.tril`: Lower triangular matrix for causal masking

### Forward Pass

```python
def forward(self, x):
    B, T, C = x.size()  # batch size, sequence length, embedding dimensionality (n_embd)

    # calculate query, key, values for all heads in batch and move head forward to be the batch dim
    q, k, v  = self.c_attn(x).split(self.n_embd, dim=2)
    k = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)  # (B, nh, T, hs)
    q = q.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)  # (B, nh, T, hs)
    v = v.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)  # (B, nh, T, hs)

    # causal self-attention; Self-attend: (B, nh, T, hs) x (B, nh, hs, T) -> (B, nh, T, T)
    if self.flash:
        # efficient attention using Flash Attention CUDA kernels
        y = torch.nn.functional.scaled_dot_product_attention(q, k, v, attn_mask=None, dropout_p=self.dropout if self.training else 0, is_causal=True)
    else:
        # manual implementation of attention
        att = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(k.size(-1)))
        att = att.masked_fill(self.bias[:,:,:T,:T] == 0, float('-inf'))
        att = F.softmax(att, dim=-1)
        att = self.attn_dropout(att)
        y = att @ v  # (B, nh, T, T) x (B, nh, T, hs) -> (B, nh, T, hs)

    y = y.transpose(1, 2).contiguous().view(B, T, C)  # re-assemble all head outputs side by side

    # output projection
    y = self.resid_dropout(self.c_proj(y))
    return y
```

**Step-by-step breakdown**:

1. **Input shape**: `(B, T, C)` = (batch, sequence length, embedding dim)

2. **Q, K, V projection**:
   ```python
   q, k, v = self.c_attn(x).split(self.n_embd, dim=2)
   ```
   - Single forward pass creates all three
   - `split` divides output into equal parts

3. **Reshape for multi-head attention**:
   ```python
   k = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)
   ```
   - Before: `(B, T, C)`
   - After `.view()`: `(B, T, n_head, head_dim)`
   - After `.transpose(1, 2)`: `(B, n_head, T, head_dim)`
   - Now each head can attend independently

4. **Attention calculation** (manual version):
   ```python
   att = (q @ k.transpose(-2, -1)) * (1.0 / math.sqrt(k.size(-1)))
   ```
   - `q @ k.T`: Dot product of queries and keys
   - Scale by `1/sqrt(d_k)`: Prevents softmax saturation
   - Result: `(B, n_head, T, T)` attention scores

5. **Causal masking**:
   ```python
   att = att.masked_fill(self.bias[:,:,:T,:T] == 0, float('-inf'))
   ```
   - Set future positions to `-inf`
   - After softmax, these become 0 (no attention)

6. **Softmax + Apply attention**:
   ```python
   att = F.softmax(att, dim=-1)
   y = att @ v
   ```
   - Softmax normalizes attention scores
   - Matrix multiply applies attention to values

7. **Concatenate heads**:
   ```python
   y = y.transpose(1, 2).contiguous().view(B, T, C)
   ```
   - `transpose`: `(B, n_head, T, head_dim)` → `(B, T, n_head, head_dim)`
   - `.view()`: Flatten heads back to `(B, T, C)`
   - `.contiguous()`: Ensures memory layout is contiguous (required for `.view()`)

### MLP Block

```python
class MLP(nn.Module):

    def __init__(self, config):
        super().__init__()
        self.c_fc    = nn.Linear(config.n_embd, 4 * config.n_embd, bias=config.bias)
        self.gelu    = nn.GELU()
        self.c_proj  = nn.Linear(4 * config.n_embd, config.n_embd, bias=config.bias)
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x):
        x = self.c_fc(x)
        x = self.gelu(x)
        x = self.c_proj(x)
        x = self.dropout(x)
        return x
```

**Key points**:

1. **4x expansion**: `config.n_embd` → `4 * config.n_embd` → `config.n_embd`
   - Standard transformer pattern
   - Most parameters are in MLP, not attention!

2. **GELU activation**: `nn.GELU()`
   - Smoother than ReLU
   - Used in all modern transformers
   - Gaussian Error Linear Unit: `x * Φ(x)` where Φ is CDF of standard normal

### Transformer Block

```python
class Block(nn.Module):

    def __init__(self, config):
        super().__init__()
        self.ln_1 = LayerNorm(config.n_embd, bias=config.bias)
        self.attn = CausalSelfAttention(config)
        self.ln_2 = LayerNorm(config.n_embd, bias=config.bias)
        self.mlp = MLP(config)

    def forward(self, x):
        x = x + self.attn(self.ln_1(x))
        x = x + self.mlp(self.ln_2(x))
        return x
```

**Critical design**:

**Pre-normalization** (vs. post-normalization):
```python
x = x + self.attn(self.ln_1(x))  # Pre-norm: LayerNorm before attention
```

vs. original transformer:
```python
x = self.ln_1(x + self.attn(x))  # Post-norm: LayerNorm after
```

**Why pre-norm?**
- More stable training for deep networks
- Gradients flow better
- Can train without learning rate warmup

**Residual connections**: `x = x + ...`
- Enables gradient flow through deep networks
- Model learns refinements, not transformations from scratch

### Full GPT Model

```python
class GPT(nn.Module):

    def __init__(self, config):
        super().__init__()
        assert config.vocab_size is not None
        assert config.block_size is not None
        self.config = config

        self.transformer = nn.ModuleDict(dict(
            wte = nn.Embedding(config.vocab_size, config.n_embd),
            wpe = nn.Embedding(config.block_size, config.n_embd),
            drop = nn.Dropout(config.dropout),
            h = nn.ModuleList([Block(config) for _ in range(config.n_layer)]),
            ln_f = LayerNorm(config.n_embd, bias=config.bias),
        ))
        self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False)

        # with weight tying when using torch.compile() some warnings get generated:
        # "UserWarning: functional_call was passed multiple values for tied weights.
        # This behavior is deprecated and will be an error in future versions"
        # not 100% sure what this is, so far seems to be harmless. TODO investigate
        self.transformer.wte.weight = self.lm_head.weight  # https://paperswithcode.com/method/weight-tying

        # init all weights
        self.apply(self._init_weights)
        # apply special scaled init to the residual projections, per GPT-2 paper
        for pn, p in self.named_parameters():
            if pn.endswith('c_proj.weight'):
                torch.nn.init.normal_(p, mean=0.0, std=0.02/math.sqrt(2 * config.n_layer))

        # report number of parameters
        print("number of parameters: %.2fM" % (self.get_num_params()/1e6,))
```

**Components**:

1. **Token embeddings**: `wte = nn.Embedding(vocab_size, n_embd)`
   - Maps token IDs to vectors

2. **Positional embeddings**: `wpe = nn.Embedding(block_size, n_embd)`
   - Adds position information
   - Learned, not sinusoidal (unlike original transformer)

3. **Transformer blocks**: `h = nn.ModuleList([Block(...) for _ in range(n_layer)])`
   - Stack of identical blocks

4. **Output head**: `lm_head = nn.Linear(n_embd, vocab_size, bias=False)`
   - Projects to vocabulary size
   - No bias for efficiency

**Weight tying**:
```python
self.transformer.wte.weight = self.lm_head.weight
```
- Input and output embeddings share weights
- Reduces parameters by ~30% for small models
- Improves performance empirically

**Initialization**:
```python
if pn.endswith('c_proj.weight'):
    torch.nn.init.normal_(p, mean=0.0, std=0.02/math.sqrt(2 * config.n_layer))
```
- Special initialization for projection layers
- Scale by depth (`sqrt(2 * n_layer)`)
- Keeps gradient magnitudes stable through many layers

### Forward Pass

```python
def forward(self, idx, targets=None):
    device = idx.device
    b, t = idx.size()
    assert t <= self.config.block_size, f"Cannot forward sequence of length {t}, block size is only {self.config.block_size}"
    pos = torch.arange(0, t, dtype=torch.long, device=device)  # shape (t)

    # forward the GPT model itself
    tok_emb = self.transformer.wte(idx)  # token embeddings of shape (b, t, n_embd)
    pos_emb = self.transformer.wpe(pos)  # position embeddings of shape (t, n_embd)
    x = self.transformer.drop(tok_emb + pos_emb)
    for block in self.transformer.h:
        x = block(x)
    x = self.transformer.ln_f(x)

    if targets is not None:
        # if we are given some desired targets also calculate the loss
        logits = self.lm_head(x)
        loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1), ignore_index=-1)
    else:
        # inference-time mini-optimization: only forward the lm_head on the very last position
        logits = self.lm_head(x[:, [-1], :])  # note: using list [-1] to preserve the time dim
        loss = None

    return logits, loss
```

**Inference optimization**:
```python
logits = self.lm_head(x[:, [-1], :])  # Only last position
```
- During generation, only need next token prediction
- Don't compute output for all positions
- Significant speedup

## Deep Dive: train.py

### Training Loop

```python
# training loop
for iter_num in range(max_iters):

    # determine learning rate for this iteration
    if decay_lr:
        lr = get_lr(iter_num)
        for param_group in optimizer.param_groups:
            param_group['lr'] = lr

    # evaluate the loss on train/val sets and write checkpoints
    if iter_num % eval_interval == 0:
        losses = estimate_loss()
        print(f"step {iter_num}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}")
        if losses['val'] < best_val_loss:
            best_val_loss = losses['val']
            if iter_num > 0:
                checkpoint = {
                    'model': model.state_dict(),
                    'optimizer': optimizer.state_dict(),
                    'iter_num': iter_num,
                    'best_val_loss': best_val_loss,
                    'config': config,
                }
                print(f"saving checkpoint to {out_dir}")
                torch.save(checkpoint, os.path.join(out_dir, 'ckpt.pt'))

    # forward backward update, with optional gradient accumulation
    for micro_step in range(gradient_accumulation_steps):
        X, Y = get_batch('train')
        with ctx:
            logits, loss = model(X, Y)
            loss = loss / gradient_accumulation_steps
        scaler.scale(loss).backward()

    # clip the gradient
    if grad_clip != 0.0:
        scaler.unscale_(optimizer)
        torch.nn.utils.clip_grad_norm_(model.parameters(), grad_clip)

    # step the optimizer and scaler
    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad(set_to_none=True)
```

**Key techniques**:

1. **Learning rate scheduling**:
   ```python
   lr = get_lr(iter_num)
   ```
   - Warmup + cosine decay
   - Critical for stable training

2. **Gradient accumulation**:
   ```python
   for micro_step in range(gradient_accumulation_steps):
       ...
       loss = loss / gradient_accumulation_steps
   ```
   - Simulates larger batch sizes
   - Divide loss to keep gradients same scale

3. **Gradient clipping**:
   ```python
   torch.nn.utils.clip_grad_norm_(model.parameters(), grad_clip)
   ```
   - Prevents exploding gradients
   - Stabilizes training

4. **Mixed precision training** (fp16):
   ```python
   scaler = torch.cuda.amp.GradScaler()
   with torch.cuda.amp.autocast():
       logits, loss = model(X, Y)
   scaler.scale(loss).backward()
   ```
   - 2x faster training
   - Half the memory
   - Minimal accuracy loss

## Performance Analysis

### Model Sizes

| Model | Layers | Heads | Embed Dim | Params | Memory |
|-------|--------|-------|-----------|--------|--------|
| Tiny  | 6      | 6     | 384       | 15M    | ~60MB  |
| Small | 12     | 12    | 768       | 85M    | ~340MB |
| Medium| 24     | 16    | 1024      | 350M   | ~1.4GB |
| Large | 36     | 20    | 1280      | 760M   | ~3GB   |

### Training Speed

On single A100 GPU:
- **Tiny**: ~200K tokens/sec
- **Small**: ~100K tokens/sec
- **Medium**: ~30K tokens/sec

**Optimizations used**:
- Flash Attention (2x speedup)
- `torch.compile()` (30% speedup)
- Mixed precision (2x speedup)
- Efficient data loading

**Combined**: ~10x faster than naive implementation!

## What Makes This Code Great

### 1. Educational Clarity

- Minimal abstractions
- Every line serves a purpose
- Comments explain *why*, not *what*

### 2. Production Techniques

Despite simplicity, includes:
- Mixed precision training
- Gradient accumulation
- Flash Attention
- Learning rate scheduling
- Checkpointing

### 3. Modern Practices

- Pre-normalization
- GELU activation
- Weight tying
- No bias in final projection
- Scaled initialization

### 4. Hackability

Easy to experiment:
- Change architecture (layers, heads, dims)
- Try different datasets
- Modify attention patterns
- Add custom components

## Key Learnings

### For Beginners

1. **Transformers aren't magic**: Just attention + MLP + residuals
2. **Implementation is simple**: Core model is <150 lines
3. **Details matter**: Initialization, normalization placement, etc.

### For Practitioners

1. **Flash Attention**: Always use if available
2. **Pre-norm**: More stable than post-norm
3. **Weight tying**: Free performance boost
4. **Scaled init**: Essential for deep networks

### For Researchers

1. **Start simple**: Complex ideas on simple codebase
2. **Benchmark early**: Know your baseline performance
3. **Ablate everything**: Which components actually matter?

## Exercises to Try

### Beginner

1. Train on your own text dataset
2. Change model size (layers, embed dim)
3. Visualize attention patterns

### Intermediate

4. Implement rotary position embeddings
5. Add grouped-query attention
6. Try different activation functions

### Advanced

7. Implement sparse attention
8. Add mixture of experts
9. Multi-GPU training with DDP

## Conclusion

nanoGPT is a masterpiece of educational code. It proves that you don't need thousands of lines and complex abstractions to implement state-of-the-art models.

**Key takeaway**: The best way to understand transformers is to implement one yourself. And nanoGPT makes that accessible.

**My challenge to you**: Spend a weekend with nanoGPT. Read every line. Run experiments. Break things. You'll come out with deep understanding that no tutorial can provide.

---

**Resources**:
- [nanoGPT GitHub](https://github.com/karpathy/nanoGPT)
- [Karpathy's "Let's build GPT" video](https://youtube.com/watch?v=kCc8FmEb1nY)
- [My annotated version](https://github.com/umberH/nanogpt-annotated)
- [Attention is All You Need paper](https://arxiv.org/abs/1706.03762)

*What did you learn from nanoGPT? Share your experiments!*
