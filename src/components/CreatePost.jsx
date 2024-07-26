import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      setTitle('')
      setAuthor('')
      setContents('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'create-title') {
      setTitle(value)
    } else if (name === 'create-author') {
      setAuthor(value)
    } else {
      setContents(value)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={handleChange}
        />
      </div>
      <br />
      <textarea value={contents} onChange={handleChange} />
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />

      {createPostMutation.isSuccess && (
        <>
          <br />
          Post created successfully!
        </>
      )}
    </form>
  )
}
