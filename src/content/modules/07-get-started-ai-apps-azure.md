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
