import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './app/queryClient'
import { RepoProvider } from './app/providers/RepoProvider'
import { ErrorBoundary } from './app/ErrorBoundary'
import TodosPage from './ui/pages/TodosPage'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RepoProvider>
        <ErrorBoundary>
          <TodosPage />
        </ErrorBoundary>
      </RepoProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
