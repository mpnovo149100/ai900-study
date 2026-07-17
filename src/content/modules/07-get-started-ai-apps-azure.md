---
title: Get started with AI applications and agents on Azure
order: 7
categories: ai-workloads, generative-ai
---

# Get started with AI applications and agents on Azure

## AI applications

### The definitions chain

- **AI** = systems designed to perform tasks that typically require human
  intelligence — **reasoning, problem-solving, perception, and language
  understanding**.
- **AI application** = a software solution using AI techniques (computer vision,
  speech, information extraction) to perform such tasks; understands, reasons,
  learns, and responds more adaptively than traditional software.
- **ML models** = the mathematical systems trained to **recognize patterns in
  data** and make predictions or generate outputs — the **"engines inside"** an AI
  application.
- **Inference** = when you interact with the app, the model applies **what it
  learned during training to new input**.

**Two defining properties of AI applications:**

1. **Model-powered** — trained models process inputs and generate outputs (text,
   images, decisions).
2. **Dynamic** — unlike static programs, they can **improve over time through
   retraining or fine-tuning**.

### Industry examples

| Industry | AI application |
| --- | --- |
| **Healthcare** | Diagnostic tools analyzing medical images (X-rays, MRIs) to help detect diseases faster and more accurately. |
| **Finance** | Fraud detection monitoring transactions in real time to flag suspicious activity. |
| **Retail** | Personalized recommendation engines analyzing customer behavior and preferences. |
| **Manufacturing** | Predictive maintenance forecasting equipment failures, reducing downtime and costs. |
| **Education** | Intelligent tutoring systems adapting to each student's learning style and pace. |

**Where the module is heading:** the model is the engine, but AI applications also
need **security, networking, hosting, data storage, application logic, and user
interfaces**. Azure provides the full enterprise-scale infrastructure, integrating
with **Microsoft Foundry**, to streamline AI application development.

## Understand Azure

### What Azure is

Microsoft Azure = one of the world's leading **cloud platforms**. A cloud platform
is a collection of services used over the internet instead of running everything
on your own hardware — internet-based data centers for storing data, running code,
and scaling without physical infrastructure concerns.

### Azure's four core service categories

1. **Compute** — running applications, programs, and workloads; like **renting
   computers in the cloud** you can scale up or down as needed.
2. **Storage** — saving and managing data: files, databases, images, backups —
   stored safely, accessible from anywhere.
3. **Networking** — connecting cloud resources to each other, to the internet, or
   to your organization, securely and efficiently.
4. **App Services** — ready-made platforms for building, hosting, and running
   applications **without managing the underlying servers**.

### Azure's organizational hierarchy (top to bottom)

1. **Tenant** — the organization's **home base and identity** in Microsoft's
   cloud. Analogy: an apartment unit in a large building (the building = Microsoft
   cloud) — each tenant is separate and secured, with its own locks and controls.
   Created when a company signs up for Azure or Microsoft 365; contains **users,
   groups, identities, and policies** for secure access.
2. **Subscription** — a **billing container** for cloud resources. One tenant can
   have **one or many** subscriptions. Ties usage to a payment method and sets
   boundaries for **cost, quotas, and access control**.
3. **Resource group** — a **folder holding related resources** so they can be
   managed together. One subscription can have multiple RGs; each can have its own
   **permissions and policies**.
4. **Resource** — any individual service or object: a storage account, database,
   Foundry resource. Each has a **resource type** (e.g.,
   `Microsoft.Storage/storageAccounts` — defines behavior and capabilities),
   configuration settings, unique name and ID.

