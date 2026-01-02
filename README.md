## Running Locally

1. `make install` - Install dependencies
2. `make backend` - Start API server (Terminal 1)
3. `make frontend` - Start React app (Terminal 2)
4. `make test` - Run tests

## Deployed
Backend: https://my-orb-assignment-nr99.vercel.app/usage
Frontend: https://my-orb-assignment.vercel.app/
Github: https://github.com/gold-sentry/my-orb-assignment.git

## Problem Statement

Orbital Copilot is our newest product; an AI assistant for Real Estate lawyers. Users can ask Orbital Copilot questions about a range of legal documents such as leases. As well as singular questions (e.g. "What is the rent?"), users are also able to ask Orbital Copilot to produce different types of reports (e.g. "Produce a Short Lease Report") which cover many aspects of the documents.

Orbital Copilot works on a consumption basis. Customers will be charged depending on how many "credits" they have consumed. We currently have raw data accessible via APIs, which are explained in the next section, and we need to combine these data sources in order to calculate how many credits are being used. We would then like to display this data to users in a dashboard UI.

---

## Frontend Implementation Decisions

### 1. Sorting
Given that this work requires the use of multiple sorting states, I implemented a custom sorting hook that allows for multiple sorting states. This logic prioritizes the most recently clicked column as the primary sort, with the other column acting as a secondary sort for tiebreakers.

Also the sample data given in the endpoint did not return same report name with different credit usage, To test this i added a temporary entry to the data. 

### 2. Component Architecture
I adopted a "Compound Component" pattern where applicable and separated concerns:
- **Presentation vs. Logic:** Hooks like `usePagination`, `useTableSort`, and `useUsageData` encapsulate logic, keeping components like `UsageTable` focused on rendering.

- **Component Breakdown:** Small, reusable parts like `StatCard`, `ChartTooltip`, and `TableSearch` are composed into larger features. While this added a bit of complexity to the codebase, it made it easier for me to actually read the UI code.

### 3. Responsive & Accessible Design
- **Mobile-Responsive:** I validated the design on mobile screen to ensure we have a working layout. Since it wasnt exactly stated what device lawyers use.


### 4. Design on Large Data
To test how this UI would behave i mocked ~50k record of messages, due to this i adjusted the formatting done on the graph to ensure readability.

### 5. Sorting Performance
I used useMemo to memoize the sorted data, preventing expensive sort operations from running on every render. With 100 messages the performance impact was negligible, but at 50k rows I observed minute UI freezing without memoization.

### 6. Testing 
Given time constraints i only implemented unit tests for the hooks and major components.  

## Backend Design Decisions

### 1. Why do we approximate 1 token ≈ 4 characters?

The approximation of 1 token ≈ 4 characters is a common industry standard. It provides a simple way to estimate token count without running an actual tokenizer.

This heuristic works reasonably well for typical English text because:

- Common words (the, and, is, to) are short and usually 1 token each
- Longer words get split into multiple subword tokens
- These effects average out to roughly 4 characters per token

It's not precise, but good enough for cost estimation in most cases.

For instance, the sentence *"The approximation of 1 token ≈ 4 characters is a common industry standard. It provides a simple way to estimate token count without running an actual tokenizer."* contains 163 characters. Using the 4-char heuristic: 163 / 4 ≈ 41 tokens. Running it through GPT-4's tokenizer produces 35-40 tokens — reasonably close to our estimate.

### 2. How might this approximation break down?

- **Legal/technical language** — Underestimates tokens. Legal documents frequently use long, rare terms (e.g., "notwithstanding", "indemnification", "aforementioned") that get split into multiple tokens. Unlike casual text where short common words dominate, these lengthy terms appear repeatedly throughout the document.

- **Code/formatting** — Underestimates tokens. Symbols, brackets, and whitespace often become individual tokens.

- **Non-English text** — Varies widely. Chinese, Japanese, and Korean characters often become 1 token each (not 4 chars = 1 token), making the heuristic inaccurate.

- **URLs/emails** — Underestimates tokens. Special characters fragment heavily. For example, `https://example.com/path` has 24 characters but tokenizes into ~10 tokens.

### 3. What are the implications of using different models (e.g. GPT-3.5 vs GPT-4)?

Different models have different cost and capability trade-offs:

- **Different token rates** — Each model has its own pricing. GPT-4 is significantly more expensive than GPT-3.5 per token.
- **Tokenizer differences** — Models may use different tokenizers, meaning the same text could produce slightly different token counts.

**How would this change the credit calculation logic?**

The current implementation uses a single `BASE_MODEL_RATE`. In production:

