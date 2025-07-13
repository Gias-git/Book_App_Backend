import app from "./app";
import mongoose from "mongoose";
import dotenv from 'dotenv';


const PORT = 7000;

dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;


const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.vv2sz9v.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;


async function main() {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Mongoose Connected")
        app.listen(PORT, () => {
            console.log(`APP is Listening in port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }

}


main();