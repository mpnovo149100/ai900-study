---
title: Introduction to AI-powered information extraction concepts
order: 6
categories: computer-vision
---

# Introduction to AI-powered information extraction concepts

## Information extraction scenarios

AI information extraction = extracting **structured data fields** from
**unstructured media** — documents and images primarily, though emerging
solutions also use speech recognition and other techniques to extract from
**video and audio**.

Scenarios range from simple (reading contact info from a **business card photo**)
to highly complex (**business workflow automation** analyzing financial and legal
documents).

### The scenario catalogue — what each document type yields

**Financial document processing:**

- **Invoices** → vendor information (names, addresses, contacts); transaction
  details (invoice numbers, dates, payment terms); line items (descriptions,
  quantities, unit prices, totals); tax information (rates, amounts, exempt items).
- **Receipts** → merchant details (store, location, transaction IDs); purchase
  information (items, prices, discounts); payment details (methods, change,
  loyalty points).
- **Financial statements** → account information (numbers, balances, histories);
  performance metrics (revenue, expenses, margins); compliance data (regulatory
  fields, audit trails).

**Legal and compliance:**

- **Contracts** → party information (contracting parties, signatories, witnesses);
  terms and conditions (effective dates, renewal terms, termination clauses);
  financial terms (payment schedules, penalties, insurance requirements).
- **Regulatory forms** → tax documents (W-2s, 1099s); insurance forms (policy
  numbers, claim amounts, incident details); government forms (application data,
  certifications).

**Healthcare documentation:**

- **Medical records** → patient information (demographics, record numbers,
  insurance); clinical data (diagnoses, treatments, medication lists, vital signs);
  administrative data (appointments, billing codes, providers).

**Supply chain and logistics:**

- **Shipping documents** → shipment details (tracking numbers, weights,
  dimensions); addresses (sender/recipient, delivery instructions); customs
  documentation (commodity codes, values, origin).
- **Purchase orders** → vendor information; product specifications (item codes,
  descriptions, quantities); delivery requirements (schedules, locations, special
  instructions).

The closing point: information extraction is the **foundation of workflow
automation systems** for these scenarios and many more.

## Overview of information extraction

### The two-step process

Information extraction is a workload that **combines multiple AI techniques**:

1. **Text detection and extraction** from image-based data — using **OCR**
   (computer vision).
2. **Value identification and mapping** — from the OCR results to specific
   **data fields**, using machine learning or, increasingly, **generative AI** to
   semantically map the extracted text.

The expense claim example makes it concrete: a scanned receipt → OCR gets the raw
text → the mapping step turns it into structured fields (Vendor: Fourth Coffee;
Date: 2024-08-15; Subtotal: $6.48; Tax: $0.49; Total: $6.97).

### Choosing the right approach — two groups of considerations

**1. Document characteristics** (the documents are the basis of the whole solution):

- **Layout consistency** — standardized forms favor **template-based approaches**;
  multiple formats and layouts require a more complex **ML-based solution**.
- **Volume requirements** — high-volume processing benefits from automated ML
  models on optimized hardware.
- **Accuracy requirements** — critical applications might need
  **human-in-the-loop validation**.

**2. Technical infrastructure requirements and constraints:**

- **Security and privacy** — documents may contain sensitive/confidential data;
  the solution needs secure access and compliance with industry requirements for
  protected data.
- **Processing power** — deep learning and generative AI models require
  significant computational resources.
- **Latency** — real-time processing might limit model complexity.
- **Scalability** — cloud-based solutions handle variable workloads better.
- **Integration complexity** — API compatibility and data format requirements.

**The services tip:** the material points to **Azure Document Intelligence in
Microsoft Foundry Tools** and **Azure Content Understanding in Microsoft Foundry
Tools** as the ready-made foundations — greatly reducing development effort while
providing scalable, proven accuracy and integration.

## OCR

### What OCR is

OCR automatically converts **visual text in images** into **editable, searchable
text data** — from scanned invoices/receipts, photos of documents, PDFs containing
text images, screenshots, forms, and handwritten notes.

### The five-stage OCR pipeline

**Stage 1: Image acquisition and input**

- The image enters the system: smartphone photo, scanned document, a **frame
  extracted from a video stream**, or a PDF page rendered as an image.
- Key point: **image quality at this stage significantly impacts final accuracy**
  (garbage in, garbage out).

**Stage 2: Preprocessing and image enhancement** — optimize the image before
detection:

| Technique | Purpose | Methods (classical → ML) |
| --- | --- | --- |
| **Noise reduction** | Remove artifacts, dust, scanning imperfections | Gaussian/median filters, morphological ops → denoising autoencoders, CNNs. |
| **Contrast adjustment** | Sharpen the text/background difference | Histogram equalization, adaptive thresholding, gamma correction → deep models learning enhancement parameters. |
| **Skew correction** | Detect and fix document rotation so lines are horizontal | Hough transform, projection profiles → regression CNNs predicting rotation angles. |
| **Resolution optimization** | Adjust resolution for the recognizers | Bicubic/bilinear/Lanczos interpolation → super-resolution GANs/residual networks. |

