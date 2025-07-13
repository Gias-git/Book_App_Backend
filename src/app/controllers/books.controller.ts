import express, {  Request, Response } from 'express'
import { Books } from '../models/books.model';


export const bookRoutes = express.Router()


// Crate new book
bookRoutes.post("/", async (req: Request, res: Response) => {


    try {

        const body = req.body

        const newBook = await Books.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            data: newBook
        })
    } catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
})


// get  books
bookRoutes.get("/", async (req: Request, res: Response) => {

    try {

        const { filter, sortBy, sort, limit } = req.query;

        const query: any = {};
        if (filter) {
            query.genre = filter;
        }

        const books = await Books.find(query).sort({ [sortBy as string]: sort === "asc" ? 1 : -1 }).limit(parseInt(limit as string));

        res.status(201).json({
            "success": true,
            "message": "Books retrieved successfully",
            data: books
        })

    } catch (error) {
        res.status(500).json({
            "message": "something wrong",
            "success": false,
            "error": error
        })
    }


})


// Get Book by ID

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {

    try {
        const bookId = req.params.bookId;
        const book = await Books.findById(bookId);

        res.status(201).json({
            "success": true,
            "message": "Books retrieved successfully",
            data: book
        })

    } catch (error) {
        res.status(500).json({
            "message": "something wrong",
            "success": false,
            "error": error
        })
    }


})



//update book
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
    try {

        const { bookId } = req.params;
        const updatedBody = req.body;

        const updatedBook = await Books.findByIdAndUpdate(bookId, updatedBody, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            "message": "Book Updated Successfully",
            "success": true,
            "data": updatedBook
        })



    } catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
})

// Delete Book

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    try {

        const bookId = req.params.bookId;

        const deletedBook = await Books.findByIdAndDelete(bookId);

        const data = await Books.findById(bookId);

        res.status(200).json({
            "message": "Book deleted successfully",
            "success": true,
            "data": data
        })


    } catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
})


