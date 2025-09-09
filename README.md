# Cloudflare Workers + Neon + React (Vite) Starter

**Stack**
- **Backend**: Cloudflare Workers + [Hono](https://hono.dev) + Drizzle ORM + `@neondatabase/serverless` (HTTP driver).
- **DB**: Postgres en **Neon**.
- **Frontend**: React + Vite + Tailwind, **arquitectura hexagonal**.
- **Monorepo**: pnpm workspaces.
- **CI/CD**: GitHub Actions (deploy Worker y Pages, migraciones Drizzle).

## Estructura
```
.
├─ apps/
│  ├─ api/        # Worker (Hono) - rutas, controllers, services, repos
│  └─ web/        # React + Vite + Tailwind (hexagonal en el front)
├─ packages/
│  ├─ db/         # Drizzle ORM (schema + migraciones)
│  └─ shared/     # Zod schemas/DTOs compartidos
└─ .github/workflows/  # Actions de deploy/migraciones
```

## Requisitos
- Node 20+, pnpm 9+
- Cuenta Cloudflare (Workers + Pages)
- Proyecto Neon con Postgres
- (Opcional) GitHub Actions con secrets configurados

## Quickstart
1) **Instalar dependencias**
```bash
pnpm i
```

2) **Crear DB en Neon** y obtener `DATABASE_URL` (usa `sslmode=require`).

3) **Configurar secreto en el Worker (api)**
```bash
cd apps/api
# pega tu connection string de Neon
wrangler secret put DATABASE_URL
```

4) **Migraciones Drizzle**
```bash
# desde el root:
export DATABASE_URL='postgres://...sslmode=require'
pnpm db:gen
pnpm db:push
```

5) **Desarrollo local**
```bash
pnpm dev
# web: http://localhost:5173
# api (worker local): http://127.0.0.1:8787
```

6) **Deploy**
- **API (Worker)**: `pnpm -C apps/api deploy` o GitHub Actions.
- **WEB (Pages)**: GitHub Actions (ver workflow) o subir `apps/web` a Pages.

## Variables y Secrets
- **Cloudflare Worker (apps/api)**:
  - `DATABASE_URL` (secret) → cadena Neon.
- **GitHub Actions**:
  - `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
  - `PRODUCTION_DATABASE_URL` (para migraciones CI)
  - `CLOUDFLARE_PAGES_PROJECT` (nombre del proyecto de Pages)
- **Frontend**:
  - `VITE_API_URL` si API está en otro dominio. En dev, Vite usa proxy a `http://127.0.0.1:8787`.

## Nota sobre arquitectura del backend
Capa HTTP (**routes**) → **controllers** (validación/orquestación) → **services** (reglas de negocio) → **repositories** (persistencia con Drizzle) → **db client** (Neon HTTP).

## Comandos útiles
```bash
# Migrations
export DATABASE_URL='postgres://...sslmode=require'
pnpm db:gen && pnpm db:push

# Dev en paralelo
pnpm dev

# Sólo API o WEB
pnpm dev:api
pnpm dev:web
```
