import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { todosRouter } from './routes/todos.routes'
import { withDb } from './middlewares/bindings'
import { registerErrorHandlers } from './middlewares/error'

export function createApp() {
  const app = new Hono()

  app.use('*', cors())
  app.use('*', withDb)

  app.get('/health', (c) => c.json({ ok: true }))

  app.route('/api/todos', todosRouter)

  registerErrorHandlers(app)
  return app
}
