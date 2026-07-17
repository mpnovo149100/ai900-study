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

## Statistical text analysis

### Frequency analysis

The most obvious approach: after tokenizing, normalizing, and lemmatizing,
**count how many times each term appears**. The assumption is that frequently
used terms indicate the document's subjects or themes.

In the material's example (a text about AI in business), the top terms after
processing were: ai (4), business (3), benefit (2), customer (2), decision (2),
market (2) — correctly suggesting the document is about **AI and its business
benefits**.

### TF-IDF (Term Frequency – Inverse Document Frequency)

**The problem it solves:** simple frequency works for a single document, but
fails when you need to differentiate documents within the same corpus. In the
two samples about Copilot Studio and Microsoft Foundry, the top frequent terms
were the same in both ("agent", "microsoft", "ai") — they tell you the shared
theme, but nothing about what makes each document distinct.

**The idea:** a term is relevant to a document if it appears **often in that
document but rarely across the rest of the collection**.

The three-step calculation:

- **TF (Term Frequency)** — how many times the word appears in the document.
  E.g., "agent" appears 6 times → `tf(agent) = 6`.
- **IDF (Inverse Document Frequency)** — how rare the word is across all
  documents: `idf(t) = log(N / df(t))`, where **N** = total documents and
  **df(t)** = documents containing term *t*. If a word appears in every document,
  it's not special.
- **TF-IDF = TF × IDF** — `tfidf(t, d) = tf(t, d) × log(N / df(t))`.

Interpreting scores:

- **High TF-IDF** → word appears often in one document but rarely in others →
  **discriminative**.
- **Low TF-IDF** → word is common across many documents.

**Key detail from the example:** "AI", "Microsoft", and "agent" appear in both
samples (N=2, df=2), so their `IDF = log(2/2) = 0` — they carry **zero
discriminative weight**. After TF-IDF, the distinctive terms emerged:
Sample A → "copilot", "studio", "declarative"; Sample B → "code", "develop",
"foundry" — now you can tell what each document is specifically about.

### Bag-of-words + machine learning

**Bag-of-words** = a feature extraction technique that represents text as a
**vector of word frequencies/occurrences**, ignoring grammar and word order.

That vector becomes the input for ML algorithms like **Naive Bayes** — a
probabilistic classifier that applies Bayes' theorem to predict a document's
probable class based on word frequency.

Examples:

- **Spam filtering** — "miracle cure", "lose weight fast", "anti-aging" appear
  more frequently in spam; a trained model flags messages containing them.
- **Sentiment analysis** — same method: bag-of-words provides the features, the
  model estimates probabilities and assigns labels like "positive"/"negative".

### TextRank

An **unsupervised, graph-based** algorithm that models text as a network of
connected nodes — applying the same principle as Google's **PageRank** (which
ranks pages by links) to text. Key idea: a sentence is important if it's similar
to many other important sentences.

The three steps:

- **Build a graph** — each sentence = a node; edges are weighted by similarity
  (word overlap or cosine similarity between sentence vectors).
- **Calculate ranks iteratively** — each node's score depends on the scores of
  the nodes connected to it (with a damping factor *d*, typically **0.85**).
- **Extract top-ranked sentences** — after convergence, the highest-scoring
  sentences form the summary.

In the cloud computing example, sentences 1, 3, and 5 scored highest because they
connect well to other sentences through shared terminology, producing the summary.

**Extractive vs. abstractive summarization** (exam gold):

- **Extractive** — selecting the most relevant sentences; no new text is
  generated, the summary is a **subset of the original**. This is what TextRank does.
- **Abstractive** — **new language is generated** to summarize the key themes
  (enabled by more recent semantic modeling / generative AI).

TextRank can also work at **word level** for keyword extraction: words become
nodes, edges represent co-occurrence within a fixed window, top-ranked words = key terms.

## Semantic language models

### The evolution

As NLP advanced, models emerged that encapsulate the **semantic relationship
between tokens** — deep learning language models. At their heart: encoding tokens
as vectors called **embeddings**.

The progression to keep in mind:

1. **Word2Vec and GloVe** made the vector approach common — tokens represented as
   **dense, multi-dimensional vectors**, with dimension values assigned during
   training to reflect each token's semantic characteristics based on usage in the
   training text. The mathematical relationships between vectors made text analysis
   **more efficient than purely statistical techniques**.
2. The more recent advance: **attention** — considering each token in context by
   calculating the influence of surrounding tokens. The resulting **contextualized
   embeddings** (as in the **GPT family**) are the basis of modern generative AI.

### Representing text as vectors

Vectors are points in multidimensional space — each describes a **direction and
distance from the origin**. The core principle: **semantically similar tokens →
vectors with similar orientation** (pointing in similar directions).

In the example set: "dog" `[0.8, 0.6, 0.1]` and "cat" `[0.7, 0.5, 0.2]` are
similar (domestic animals); "puppy" and "kitten" are similar (young animals);
"tree", "young", "ball" point in distinctly different directions.

### Finding related terms — cosine similarity

The formula: **`cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)`** — dot
product divided by the product of magnitudes.

The worked "odd one out" example (dog, cat, tree):

- dog ↔ cat: **0.992** (high similarity)
- dog ↔ tree: **0.333** (low)
- cat ↔ tree: **0.452** (low)
- → **tree is the odd one out**

### Vector arithmetic (translation)

You can add/subtract vectors and search for the token whose vector matches the result:

- **dog + young = puppy** (`[0.8, 0.6, 0.1] + [0.1, 0.1, 0.3] = [0.9, 0.7, 0.4]`)
- **cat + young = kitten**
- And in reverse: **puppy − young = dog**, **kitten − young = cat**

This works because the vector for "young" encodes the **semantic transformation**
from adult animal to its young counterpart. **Important caveat:** in practice,
arithmetic rarely produces exact matches — you search for the **closest (most
similar) vector** to the result.

### Analogical reasoning

Vector arithmetic answers analogies: "puppy is to dog as kitten is to ?" →
calculate **`kitten − puppy + dog = [0.7, 0.5, 0.2] = cat`**. (This is the famous
**"king − man + woman = queen"** pattern.)

### Applying semantic models to text analysis tasks

| Task | How embeddings enable it |
| --- | --- |
| **Text summarization** | Encode each sentence as a vector (averaging/pooling its word embeddings); extract the sentences most central to the document's meaning → extractive summary. |
| **Keyword extraction** | Compare each word's embedding to the document's overall semantic representation; the most similar/central words are the key terms. |
| **Named entity recognition** | Fine-tune models so similar entity types cluster together in vector space; at inference, examine each token's embedding + context to determine if/what entity it is. |
| **Text classification** | Represent documents as aggregate vectors (e.g., mean of word embeddings); use as features for ML classifiers, or compare to class prototype vectors — similar documents have similar orientations. |
