import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    post:{type:mongoose.Schema.Types.ObjectId, ref:'post'},
    content:{type:String,required:true},
    date:{type:Number,required:true}
})
const commentModel = mongoose.model.comment || mongoose.model('comment',commentSchema)
export default commentModel