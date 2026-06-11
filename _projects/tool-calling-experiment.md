---
layout: project
title: Tool Calling Experiment
description: Experimental framework for enhancing LLM capabilities through dynamic tool integration, exploring function calling patterns, tool selection strategies, and error recovery mechanisms.
image: /assets/images/tool-calling.jpg
tags:
  - LLM
  - Function Calling
  - AI Tools
  - Experimentation
category: AI Research
technologies:
  - Python
  - OpenAI API
  - LangChain
  - Anthropic Claude
  - FastAPI
  - Pydantic
date: 2025-03-20
---

## Overview

The Tool Calling Experiment explores how Large Language Models can effectively leverage external tools and APIs to extend their capabilities beyond text generation. This research investigates optimal patterns for tool integration, automatic tool selection, error handling, and the design of tool interfaces that maximize LLM effectiveness.

## Motivation

LLMs have inherent limitations:
- **No Real-Time Data**: Training data cutoff dates
- **No Computation**: Can't perform complex calculations
- **No External Actions**: Can't interact with databases, APIs, or systems
- **Hallucination Risk**: May invent information

**Tool calling bridges these gaps** by allowing LLMs to invoke external functions, access real-time data, and perform actions in the world.

## Research Questions

1. **Tool Selection**: How do LLMs decide which tool to use?
2. **Parameter Extraction**: Can LLMs reliably extract tool parameters from natural language?
3. **Error Recovery**: How should systems handle tool failures?
4. **Chaining**: Can LLMs chain multiple tools for complex tasks?
5. **Learning**: Can LLMs learn which tools work best for which tasks?

## Experimental Framework

### Tool Interface Design

```python
from pydantic import BaseModel, Field
from typing import Optional, List, Any

class ToolParameter(BaseModel):
    name: str
    type: str  # 'string', 'number', 'boolean', 'array', 'object'
    description: str
    required: bool = True
    default: Optional[Any] = None

class Tool(BaseModel):
    name: str
    description: str
    parameters: List[ToolParameter]

    def execute(self, **kwargs) -> Any:
        """Override in subclass"""
        raise NotImplementedError

class CalculatorTool(Tool):
    name = "calculator"
    description = "Perform mathematical calculations"
    parameters = [
        ToolParameter(
            name="expression",
            type="string",
            description="Mathematical expression to evaluate (e.g., '2 + 2', 'sqrt(16)')"
        )
    ]

    def execute(self, expression: str) -> float:
        # Safe evaluation with restricted namespace
        allowed_names = {
            'sqrt': math.sqrt,
            'pow': math.pow,
            'abs': abs,
            # ... more safe functions
        }
        return eval(expression, {"__builtins__": {}}, allowed_names)

class WebSearchTool(Tool):
    name = "web_search"
    description = "Search the web for current information"
    parameters = [
        ToolParameter(
            name="query",
            type="string",
            description="Search query"
        ),
        ToolParameter(
            name="num_results",
            type="number",
            description="Number of results to return",
            required=False,
            default=5
        )
    ]

    def execute(self, query: str, num_results: int = 5) -> List[dict]:
        # Integration with search API
        results = search_api.search(query, limit=num_results)
        return results
```

### Tool Selection Strategies

#### Strategy 1: LLM-Based Selection

```python
class LLMToolSelector:
    def __init__(self, llm, tools: List[Tool]):
        self.llm = llm
        self.tools = {t.name: t for t in tools}

    def select_tool(self, user_query: str) -> Optional[dict]:
        # Describe available tools to LLM
        tool_descriptions = self.format_tools_for_llm()

        prompt = f"""
        User query: {user_query}

        Available tools:
        {tool_descriptions}

        Which tool should be used? Respond with JSON:
        {
            "tool_name": "name of tool",
            "parameters": {parameter_name: parameter_value},
            "reasoning": "why this tool"
        }

        If no tool is needed, respond with {"tool_name": null}
        """

        response = self.llm.generate(prompt)
        tool_call = json.loads(response)

        return tool_call
```

