import express from 'express';
import dotenv from 'dotenv';
import DB from './config/db'
import cors from "cors"
import UserRouter from './routes/auth.routes';
dotenv.config();

import { errorHandler } from './middleware/error.middleware';
const app = express()

const PORT = process.env.PROT || 3000

DB()



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',UserRouter)

app.use(errorHandler);

app.post('/',(req ,res)=>{
    res.send('this is a basic route')
})
app.listen(PORT,()=>{
    console.log('server is running on port 3000')
})