import express from 'express';
import dotenv from 'dotenv';
import DB from './config/db'
dotenv.config();
const app = express()

const PORT = process.env.PROT || 3000

DB()


app.post('/',(req ,res)=>{
    res.send('this is a basic route')
})
app.listen(PORT,()=>{
    console.log('server is running on port 3000')
})