When configuring a resource you choose: **region** (where it's deployed),
**performance tier** (tied to cost), **permissions and security**.

**Why the hierarchy matters:** tenants/subscriptions give **separation of
concerns** across departments or projects; resource groups simplify **policies,
monitoring, and automated deployments** — essential for governance and cost control.

**Azure portal** (`https://portal.azure.com`) — the centralized web UI for all
Azure services: create/manage resources, deploy and configure, monitor usage and
health, manage identities/roles/access, view billing and costs, access specialized
services like Microsoft Foundry.

**Note:** resources can also be created **programmatically** (Azure CLI, scripts) —
useful for repeating setups across environments, automating deployments, and
reducing manual error. Faster, more reliable, more maintainable for large AI
applications with many resources.

## Developing AI apps on Azure

The four pillars an AI application needs beyond the model itself.

### 1. Security and networking (the foundation)

Azure is secure by design: built-in identity, access control, and network isolation.

- **Microsoft Entra ID** — ensures only the right people and services access your
  AI resources; enables **RBAC (role-based access control)** to limit access to
  model deployments, resources, and data.
- **Secrets** — any sensitive value the application must keep hidden because it
  grants access to a system, service, or data: API keys, database connection
  strings, OAuth tokens, passwords.
- **Key** — a type of secret; usually a long, randomly generated string that
  authenticates your request when you call an endpoint (a URL).
- Secrets belong in **Azure Key Vault** — never in code or GitHub.

**The chatbot example** (four-step flow worth remembering):

- The application calls the model's endpoint.
- The request includes a key to authenticate.
- The key is stored in Key Vault as a secret.
- The app retrieves it at runtime using a secure method — **managed identity**.

Azure security also covers: compliance, threat detection, monitoring, firewalls;
networking ensures reliable, private operation across cloud and hybrid environments.

### 2. Hosting and scaling

**Host** = the computer/environment the application runs on; in the cloud, often a
**virtual machine (VM)** providing compute, memory, and networking.

- **AKS (Azure Kubernetes Service)** — for containerized workloads; orchestrates
  (manages) large numbers of containers, which hold what your code needs to run.
- **Azure App Service** — hosts web applications, APIs, and background jobs;
  modernize and deploy web apps quickly.

**Scaling** = adjusting compute power, usually by adding/removing instances (copies
of your application running simultaneously):

- **Scale out (horizontal)** — add more instances.
- **Scale up (vertical)** — increase CPU/memory on the existing instance.

Azure automates scaling based on CPU usage, request counts, or custom metrics.

### 3. Data storage

The types of data an AI app relies on: **training data** (teaches the model
patterns), **inference input** (real-time user/system input), **model output**
(predictions/responses), **application state** (user continuity),
system/configuration data, logs & telemetry, security & access data.

Azure's options:

- **Azure SQL Database** — mission-critical workloads.
- **Azure Cosmos DB** — real-time, globally distributed data.
- **Azure Database for PostgreSQL** — intelligent, scalable solutions.

### 4. AI capabilities

**Microsoft Foundry** — the enterprise-grade platform for developing and operating
AI agents securely on Azure. Resources managed via the portal or automated with
shell scripting and templates.

## Microsoft Foundry

### What Foundry is

A unified, enterprise-grade **PaaS** for building, deploying, and managing AI
applications and agents — consolidating models, agent orchestration, monitoring,
and governance in one platform with production-grade infrastructure and security.

### The four capability pillars

**1. Models**

- Thousands of models in a unified **model catalog**: first-party, third-party, and
  open-source.
- Azure-hosted OpenAI models (GPT-5 family: GPT-5, mini, nano, chat) plus
  specialist models from Anthropic (Claude), Mistral, Cohere, Meta LLaMA, DeepSeek,
  xAI Grok, Black Forest Labs, and gated Hugging Face models.
- Evaluate via built-in leaderboards and playgrounds; full lifecycle support:
  deployment per region, deployment types (standard, provisioned, batch), version
  control, governance with Responsible AI and content safety.

**2. Agents** (the core — Foundry is agent-first)

- Build task-oriented agents that reason over inputs, call tools, interact with
  data, and automate workflows using built-in orchestration.
- Foundry handles the plumbing: message threading, tool execution, safety controls,
  observability — developers focus on goals and capabilities.
- Low-code or code-first workflows; multi-agent systems working with project
  resources (documents, datasets, search indexes) and external integrations (Azure
  Functions, Microsoft Fabric).

**3. Tools (Foundry Tools)**

- The suite of Azure AI services: speech, vision, language, document intelligence,
  and more — over a dozen, usable separately or together.
- E.g., Azure Vision to analyze images, Azure Language to summarize/classify/extract
  key phrases, Azure Speech for speech ↔ text.

**4. Knowledge (Foundry IQ)**

- A permission-aware, multi-source knowledge layer giving agents grounded answers
  from the organization's own data.
- Configurable knowledge base from internal/external sources: Azure Blob Storage,
  SharePoint, OneLake, public web.
- Automatically handles indexing, document chunking, vector embeddings, metadata
  extraction.
- **Agentic retrieval:** breaks the question into subqueries, searches multiple
  sources in parallel, returns citation-backed information.
- Enforces user permissions and Microsoft Purview sensitivity labels — agents only
  return what the user is authorized to see.

### Resources and projects — the organizational split

- **Foundry resource** = the Azure resource providing platform capabilities: model
  hosting, the agent service, deployment governance, monitoring/observability,
  security boundaries, quotas and operational controls.
- **Foundry project** = a workspace inside the resource where you build: agents,
  evaluations, files/datasets, vector indexes, flows (AI logic), connections,
  project settings.
- **Pattern:** one resource per team/department, many projects inside it, each for a
  separate use case.

### Foundry portal

- Web interface for developing, testing, operating AI solutions.
- Two UIs: **new portal** (streamlined, multi-agent focus — only Foundry projects
  visible) and **classic** (all other resource types); toggle freely.
- **Ask AI agent helper** — specialized sub-agents that guide through docs, explain
  the catalog, troubleshoot, manage deployments/quotas, compare models, interpret
  dashboards.

**The development workflow (4 steps):**

- Sign in with your Azure subscription, create a project.
- Pick a model from the catalog and deploy it.
- Experiment in the Playground — write prompts, test responses, configure parameters.
- Use the configured model in your own client application.

### Client–server model

- **Client responsibilities:** present UI/CLI, collect input (text/voice/images),
  format it into a prompt/API request, send to the server (model endpoint), display
  output.
- **Server** (= your model deployment in Foundry) **responsibilities:** receive the
  prompt, run inference, apply system instructions/safety/context, return output
  (text, image, audio, structured JSON).

## Using Microsoft Foundry endpoints

### APIs and endpoints — the definitions

- **API** = a set of rules that allows one application to talk to another
  application or service — defining **what requests you can make, what data you get
  back, and how to format your request**.
- **Endpoint** = the **service entry point** for a cloud resource: a **unique HTTP
  address**, like a website, but for **client application code** rather than human
  users with a browser.
- The interfaces provided at the endpoint are **REST interfaces** (Representational
  State Transfer).

Example endpoint shape:

```
https://<foundry-project>-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=...
```

### Endpoint security

The endpoint is **protected** — applications can only access it by presenting:

- The correct **API key**, or
- A **token** confirming valid **Microsoft Entra ID credentials**.

The endpoint and key are found in the **Foundry Playground's details page**.

**Two common endpoint types in Foundry:**

1. **Project-level endpoints** — for working with your Foundry project and its
   resources.
2. **Model endpoints** — for **sending prompts to deployed models**.

### How requests and responses work

REST requests consist of:

- **Headers** — metadata: **authentication** and data format information (e.g.,
  `Content-Type: application/json`, `Authorization: Bearer …`).
- **Body** — data in **JSON format** (e.g., the model name and the user's prompt:
  "What is an AI application?").

The **response** mirrors this: headers + a **JSON body** containing the model's
generated reply (in the example, the output array with the assistant's message
text, plus metadata like model name, temperature, and status).

### SDKs vs. raw REST

Developers can work directly with REST interfaces, but most prefer **SDKs** — code
libraries for their language (**Python, JavaScript, C#**) that **abstract the REST
interfaces** and build the calls for you.

The endpoint is the **central point of service** for client applications — custom
solutions backed by Azure's security, scalability, and reliability.

## Generative AI applications

Generative AI = **a subset of AI focused on creating new content**. In a few short
years it changed how we work — fast-moving enough that even seasoned developers
struggle to keep up. This module gives a framework for understanding GenAI
applications and how **Microsoft Foundry** supports the innovation.

### The five use cases

Each pairs a scenario with a Microsoft product — that pairing is the useful part:

| Use case | What it looks like | Tool named |
| --- | --- | --- |
| **Marketing content creation** | Auto-writing product descriptions, blog posts, social media content — saving time, keeping brand consistency. | Microsoft Copilot |
| **Customer support** | AI virtual agents understanding and responding in natural language — 24/7 support, less load on human agents. | — |
| **Code generation** | Generating snippets, suggesting functions, writing whole modules from natural language prompts. | GitHub Copilot |
| **Image and video generation** | Visuals for campaigns, storyboards, concept art — often from just a text description. | Foundry model catalog |
| **Personalized learning** | Custom quizzes, explanations, study guides tailored to a student's style and progress. | — |

### The module roadmap

1. The Foundry **model catalog** — discover, evaluate, and deploy an appropriate
   model.
2. Test and configure the deployed model in the **Foundry Playground**.
3. Call it from code using the **OpenAI-compatible Responses API**.
4. **Agents** — encapsulating **a model + its instructions + optional tools** so the
   solution is reusable and consistent across Playground and code (via the **Project
   API**).

## Generative AI models in Foundry

### The premise

GenAI and agentic solutions are built on language models. A broad range exists for
different needs — a lightweight phone app may run best on an **SLM**; a government
application may need a **domain-specialized** model. Foundry provides the integrated
environment for discovering, evaluating, deploying, and operating them.

### 1. Discover — the model catalog

The central hub for models from an extensive range of providers; filter by source,
capabilities, inference tasks. Two supply categories:

- **Models sold directly by Azure** — hosted by Microsoft under Microsoft Product
  Terms: high Azure integration, enterprise-grade SLAs, preconfigured security,
  compliance alignment.
- **Models from partners and the community** — open-source or vendor-hosted:
  broader experimentation, rapid innovation, often suited to
  specialized/domain-specific tasks.

Each model entry includes: descriptions and capabilities (text, reasoning, coding,
multimodal, embeddings), benchmark results, supported inference tasks and
fine-tuning options, Responsible AI documentation (model cards, constraints,
caveats).

**Model families** — related models sharing architecture/lineage but differing in
size, capability, specialization, or version:

- **GPT-5.x** — multi-step reasoning, structured logic, planning, agentic
  workflows; adjustable "thinking levels" (trade speed for accuracy). Registration
  currently required.
- **Claude Opus 4.5 (Anthropic)** — frontier-level for sophisticated agents,
  complex code reasoning, computer-use tasks; large context/output windows.
- **Mistral Large 3** — state-of-the-art general-purpose; multilingual drafting,
  business reports, balanced cost/latency.
- **GPT-4.1** — available to all users; optimized for speed and low-latency
  inference → real-time chat, customer support, high-volume production (better than
  reasoning-heavy models there).

**Foundation models** = large, pretrained models (GPT, Claude, Mistral…) providing
general capabilities out of the box — deploy immediately or customize through
fine-tuning; the base layer for AI applications.

### 2. Evaluate

Select by task type: chat → GPT-5.x chat / Claude / Mistral / SLMs like Phi-4;
coding → GPT-5.1-codex, Claude Sonnet; summarization → long-context reasoning
models; embeddings → text-embedding-3-small; multimodal → Phi-4-multimodal, GPT-5.x
chat; industry-specific → domain-tuned models.

**Note the alternative:** for well-defined use cases, choose a **Foundry tool**
instead of a catalog model — prebuilt models with predictable performance, built-in
compliance, fast time-to-value, no custom modeling.

**Scoring and comparing:**

- **Benchmarks** — standard-dataset results with consistent criteria.
- **Leaderboards** — rank by quality, safety, throughput per task (reasoning,
  summarization, code generation).
- **Comparisons/filters** — side-by-side by quality/accuracy, cost,
  security/compliance, performance; filter by industry, use case, licensing.
- Hands-on path: catalog → model → Benchmarks → Try with your own data.

**Metrics — two kinds:**

- **Classic NLP metrics:** accuracy, precision, recall, F1.
- **AI-assisted metrics:** groundedness, relevance, coherence, fluency, GPT
  similarity — for qualitative scoring beyond traditional metrics.

**Evaluators** = components measuring quality, safety, and effectiveness of
model/agent outputs. Safety evaluators scan for harmful content, bias/unfairness,
violence, self-harm, protected-class harms. The Evaluator Library offers reusable
ones. **Key caveat:** evaluators detect, scan, and score — they **don't resolve
issues**.

### 3. Deploy

**Deployment** = making the model available for production through a stable,
scalable, secure endpoint — turning it into a service applications call via API,
ensuring consistent performance and preventing unauthorized/unsafe use.

**Customizable parameters:**

- **Deployment type** — standard, global batch, regional provisioned throughput —
  tied to where/how inference is processed.
- **Model version.**
- **TPM (tokens per minute) rate limit.**

Token recap: the smallest unit of text/data a model can process (words, subwords,
characters, punctuation).

**TPM and throttling:**

- TPM determines processing speed/scale and rate-limit boundaries (like **RPM** —
  requests per minute); higher TPM = more token traffic capacity.
- Limits vary by family: high-end reasoning models may have high TPM ceilings;
  specialized/image models often use **capacity units** instead of TPM.
- **Throttling** = intentionally slowing/limiting compute work when near processing
  limits — a protective mechanism for stability.
- **Quotas** define how many tokens/requests before throttling; larger prompts and
  higher max-output settings consume more TPM → rate-limit errors. Fix: lower max
  tokens or reduce concurrent requests.

**What happens on deployment (4 things):**

- Compute resources allocated — CPUs, GPUs, memory, networking, scaling rules.
- API endpoint created — invoked via the OpenAI Responses API.
- Configuration locked in — model version, response style, safety settings.
- Monitoring and logging activated — usage, performance, latency, errors, costs.

## Using a generative AI model

### The Playground as the starting point

The easiest way to interact with a deployed model: the **model playground** in the
Foundry portal — try prompts, compare models, and **capture working settings before
writing any code**.

**Key configuration parameters:**

| Parameter | What it controls |
| --- | --- |
| **Temperature** | Creativity vs. determinism. |
| **Max output tokens** | Caps response length; affects token consumption and throttling behavior. |
| **System instructions** | Sets the behavior and role of the model. |

**System prompt vs. user prompt** (the material keeps hammering this):

- **User prompt** = the end-user's request or question ("Where should I travel?").
- **System prompt** = sets **behavior, tone, tools, and guardrails** — e.g., "You
  are a helpful, step-by-step tutor. Cite sources. Decline medical advice."

**Playground → code bridge:** after testing representative prompts, reuse the
**same system/user prompts and parameter values** in code. The playground
**generates the code** that calls your deployment via the **OpenAI-compatible
Responses API** — essentially what runs when you use the chat interface. Take it as
the starting point for your own client.

### Lightweight chat client

A **lightweight client** = a small, minimal app that collects input, calls a remote
API, displays results — no heavy UI frameworks or complex backend:

- Runs as a **CLI, small desktop utility, or simple web page**.
- **State and compute stay on the server** (the model runs remotely).
- Small code footprint, minimal config (**environment variables + a short script**).
- Easy to prototype, run locally, extend later.

For Foundry: often **a single Python file** connecting to a project endpoint. The
Foundry SDK exposes **two clients** — a **Project client** (Foundry-native
operations) and an **OpenAI-compatible client** (calling models via the Responses
API) — and **most apps use both**.

**The Python example — the anatomy worth registering:**

- Client built with the **endpoint (`base_url`) + API key** from environment
  variables.
- `client.responses.create(...)` with: **model** = the deployment name; **input** =
  messages array with `role: system` and `role: user`; **max_output_tokens**;
  **temperature**.
- Response text read from `response.output_text`.

**Models vs. agents — the distinction being set up:**

- **Models = raw intelligence.**
- **Agents = packaged, task-oriented workers** built on top of that intelligence.

Use a model on its own when: you want **pure inference** ("take this prompt,
generate output"), you're **experimenting in the Playground**, or you're calling
via the **Responses API** directly.

## Creating an agent

### The concept

Agentic AI moves beyond one-off prompts to a **consistent, workflow-like behavior
reusable across apps, experiences, and services**. An agent in Foundry = a
**packaged, reusable AI component** with the familiar triad:

1. **A model** — the generative AI model for reasoning (e.g., GPT-4.1).
2. **Instructions** — the system prompt defining role, behavior, style, constraints,
   output rules.
3. **Tools** — the actions the agent can take.

Agent capabilities: call external tools (APIs, functions, retrieval)
**automatically**; break goals into **structured steps**; maintain **working
memory** during a conversation; process input, decide actions, generate structured
outputs.

### Creating one in the portal

Starts like the playground: choose the model, write system instructions ("You're a
helpful scheduling assistant who returns answers in concise bullet points"). What
makes it an agent rather than a bare model: adding **tools** and **knowledge**.

> **The mantra to memorize: Tools = actions. Knowledge = context.**

**Tools**

- Callable capabilities enabling the model to **act on external systems**: searching
  the web, querying a database, using an **MCP server**.
- When enabled, the model **inspects available tools and calls them when relevant**
  to the request.
- Examples: **Code Interpreter** (data analysis, file handling), knowledge sources,
  **custom functions/APIs**.
- What they unlock: real actions (read/write files, search, update systems),
  workflow execution, enterprise integration.
- Managed centrally via the **Foundry Tool Catalog**.

**Knowledge**

- Access and retrieval of external content **through RAG** — documents/datasets
  giving the model highly relevant context during generation.
- Sources: internal PDFs, **SharePoint**, **Azure Storage** files, multi-source
  knowledge bases.
- The retrieval pipeline: **ingest + index → search + ground → more accurate,
  traceable, domain-specific answers**.
- Key detail: when knowledge is used, **the response includes a citation** for the
  knowledge store.
- Enables: document-grounded Q&A, context-rich assistance, enterprise-safe retrieval.

Then: **save model + instructions + tools as an agent**, keep testing and refining
in the Playground.

### Using an agent from code — the Project API

The Project API enables: integrating agents into web apps/bots/backend workflows;
orchestrating **multi-step tasks**; passing structured inputs or tool calls;
running agents **at scale**.

The Python pattern (the anatomy that matters):

- You need the **agent-id** — found in the agent's Playground **code view → `.env`
  variables**.
- **AIProjectClient** connects to the **project endpoint** using
  **DefaultAzureCredential** (Entra ID auth, not an API key — note the difference
  from the model client example).
- `project_client.agents.get(agent_name=...)` retrieves the existing agent.
- `project_client.get_openai_client()` then `responses.create(...)` with
  `extra_body={"agent": {"name": ..., "type": "agent_reference"}}` — referencing the
  saved agent instead of passing a system prompt.

## Text processing and analysis

### The definitions

- **NLP** enables machines to **understand, interpret, and respond to human
  language**; its goal is to analyze and extract **meaning or structure** from
  existing text.
- **Text analysis** = the process of automatically examining written text to extract
  useful information — **sentiment, keywords, entities, or topics**. It **relies on
  NLP** to turn unstructured text into meaningful insights.

### The four application scenarios

| Domain | Need | What text analysis does |
| --- | --- | --- |
| **Customer feedback** | Large volumes of reviews, support tickets, surveys | Identify trends, detect dissatisfaction early, improve experiences. |
| **Healthcare** | Extract clinical info from unstructured medical documents | Identify symptoms, medications, diagnoses → faster, more accurate decisions. |
| **Financial documents** | Contracts, loan applications, regulatory documents | Extract interest rates, borrower info, compliance risks → less manual review. |
| **Legal documents** | Lengthy case files, rulings, agreements | Summarize, highlight important clauses, classify by topic. |

## Text analysis in Foundry

**The framing — two approaches** (this dichotomy is the unit's whole point):

1. **General-purpose AI models** — handle a broad range of tasks through **natural
   language prompts**.
2. **Purpose-built language tools (Azure Language)** — return **structured,
   deterministic results** for specific tasks.

### Approach 1: General-purpose AI models

A general-purpose model = trained on vast text data, broad language understanding,
handles many tasks by following natural language instructions — **no configuration
or training required**. Explored in the **chat playground** (type a prompt, refine
in the same conversation).

Text analysis tasks it handles:

- **Key phrase extraction** — lists the main concepts from unstructured text. The
  restaurant review example yields: "casual dinner", "fantastic meal", "mushroom
  risotto", "Pete", "Seattle"… Useful for **indexing and searching** documents.
- **Entity recognition** — finds specific entities, each with a **type and sometimes
  subtype**. The example's structure is worth noting: Person (John Smith), Location
  (New York), Organization (Microsoft), **DateTime with subtypes** (Date: May 2nd
  2017; Time: 8:00 AM; Duration: 3 hours), **Quantity with subtypes** (Percentage:
  25%; Number: 40; Dimension: 10 miles).
- **Entity linking** — identifies known entities **with a link to Wikipedia**
  (disambiguation).
- **Sentiment analysis and opinion mining** — positive/negative/neutral, at document
  or sentence level, with explanations.
- Plus: summarization, translation, custom classification, question answering —
  **freely combinable in one conversation** (translate then summarize).

Key note: the output **depends on how you phrase the prompt** — ask for an overall
score or a sentence-by-sentence breakdown; more specific prompt = more structured
response.

### Approach 2: Azure Language in Foundry Tools

Sometimes **a specialized tool gets more predictable results**. Azure Language = an
NLP service with **purpose-built analyzers** using statistical techniques to return
**structured, deterministic output** — suited for **automated pipelines where
consistent results matter**. (Testable in the portal: Build → Models → AI services
tab.)

Capabilities highlighted:

- **Language detection** — identifies the primary language + dialect with a
  **confidence score**; often the **first step in a multi-language workflow** (route
  the text to the right model/process). Example: "¡Hola! Me llamo Josefina…" →
  Spanish, ISO code **es**, confidence **1.00**.
- **PII detection** — identifies personal details (names, phone numbers, emails,
  addresses) and can **optionally redact** them; includes **PHI (personal health
  information)**. Example output: Maria Garcia → Person; 020 7946 0958 → Phone
  number; the address → Address. Driver: **privacy compliance before storing/sharing
  text**.

## Create a client application that analyzes text

### The base definitions

- **Client application** = a program that connects to a service or model, sends
  requests, receives results automatically — enabling large-volume text processing
  or AI in a workflow.
- **API** = the set of rules defining how two pieces of software communicate.
- **Client library (SDK)** = ready-made code developers use to talk to a service or
  API easily — **instead of raw HTTP requests**.

### Path 1: General-purpose model via the OpenAI API

Flow: Foundry resource → project → deploy a model from the catalog → call it with
the **Azure OpenAI API** (requests to an **endpoint** + **API key** to prove
authorization).

**Responses API** = the modern, unified API within Azure OpenAI — designed for
**complete AI interactions**, not just text generation. Use it for **flexible,
conversational-style analysis that doesn't need fixed structured output**.

The three setup steps:

1. **Install:** `pip install openai` (in the code editor's terminal, e.g., VS Code).
2. **`.env` configuration file** — stores environment variables:
   `AZURE_OPENAI_ENDPOINT` (contains the resource name + `openai.azure.com/openai/v1/`),
   `MODEL_DEPLOYMENT_NAME`, `API_KEY` (the Foundry project key).
   - Detail worth noting: the **deployment name is the name you gave the model when
     deploying** (deploy gpt-4.1 as "gpt-demo-model" → the deployment name is
     `gpt-demo-model`); if not customized, it matches the model name.
3. **Application code** — the pattern: `load_dotenv()` reads `.env`; `os.getenv()`
   retrieves each value (**names must match exactly** or you get missing values at
   runtime); create the **authenticated client object** `OpenAI(base_url=...,
   api_key=...)`; call `client.responses.create(model=deployment_name, input=...)`;
   run with `python <file>.py`.

The material's Python aside: a **class** = a blueprint (what data it holds, what
actions it performs); an **object** = a specific instance. An **authenticated client
object** = a service-specific object that makes authorized API calls **without your
code manually managing tokens/secrets**.

**The pivot — why not always use the LLM:** the OpenAI API is easy, but **results
vary between calls because the model generates text probabilistically** — same
prompt, slightly different wording/formatting. When you need **consistent,
structured values** (a language code, confidence score, redacted text) → **Azure
Language SDK**.

### Path 2: Azure Language SDK

- Install: `pip install azure-ai-textanalytics`.
- Endpoint shape differs: `https://<resource>.cognitiveservices.azure.com/`.
- Client: `TextAnalyticsClient(endpoint=..., credential=AzureKeyCredential(key))`.

The two methods shown:

- **`detect_language()`** — takes a **list of text strings**; returns the detected
  language, its **ISO 639-1 code**, and a **confidence score between 0 and 1**
  (`result.primary_language.name` / `.iso6391_name` / `.confidence_score`).
- **`recognize_pii_entities()`** — identifies personal details; returns **both the
  redacted text** (`result.redacted_text`) **and the list of entities found**, each
  with **category and confidence score**.

## Azure Language with an agent (MCP)

### The problem this solves

An agent's generative model can understand and generate language, but **alone can't
perform text analysis requiring deterministic, structured output**. Adding **Azure
Language in Foundry Tools** to the agent gives it **consistent, predictable** text
analysis. (The general-purpose vs. purpose-built dichotomy again — now resolved by
combining the two inside one agent.)

### MCP — Model Context Protocol

An **open standard** defining how AI agents connect to **external tools and data
sources**. The analogy: a **universal adapter** — instead of custom integration code
for every service, connect the agent to an MCP server that exposes capabilities in a
standard way.

**Client-server architecture:**

- **MCP client** = the AI agent (or the host application running it) — sends
  requests, receives responses.
- **MCP server** = the service exposing tools, data, or actions — listens, executes
  the capability, returns a **structured result**.

When connected, the agent can **discover what tools the server offers** and invoke
them as needed — **no custom integration work**. The server can respond by:

- **Providing data** (sentiment scores, key phrases, entity records).
- **Taking action** (processing a batch of documents).

Benefit: **separation of concerns** — agent logic stays clean; swap or extend
capabilities by connecting to different MCP servers.

### The Azure Language MCP server

A **managed service** exposing Azure Language capabilities through MCP — the bridge
between your agent and the full suite: NER, sentiment analysis, language detection,
and more. Because it follows the standard, the agent calls these tools **with the
same protocol as any other MCP server** — no direct REST API calls, no managing
authentication tokens in agent code.

**Using it in the Foundry portal:**

1. Deploy a model and **save it as an agent**.
2. In the playground, **add the Azure Language MCP server as a tool** (search tools
   for "Azure Language in Foundry Tools").
3. Configure the connection with your **Foundry resource name**.
4. Prompt the agent to analyze text using the tool.

Result: the agent combines **the model's reasoning + Azure Language's precision** —
suited for tasks like **routing support tickets by detected language** or
**identifying and redacting PII**.

Note worth keeping: a Foundry resource **already includes access to Language tools**
— **no separate Azure Language resource needed** for the MCP server.

## AI speech capabilities

### The framing

Voice-based interfaces = a more natural way to engage with AI software, increasing
**accessibility and inclusiveness**. The two required capabilities:

1. **Speech recognition** — detect and interpret spoken input.
2. **Speech synthesis** — generate spoken output.

The five scenario examples (industry → capability mapping):

| Industry | Scenario | Capability |
| --- | --- | --- |
| **Healthcare** | Clinical dictation — doctors speak patient notes, AI converts to accurate medical text | Recognition |
| **Customer support** | Real-time call transcription — review conversations, detect issues, analyze sentiment | Recognition |
| **Media/entertainment** | Automated captioning (live or recorded) — accessibility, multilingual audiences | Recognition |
| **Education** | Language learning — listen to students speak, give pronunciation feedback | Recognition (+ synthesis for feedback) |
| **Retail/e-commerce** | Voice shopping assistants — understand spoken requests (recognition), respond with product info (synthesis) | Both |

**Azure Speech in Microsoft Foundry Tools** — the service delivering:

- **Speech-to-text**
- **Text-to-speech**
- **Speech translation**

With **prebuilt and custom models** for tasks including: high-accuracy transcription,
**identifying speakers in conversations** (speaker recognition/diarization),
**creating custom voices**, and more.

## Speech recognition with Azure Speech

**The two-model recap** (simplified version of the earlier six-stage pipeline):

- **Acoustic model** — converts audio into **phonemes** (representations of specific
  sounds).
- **Language model** — maps **phonemes to words**.

The recognized text serves closed captions, call transcripts, note dictation, etc.

### Azure Speech — Speech to Text

An API for processing voice input from **a microphone or audio file**. Testable in
the Foundry playground (Build → Models → AI services tab → Azure Speech - Speech to
Text): upload audio or record yourself, see the transcription.

### The speech-to-text SDK

A client library making speech recognition easy to add to applications. It enables
the app to:

- **Capture or send audio** — microphone, file, or stream.
- **Send it to Azure Speech securely.**
- **Receive transcribed text** in near real time or after processing.

The SDK handles **networking, authentication, audio streaming, and response
parsing** — you focus on application logic. It sits in the **client or service
layer**, as the bridge between your code and the service.

**Development setup:**

- Install: `pip install azure-cognitiveservices-speech` (note the package name —
  it's the older "cognitive services" naming, unlike `azure-ai-textanalytics`).
- Authentication: the **Foundry resource endpoint + key** (or Microsoft Entra ID).

**The five-step runtime flow:**

1. App initializes the Speech SDK (endpoint + authentication).
2. Audio is captured or loaded (mic or file/stream).
3. Audio is sent to Azure Speech (streamed/uploaded securely).
4. **Recognition runs in the cloud** — Azure's models analyze the audio.
5. Text results return, with optional metadata.

**Code anatomy worth registering:**

- **SpeechConfig** — subscription (key) + endpoint.
- **AudioConfig** — the audio source (`use_default_microphone=True`).
- **SpeechRecognizer** — takes both configs.
- **Event handlers** — `recognizing` (partial results as you speak) vs. `recognized`
  (final text) — connected before starting.
- **`start_continuous_recognition()` / `stop_continuous_recognition()`** — for
  ongoing listening.

**Audio processing options — the key operational split:**

| Mode | When | How |
| --- | --- | --- |
| **Real-time transcription** | Presentations, demos, live speech | App listens to incoming audio (mic or file), **streams** it to the service, text returns as it goes. |
| **Batch transcription** | Recordings stored on file shares, remote servers, **Azure Storage** | Point to files with a **SAS (shared access signature) URI**; receive results **asynchronously**. |

Batch detail: jobs are scheduled **best-effort** — normally start within minutes,
but **no estimate for when a job enters the running state** → must be run
asynchronously.

## Speech synthesis with Azure Speech

### The essentials

TTS = vocalizing data, generating audible speech from text. A TTS solution requires
two things:

1. **The text to be spoken.**
2. **The voice to be used.**

**The synthesis process** (compressed version of the earlier four-stage pipeline):

1. **Tokenize** the text into individual words.
2. **Assign phonetic sounds** to each word.
3. Break the phonetic transcription into **prosodic units** (phrases, clauses,
   sentences).
4. Create **phonemes** from the prosodic units.
5. **Synthesize** the phonemes as audio, assignable with a particular **voice,
   speaking rate, pitch, and volume**.

Uses: spoken responses to user input, reading messages aloud, broadcasting
announcements.

### Azure Speech — Text to Speech

The API converts text to speech that can be **played directly through a speaker or
written to an audio file**. Key capabilities:

- **Multiple predefined voices**, multi-language and regional pronunciation.
- **Neural voices** — use neural networks to **overcome common limitations like
  intonation issues**, producing a more natural sound.
- **Custom voices** — you can develop your own and use them with the API.

In the Foundry playground: choose a synthetic voice, adjust **speed and pitch**
parameters, hear the generated audio.

### The text-to-speech SDK

Enables the app to: send text to Azure Speech → generate audio with neural voices →
**play or save** it. The SDK handles authentication, networking, audio formatting,
playback.

Typical placement:

- **Client applications** — convert and play immediately (desktop/mobile).
- **Backend services** — generate audio files for later playback.

**The five-step runtime flow:** initialize SDK (endpoint + key/Entra ID) → provide
text → send to Azure Speech → **synthesis runs in the cloud** (neural models) →
audio returned (play, stream, or save).

**Code anatomy — the mirror of the recognizer:**

- **SpeechConfig** — key + endpoint (same as STT).
- **AudioOutputConfig(`use_default_speaker=True`)** — output instead of input.
- **`speech_config.speech_synthesis_voice_name`** — selecting the voice (e.g., a
  neural multilingual voice that speaks different languages based on the input text).
- **SpeechSynthesizer** — the counterpart to SpeechRecognizer.
- **`speak_text_async(text).get()`** — with result reasons:
  **SynthesizingAudioCompleted** vs. **Canceled** (with error details).

## Creating a speech-capable agent (Voice Live)

### Speech-to-speech — the concept

A capability where the application takes **spoken audio as input and produces spoken
audio as output** — no reading or typing; the experience feels like a natural voice
conversation. It enables systems to: **listen → understand/transform → respond with
synthetic speech**.

**The three-stage pipeline** (STT + TTS combined into one experience):

1. **Speech-to-text** — convert the user's spoken audio into text.
2. **Processing/reasoning** — analyze, translate, summarize; or an **AI agent decides
   what to say next**.
3. **Text-to-speech** — convert the response text back into spoken audio.

Common scenarios: voice assistants/agents; **speech translation** (speak one
language, hear another); hands-free apps (navigation, kiosks, industrial tools);
accessibility; customer support bots.

### Azure Speech — Voice Live

The **Voice Live API** lets applications have **real-time voice conversations** — an
agent listens and responds with spoken audio quickly and naturally.

The value proposition (the testable bit): **instead of building and connecting
separate pieces** (speech-to-text, AI reasoning, text-to-speech), **Voice Live
combines everything into one service**. It's **fully managed by Azure** — no backend
setup or maintenance; you send audio in, spoken responses come back. It can also
return **visuals (avatars)** and **trigger actions**.

**The solution anatomy** — Azure speech-to-speech solutions use:

1. **Azure Speech** — the STT and TTS capabilities.
2. **Agents or application logic** — deciding the responses.
3. **Foundry Tools or MCP servers** — exposing speech as **callable tools** so agents
   don't manage SDKs/APIs directly.

**In the Foundry playground:**

- Preconfigured voice samples to try, or create your own solution.
- Key requirement: **choose a generative AI model for the agent** — Voice Live uses
  the GenAI model **alongside its own acoustic models** for the live conversation.
- Configurable settings — e.g., **proactive engagement** (the agent can initiate
  conversations).
- **Voice mode for a Foundry agent** — integrates Voice Live **into the agent
  definition itself**, encapsulating speech configuration in the agent and reducing
  the client code required.

**Building an app:**

- Package: `pip install azure-ai-voicelive` (plus **pyaudio, python-dotenv,
  azure-identity**).
- Sample code in the Foundry portal handles: session initiation, connecting audio
  devices (mics/speakers), processing incoming/outgoing audio streams, **handling
  interruptions**.
- Running it: real-time voice assistant streams mic audio to Voice Live → receives
  spoken response → plays through speakers.

## Computer vision

### The framing

Computer vision = the AI field enabling machines to **interpret and understand
visual information** — images, videos, live camera feeds — automating time-intensive
tasks. The module covers two directions:

1. **Analysis** — identify/analyze objects, recognize patterns, **read text within
   images**, interpret scenes like a human.
2. **Generation** — visual AI models that go beyond analysis to **create new visual
   content**.

Together: applications from image search and document analysis to creative tools and
interactive AI — systems that **both see and create** visual information.

The four application scenarios:

| Domain | Scenario | Techniques named |
| --- | --- | --- |
| **Manufacturing** | Real-time inspection on assembly lines — surface defects, misalignments, missing components → less waste, better quality control | **Object detection + image segmentation** |
| **Healthcare** | Analyzing X-rays, MRIs, CT scans — highlighting anomalies (tumors, fractures), early diagnosis, reducing human error | Image analysis |
| **Retail** | Shelf monitoring — detecting out-of-stock or misplaced products → real-time inventory | Object detection |
| **Autonomous vehicles** | Recognizing road signs, lane markings, pedestrians, other vehicles → safe navigation in dynamic environments | Detection/segmentation |

## Multimodal models for image analysis

### The concept

**Multimodal models** = AI models that understand and work with **more than one type
of data at the same time** — text, images, audio, video. E.g., describe an image in
natural language or answer a question about a photo.

Common placement:

- **AI applications** — image understanding enhancing user workflows.
- **AI agents** — visual input helping the agent make better decisions.

Examples: an agent reviewing uploaded documents and screenshots; a support app
analyzing customer-submitted photos; a learning tool explaining diagrams/charts in
plain language.

The key value: accepting text + images **reduces the need for separate vision
pipelines** — easier end-to-end intelligent experiences.

**Vision-enabled GPT models ("GPT with vision")** = models combining visual
understanding with natural language responses; designed for **flexible,
general-purpose visual reasoning** — build intelligent apps **without deep computer
vision expertise**.

**In Foundry — what vision-enabled models can do:**

- Describe image contents in natural language.
- Answer questions about objects, text, or scenes.
- Extract meaning from **charts, screenshots, documents, photos**.
- Combine image understanding with text instructions **in a single prompt**.

**The catalog's multimodal offerings:**

- **GPT-4.1 / mini / nano** — general-purpose multimodal: image description, visual
  Q&A, document/screenshot analysis, chart interpretation.
- **GPT-5 series (5.1, 5.2)** — advanced, for **enterprise and agentic scenarios**:
  multimodal inputs, **structured outputs, tool use, large-context reasoning across
  modalities**; production-grade agents.
- **Partner models** — e.g., Anthropic and others with text + image understanding.
