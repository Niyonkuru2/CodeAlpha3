import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    post:{type:mongoose.Schema.Types.ObjectId, ref:'post'},
})
const likeModel = mongoose.model.like || mongoose.model('like',likeSchema)
export default likeModel