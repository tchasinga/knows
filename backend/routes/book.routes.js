import express from 'express'
import {createBook, getAllBooks, getBookById, deleteBook } from '../controllers/book.controllers.js'
import { protect } from '../middleware/protectrouter.js'

const router = express.Router()

// Route for creating a new book
router.post('/', protect, createBook);
router.get('/', protect, getAllBooks);
router.get('/:id', protect, getBookById);
router.delete('/:id', protect, deleteBook);
