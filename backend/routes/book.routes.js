import express from 'express'
import {createBook } from '../controllers/book.controllers.js'
import { protect } from '../midlleware/protectrouter.js'

const router = express.Router()

// Route for creating a new book
router.post('/', protect, createBook);
