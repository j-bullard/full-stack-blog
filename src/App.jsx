import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { AuthContextProvider } from './contexts/AuthContext'
import { Login } from './pages/Login'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
