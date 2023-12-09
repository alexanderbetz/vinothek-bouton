import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (event) => {
  const isFirefox = event.request.headers.get("user-agent")?.toLowerCase().includes('firefox') ?? false
  return { isFirefox };
};
