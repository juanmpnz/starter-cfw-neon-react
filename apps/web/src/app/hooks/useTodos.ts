import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { keys } from '../queryKeys'
import { useRepos } from '../providers/RepoProvider'
import type { Todo } from '../../core/ports/TodoRepository'

export function useTodos() {
  const { todoRepo } = useRepos()
  const qc = useQueryClient()

  const todosQuery = useQuery({
    queryKey: keys.todos.list(),
    queryFn: () => todoRepo.list(),
  })

  const createMutation = useMutation({
    mutationFn: (title: string) => todoRepo.create(title),
    onSuccess: (newTodo) => {
      qc.setQueryData<Todo[]>(keys.todos.list(), (prev) => prev ? [...prev, newTodo] : [newTodo])
    },
  })

  const removeMutation = useMutation({
    mutationFn: (id: number) => todoRepo.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: keys.todos.list() })
      const snapshot = qc.getQueryData<Todo[]>(keys.todos.list())
      qc.setQueryData<Todo[]>(keys.todos.list(), (old) => (old ?? []).filter(t => t.id !== id))
      return { snapshot }
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.snapshot) qc.setQueryData(keys.todos.list(), ctx.snapshot)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.todos.list() }),
  })

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,

    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    remove: removeMutation.mutate,
    isRemoving: removeMutation.isPending,

    refetch: todosQuery.refetch,
  }
}
