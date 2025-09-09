import type { Hono } from 'hono'

export function registerErrorHandlers(app: Hono) {
  app.notFound((c) => c.json({ error: 'Not Found' }, 404))
  app.onError((err, c) => {
    console.error('[API ERROR]', err)
    return c.json({ error: 'Internal Server Error' }, 500)
  })
}
