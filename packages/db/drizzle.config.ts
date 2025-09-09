import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  // 👇 rutas vistas desde la RAÍZ del repo
  schema: 'packages/db/schema.ts',
  out: 'packages/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
})