**Stage 3: Text region detection** — find where the text is:

- **Layout analysis** — distinguish text regions from images, graphics, white
  space (connected components → segmentation networks like U-Net, Mask R-CNN,
  LayoutLM).
- **Text block identification** — group characters into **words, lines,
  paragraphs** by spatial relationships.
- **Reading order determination** — the sequence text should be read
  (left-to-right, top-to-bottom for English).
- **Region classification** — identify region types: headers, body text, captions,
  tables.

**Stage 4: Character recognition and classification** — the core of OCR:

- **Feature extraction** — analyze each character's shape, size, distinctive
  characteristics (statistical features like loops/endpoints → CNNs learning
  features from raw pixels).
- **Pattern matching** — compare features against trained models covering
  different fonts, sizes, writing styles (template matching, HMMs/SVMs, CNNs,
  ResNet-class architectures).
- **Context analysis** — use surrounding characters/words to improve accuracy:
  **dictionary lookups and language models** (n-grams, Levenshtein edit distance
  for correction, transformer models, attention).
- **Confidence scoring** — probability per recognized character (Bayesian
  approaches, softmax outputs, ensembles).

**Stage 5: Output generation and post-processing:**

- **Text compilation** — assemble characters into words and sentences.
- **Format preservation** — keep paragraphs, line breaks, spacing (geometric rules
  → layout models like LayoutLM).
- **Coordinate mapping** — record the **exact position of each text element** in
  the original image.
- **Quality validation** — spelling/grammar checks to catch recognition errors
  (dictionaries, statistical models, neural models fine-tuned for OCR correction).

## Field extraction and mapping

### The distinction that frames everything

**OCR tells you what text exists in a document; field extraction tells you what
that text means and where it belongs in your business systems.** This is stage 2
of the two-step split from the overview, now expanded into its own five-stage
pipeline.

### Stage 1: OCR output ingestion

Field extraction consumes the OCR pipeline's structured output:

- **Raw text content** — the extracted characters and words.
- **Positional metadata** — bounding boxes, page locations, reading order.
- **Confidence scores** — per text element.
- **Layout information** — structure, line breaks, paragraph boundaries.

Key note: field extraction relies heavily on **where text appears, not just what
it says** — the position of "12345" determines whether it's an invoice number,
customer ID, or phone number.

### Stage 2: Field detection and candidate identification

Three approaches (used independently or combined):

1. **Template-based detection** — rule-based pattern matching: predefined layouts
   with known field positions and **anchor keywords**; label-value searches
   ("Invoice Number:", "Total:"); regular expressions.
   - **Pro:** high accuracy for known document types, fast, explainable.
   - **Con:** manual template creation; breaks with layout variations or naming
     inconsistencies.
2. **Machine learning-based detection** — train a model on a corpus of example
   documents to learn field relationships. **Transformer-based models excel** at
   applying contextual cues. Training approaches: supervised (labeled field
   locations), self-supervised (pre-trained on large document corpora), multi-modal
   (text + visual + positional features). Architectures: GNNs (spatial
   relationships as graphs), attention, sequence-to-sequence.
3. **Generative AI / schema-based extraction** — the recent LLM-driven approach:
   - **Prompt-based extraction** — give the LLM the document text + a **schema
     definition**; it matches text to schema fields.
   - **Few-shot learning** — custom fields with minimal examples.
   - **Chain-of-thought reasoning** — step-by-step field identification logic.

### Stage 3: Field mapping and association

Attach candidates to schema fields:

- **Key-value pairing** (discrete values like vendor, date, total):
  - Proximity analysis — spatial clustering, reading order, geometric relationships
    (alignment, indentation).
  - Linguistic pattern recognition — **NER** (dates, amounts, names), POS tagging,
    dependency parsing.
- **Tables and structured content** (e.g., line items with name/price/quantity
  columns):
  - Detecting tables: specialized CNNs, object detection adapted to cells,
    graph-based parsing.
  - Mapping cells: **row-column association, header detection** (column headers
    reveal field meanings), hierarchical processing (nested tables, sub-totals).
- **Confidence scoring and validation:**
  - Inherited **OCR confidence**; pattern matching confidence; **context
    validation** (does the value make sense here?); **cross-field validation** —
    e.g., verifying that **line item subtotals sum to the invoice total** (the
    memorable example).

### Stage 4: Data normalization and standardization

- **Date normalization** — detect formats (MM/DD/YYYY vs DD-MM-YYYY), convert to
  ISO, resolve ambiguity.
- **Currency/numeric** — currency symbols, thousand separators, decimal
  conventions across locales, unit conversion.
- **Text** — case normalization, encodings, abbreviation expansion.
- Plus validation: **rule-based** (format/range/required-field checks) and
  **statistical** (outlier detection, distribution analysis, cross-document
  consistency).

### Stage 5: Integration with business processes and systems

- **Schema mapping** — align extracted fields with downstream systems: database
  columns, API payloads, message queues; involving field renaming, data type
  conversion, conditional business rules.
- **Quality metrics and reporting** — field-level confidence scores,
  document-level quality assessment, error categorization.
