---
layout: post
sublayout: post.html
title: "My Good Practices with Cursor: Lessons from 6 Months of AI-Assisted Coding"
date: 2025-03-25 16:00:00 +1000
categories: Tools Productivity AI
---

After 6 months of using Cursor as my primary code editor, I've discovered patterns that maximize productivity while avoiding common pitfalls. This isn't a tutorial – it's hard-won lessons about working effectively with AI pair programming.

## Context: Why Cursor?

**Background**: I tried GitHub Copilot, Codeium, and Tabnine before settling on Cursor.

**Why Cursor won**:
- **Codebase awareness**: Understands your entire project, not just current file
- **Multi-file editing**: Can modify multiple files in one request
- **Claude Sonnet integration**: Better reasoning than GPT-3.5-based alternatives
- **Terminal integration**: Run commands, see errors, fix automatically
- **Composer mode**: Multi-step edits with context preservation

**Cost**: $20/month (well worth it for me)

## The Rules I Follow

### Rule 1: Context is Everything

**Bad approach** (my first month):
```
Me: "Add error handling to this function"

Cursor: [adds generic try-catch]

Me: "No, I mean handle the specific API errors"

Cursor: [still generic]

Me: [frustrated]
```

**Good approach** (now):
```
Me: "Add error handling for the Stripe API call in `process_payment()`.
Handle these specific errors:
- card_declined → show user-friendly message
- insufficient_funds → suggest lower amount
- api_connection_error → retry 3 times with exponential backoff
- generic error → log to Sentry and show fallback message

Follow our error handling pattern from `api_client.py`"

Cursor: [precisely what I wanted]
```

**Lesson**: Specificity saves time. Include:
- **What**: The exact task
- **Where**: File/function names
- **Why**: The reasoning (helps with edge cases)
- **How**: Constraints, patterns to follow
- **Examples**: Reference similar code in your codebase

### Rule 2: Show, Don't Just Tell

Cursor learns from your codebase, but it needs pointers.

**Example - Bad**:
```
"Use our standard error handling"
```

**Example - Good**:
```
"Use the error handling pattern from `api_client.py` lines 45-67:
- Try the operation
- Catch specific exceptions
- Log with structured logging
- Translate to user-facing error codes
- Return ErrorResult object
```

**Even Better** - Use `@` mentions:
```
"Follow the error handling pattern from @api_client.py lines 45-67"
```

Cursor will pull that code into context automatically.

### Rule 3: Incremental > Big Bang

**Mistake I made**: "Refactor the entire authentication system to use JWT"

**Result**: 2 hours later, code broken, hard to debug, reverted everything.

**Better approach**:
1. "First, show me a plan for migrating auth to JWT"
2. Review the plan, give feedback
3. "Step 1: Add JWT utility functions (don't touch existing auth yet)"
4. Test, commit
5. "Step 2: Add JWT middleware, but keep session auth as fallback"
6. Test, commit
7. "Step 3: Migrate login endpoint to use JWT"
8. Test, commit
9. ... and so on

**Lesson**: Break big changes into commit-sized chunks. After each step:
- ✅ Review the changes
- ✅ Run tests
- ✅ Commit
- ✅ Only then proceed

### Rule 4: Read the Diff

**Temptation**: Cursor suggests changes, you hit "Accept All" without reading.

**Why this is dangerous**:
- Cursor might remove important comments
- It might change behavior subtly
- It could introduce security issues
- Dependencies might be wrong versions

**My workflow**:
1. Cursor suggests changes
2. I read **every line** of the diff
3. If suspicious, I ask: "Why did you change line 47?"
4. Accept only after understanding

**Red flags to watch for**:
- ⚠️ Removed error handling
- ⚠️ Changed function signatures (breaks calling code)
- ⚠️ Modified config values
- ⚠️ Updated dependencies without version pins
- ⚠️ Deleted comments/documentation

### Rule 5: Cursor as Rubber Duck

Use Cursor for exploratory conversation before coding.

**Example**:
```
Me: "I need to implement rate limiting for our API. What are the options?"

Cursor: [explains token bucket, leaky bucket, fixed window, sliding window]

Me: "We're using Redis. Which approach works best with Redis?"

Cursor: [recommends token bucket with Redis sorted sets, explains why]

Me: "Show me pseudocode for token bucket with Redis"

Cursor: [provides algorithm]

Me: "Great. Now implement this in `rate_limiter.py`, matching our Redis client pattern from `cache.py`"

Cursor: [implements correctly because we built context together]
```

**Lesson**: Have a conversation, build shared understanding, THEN code.

### Rule 6: Leverage Codebase Context

Cursor's superpower is codebase awareness. Use it!

**Features I use constantly**:

**1. @filename mentions**:
```
"Refactor the User model (@models/user.py) to use the same validation pattern as the Product model (@models/product.py)"
```

**2. @folder mentions**:
```
"Create a new service following the patterns in @services/"
```

**3. @codebase search**:
```
"@codebase Where do we handle Stripe webhooks?"
```

