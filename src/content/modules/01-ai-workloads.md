---
title: AI workloads and considerations
order: 1
categories: ai-workloads
---

# AI concepts for developers and technology professionals


## Generative AI 

### What is it? 
Branch of AI that enables applications to create new
content — natural language, images, video, code, and more.

 A typical example is a chat interface that generates original answers to user questions.

### How it works?
Generation is powered by a language model trained on huge volumes of data (often internet/public documents).

Users interact through prompts (natural language questions or statements), which the model uses to generate a meaningful response.

These models encapsulate **semantic relationships** between language elements — they "know" how words relate to each other, which is what allows them to produce coherent text.

## LLMs vs. SLMs

Large Language Models (LLMs) are powerful, handling a wide range of topics but are expensive to train.

Small Language Models (SLMs) are more suited for specific tasks with limited topics.

LLMs offer generalization across diverse data while SLMs are efficient in resource usage.

Deployment can vary: large cloud instances for LLMs, local devices for SLMs.

## What is LLM?

At its core, an LLM is a function that takes a sequence of tokens and returns a probability distribution over the next token. Everything else — chat, reasoning, code — emerges from that.

#### The pieces

**Tokenization**: text is split into tokens (subwords, via BPE or similar). "Renewables" might become Renew + ables. Each token is an index into a vocabulary of ~100k entries.

**Embeddings**: each index maps to a high-dimensional vector (a few thousand dims). This is where "meaning" starts existing as geometry.

**Transformer**: a stack of blocks, each with two parts:

- Self-attention — every position produces a query, key, and value. The query·key product determines how much each token attends to the others, and the output is a weighted sum of the values. This is what lets the model relate distant words (resolve what "she" refers to, connect a question to retrieved context). 

- Multi-head = several of these relations in parallel, each capturing different patterns.

MLP / feed-forward — where most parameters live; acts as knowledge storage and transformation.

Residual connections and normalization keep training stable across dozens of layers.

Output: the last layer projects to the vocabulary → logits → softmax → probabilities.

## Agents 

Agents are generative AI applications that can reason, automate tasks using tools, and respond to context. Three key elements:

1. LLM — the "brain" for language understanding and reasoning

2. Instructions — a system prompt defining role and behavior (the agent's "job description")

3. Tools — how it interacts with the world: knowledge tools (search, databases) and action tools (send emails, update calendars, control devices)

Common scenarios: chatbots, AI assistants that automate tasks, content creation (as a starting point for iteration), automated translation, and summarizing/explaining complex documents.

**Key Points**
•  AI agents are applications that reason and automate task execution using AI tools.
•  Agents incorporate a language model as the core for understanding and reasoning.
•  Agents act based on instructions, defining their roles and behaviors.
•  Tools enable agents to interact with external systems and databases.

## NLP 
NLP (natural language processing) is the broad term for AI models and techniques that make sense of language — and it's the foundation on which generative AI LLMs are built.

### Why specialist NLP tools still matter?
Even though generative AI handles many language scenarios today, specialist NLP tools are still used when you need predictable results or custom rules.

Core text analysis techniques:
1. **Language detection** — identifying which language(s) a document is written in; often the first step in a multi-stage text processing workflow

2. **Text classification** — assigning documents to categories, including sentiment analysis (positive / negative / neutral)

3. **Key-term extraction & entity detection** — identifying key phrases and mentions of entities (people, places, organizations); a specialized form is detecting and redacting PII (names, addresses, phone numbers)

4. **Summarization** — reducing text volume while keeping the main points

Common scenarios:
- Analyzing documents or call/meeting transcripts for key subjects and entity mentions
- Evaluating sentiment in social media posts, reviews, or articles
- Chatbots for FAQs or predictable dialogs that don't need the complexity of generative AI
- Redacting PII before sharing data, for privacy compliance

## Speech 

Speech capabilities let users interact with AI applications and agents through spoken language — e.g., a microphone button to ask questions verbally and get synthesized spoken answers.

Two core capabilities:
1. **Speech recognition** — AI's ability to "hear" and interpret speech; typically **speech-to-text (audio transcribed into text)**

2. **Speech synthesis** — AI's ability to vocalize words; typically **text-to-speech (text converted into an audible signal)**

Evolving challenges the technology is tackling: ignoring background noise, detecting interruptions, and producing increasingly expressive, human-like voices.

Common scenarios:
- Voice-driven AI agents (understand spoken input, perform tasks, respond aloud)
- Automated transcription of calls and meetings
- Audio descriptions of video or text
- Automated speech translation between languages

## Computer Vision
Computer vision is the area of AI that analyzes visual input — photographs, videos, and live camera feeds. Example: users upload images of vintage computers, which get analyzed, identified, and described.

### How it works?
Models are trained using large numbers of images.

### Types of computer vision models:
1. **Image classification** — trained on images labeled with their main subject; predicts the most appropriate label for unlabeled images (identifies what the image is of)

2. **Object detection** — identifies the location of specific objects in an image (bounding boxes)

3. **Semantic segmentation** — an advanced form of object detection that identifies the individual pixels belonging to an object, rather than just drawing a box around it.

4. **Multi-modal models** — combine visual features with text descriptions, enabling comprehensive image descriptions

Common scenarios:
- AI agents that interpret visual input
- Auto-captioning and tag generation for photos
- Visual search
- Retail: stock monitoring, item identification at checkout
- Security video monitoring
- Facial recognition for authentication
- Robotics and self-driving vehicles

## Information Extraction
Information extraction uses AI to find information and unlock insights in unstructured data — scanned documents, forms, images, and audio/video recordings. Example: extracting serial numbers from images of computer
components to identify the source machine.

### How it works:
The foundation of most document analysis is OCR (optical character recognition) — a computer vision technology that identifies the location of text in an image

OCR is typically combined with an analytical model that interprets individual values and extracts specific fields— e.g., matching text from a receipt to fields in an expense claim.

Historically focused on text-based forms, but more advanced models now extract information from audio, images, and video too.

Common scenarios:
- Automated form/document processing in business workflows (e.g., expense claims)
- Large-scale digitization of paper records (e.g., census archives)
- Indexing documents for search
- Identifying key points and follow-up actions from meeting
transcripts/recordings

## Responsible AI
Responsible AI = considerations and guardrails for building AI systems that mitigate the risk of harmful, illegal, or offensive content generation or automated actions.

Content filters are one mechanism, but responsible AI must be considered from conception through design, implementation, and operation — not bolted on at the end.

The 6 principles:

| Principle | What it means |
| --- | --- |
| **Fairness** | Treats all groups equitably; avoids bias. |
| **Reliability & safety** | Works consistently and fails gracefully. |
| **Privacy & security** | Protects data and respects consent. |
| **Inclusiveness** | Works for people of all abilities. |
| **Transparency** | People understand how and why it decides. |
| **Accountability** | People remain answerable for outcomes. |

**Tip:** 
Examples mapped to principles (this is exactly how the exam tests it):
1. College admissions system tested to avoid demographic discrimination → **Fairness**

2. Robot only acts on objects when confidence is above a threshold → **Reliability & safety**

3. Airport facial ID deletes images when no longer needed; access restricted → **Privacy & security**

4. Speech agent also generates text captions for hearing-impaired users → **Inclusiveness**

5. Bank discloses AI use in loan approvals and describes the training data → **Transparency**
