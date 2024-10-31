const addComment = async(req,res)=>{
    try {
      const newComment = new commentModel ({user:req.body.userId,user:req.body.postId,content:req.body.content});
      await newComment.save();
      res.json({success:true,newComment})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
    }
  }
  const allComment = async(req,res)=>{
    try {
      const comments = await postModel.find().populate('user','username','profilePicture').populate('post');
      res.json({status:true,comments})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
    }
  }
  export {addComment,allComment}