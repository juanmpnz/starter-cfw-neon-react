import type { TodoRepository, Todo } from '../../core/ports/TodoRepository'
import { Todo as TodoSchema } from '../../core/ports/TodoRepository'

const BASE = import.meta.env.VITE_API_URL ?? ''

export class TodoHttpRepository implements TodoRepository {
  async list(): Promise<Todo[]> {
    const res = await fetch(`${BASE}/api/todos`)
    const json = await res.json()
    return json.map((r: any) => TodoSchema.parse({ ...r, createdAt: r.createdAt }))
  }
  async create(title: string): Promise<Todo> {
    const res = await fetch(`${BASE}/api/todos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    return TodoSchema.parse(await res.json())
  }
  async remove(id: number): Promise<void> {
    await fetch(`${BASE}/api/todos/${id}`, { method: 'DELETE' })
  }
}
