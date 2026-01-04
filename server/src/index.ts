import express from 'express';
import dotenv from 'dotenv';
import DB from './config/db'
import cors from "cors"
import UserRouter from './routes/auth.routes';
import ProjectRoutes from './routes/project.route';
dotenv.config();
import http from 'http'
import { initSocket } from './socket/socket';
import { errorHandler } from './middleware/error.middleware';
const app = express()

const server = http.createServer(app)

initSocket(server)



server.listen(3000, () => {
  console.log("✅socket's Server running on port 5000");
});

const PORT = process.env.PROT || 3000

// const io = initSocket(server);/


DB()



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',UserRouter)
app.use("/api/v1/projects", ProjectRoutes);

app.use(errorHandler);

app.post('/',(req ,res)=>{
    res.send('this is a basic route')
})
app.listen(PORT,()=>{
    console.log('server is running on port 3000')
})