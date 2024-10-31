import express from 'express'
import cors from 'cors'
//load environment variable
import 'dotenv/config'
import connectDB from './config/mongoDb.js'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import commentRouter from './routes/commentRoute.js'
import connectCloudinary from './config/cloudinary.js'


//app config
const app = express()
const port = process.env.PORT || 7060
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)
//getting message from server of success running
app.get('/',(req,res)=>{
    res.send('Express server is Running')
})
app.listen(port,()=>console.log("Server Started",port))