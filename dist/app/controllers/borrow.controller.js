"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRotes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRotes = express_1.default.Router();
// Borrow a Book
exports.borrowRotes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity } = req.body;
        const queryBook = yield books_model_1.Books.findById(book);
        if (!queryBook) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });
        }
        if (queryBook.copies < quantity) {
            return res.status(404).json({
                success: false,
                message: " Book has not enough available copies"
            });
        }
        yield books_model_1.Books.updateAvailability(book, quantity);
        const newBorrow = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
            "data": newBorrow
        });
    }
    catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        });
    }
}));
// Borrowed Books Summary (Using Aggregation)
exports.borrowRotes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield borrow_model_1.Borrow.aggregate([
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
        ]);
        res.status(201).json({
            "success": true,
            "message": "Borrowed books summary retrieved successfully",
            "data": books
        });
    }
    catch (error) {
        res.status(500).json({
            "message": "Validation failed",
            "success": false,
            "error": error
        });
    }
}));
