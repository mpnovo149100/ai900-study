# Study modules

Each `.md` file here is **one study module** shown in the **Study** tab.
Drop your Word-summary content into a file per module and it renders in the app.

## File format

Start each file with a small frontmatter block, then write normal Markdown:

```md
---
title: Computer Vision
order: 3
categories: computer-vision
---

# Computer Vision

Your notes here. Headings, **bold**, lists, tables, `code`, etc. all render.
```

Frontmatter fields:

- `title` — name shown in the module list (falls back to the first `# Heading`).
- `order` — sort order in the list (number).
- `categories` — comma-separated exam domains this module covers. Used to link a
  wrong quiz answer to the right module. Valid values:
  `ai-workloads`, `machine-learning`, `computer-vision`, `nlp`, `generative-ai`.

The filename (without `.md`) is the module **slug** used in links.

## Making it "pretty" with OpenAI (optional, local)

The site is static, so it can't call OpenAI in the browser. Instead, run the
polisher locally with your own key — it cleans up a raw/exported note into a
well-structured module and writes it back here:

```bash
export OPENAI_API_KEY=sk-...
npm run polish -- path/to/raw-notes.md computer-vision
```

Then commit the generated file. The app just renders the committed Markdown.