**4. @docs mentions** (for external docs):
```
"Implement Stripe payment following @https://stripe.com/docs/payments/accept-a-payment"
```

### Rule 7: Test-Driven Cursor

Write tests first, then ask Cursor to make them pass.

**Workflow**:

```python
# 1. I write the test
def test_rate_limiter_blocks_after_limit():
    limiter = RateLimiter(max_requests=5, window_seconds=60)

    # Make 5 requests - should all succeed
    for i in range(5):
        assert limiter.allow("user_123") == True

    # 6th request should be blocked
    assert limiter.allow("user_123") == False

    # After window expires, should allow again
    time.sleep(61)
    assert limiter.allow("user_123") == True
```

```
# 2. I ask Cursor
"Implement the RateLimiter class in @rate_limiter.py to make @test_rate_limiter.py pass.
Use Redis with token bucket algorithm."
```

**Benefits**:
- Clear specification of behavior
- Cursor knows exactly what to implement
- Tests catch bugs in AI-generated code
- Forces me to think through edge cases

### Rule 8: Git is Your Safety Net

**Golden rule**: Never accept Cursor changes without git clean.

**My workflow**:
1. Start from clean git state
2. Ask Cursor to make changes
3. Review diff carefully
4. If good: commit
5. If bad: `git reset --hard` (no harm done)

**Branch strategy**:
```bash
# For exploratory AI-assisted changes
git checkout -b cursor-experiment

# Let Cursor go wild
# ...

# If good:
git checkout main
git merge cursor-experiment

# If bad:
git branch -D cursor-experiment  # no trace left
```

### Rule 9: Know When to Say No

Cursor suggestions aren't always right. Trust your judgment.

**Scenarios where I reject Cursor**:

1. **Over-engineering**: "Just add a print statement" → Cursor adds logging framework
2. **Wrong pattern**: Suggests mutable global state in functional codebase
3. **Security issues**: Suggests concatenating strings in SQL
4. **Performance**: Suggests nested loops where a hashmap would work
5. **Unmaintainable**: Suggests clever one-liner over clear code

**Remember**: You're the senior developer. Cursor is a smart junior. Final call is yours.

### Rule 10: Teach Cursor Your Style

Cursor learns from your codebase, but you can accelerate this.

**Create a `.cursorrules` file** in project root:

```markdown
# Project: MyApp
# Tech stack: FastAPI, PostgreSQL, React

## Code Style
- Use type hints for all function parameters and returns
- Max line length: 100 characters
- Use double quotes for strings
- Prefer list comprehensions over map/filter

## Patterns to Follow
- All API endpoints use dependency injection for database
- Error handling: specific exceptions, logged with context
- Tests: pytest with fixtures, minimum 80% coverage
- Commits: conventional commits format

## Patterns to Avoid
- Don't use `any` or `object` types in TypeScript
- Don't use `SELECT *` in SQL
- Don't catch generic `Exception`, catch specific ones
- Don't use abbreviations in variable names

## File Structure
- `/api/routes/` - API endpoints
- `/api/services/` - Business logic
- `/api/models/` - Database models
- `/api/schemas/` - Pydantic schemas
- `/tests/` - All tests
```

Cursor reads this and follows your conventions!

## Advanced Techniques

### Technique 1: Composer Mode for Refactoring

**Use case**: Large refactoring across multiple files

**How**:
1. Open Composer (Cmd+I)
2. Describe the refactoring:
```
"Refactor the authentication system:
1. Move auth logic from controllers to @services/auth_service.py
2. Update all controllers in @api/routes/ to use AuthService
3. Add type hints
4. Update tests in @tests/auth/"
```
3. Cursor generates a plan with file changes
4. Review plan
5. Accept → Cursor edits multiple files

**Tip**: Review each file's changes individually, not all at once.

### Technique 2: Terminal Integration

Cursor sees terminal output and can fix errors automatically.

**Workflow**:
1. Run tests: `pytest`
2. Test fails with error
3. In Cursor chat: "Fix the test failure shown in terminal"
4. Cursor reads error, understands issue, suggests fix

**Magic moment**: It understands stack traces, SQL errors, linting issues.

### Technique 3: Cmd+K Quick Edits

For small edits, use inline Cmd+K:

1. Select code
2. Cmd+K
3. Type instruction: "add type hints" or "extract to function"
4. Review inline diff
5. Accept/reject

**Faster than chat** for small changes.

### Technique 4: Context Priming

Before a big feature, prime Cursor with context:

```
Me: "I'm about to implement a recommendation engine.
Our stack: Python, scikit-learn, PostgreSQL.
We have user behavior data in @models/user_activity.py.
We're using collaborative filtering.
Read @docs/recommendation_system.md for requirements."

Cursor: [confirms understanding]

Me: "OK, let's start. Step 1: Create data loading utility in @ml/data_loader.py"
```

Now Cursor has full context for the entire feature.

## Common Pitfalls (and How to Avoid)

### Pitfall 1: Blindly Accepting

