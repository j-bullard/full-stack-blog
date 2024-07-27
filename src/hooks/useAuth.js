import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function useAuth() {
  const { token, setToken } = useContext(AuthContext)
  return [token, setToken]
}
