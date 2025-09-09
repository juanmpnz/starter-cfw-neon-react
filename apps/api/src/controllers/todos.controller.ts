import type { Context } from 'hono'
import { TodosService } from '../services/todos.service'
import { TodoCreateBody } from '@starter/shared/schemas/todo'

export const TodosController = {
  list: async (c: Context) => {
    const db = c.get('db')
    const service = TodosService(db)
    const rows = await service.list()
    const data = rows.map(r => ({ ...r, createdAt: new Date(r.createdAt as any).toISOString() }))
    return c.json(data)
  },

  create: async (c: Context) => {
    const db = c.get('db')
    const service = TodosService(db)
    const json = await c.req.json()
    const { title } = TodoCreateBody.parse(json)
    const row = await service.add(title)
    return c.json({ ...row, createdAt: new Date(row.createdAt as any).toISOString() }, 201)
  },

  remove: async (c: Context) => {
    const db = c.get('db')
    const service = TodosService(db)
    const id = Number(c.req.param('id'))
    await service.remove(id)
    return c.body(null, 204)
  },
}
