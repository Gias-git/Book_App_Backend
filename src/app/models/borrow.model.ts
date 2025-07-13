import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Books",
        required: true
    },

    quantity: {
        type: Number,
        required: [true,'Quantity Must Be Required'],
        min : [1, 'Min 1 quantity must be borrow']
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {

    versionKey: false,
    timestamps: true
})

export const Borrow = model("borrow", borrowSchema)