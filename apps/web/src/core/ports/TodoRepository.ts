import { z } from 'zod'

export const Todo = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.coerce.date(),
})
export type Todo = z.infer<typeof Todo>

export interface TodoRepository {
  list(): Promise<Todo[]>
  create(title: string): Promise<Todo>
  remove(id: number): Promise<void>
}
