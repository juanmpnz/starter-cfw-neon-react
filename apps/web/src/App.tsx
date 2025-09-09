import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodosPage from './ui/pages/TodosPage'

const qc = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <TodosPage />
    </QueryClientProvider>
  )
}
