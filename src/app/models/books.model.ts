import { model, Schema } from "mongoose";
import { borrowStaticMethod, IBooks } from "../interfaces/books.interfaces";

const booksSchema = new Schema<IBooks, borrowStaticMethod>({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    isbn: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);


booksSchema.static("updateAvailability", async function (bookId, quantity) {
    console.log("This is borrow")

    const findBook = await Books.findById(bookId);
    if (!findBook) {
        throw new Error("Book not Found")
    }

    findBook.copies -= quantity;

    if (findBook.copies == 0) {
        findBook.available = false
    }

    await findBook.save();

})


export const Books = model<IBooks, borrowStaticMethod>("books", booksSchema)