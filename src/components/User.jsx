import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users'
import PropTypes from 'prop-types'

export function User({ id }) {
  const userInfoQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })

  const userInfo = userInfoQuery.data ?? {}

  return <strong>{userInfo?.username}</strong>
}

User.propTypes = {
  id: PropTypes.string.isRequired,
}
