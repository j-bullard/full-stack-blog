import { app } from './app.js'
import 'dotenv/config'

import { init } from './db/init.js'

try {
  await init()
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
} catch (err) {
  console.error('error connecting to database', err.message)
}
