const PostSchema=require('./model')
const likeDbHelper=require('../postlikes/dbHelper')
const dbHelper={}

dbHelper.create=(req)=>{
    try {
        const obj=new PostSchema(req);
        return obj.save();
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.updateById=(userId,postId,viewModel)=>{
    try {
        return PostSchema.updateOne({postId,userId},{$set:{...viewModel}})
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.hasLiked=async(postId,userId)=>{
    try {
        const res= await likeDbHelper.getLikesByUserIdAndPostId(userId,postId);
        if(res){
         return true
        }
        return false
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.getAllImages=(pageNumber,pagePerSize)=>{
    try {
        return PostSchema.find({active:true}).select({
            _id:1,userId:1,aspectRatio:1,image:1
        }).skip((pageNumber-1)*pagePerSize).limit(pagePerSize);
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.getUserByUserId=(userId)=>{
    try {
      return PostSchema.findOne({_id:userId,active:true});
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.getNotesByNotesIdAndUserId=(userId,notesId)=>{
    try {
      return PostSchema.findOne({_id:notesId,userId,active:true});
    } catch (error) {
        Promise.reject(error)
    }
}
dbHelper.getNotesByUserId=(userId)=>{
    try {
      return PostSchema.findOne({_id:userId,active:true});
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.deleteNotesByUserId=(userId)=>{
    try {
      return PostSchema.updateMany({_id:userId},{active:false});
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.deleteNotesByNotesIdAndUserId=(userId)=>{
    try {
      return PostSchema.updateMany({_id:userId},{active:false});
    } catch (error) {
        Promise.reject(error)
    }
}

module.exports=dbHelper;