import { model, Schema } from "mongoose";
import { borrowStaticMethod, IBooks } from "../interfaces/books.interfaces";

const booksSchema = new Schema<IBooks, borrowStaticMethod>({

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
        unique: true,
        index: true
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
},
    {
        versionKey: false,
        timestamps: true
    }
);

booksSchema.post('save', function (doc) {
    console.log("Book saved:", doc.title);
});

booksSchema.pre('save', function (next) {
    console.log(this)
    next();
})

booksSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: new Date() });
    next();
})


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