import type { TodoRepository } from '../ports/TodoRepository'
export const addTodo = (repo: TodoRepository) => (title: string) => repo.create(title)
