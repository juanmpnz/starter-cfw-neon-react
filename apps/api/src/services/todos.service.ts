import type { DB } from '../db/client'
import { TodosRepository } from '../repositories/todos.repo'

export function TodosService(db: DB) {
  const repo = TodosRepository(db)

  return {
    list: () => repo.list(),
    add: async (title: string) => {
      return repo.create({ title })
    },
    remove: (id: number) => repo.remove(id),
  }
}
