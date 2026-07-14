# AI-900 · Plataforma de estudo de perguntas

App estática (Vite + React) para estudar perguntas do exame **Microsoft AI-900 (Azure AI Fundamentals)**.
As perguntas vivem numa DB JSON versionada no git; o progresso de cada pessoa fica em `localStorage`.

## Como funciona

1. As perguntas estão em [`src/data/questions.json`](src/data/questions.json) — a "DB".
2. Cada pergunta está classificada num dos 5 domínios oficiais do AI-900.
3. Na app: escolhes um modo (todas / por categoria / rever erradas), respondes com feedback imediato, e no fim vês um **relatório por categoria** com as **matérias a rever**.

## Correr localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run validate # valida a DB
npm run build    # gera dist/ (estático)
```

## Deploy (GitHub Pages)

Faz push para `main`. O workflow em `.github/workflows/deploy.yml` valida a DB, faz build e publica.
Ativa uma vez em **Settings → Pages → Source: GitHub Actions**.

## Adicionar perguntas

Cada pergunta em `questions.json`:

```json
{
  "id": "q004",
  "category": "nlp",
  "subtopic": "Análise de sentimento",
  "type": "single",
  "prompt": "Texto da pergunta...",
  "options": [
    { "id": "a", "text": "Opção A" },
    { "id": "b", "text": "Opção B" }
  ],
  "correct": ["a"],
  "explanation": "Porquê a resposta certa.",
  "source": "opcional"
}
```

- `category`: `ai-workloads` | `machine-learning` | `computer-vision` | `nlp` | `generative-ai`
- `type`: `single` (1 resposta) | `multi` (várias) | `truefalse`
- `correct`: lista de `id`s de opções corretas.

> Fluxo recomendado: cola a pergunta + resposta certa no chat com o Claude; ele estrutura, classifica no domínio AI-900 e acrescenta à DB.
