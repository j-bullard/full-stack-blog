import {
  listPostsByTags,
  listPostsByAuthor,
  listAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
} from '../services/posts.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const { sortBy, sortOrder, author, tag } = req.query
  const options = { sortBy, sortOrder }

  try {
    if (author && tag) {
      return res
        .status(400)
        .json({ error: 'query by either author or tag, not both' })
    } else if (author) {
      return res.status(200).json(await listPostsByAuthor(author, options))
    } else if (tag) {
      return res.status(200).json(await listPostsByTags(tag, options))
    } else {
      return res.status(200).json(await listAllPosts(options))
    }
  } catch {
    return res.status(500).end()
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await getPostById(id)
    if (!post) {
      return res.status(404).end()
    }

    return res.status(200).json(post)
  } catch {
    return res.status(500).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body)
    return res.json(post)
  } catch {
    return res.status(500).end()
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const post = await updatePost(req.params.id, req.body)
    return res.json(post)
  } catch {
    return res.status(500).end()
  }
})

router.delete('/:id', (req, res) => {
  try {
    const { deletedCount } = deletePost(req.params.id)
    if (deletedCount === 0) {
      return res.status(404).end()
    }

    return res.status(204).end()
  } catch {
    return res.status(500).end()
  }
})

export { router as postsRouter }
