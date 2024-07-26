import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { init } from '../db/init.js'

beforeAll(async () => {
  await init()
})

afterAll(async () => {
  await mongoose.disconnect()
})
