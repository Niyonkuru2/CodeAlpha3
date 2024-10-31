import express from 'express'
import authUser from '../middlewares/userMiddleware.js'
import { addComment } from '../controllers/commentControllers.js'
const commentRouter = express.Router()

commentRouter.post('/add',authUser,addComment)

export default commentRouter