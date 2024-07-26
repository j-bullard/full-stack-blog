import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTags,
  updatePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

let createdSamplePosts = []

beforeEach(async () => {
  await Post.deleteMany()
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: 'Mongoose Author',
      contents: 'This is a post about Mongoose.',
      tags: ['Mongoose', 'MongoDB', 'Node.js'],
    }

    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const post = {
      author: 'Mongoose Author',
      contents: 'This is a post about Mongoose.',
      tags: ['Mongoose', 'MongoDB', 'Node.js'],
    }

    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
    }

    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toBe(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test('should return posts sorted by updated date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.updatedAt - a.updatedAt,
    )

    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Bugl')
    expect(posts.length).toBe(3)
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTags('react')
    expect(posts.length).toBe(2)
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toBeNull()
  })
})

describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Mongoose Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toBe('Mongoose Author')
  })

  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Mongoose Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toBe('Learning Redux')
  })

  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Mongoose Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Mongoose Author',
    })
    expect(post).toBeNull()
  })
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toBe(1)

    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toBeNull()
  })

  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toBe(0)
  })
})

const samplePosts = [
  { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
  { title: 'Learn React Hooks', author: 'Daniel Bugl', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: 'Daniel Bugl',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript' },
]
