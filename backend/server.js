import express from 'express'
import dotenv from 'dotenv'
import linksToMogoDbUrl from './db/linksToMogoDbUrl.js'
import UserAuth from './routes/user.routes.js'
import BookNews from './routes/book.routes.js'

// innitialize express app
const app = express()

dotenv.config()
const PORT = process.env.PORT || 8000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to MongoDB
app.listen(PORT, () => {
  try {
    linksToMogoDbUrl()
    console.log(`✅ Server is running on port ${PORT}`)
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
  }
})

// initialize routes apis
app.use('/api/v1/user', UserAuth)
app.use('/api/v1/book', BookNews)
