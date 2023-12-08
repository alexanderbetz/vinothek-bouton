import OpenAI from 'openai'
import { error } from '@sveltejs/kit'
import { OPENAI_API_KEY} from '$env/static/private'

/** @type {import('./$types').RequestHandler} */
export async function POST({ url, request }) {
  const query = (await request.json()).q

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  })

  const thread = await openai.beta.threads.create()

  await openai.beta.threads.messages.create(thread.id, {content: query, role: 'user'})

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: 'asst_ZSdXzdQ8pqu50jtGezbmIuV2',
  })

  let results
  do {
      results = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );
      console.log(results.status)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } while(results.status !== 'completed')

  const messages = await openai.beta.threads.messages.list(
    thread.id
  );

  return new Response(JSON.stringify(messages.data))
}
