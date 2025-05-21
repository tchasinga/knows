import Book from '../models/books.models.js'
import cloudinary from '../db/cloudinary.js'

// create a new book
export const createBook = async (req, res) => {
  try {
    const { title, caption, image, rating } = req.body

    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 0 and 5' })
    }

    if (!image) {
      return res.status(400).json({ message: 'Image is required' })
    }

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: 'books',
      width: 500,
      crop: 'scale'
    })
    const newBook = new Book({
      title,
      caption,
      image: result.secure_url,
      rating,
      user: req.user._id
    })
    await newBook.save()
    res
      .status(201)
      .json({ message: 'Book created successfully', book: newBook })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name profilepic')
    if (!books) {
      return res.status(404).json({ message: 'No books found' })
    }

    const page = page.query.page || 1
    const limit = page.query.limit || 5
    const skip = (page - 1) * limit

    const totalBooks = await Book.countDocuments()
    const totalPages = Math.ceil(totalBooks / limit)

    res.status(200).json({
      message: 'Books fetched successfully',
      books,
      currentPage: page,
      limit: limit,
      totalBooks: totalBooks,
      totalPages: totalPages
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get a book by id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('user', 'name')
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    // Check if the user is the owner of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: 'Not authorized to delete this book' })
    }

    // Delete the image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
        try {
            const publicId = book.image.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(`books/${publicId}`)
        } catch (error) {
            console.error("Error deleting image from Cloudinary:", error)
        }
    }

    // Delete the book from the database
    await book.remove()
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
