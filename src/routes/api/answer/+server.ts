import { OPENAI_API_KEY } from '$env/static/private'
import OpenAI from 'openai'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }) {
  const threadId = url.searchParams.get('threadId')
  const runId = url.searchParams.get('runId')

  if(!threadId || !runId) {
    return new Response('runId and threadId are required', {status: 400})
  }

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  })

  let results = await openai.beta.threads.runs.retrieve(threadId, runId);

  if(results.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      threadId
    );
    return new Response(JSON.stringify(messages.data))
  } else if(results.status === 'in_progress' || results.status === 'queued') {
    return new Response(undefined, {status: 202})
  }

  return new Response('Nothing found', {status: 404})
}
