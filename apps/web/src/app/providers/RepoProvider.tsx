import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { TodoHttpRepository } from '../../adapters/http/TodoHttpRepository'
import type { TodoRepository } from '../../core/ports/TodoRepository'

type Repos = { todoRepo: TodoRepository }
const RepoCtx = createContext<Repos | null>(null)

export function RepoProvider({ children }: { children: ReactNode }) {
  const repos = useMemo<Repos>(() => ({ todoRepo: new TodoHttpRepository() }), [])
  return <RepoCtx.Provider value={repos}>{children}</RepoCtx.Provider>
}
export function useRepos() {
  const ctx = useContext(RepoCtx)
  if (!ctx) throw new Error('useRepos must be used within RepoProvider')
  return ctx
}