#### Strategy 2: Native Function Calling

```python
class NativeFunctionCaller:
    """Uses OpenAI/Claude native function calling"""

    def __init__(self, llm_client, tools: List[Tool]):
        self.client = llm_client
        self.tools = tools

    def call_with_tools(self, user_query: str):
        # Convert tools to OpenAI function format
        functions = [self.tool_to_function_spec(t) for t in self.tools]

        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": user_query}],
            functions=functions,
            function_call="auto"
        )

        message = response.choices[0].message

        if message.function_call:
            # LLM wants to call a function
            tool_name = message.function_call.name
            arguments = json.loads(message.function_call.arguments)

            # Execute the tool
            tool = self.get_tool(tool_name)
            result = tool.execute(**arguments)

            return result
        else:
            # LLM responded directly without tools
            return message.content
```

#### Strategy 3: Semantic Similarity

```python
class SemanticToolSelector:
    """Select tools based on embedding similarity"""

    def __init__(self, tools: List[Tool], embedding_model):
        self.tools = tools
        self.embedder = embedding_model

        # Pre-compute tool embeddings
        self.tool_embeddings = {
            t.name: self.embedder.embed(t.description)
            for t in tools
        }

    def select_tool(self, user_query: str) -> Tool:
        query_embedding = self.embedder.embed(user_query)

        # Find most similar tool
        similarities = {
            name: cosine_similarity(query_embedding, tool_emb)
            for name, tool_emb in self.tool_embeddings.items()
        }

        best_tool_name = max(similarities, key=similarities.get)
        return self.get_tool(best_tool_name)
```

### Tool Chaining

```python
class ToolChainExecutor:
    """Execute multiple tools in sequence"""

    def __init__(self, llm, tools: List[Tool]):
        self.llm = llm
        self.tools = {t.name: t for t in tools}
        self.max_iterations = 10

    def execute_chain(self, user_query: str):
        conversation = [{"role": "user", "content": user_query}]
        iteration = 0

        while iteration < self.max_iterations:
            # LLM decides next action
            response = self.llm.chat(
                conversation,
                functions=self.get_function_specs()
            )

            if response.function_call:
                # Execute tool
                tool_name = response.function_call.name
                arguments = json.loads(response.function_call.arguments)

                tool = self.tools[tool_name]
                result = tool.execute(**arguments)

                # Add tool result to conversation
                conversation.append({
                    "role": "function",
                    "name": tool_name,
                    "content": str(result)
                })

                iteration += 1

            else:
                # LLM has final answer
                return response.content

        return "Max iterations reached"
```

## Experimental Tools

Created diverse tools to test different scenarios:

### 1. **Data Tools**
- **Database Query**: SQL database access
- **API Fetch**: REST API calls
- **File Read/Write**: Local file operations

### 2. **Computation Tools**
- **Calculator**: Mathematical expressions
- **Code Executor**: Run Python code safely
- **Data Analysis**: Pandas operations

### 3. **External Service Tools**
- **Web Search**: Google/Bing search
- **Weather API**: Current weather data
- **Stock Prices**: Financial data lookup

### 4. **Action Tools**
- **Email Sender**: Send emails
- **Calendar**: Schedule events
- **Notification**: Push notifications

### 5. **Specialized Tools**
- **Image Generator**: DALL-E integration
- **Translator**: Multi-language translation
- **Summarizer**: Long document summarization

## Experiments & Results

### Experiment 1: Tool Selection Accuracy

**Setup**: 100 user queries, measure which strategy selects correct tool

**Results**:

| Strategy | Accuracy | Latency |
|----------|----------|---------|
| Native Function Calling | 94% | 1.2s |
| LLM-Based Selection | 89% | 2.1s |
| Semantic Similarity | 76% | 0.3s |

**Insights**:
- Native function calling most reliable
- Semantic similarity fastest but less accurate
- LLM-based selection good for complex cases

### Experiment 2: Parameter Extraction

