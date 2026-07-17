---
title: Introduction to computer vision concepts
order: 5
categories: computer-vision
---

# Introduction to computer vision concepts

## Computer vision tasks and techniques

Computer vision = the range of tasks and techniques where AI processes **visual
input** (images, videos, live camera streams). A well-established AI field whose
techniques have evolved significantly. This progression — from simplest to most
sophisticated — uses a **grocery store checkout** as the running example.

### 1. Image classification (one of the oldest techniques)

A model trained with a large number of labeled images predicts a **text label**
based on an image's contents.

- **Grocery scenario:** customer places produce on a scale, a camera-connected app
  identifies the type (apple, orange, banana) and charges by weight.
- **Requirements:** training with a large volume of images, each labeled with the
  correct name → the model learns to use visual features to predict the image's
  main subject.
- **Limitation:** one label for the whole image — works when there's a single subject.

### 2. Object detection

The more sophisticated need: scan multiple items at once and identify each one.

- Object detection models examine **multiple regions** of an image to find
  individual objects and their locations.
- The prediction includes: **which** objects were detected + **where** they appear,
  indicated by the coordinates of a rectangular **bounding box**.

### 3. Semantic segmentation

Even more sophisticated: the model finds objects and **classifies individual
pixels** based on the object they belong to.

- **Result:** a much more precise prediction of object locations than bounding boxes.

### 4. Contextual image analysis (the latest evolution)

**Multimodal models** trained to find contextual relationships between objects in
images and the text that describes them.

- **Result:** the ability to **semantically interpret** an image — what objects and
  activities it depicts — and generate descriptions or suggest relevant tags.
- Example caption: "A person eating an apple" — note it captures an
  **activity/relationship**, not just "person" + "apple" as separate detections.

## Images and image processing

### How a computer sees an image

To a computer, an image is an **array of numeric pixel values**. The number of
rows × columns is the image's **resolution** (e.g., a 7×7 array = a 7×7 pixel
image).

**Grayscale images:**

- A **single two-dimensional layer** of pixel values (rows and columns / x and y
  coordinates).
- Each pixel has a value from **0 (black) to 255 (white)**, with in-between values
  as shades of gray.

**Color images:**

- Most digital images are multidimensional, with **three layers called channels**:
  **Red, Green, Blue (RGB)**.
- Each channel is its own array of 0–255 values; the combination determines the color.
- From the example: **purple** = R:150, G:0, B:255; **yellow** = R:255, G:255, B:0.

### Filters and convolutional filtering

A common way to process images: apply **filters** that modify pixel values to
create a visual effect. A filter is defined by one or more arrays called **filter
kernels** — e.g., a 3×3 kernel:

```
-1 -1 -1
-1  8 -1
-1 -1 -1
```

**How convolution works, step by step:**

1. Place the kernel over the top-left 3×3 patch of the image.
2. Multiply each pixel value by the corresponding kernel weight and **sum the
   results** (a weighted sum) — e.g., the worked example produces −255 for the
   first patch.
3. The result becomes one value in a **new array**.
4. Slide the kernel one pixel to the right and repeat (next result: −510).
5. Continue until the kernel has been **convolved across the entire image**.

Two practical adjustments:

- Some resulting values fall outside 0–255, so they're **adjusted to fit the range**.
- The kernel shape means the **outer edge of pixels can't be calculated** → a
  **padding value (usually 0)** is applied.

The new array is a **transformed image**. This process is called **convolutional
filtering**.

**The Laplace filter** — the specific kernel above — has the effect of
**highlighting the edges** of shapes in an image. Other filter types create
**blurring, sharpening, color inversion**, and other effects.

## Convolutional Neural Networks (CNNs)

### The bridge from image processing

Filters are useful for image processing (visual effects, like in editing
software), but computer vision's goal is to **extract meaning** from images —
which requires ML models trained to **recognize features** from large volumes of
existing images.

### What a CNN is

A **convolutional neural network** is one of the most common ML architectures for
computer vision — a type of **deep learning** architecture. The core idea:

- CNNs use **filters to extract numeric feature maps** from images.
- The feature values are then fed into a **deep learning model** to generate a
  **label prediction**.
- In image classification, the label = the main subject (train with labeled fruit
  images → model predicts apple/banana/orange).

**The key twist vs. classic image processing:** there, filter kernels are
hand-defined (like the Laplace edge filter). In a CNN, kernels start with
**randomly generated weights**, and during training the predictions are evaluated
against known labels and the **filter weights are adjusted to improve accuracy**.
The trained model ends up with the filter weights that **best extract the features
that distinguish the classes** — the model learns which features matter.

