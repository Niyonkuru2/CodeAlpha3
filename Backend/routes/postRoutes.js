import express from 'express'
import {createPost,allPost,likePost } from '../controllers/postControllers.js'
import upload from "../middlewares/multer.js"
import authUser from '../middlewares/userMiddleware.js'
const postRouter = express.Router()
postRouter.post('/create',upload.single('image'),createPost)
postRouter.get('/userspost',allPost)
postRouter.post('/:id/follow',authUser,likePost)

export default postRouter