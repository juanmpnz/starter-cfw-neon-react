import type { Context, Next } from 'hono'
import type { DB, Bindings } from '../db/client'
import { createDb } from '../db/client'

declare module 'hono' {
  interface ContextVariableMap {
    db: DB
  }
  interface Env {
    Bindings: Bindings
  }
}

export async function withDb(c: Context, next: Next) {
  const db = createDb(c.env)
  c.set('db', db)
  await next()
}
