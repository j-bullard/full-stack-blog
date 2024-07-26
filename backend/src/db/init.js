import mongoose from 'mongoose'

const DATABASE_URL = process.env.DATABASE_URL

export async function init() {
  mongoose.connection.on('open', () => {
    console.info('Successfully connected to the database:', DATABASE_URL)
  })

  const connection = await mongoose.connect(DATABASE_URL)
  return connection
}
