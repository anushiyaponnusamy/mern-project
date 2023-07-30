const LikesSchema=require('./model')
const dbHelper={}

dbHelper.create=(req)=>{
    try {
        const obj=new LikesSchema(req);
        return obj.save();
    } catch (error) {
        return  Promise.reject(error)
    }
}

dbHelper.updateById=(userId,postId)=>{
    try {
        return LikesSchema.updateOne({postId,userId},{active:false})
    } catch (error) {
        return  Promise.reject(error)
    }
}


dbHelper.getLikesByUserIdAndPostId=async(userId,postId)=>{
    try {
      return await LikesSchema.findOne({userId,postId,active:true});
    } catch (error) {
        return  Promise.reject(error)
    }
}
dbHelper.hasLiked=async(postId,userId)=>{
    try {
      const res= await LikesSchema.findOne({userId,postId,active:true});
if(res &&res!==null){
return true;
}
return false
    } catch (error) {
        return  Promise.reject(error)
    }
}


dbHelper.getLikesByPostId=(postId)=>{
    try {
      return LikesSchema.find({postId,active:true});
    } catch (error) {
        return  Promise.reject(error)
    }
}

module.exports=dbHelper;