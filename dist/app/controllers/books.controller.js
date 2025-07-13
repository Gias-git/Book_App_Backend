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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.bookRoutes = express_1.default.Router();
// Crate new book
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield books_model_1.Books.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            data: newBook
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
// get  books
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield books_model_1.Books.find(query).sort({ [sortBy]: sort === "asc" ? 1 : -1 }).limit(parseInt(limit));
        res.status(201).json({
            "success": true,
            "message": "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            "message": "something wrong",
            "success": false,
            "error": error
        });
    }
}));
// Get Book by ID
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Books.findById(bookId);
        res.status(201).json({
            "success": true,
            "message": "Books retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            "message": "something wrong",
            "success": false,
            "error": error
        });
    }
}));
//update book
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updatedBody = req.body;
        const updatedBook = yield books_model_1.Books.findByIdAndUpdate(bookId, updatedBody, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            "message": "Book Updated Successfully",
            "success": true,
            "data": updatedBook
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
// Delete Book
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield books_model_1.Books.findByIdAndDelete(bookId);
        const data = yield books_model_1.Books.findById(bookId);
        res.status(200).json({
            "message": "Book deleted successfully",
            "success": true,
            "data": data
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
