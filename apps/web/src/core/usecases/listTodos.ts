import type { TodoRepository } from '../ports/TodoRepository'
export const listTodos = (repo: TodoRepository) => () => repo.list()
