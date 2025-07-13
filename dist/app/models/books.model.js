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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title Is Required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author Is Required"],
        trim: true,
    },
    genre: {
        type: String,
        uppercase: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: [true, "Genre Is Required"],
        trim: true
    },
    isbn: {
        type: Number,
        required: [true, "Isbn Is Required"],
        unique: true
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Copies Is Required"],
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
booksSchema.post('save', function (doc) {
    console.log("Book saved:", doc.title);
});
booksSchema.pre('save', function (next) {
    console.log(this);
    next();
});
booksSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
booksSchema.static("updateAvailability", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("This is borrow");
        const findBook = yield exports.Books.findById(bookId);
        if (!findBook) {
            throw new Error("Book not Found");
        }
        findBook.copies -= quantity;
        if (findBook.copies == 0) {
            findBook.available = false;
        }
        yield findBook.save();
    });
});
exports.Books = (0, mongoose_1.model)("books", booksSchema);
