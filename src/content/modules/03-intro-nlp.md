---
title: Introduction to natural language processing concepts
order: 3
categories: nlp
---

# Introduction to natural language processing concepts

## Text analysis

### What it is

Text analysis is a **subset of NLP** that enables machines to extract
**meaning, structure, and insights from unstructured text**. Organizations use
it to turn customer feedback, support tickets, contracts, and social media posts
into **actionable intelligence**.

### Evolution of the techniques

The techniques evolved over many years, from **simple statistical calculations
based on term frequency** to **vector-based language models that encapsulate
semantic meaning**.

> Keep this progression in mind — the next units will likely walk through it:
> frequency counts → TF-IDF → embeddings.

### Common use cases

1. **Language detection** — determining which language(s) the text is written in;
   often the **first step** in a multi-step text processing workflow.
2. **Key term extraction** — identifying important words and phrases to determine
   the **topics and themes** discussed.
3. **Entity detection** — identifying **named entities**: places, people, dates,
   organizations.
4. **PII detection** — identifying **and redacting** personal details: names,
   addresses, phone numbers, financial account details, and other sensitive
   information.
5. **Text classification** — categorizing documents by content; example: filtering
   email as **spam or not spam**.
6. **Sentiment analysis** — a **particular form of text classification** that
   predicts sentiment; example: categorizing social media posts as positive,
   neutral, or negative.
7. **Text summarization** — reducing text volume while retaining the salient
   points; example: a one-paragraph summary of a multi-page document.

**Why it's hard:** language is complex and computers struggle to understand it —
all text analysis techniques ultimately exist to solve the same problem:
**extracting meaning from natural language text**.

## Tokenization

### The basics

The first step in analyzing a body of text (called a **corpus**) is breaking it
down into **tokens**. For simplicity, think of each distinct word as a token —
though in reality tokens can be partial words or combinations of words and
punctuation.

**Example** — "We choose to go to the moon" becomes tokens with numeric IDs:
We (1), choose (2), to (3), go (4), the (5), moon (6). Note that "to" appears
twice but keeps the **same ID (3)** — repeated tokens reuse their identifier.

With each token assigned a discrete value, you can **count token frequency** to
find the most commonly used terms — which helps identify the **main subject** of
the text.

### Pre-processing techniques

Applied depending on the analysis problem:

| Technique | What it does | Key detail / example |
| --- | --- | --- |
| **Text normalization** | Remove punctuation, convert to lowercase before tokenizing | Improves performance for frequency-based analysis, but can lose semantic meaning: *"Mr Banks has worked in many banks"* — normalization erases the distinction between the person **Banks** and the **banks** he worked in. Also, "banks." with a period carries the information that the word ends a sentence. |
| **Stop word removal** | Exclude words like "the", "a", "it" | They make text readable for humans but add little semantic meaning; removing them helps the analysis focus on important words. |
| **N-gram extraction** | Treat multi-word phrases as units | **Unigram** = 1 word, **bigram** = 2 ("artificial intelligence"), **trigram** = 3 ("natural language processing"). Considering frequent word sequences as groups helps the algorithm make better sense of the text. |
| **Stemming** | Consolidate words by stripping endings ("s", "ing", "ed") | "powering", "powered", "powerful" → all counted as **"power"**. Mechanical chopping — the result may not be a real word. |
| **Lemmatization** | Reduce words to their base/dictionary form (lemma) | Unlike stemming, uses linguistic rules and vocabulary to guarantee a valid word: "running" → "run", "global" → "globe". |
| **POS tagging** (parts of speech) | Label each token with its grammatical category (noun, verb, adjective, adverb) | Uses linguistic rules and often statistical models, based on the token and its context in the sentence. |
