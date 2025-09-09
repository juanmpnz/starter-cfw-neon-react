import type { TodoRepository } from '../ports/TodoRepository'
export const removeTodo = (repo: TodoRepository) => (id: number) => repo.remove(id)
