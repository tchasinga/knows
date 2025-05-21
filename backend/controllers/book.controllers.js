import Book from "../models/books.models.js";
import cloudinary from "../db/cloudinary.js";


// create a new book
export const createBook = async (req, res) => {
    try {
        const { title, caption, image, rating } = req.body;

        if(!title || !caption || !image || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }

        if(!image){
            return res.status(400).json({ message: "Image is required" });
        }

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "books",
            width: 500,
            crop: "scale"
        });
        const newBook = new Book({
            title,
            caption,
            image: result.secure_url,
            rating,
            user: req.user._id
        });
        await newBook.save();
        res.status(201).json({ message: "Book created successfully", book: newBook });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort.desc("createdAt").populate("user", "name");
        if (!books) {
            return res.status(404).json({ message: "No books found" });
        }
        
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a book by id
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("user", "name");
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
