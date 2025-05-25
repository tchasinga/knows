import express from 'express'
import {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
  getBookforUser
} from '../controllers/book.controllers.js'
import protect from '../middleware/protectrouter.js'

const router = express.Router()

// Route for creating a new book
router.post('/', protect, createBook)
router.get('/all', protect, getAllBooks)
router.get('/users/data', protect, getBookforUser) // Instead of /userdata
router.get('/:id', protect, getBookById)
router.delete('/delete/:id', protect, deleteBook)


export default router
