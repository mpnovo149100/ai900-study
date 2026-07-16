---
title: Generative AI
order: 5
categories: generative-ai
---

# Generative AI

> Replace this starter content with your own Word summary for this module.

## Core ideas

- **Generative vs discriminative:** discriminative AI *classifies* existing
  content; generative AI *creates* new content.
- **Tokens:** models charge **per token** (input + output), so prompt and
  response length drive cost.
- **Image generation** is **non-deterministic** — the same prompt can produce
  different (thematically similar) images.

## Microsoft Foundry

- **Portal** — explore, deploy, and test models in the playground.
- **SDK** — build apps that call deployed models with secure auth.
- **Prompts** — system instructions set durable behaviour; user messages carry
  the request.
- **Agents & tools** — code interpreter, file search, custom functions extend a
  model beyond text.
- **Content Safety** — configurable filters block harmful prompts and outputs.

## Building safely

Validate inputs and outputs, protect credentials, handle throttling/errors with
retries, and keep a human in the loop for high-impact decisions.
