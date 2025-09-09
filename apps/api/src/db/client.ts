import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '@starter/db/schema'

export type Bindings = {
  DATABASE_URL: string
}

export function createDb(env: Bindings) {
  const sql = neon(env.DATABASE_URL)
  return drizzle(sql, { schema })
}

export type DB = ReturnType<typeof createDb>
