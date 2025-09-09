import { Hono } from 'hono'
import { TodosController } from '../controllers/todos.controller'

export const todosRouter = new Hono()

todosRouter.get('/', TodosController.list)
todosRouter.post('/', TodosController.create)
todosRouter.delete('/:id', TodosController.remove)
