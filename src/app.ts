import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/controllers/books.controller';
import { borrowRotes } from './app/controllers/borrow.controller';


const app: Application = express();

app.use(express.json())
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRotes)

app.get('/', (req: Request, res: Response) => {

    res.send("Server Running")
})


export default app;