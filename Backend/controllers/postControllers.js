import postModel from "../modules/postModel.js";
import userModel from "../modules/userModel.js";

 const createPost = async(req,res)=>{
    try {
      const newPost = new postModel(req.body);
      await newPost.save();
      res.json({success:true,newPost})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
    }
  }
  const allPost = async(req,res)=>{
    try {
      const posts = await postModel.find().populate('user','username','profilePicture').populate('likes','comments.username');
      if(!posts){
        res.json({status:true,message:"Post Not Found"})
      }
      const totalLikes = posts.likes?.length || 0;
      const totalComments = posts.comments?.length || 0;

      //get list of users who liked the post
      const likedusers = posts.likes?.map(like=>like.user.username) || 0
      //get list of users who liked the post
      const commentusers = posts.comments?.map(comment=>comment.user.username) || 0

      res.json({status:true,
        data:posts,
        likePost,
        likedusers,
        commentusers,
        totalComments,
        totalComments,
        totalLikes
      })
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
    }
  }
  const likePost = async(req,res)=>{
    try {
      const post = await postModel.findById(req.params.id)
      const user = await userModel.findById(req.params.id)
      if (!post || ! user) {
        res.json({success:false,message:"Post or User Not found"}) 

      }
      if (!post.likes.includes(req.params.id)) {
        await post.updateOne({$push:{likes:req.body.userId}})
        res.json({success:true,message:"Liked"}) 
      }else{
        res.json({success:false,message:"You Already like this post"}) 
      }
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
    }
  }
  export {
    createPost,likePost,allPost
}