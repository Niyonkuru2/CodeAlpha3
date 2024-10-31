import express from 'express'
import { registerUser,loginUser, followUser, unFollowUser} from '../controllers/userControllers.js'
import authUser from '../middlewares/userMiddleware.js'
const userRouter = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/:id/follow',authUser,followUser)
userRouter.post('/:id/unfollow',authUser,unFollowUser)


export default userRouter