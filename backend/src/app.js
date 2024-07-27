import express from 'express'
import cors from 'cors'
import { postsRouter } from './routes/posts.js'
import { usersRouter } from './routes/users.js'

const app = express()

// setup middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/users', usersRouter)

export { app }
