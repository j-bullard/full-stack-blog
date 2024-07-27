import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'
import { User } from './User'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <header>
        <div>
          Logged in as <User id={sub} />
        </div>
        <button type='button' onClick={() => setToken(null)}>
          Logout
        </button>
      </header>
    )
  }

  return (
    <header>
      <nav>
        <Link to='/login'>Login</Link> |<Link to='/signup'>Sign Up</Link>
      </nav>
    </header>
  )
}
