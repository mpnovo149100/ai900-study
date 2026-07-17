---
title: Introduction to generative AI and agents
order: 2
categories: generative-ai
---
# Introduction to generative AI and agents

## Large Language Models (LLMs)

**Core idea**: LLMs (and their compact relatives, SLMs) encapsulate the linguistic and semantic relationships between words and phrases in a vocabulary, and use those relationships to reason over input and generate
relevant responses.

### How generation works:

LLMs are trained to generate completions based on **prompts**.
Think of them as a super-powerful version of phone predictive text: the prompt starts a sequence of text predictions

The trick: the model knows which words in the sequence so far most influence the next one, and uses that to predict the most probable continuation
The "I heard a dog...
" example — you can guess "bark" comes next because
you have:
1. A large vocabulary to draw from
2. Learned linguistic structures (how words relate in meaningful sentences)
3. Semantic understanding (something "heard" must be a sound; dogs make specific sounds)

Training a model replicates these three abilities.

**Tokenization** (step 1 of training):
LLMs don't work with words — they work with tokens: words, sub-words (like "un" in "unbelievable"), punctuation, and common character sequences

Training text is broken into distinct tokens, each assigned a unique integer ID (e.g., I=1, heard=2, a=3, dog=4...)

Repeated tokens reuse their existing ID ("a" stays 3)

More training data → more tokens added to the vocabulary

Modern LLMs have vocabularies of hundreds of thousands of tokens. 

## Transformers, Embeddings & Prediction
**1. From tokens to vectors**
After tokenization, each token has a numeric ID, but that says nothing about meaning.

The next step is to assign each token a vector — an array of numeric values (e.g., [1, 23, 45]). 

Each element of the vector is a dimension that can encode linguistic and semantic attributes of the token. In reality, these vectors have thousands of elements (the material uses 3 just so they can be visualized).

Two important details about the starting point:
The initial vector values are assigned randomly — meaning is learned during training, it doesn't come built in

Along with each vector, a positional encoding is fed in, indicating where the token appears in the sequence. This is necessary because word order is relevant to how tokens relate to one another ("the dog bit the man" ≠ "the man bit the dog")

**2. The transformer — two blocks**

**Encoder** — transforms the initial (random) vectors into embeddings: new vectors with linguistic and semantic characteristics embedded in them, based on the contexts in which the token appears in the training data. 

### How it does this:
The attention layer examines each token in turn and determines how much it's influenced by the tokens around it. 

Example from the material: when encoding "bark" in the context "I heard a dog bark", the tokens "heard" and
"dog" are assigned more weight than "I" or "a", because they're stronger indicators

The model doesn't "know" this at the start — it learns iteratively, as it's exposed to large volumes of text, which tokens commonly appear together (proximity + frequency of co-occurrence)

Multi-head attention makes the process more efficient: it evaluates multiple elements of the vector in parallel and assigns weights used to calculate the new element values

The results of the attention layer are fed into a fully connected neural network that finds the best vector representation for the embedding

**Decoder** — uses the embeddings calculated by the encoder to determine the next most probable token in a sequence started by a prompt. It also uses attention + a feed-forward network to make its predictions.

**3. Properties of embeddings**

They can be thought of as points in a multi-dimensional vector space

Because the dimensions are calculated from linguistic relationships, tokens used in similar contexts (and therefore with similar meanings) end up with vectors pointing in similar directions: "dog" and "puppy" point in more or less the same direction, not too far from "cat", but very different from "skateboard" or "car"

Semantic closeness between tokens is measured by calculating the cosine similarity of their vectors

**4. Predicting completions from prompts**

In the decoder, attention is used again, but with a restriction: the context can only include the tokens that precede the token being predicted.

Training: uses masked attention — the tokens after the current token are ignored/hidden. Since the full sequence is known during training, the transformer compares the predicted token to the actual next token and adjusts the learned weights in later iterations to reduce the error

Inference (new prediction): the attention layers calculate possible vectors for the next token, the feed-forward network helps determine the most probable candidate, the predicted token is added to the sequence, and the
whole process repeats — token by token — until the decoder predicts the sequence has ended

Example: "When my dog was a..." → the model evaluates the sequence so far, applies attention weights, and predicts "puppy" rather than "cat" or "skateboard"

## Prompts 

### What a prompt is
A prompt is simply the input you give an LLM to get a response — a question, a command, or even a casual comment to start a conversation. The model responds with a completion.

Two main types of prompts:
** 1. System prompt** — sets the behavior, tone, and constraints of the model.

Example: "You're a helpful assistant that responds in a cheerful, friendly manner." System prompts determine the constraints and style of the model's responses

**2. User prompt** — elicits a response to a specific question or instruction.
Example: "Summarize the key considerations for adopting generative AI in GenAI

The system prompt is usually set by the application that uses the model

User prompts are typically entered by a human in a chat app — or in some cases generated by the application on the user's behalf

The model responds to user prompts while obeying the overall guidance in the system prompt

## Conversation history
To keep a conversation consistent and relevant, generative AI apps track the conversation history and include summarized versions of it in subsequent prompts. 

This gives the model ongoing context to build on.

Example: after the model lists six GenAI adoption considerations, you follow up with "What are common privacy-related risks?". 

The new prompt includes the question plus the previous prompts and responses — so the model understands the question is about privacy risks in the context of GenAI
adoption, not privacy in general.

## Retrieval Augmented Generation (RAG)
RAG is a technique for adding even more context: the application retrieves information (documents, emails, etc.) and uses it to augment the prompt with relevant data. The model's response is then grounded in the information
provided.

The material's example walks through it well:

**Prompt without RAG**: "What's the maximum I can claim for travel expenses on a business trip?" → the model gives a generic answer (probably "consult your organization's expenses policy")

**With RAG**: the expenses assistant app first queries the organization's expenses policy documentation, retrieves the sections related to "travel expenses", and includes the retrieved content in the prompt along with the original question → the model now has the policy as context and
responds with a relevant, specific answer

Tips for better prompts:
1. Be clear and specific — explicit instructions or questions beat vague language
2. Add context — mention the topic, audience, or format you want
3. Use examples — if you want a certain style, show what you mean
4. Ask for structure — bullet points, tables, numbered lists
Well-designed prompts make a huge difference to results, independently of the model used.

## AI Agents 

### What agents are
Agents are software applications built on generative AI that go beyond answering questions — they actually get things done. 
Specifically, agents can:
- Reason over and generate natural language
- Automate tasks by using tools
- Respond to contextual conditions to take appropriate action

The three key components of an AI agent:
**1. A large language model** — the agent's "brain"; provides the generative AI for language understanding and reasoning.

**2. Instructions** — a system prompt that defines the agent's role and behavior. Think of it as the agent's "job description". 

**3. Tools** — what the agent uses to interact with the world. 
Two categories:
- Knowledge tools — provide access to information: search engines, databases
- Action tools — enable the agent to perform tasks: sending emails, updating calendars, controlling devices


With these three capabilities, agents can act as digital assistants that intelligently automate tasks and collaborate with users.

## Multi-agent systems
Instead of one agent doing everything, multiple agents can collaborate — each with its own specialty. The material's example:
- One agent gathers data
- Another analyzes it
- A third takes action

Together they form an "AI-powered workforce" handling complex workflows, like a human team.

**How they coordinate**: agents communicate with each other through prompts, using generative AI to determine what tasks are required and which agent is responsible for each one.
