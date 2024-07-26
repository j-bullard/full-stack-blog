import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  )
}
