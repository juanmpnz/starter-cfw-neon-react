import { z } from 'zod'

export const TodoCreateBody = z.object({
  title: z.string().min(1).max(200),
})

export const TodoDTO = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string().datetime().or(z.date()),
})

export type TodoDTO = z.infer<typeof TodoDTO>
