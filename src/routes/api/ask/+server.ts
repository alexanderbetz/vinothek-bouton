import { OPENAI_API_KEY } from '$env/static/private'
import OpenAI from 'openai'

/** @type {import('./$types').RequestHandler} */
export async function POST({ url, request }) {
  const query = (await request.json()).q

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  })

  const thread = await openai.beta.threads.create()

  await openai.beta.threads.messages.create(thread.id, { content: query, role: 'user' })

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: 'asst_ZSdXzdQ8pqu50jtGezbmIuV2'
  })

  return new Response(JSON.stringify({ threadId: thread.id, runId: run.id }))
}
