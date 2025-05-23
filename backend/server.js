import express from 'express'
import dotenv from 'dotenv'
import linksToMogoDbUrl from './db/linksToMogoDbUrl.js'
import UserAuth from './routes/user.routes.js'
import BookNews from './routes/book.routes.js'
import cors from 'cors'
import job from './db/cron.js'

// initialize express app
const app = express()

dotenv.config()
const PORT = process.env.PORT || 8000

// middleware
job.start()
app.use(cors())

// Increase payload size limit (default is ~100kb)
app.use(express.json({ limit: '50mb' })) // Adjust the limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }))

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
app.use('/api/v2/book', BookNews)