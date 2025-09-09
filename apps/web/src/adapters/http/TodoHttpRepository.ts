import type { TodoRepository, Todo } from '../../core/ports/TodoRepository'
import { get, post, del } from './client'
import { z } from 'zod'
import { TodoDTO } from '@starter/shared/schemas/todo'   // id, title, createdAt (string)

const TodoDTOArray = z.array(TodoDTO)

const toDomain = (dto: z.infer<typeof TodoDTO>): Todo => ({
  id: dto.id,
  title: dto.title,
  createdAt: new Date(dto.createdAt as any),
})

export class TodoHttpRepository implements TodoRepository {
  async list(): Promise<Todo[]> {
    const data = await get('/api/todos', { schema: TodoDTOArray })
    return data.map(toDomain)
  }
  async create(title: string): Promise<Todo> {
    const data = await post('/api/todos', { title }, { schema: TodoDTO })
    return toDomain(data)
  }
  async remove(id: number): Promise<void> {
    await del(`/api/todos/${id}`)
  }
}
