import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    content:{type:String,required:true},
    postImage:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    createdAt:{type:Date,default:Date.now()}
})
const postModel = mongoose.model.post || mongoose.model('post',postSchema)
export default postModel
