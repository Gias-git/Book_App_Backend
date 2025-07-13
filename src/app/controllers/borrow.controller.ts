import express, { Request, Response } from 'express'
import { Books } from '../models/books.model';
import { Borrow } from '../models/borrow.model';

export const borrowRotes = express.Router()


// Borrow a Book

borrowRotes.post("/", async (req: Request, res: Response) => {
    try {

        const { book, quantity} = req.body;

        const queryBook = await Books.findById(book);

        if (!queryBook) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            })
        }

        if (queryBook.copies < quantity) {
            return res.status(404).json({
                success: false,
                message: " Book has not enough available copies"
            })
        }



        await Books.updateAvailability(book, quantity);

        const newBorrow = await Borrow.create(req.body)

        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
            "data": newBorrow
        })
    } catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
})



// Borrowed Books Summary (Using Aggregation)

borrowRotes.get("/", async (req: Request, res: Response) => {
    try {

        const books = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            }, {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ])

        res.status(201).json({
            "success": true,
            "message": "Borrowed books summary retrieved successfully",
            "data": books
        })


    } catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        })
    }
})