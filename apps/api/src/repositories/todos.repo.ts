import { eq, desc } from 'drizzle-orm'
import type { DB } from '../db/client'
import { todos } from '@starter/db/schema'
import type { NewTodo, Todo } from '@starter/db/schema'

export const TodosRepository = (db: DB) => ({
  list: async (): Promise<Todo[]> => {
    return db.select().from(todos).orderBy(desc(todos.createdAt))
  },
  create: async (data: NewTodo): Promise<Todo> => {
    const [row] = await db.insert(todos).values(data).returning()
    return row
  },
  remove: async (id: number): Promise<void> => {
    await db.delete(todos).where(eq(todos.id, id))
  },
})
