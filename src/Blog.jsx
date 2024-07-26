import { PostList } from './components/PostList'
import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostSorting } from './components/PostSorting'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts'
import { useState } from 'react'

export function Blog() {
  const [authorFilter, setAuthorFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author: authorFilter, sortBy, sortOrder }],
    queryFn: () => getPosts({ author: authorFilter, sortBy, sortOrder }),
  })

  const posts = postsQuery.data || []

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field='author'
        value={authorFilter}
        onChange={(value) => setAuthorFilter(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        sortBy={sortBy}
        onSortByChanged={(value) => setSortBy(value)}
        sortOrder={sortOrder}
        onSortOrderChanged={(value) => setSortOrder(value)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