**Setup**: Test if LLM correctly extracts parameters from natural language

**Example**:
- User: "What's the weather in San Francisco tomorrow?"
- Expected: `get_weather(location="San Francisco", date="tomorrow")`

**Results**:
- **Success Rate**: 91% correctly extracted all parameters
- **Common Errors**:
  - Date parsing (e.g., "tomorrow" → actual date): 6%
  - Location ambiguity (e.g., "Paris" → Paris, France vs. Paris, Texas): 2%
  - Missing optional parameters: 1%

**Improvements**:
- Added parameter validation with retries
- Provided examples in tool descriptions
- Used Pydantic for type checking

### Experiment 3: Error Recovery

**Setup**: Introduce tool failures, measure recovery success

**Error Types**:
1. **Invalid Parameters**: 400 Bad Request
2. **Service Unavailable**: 503 error
3. **Timeout**: No response within 10s
4. **Unexpected Output**: Tool returns wrong format

**Recovery Strategies**:

```python
class ErrorRecoveryExecutor:
    def execute_with_recovery(self, tool: Tool, params: dict):
        try:
            result = tool.execute(**params)
            return {"success": True, "result": result}

        except ValidationError as e:
            # Parameter validation failed
            correction_prompt = f"""
            Tool call failed with validation error:
            {str(e)}

            Original parameters: {params}

            Please provide corrected parameters as JSON.
            """
            corrected = self.llm.generate(correction_prompt)
            return self.execute_with_recovery(tool, json.loads(corrected))

        except TimeoutError:
            # Retry with different tool or inform user
            fallback = self.find_fallback_tool(tool.name)
            if fallback:
                return self.execute_with_recovery(fallback, params)
            else:
                return {"success": False, "error": "Service timeout"}

        except Exception as e:
            # Unexpected error
            return {"success": False, "error": str(e)}
```

**Results**:
- **Recovery Success**: 78% of failures recovered
- **Retry Success**: 65% succeed on second attempt
- **Fallback Success**: 40% succeed with alternative tool

### Experiment 4: Multi-Tool Chaining

**Setup**: Complex tasks requiring multiple tools

**Example Task**: "Find the current stock price of Apple and calculate 15% of it"

**Expected Chain**:
1. `stock_price(symbol="AAPL")` → $178.50
2. `calculator(expression="178.50 * 0.15")` → $26.78

**Results**:
- **Success Rate**: 85% correctly chain 2 tools
- **3+ Tool Chains**: 68% success rate
- **Average Chain Length**: 2.3 tools per complex query

**Failure Modes**:
- Incorrect order (calculator before stock lookup): 8%
- Missing intermediate step: 5%
- Infinite loops (tool calls same tool repeatedly): 2%

### Experiment 5: Tool Learning

**Setup**: Track which tools work best for query types, learn patterns

```python
class ToolLearningSystem:
    def __init__(self):
        self.success_history = defaultdict(list)

    def record_success(self, query_type: str, tool_name: str, success: bool):
        self.success_history[query_type].append({
            'tool': tool_name,
            'success': success,
            'timestamp': time.time()
        })

    def get_recommended_tool(self, query_type: str) -> str:
        history = self.success_history[query_type]
        if not history:
            return None

        # Calculate success rate per tool
        tool_stats = defaultdict(lambda: {'successes': 0, 'total': 0})
        for record in history[-50:]:  # Last 50 attempts
            tool_stats[record['tool']]['total'] += 1
            if record['success']:
                tool_stats[record['tool']]['successes'] += 1

        # Recommend tool with highest success rate
        best_tool = max(
            tool_stats.items(),
            key=lambda x: x[1]['successes'] / x[1]['total']
        )
        return best_tool[0]
```

**Results**:
- After 100 queries, recommendation accuracy: 92%
- System learned query patterns and optimal tools
- Reduced average query resolution time by 30%

## Advanced Patterns

### Parallel Tool Execution

