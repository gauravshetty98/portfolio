# portfolio

## Chatbot (GauravGPT)

The portfolio chat uses a Next.js API route at `/api/chat` with OpenAI (GPT-4o mini) and tool calls over your `src/data/*` content.

**Local development**

1. Copy `.env.example` to `.env.local`
2. Set `OPENAI_API_KEY` from [OpenAI API keys](https://platform.openai.com/api-keys)
3. Run `npm run dev` and use the site chat widget

**Optional env (chat links)**

- `NEXT_PUBLIC_SITE_URL` — public site root (no trailing slash). Chat tool payloads include section and project URLs; set this if links should not rely on `VERCEL_URL`.
- `NEXT_PUBLIC_GITHUB_FILE_BASE` — e.g. `https://github.com/you/repo/blob/main` so tool payloads can include `viewOnGithub` links to the `src/data/*` files.

**Vercel**

In the project: **Settings → Environment Variables →** add `OPENAI_API_KEY` (Production, Preview, and/or Development as needed), then redeploy.

In the [OpenAI dashboard](https://platform.openai.com/), set a **monthly spend cap** under **Settings → Billing → Usage limits** so unexpected traffic cannot run up a large bill.
