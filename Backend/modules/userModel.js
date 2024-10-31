import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:''},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    followeing:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
})
const userModel = mongoose.model.user || mongoose.model('user',userSchema)
export default userModel