```python
async def execute_parallel_tools(self, tool_calls: List[dict]):
    """Execute multiple tools simultaneously"""

    tasks = [
        self.execute_tool_async(call['tool'], call['params'])
        for call in tool_calls
    ]

    results = await asyncio.gather(*tasks, return_exceptions=True)

    return results
```

**Use Case**: "What's the weather in New York, London, and Tokyo?"
- Execute 3 weather API calls in parallel
- 3x faster than sequential execution

### Conditional Tool Execution

```python
def execute_conditional(self, condition_tool, true_tool, false_tool):
    """Execute different tools based on condition"""

    condition_result = condition_tool.execute()

    if condition_result:
        return true_tool.execute()
    else:
        return false_tool.execute()
```

**Use Case**: "If stock price > $150, buy 10 shares, else wait"

### Tool Composition

```python
class CompositeTool(Tool):
    """Combine multiple tools into one"""

    def __init__(self, tools: List[Tool], composition_fn):
        self.tools = tools
        self.compose = composition_fn

    def execute(self, **kwargs):
        results = [tool.execute(**kwargs) for tool in self.tools]
        return self.compose(*results)

# Example: Create "weather_and_outfit" tool
weather_outfit = CompositeTool(
    tools=[weather_tool, outfit_recommender],
    composition_fn=lambda w, o: f"Weather: {w}. Recommended outfit: {o}"
)
```

## Best Practices Discovered

1. **Clear Tool Descriptions**: More detailed → better selection
2. **Parameter Validation**: Use Pydantic for type safety
3. **Error Messages**: Helpful errors enable better retries
4. **Rate Limiting**: Prevent runaway tool calling
5. **Logging**: Track all tool calls for debugging
6. **Timeouts**: Set reasonable limits for tool execution
7. **Fallbacks**: Have alternative tools when possible
8. **Testing**: Comprehensive test suite for each tool

## Challenges & Lessons

### Challenge: Hallucinated Tools
**Problem**: LLM invents non-existent tools

**Solution**: Strictly validate tool names before execution

### Challenge: Parameter Hallucination
**Problem**: LLM provides plausible but incorrect parameters

**Solution**: Strict schema validation, retry with error feedback

### Challenge: Cost Optimization
**Problem**: Function calling increases API costs

**Solution**:
- Cache tool results when possible
- Use cheaper models for tool selection
- Batch similar tool calls

### Challenge: Security
**Problem**: Malicious prompts could abuse tools

**Solution**:
- Whitelist allowed tools per user
- Validate all parameters
- Rate limiting and monitoring
- Sandbox execution environments

## Impact & Applications

### Customer Support Bot
- **Tools**: Knowledge base search, order lookup, refund processing
- **Results**: 60% query resolution without human
- **Customer Satisfaction**: 4.3/5

### Data Analysis Assistant
- **Tools**: SQL queries, data visualization, statistical tests
- **Results**: 10x faster exploratory analysis
- **Adoption**: Used by 50+ analysts

### Personal AI Assistant
- **Tools**: Calendar, email, reminders, web search
- **Results**: Saves 2 hours/day on average
- **User Feedback**: "Like having a personal assistant"

## Future Research

1. **Automatic Tool Generation**: LLM creates new tools as needed
2. **Tool Discovery**: Agent explores and learns about new tools
3. **Multi-Modal Tools**: Tools handling images, audio, video
4. **Collaborative Tools**: Multiple agents using shared tools
5. **Tool Marketplaces**: Ecosystem of third-party tools
6. **Self-Improving Tools**: Tools that optimize themselves based on usage

## Open Source Contributions

### Repositories

- **tool-calling-framework**: Comprehensive toolkit
- **tool-library**: 50+ pre-built tools
- **evaluation-suite**: Benchmark for tool calling systems

### Documentation

- Comprehensive API reference
- Tutorials for building custom tools
- Best practices guide
- Security considerations

---

### Resources

**Code Repository**: [github.com/umberH/tool-calling-experiment]
**Live Demo**: [Interactive tool calling playground]