**Symptom**: Code "works" but you don't understand it

**Solution**:
- Ask Cursor to explain: "Explain this code line by line"
- If you don't understand, rewrite it yourself
- Understanding > Productivity

### Pitfall 2: Over-reliance

**Symptom**: Can't code without Cursor anymore

**Solution**:
- Practice "Cursor-free Fridays"
- Implement small features manually
- Maintain your coding skills

### Pitfall 3: Poor Specifications

**Symptom**: Lots of back-and-forth, revisions

**Solution**:
- Spend 2 minutes thinking before asking
- Write clear, specific instructions
- Include examples and references

### Pitfall 4: Ignoring Tests

**Symptom**: AI-generated code breaks things

**Solution**:
- Always run tests after accepting changes
- Write tests for AI-generated code
- CI/CD catches issues Cursor missed

### Pitfall 5: Context Pollution

**Symptom**: Cursor suggests irrelevant things

**Solution**:
- Start fresh chat for new topics
- Use `@` mentions to focus context
- Clear chat history periodically

## Measuring Impact

### My productivity metrics (6 months):

**Before Cursor**:
- Features/week: 2-3
- Time debugging: 40%
- Time on boilerplate: 25%
- Stack Overflow visits/day: 10+

**With Cursor** (after learning curve):
- Features/week: 5-6 (2x increase)
- Time debugging: 25% (Cursor catches bugs early)
- Time on boilerplate: 5% (Cursor writes it)
- Stack Overflow visits/day: 2-3 (Ask Cursor first)

**Caveats**:
- Learning curve: 2 weeks to get productive
- Best for experienced developers (you need to verify AI output)
- Doesn't replace deep thinking or system design

## My Cursor Setup

### Extensions I Use:
- **Prettier**: Auto-format (Cursor respects this)
- **ESLint**: Cursor follows linting rules
- **GitLens**: See git blame while reviewing AI changes
- **Error Lens**: Inline errors (Cursor can see these)

### Settings:
```json
{
  "cursor.aiReviewDiff": true,  // Always show diff
  "cursor.longForm": true,  // Enable composer
  "cursor.cpp.disabledLanguages": ["markdown"],  // Don't autocomplete in docs
  "cursor.maxTokens": 4000,  // Larger context
}
```

### Keyboard Shortcuts I Memorized:
- `Cmd+K`: Inline edit
- `Cmd+L`: Open chat
- `Cmd+I`: Composer mode
- `Cmd+Shift+L`: Clear chat
- `Cmd+/`: Comment (Cursor won't touch commented code)

## The Future I Want

### Features I wish existed:

1. **Codebase Memory**: "Remember our authentication pattern" → Cursor saves this as a rule
2. **Team Context**: Shared `.cursorrules` across team with git
3. **Code Review Mode**: Cursor reviews my PR before I submit
4. **Test Generation**: Auto-generate comprehensive tests
5. **Refactoring Suggestions**: Proactively suggest improvements
6. **Performance Profiling**: "Make this function faster" → Cursor profiles and optimizes

Some of these might be coming. Cursor updates weekly!

## Advice for New Users

### Week 1: Learn the Basics
- Use it for simple tasks: "Add comments", "Rename variable", "Format code"
- Get comfortable with chat interface
- Learn `@` mention syntax

### Week 2: Build Context Awareness
- Use `@filename` for multi-file changes
- Create `.cursorrules` file
- Practice incremental requests

### Week 3: Advanced Workflows
- Try Composer mode
- Use terminal integration
- Experiment with test-driven Cursor

### Week 4: Find Your Style
- Notice what works for you
- Develop personal patterns
- Build muscle memory for shortcuts

### Month 2+: Mastery
- Push Cursor's limits
- Teach it your codebase patterns
- Contribute to community best practices

## Conclusion

Cursor hasn't made me a 10x developer. But it's made me faster at the boring parts, freeing me to focus on the interesting parts.

**Key lessons**:
1. **Context is king**: Specific instructions > vague requests
2. **Incremental > big bang**: Small steps, frequent commits
3. **Always verify**: Read diffs, run tests, understand code
4. **You're in charge**: Cursor suggests, you decide
5. **Git is essential**: Safety net for experimentation

**My prediction**: In 5 years, coding without AI assistance will feel like coding without syntax highlighting does now – technically possible but unnecessarily hard.

But the fundamentals remain:
- Understanding the problem
- Designing the solution
- Writing clear, maintainable code
- Testing thoroughly
- Thinking critically

Cursor accelerates all of this. It doesn't replace it.

---

**Resources**:
- [Cursor Documentation](https://cursor.sh/docs)
- [My .cursorrules Template](https://github.com/umberH/cursor-config)
- [Cursor Community Discord](https://discord.gg/cursor)
- [Cursor Tips Twitter](https://twitter.com/cursor_ai)

**What are your Cursor best practices?** Share in comments!

*Also see:*
- [AI for Personal Use: My Home Setup](./ai-home-setup)
- [NanoGPU Code Analysis](./nanogpu-analysis)