1. **Model selection** — Select the model based on prompt characteristics (e.g., length, task type). Simple prompts route to cheaper models; complex tasks route to more capable ones.

2. **Dynamic rate lookup** — Maintain a dictionary of model-specific rates and pass the model to `calculate_text_credits()` to apply the correct pricing.

3. **Usage analytics** — Log which models process each request and the credits consumed. This provides insights into usage patterns and helps optimize cost vs. capability trade-offs.

### 4. How would you improve token estimation in production?

We could use a tokenizer library to get exact token counts. Options include:

- **tiktoken** — Lightweight, fast, used for OpenAI models (~1MB download)
- **transformers** — Hugging Face library, supports many models (heavier dependency)

It's worth noting that these tokenizers require encoding files to be downloaded on first use, which adds latency on cold starts. In production, we would pre-cache the encoding files and bake them into the Docker image.

### 5. What caching or batching strategies would you use for slow or rate-limited APIs?

**Caching**

The current implementation uses a simple in-memory cache for reports due to **time constraints**. in the sample endpoint provided 
Total: 29 reports, but only 5 unique report types
With cache: 5 API calls (one per unique report type)

 This works but has limitations:
- **No TTL** — Cached data never expires. If reports were updated, we'd serve stale data.
- **No memory bounds** — The cache grows indefinitely, which could cause memory issues at scale.
- **Not shared across instances** — Each service instance maintains its own cache.
- **Lost on restart** — The cache empties when the service restarts.

In production, we would use **Redis or Memcached** for shared caching with TTL and eviction policies.

**Batching**

The current implementation fetches reports in parallel using `asyncio.gather()` with deduplicated report IDs. This works for moderate volumes, but at scale we would:

- Batch requests into chunks (e.g., 15-20 IDs per batch) to avoid overwhelming the server
- Add rate limiting and backoff for API failures

### 6. How would you normalize token billing to be fair across users?

Billing purely by token count may not reflect actual value delivered. A 500-token NDA summary might provide less business value than analyzing a 50,000-token merger agreement.

We could combine multiple pricing strategies:

**Document type pricing**
Different document types have different complexity and business value. A merger agreement review justifies higher rates than a standard NDA, regardless of token count.

**Intent-based pricing**
Simple lookups ("what does clause 5 mean?") cost less than complex analysis ("identify all liability risks"). We can detect intent via keyword matching or a classifier.

*Considerations:*
- Intent detection adds latency
- Users could game the system by phrasing complex requests as simple questions

**Token-based pricing with tiers**
Use tokens as a baseline with volume discounts. First 1,000 tokens at full rate, next 10,000 at a discount, etc.

**Confidence-based pricing**
If the model returns low confidence, charge less. This aligns incentives — users pay full price only for high-quality outputs.

*Considerations:*
- Confidence scores can have outliers
- Would need monitoring to detect anomalies

### 7. How would you explain to a lawyer why one message costs 12 credits while another costs 2?

Lawyers value transparency I believe anyone would 😀. I would avoid technical terms like "tokens" and use relatable concepts:

**(For simple messages) Example explanation:**

- Prompt 1: "Summarize this contract clause..." → 2 credits
- Prompt 2: "Summarize this merger agreement..." → 12 credits

> "Credits are based on the length of text the AI reads and processes. Your first message was a short clause (~200 characters), while your second was a full merger agreement (~1,200 characters). Think of it like hiring a personal assistant — reviewing a single clause takes less time than reviewing an entire agreement."

**For report-based messages:**

> "Some requests generate structured reports (e.g., Risk Analysis, Contract Summary). These have fixed costs based on the complexity of the report, not the length of your input."

> And in some cases where we present a 2 credit for some messages due to low confidence, I would explain it that is similar to the personal assistant example where we are not very confident in the output we have provided so again back to the value for buck conversation. This is especially useful as we can gain metrics here and study the report type where we have this challenges.

### What information would you expose in the UI?

In addition to the stat card i added i think these are other information to consider.

- **Cost per message** — Show credits charged next to each message
- **Running balance** — "47 of 100 credits used this billing period"
- Total message with and without report generated more like a percentage of the total messages.
- **Usage history** — Downloadable log for record-keeping and billing queries
- **Custom Range Filter** — While this may not be a UI i think it would be useful to have a custom range filter for users to be able to view their usage history for a specific time period.
- Ideally i would expect the lawyers to have a UI that allows them to easily filter by credit used and report type, the idea here would be to allow to easily know which report is costing them the highest amount of credits.
- Average credit usage per report type, maybe a drop down that allows them to select the report type and see the average credit usage for that report type.
- Not important maybe the highest credit spent on a single message. 
