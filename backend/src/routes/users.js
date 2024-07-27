import { createUser, loginUser } from '../services/users.js'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body)
    return res.status(201).json({ username: user.username })
  } catch {
    return res.status(400).json({
      error: 'failed to create the user, does the username already exist?',
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body)
    return res.status(200).send({ token })
  } catch {
    res.status(400).send({
      error: 'login failed, did you enter the correct username and password?',
    })
  }
})

export { router as usersRouter }