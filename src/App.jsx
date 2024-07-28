import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()

export function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}