### The five-step architecture (for image classification)

1. **Labeled images** are fed in for training (e.g., 0: apple, 1: banana, 2: orange).
2. **Convolutional filter layers** extract features from each image, generating
   arrays called **feature maps** (kernels start random). Additional layers may
   **"pool" or downsize** the feature maps into smaller arrays that emphasize the
   key visual features.
3. Feature maps are **flattened** into a single one-dimensional array of feature values.
4. The feature values feed into a **fully connected neural network**.
5. The **output layer** uses **softmax** (or similar) to produce a **probability
   value per class** — e.g., [0.2, 0.5, 0.3].

**How training works:**

- Output probabilities are compared to the actual label — a banana (class 1)
  should ideally be **[0.0, 1.0, 0.0]**.
- The difference between predicted and actual = the **loss**.
- The weights in the fully connected network **and the filter kernels** are
  modified to **reduce the loss**.
- This repeats over multiple **epochs** until an optimal set of weights is learned;
  the weights are saved and the model can predict labels for **new, unlabeled images**.

**Note:** real CNN architectures have **multiple convolutional layers** plus extra
layers to reduce feature map size and constrain values — the example is simplified
to the key concept: **filters extract numeric features → neural network predicts
labels**.

## Vision Transformers and multimodal models

### CNNs — the established base

CNNs have been the core of computer vision for years. Beyond image classification,
they're also the basis for more complex models — e.g., **object detection models
combine CNN feature extraction layers with the identification of regions of
interest** to locate multiple object classes in one image. Decades of CV advances
were driven by CNN improvements.

### Transformers in language (quick recap)

Transformers process huge volumes of data, encoding language tokens as
**vector-based embeddings**, with **attention** assigning values that reflect how
each token is used in the context of others. Tokens used in similar contexts →
vectors more closely aligned. This semantic language model enables text analysis,
translation, generation, etc.

### Vision Transformers (ViT) — the same idea, applied to images

The transformer approach was so successful in NLP that researchers applied it to
image data. In a **vision transformer**:

- Instead of encoding text tokens, the model **extracts patches of pixel values**
  from the image and generates a **linear vector** from each patch.
- The **same attention technique** determines contextual relationships — but
  **between patches** instead of tokens.
- The key difference: embedded values are based on **visual features** — color,
  shape, contrast, texture — not linguistic characteristics.
- **Result:** embedding vectors forming a multidimensional **"map" of visual
  features** based on how they commonly appear in training images.

The semantic principle carries over: visual features used in similar contexts get
**similar vector directions**. Example: features common in a **hat** end up
contextually related to features common in a **head**, because the two are often
seen together. **Important nuance:** the model has no understanding of what a "hat"
or "head" *is* — it infers a semantic relationship between visual characteristics.

### Multimodal models — bringing it together

- A language transformer creates a **linguistic vocabulary** (semantic
  relationships between words).
- A vision transformer creates a **visual vocabulary** (same, for visual features).
- When training data includes **images with associated text descriptions**, the
  encoders from both can be combined into a **multimodal model**, using
  **cross-modal attention** to define a **unified spatial representation** of the
  embeddings — one shared vector space for language and visual features.

**What this enables:** the model can discern semantic relationships between
language and visual features — and so **predict complex descriptions for images it
has never seen**, by recognizing visual features and **searching the shared vector
space for the associated language**. Hence the caption example: "A person in a park
with a hat and a backpack."

## Image generation

### The connection to multimodal models

The same multimodal architecture that lets AI describe images in natural language
also works **in reverse**: by identifying the **visual features associated with
language**, an image synthesis model can take a text description and **generate**
the image or video it describes. (Same shared vector space — but instead of
image → text, it's text → image.)

### Diffusion — how modern image generation works

Most modern image-generation models use **diffusion**:

1. The **prompt identifies a set of related visual features** that can be combined
   into an image.
2. Generation is **iterative**: it starts from a **random set of pixel values**
   (pure noise).
3. The model progressively **removes "noise" to create structure**.
4. After each iteration, the model **evaluates the image so far against the prompt**.
5. Iterations continue until the final image depicts the desired scene.

Example: "A dog carrying a stick in its mouth" → the diffusion process refines from
noise, iteration by iteration, into the described scene.

### Video generation

Some models apply a similar process to video — same technique for mapping language
tokens to visual features, but with two additional factors:

1. **Physical behavior of real-world objects** — e.g., ensuring a dog walks with
   its feet on the ground.
2. **Temporal progression** — the video must depict a **logical sequence of
   activity** across frames.
