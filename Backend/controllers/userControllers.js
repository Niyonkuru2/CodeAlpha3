import userModel from '../modules/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const registerUser = async(req,res)=>{
    try {
      const {name,username,email,password,profilePicture} = req.body 
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const isVarid = validator.matches(password,specialChars);
      if (!name || !password || !email || !username) {
        return res.json({success:false,message:"Missing Details"})
      } 
      //restricting un unique of email
      const userr = await userModel.findOne({username})
      const emails = await userModel.findOne({email})
     if (userr) {
       return res.json({success:false,message:"existing user with this username"})  
     }
     if (emails) {
      return res.json({success:false,message:"existing user with this email id"})  
    }
     //
     if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"});
   }
      
      // validating strong password
     if (password.length < 8) {
        return res.json({success:false,message:"Create at least 8characters to create password"})
    }
    if(!isVarid){
        return res.json({success:false,message:"Include special characters in your password"})
       }
//hashing user password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)
const userData = {
    name,
    username,
    email,
    password:hashedPassword,
    profilePicture,
    date:Date.now()
}
const newUser = userModel(userData);
const user = await newUser.save()
const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const loginUser = async(req,res)=>{
    try {
     const {username,password} = req.body
     const user = await userModel.findOne({username})
     if (!user) {
       return res.json({success:false,message:"User does not exist! register first"})  
     }
     const isMatch = await bcrypt.compare(password,user.password)
     if (isMatch) {
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
     }else{
        res.json({success:false,message:"Imvalid Password"})
     }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}
// following a user
const followUser = async(req,res)=>{
  try {
    const {userId} = req.params;
    const userTofollow = await userModel.findById(userId);
    const currentUser = await userModel.findById(req.body.userId);
    if (!userTofollow || !currentUser) {
      return res.json({success:false,message:"User not found"})  
    }
    if (!currentUser.following.includes(id)) {
      await currentUser.updateOne({$push:{following:id}});
      await userTofollow.updateOne({$push:{followers:req.body.userId}});
      return res.json({success:true,message:"User Followed"})  
    }else{
      return res.json({success:false,message:"You are follower of this user"})  
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message}) 
  }
}
//Endpoint to unfollow the user
const unFollowUser = async(req,res)=>{
  try {
    const {userId} = req.params;
    const userTounfollow = await userModel.findById(userId);
    const currentUser = await userModel.findById(req.body.userId);
     //removing the user from the list of user to be followed
  currentUser.following = currentUser.following.filter(id=>id.toString() !==userTounfollow._id.toString());
  await currentUser.save()
  //removing the user from the list of user to be followers
  currentUser.following = currentUser.following.filter(id=>id.toString() !==userTounfollow._id.toString());
  await userTounfollow.save()
  res.json({success:false,message:`You have unfollowed ${userTounfollow.username}`}) 
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message}) 
  }
}
//API To get user profile data
const getProfile = async(req,res)=>{
  try {
    const {userId} = req.body
    const userData = await userModel.findById(userId).select('-password')
    res.json({success:true,userData})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message}) 
  }
  if (!userTofollow || !currentUser) {
    return res.json({success:false,message:"User not found"})  
  }
}
//API To update user profile
const updateProfile = async(req,res)=>{
  try {
    const {name,username,email,profilePicture} = req.body
    const imageFile = req.file
    if (!name || !username || !email  || !profilePicture) {
      return res.json({success:false,message:"Data Missing"})
    }
    await userModel.findByIdAndUpdate(userId,{name,username,email:JSON})
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
      const imageURL = imageUpload.secure_url
      await userModel.findByIdAndUpdate(userId,{profilePicture:imageURL})
    }
    res.json({success:true,message:"Profile Updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message}) 
  }
}
export {
    registerUser,loginUser,
    getProfile,updateProfile,
    followUser,unFollowUser
}