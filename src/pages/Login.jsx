import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users'
import { useAuth } from '../hooks/AuthContext'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useAuth()

  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('Failed to login'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='login-username'>Username: </label>
        <input
          type='text'
          name='login-username'
          id='login-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='username'
        />
      </div>
      <div>
        <label htmlFor='current-password'>Password: </label>
        <input
          type='password'
          name='current-password'
          id='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
      </div>
      <input
        type='submit'
        value={loginMutation.isPending ? 'Logging in...' : 'Log In'}
        disabled={!username || !password | loginMutation.isPending}
      />
    </form>
  )
}
