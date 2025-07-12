import { Model } from "mongoose";

export interface IBooks {
    title: string,
    author: string,
    genre: string,
    isbn: number,
    description: string,
    copies: number,
    available: boolean
}

export interface borrowStaticMethod extends Model<IBooks> {
    updateAvailability(bookId: string, quantity: number): void
}