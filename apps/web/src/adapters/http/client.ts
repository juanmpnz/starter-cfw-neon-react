import { env } from '../../shared/env'
import { HttpError } from '../../app/errors'
import type { ZodSchema } from 'zod'

type Query = Record<string, string | number | boolean | undefined | null>

function withQuery(url: string, query?: Query) {
  if (!query) return url
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue
    q.set(k, String(v))
  }
  const sep = url.includes('?') ? '&' : '?'
  return q.toString() ? `${url}${sep}${q.toString()}` : url
}

type Options<T> = {
  method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'
  body?: unknown
  headers?: Record<string, string>
  query?: Query
  schema?: ZodSchema<T>   // si querés validar respuesta
}

export async function http<T = unknown>(path: string, opts: Options<T> = {}): Promise<T> {
  const base = env.apiUrl || ''
  const url = withQuery(`${base}${path}`, opts.query)

  const init: RequestInit = {
    method: opts.method ?? 'GET',
    headers: {
      ...(opts.body ? { 'content-type': 'application/json' } : {}),
      ...(opts.headers ?? {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  }

  const res = await fetch(url, init)

  if (res.status === 204) return undefined as T

  const text = await res.text()
  const isJson = (res.headers.get('content-type') || '').includes('application/json')
  const data = isJson && text ? JSON.parse(text) : text

  if (!res.ok) {
    const msg = (data && typeof data === 'object' && 'error' in (data as any))
      ? (data as any).error
      : res.statusText || 'Request failed'
    throw new HttpError(msg, res.status, data)
  }

  if (opts.schema) return opts.schema.parse(data)
  return data as T
}

export const get = <T>(p: string, o: Omit<Options<T>, 'method'|'body'> = {}) => http<T>(p, o)
export const post = <T>(p: string, body?: unknown, o: Omit<Options<T>, 'method'|'body'> = {}) =>
  http<T>(p, { ...o, method: 'POST', body })
export const del = <T>(p: string, o: Omit<Options<T>, 'method'|'body'> = {}) =>
  http<T>(p, { ...o, method: 'DELETE' })
