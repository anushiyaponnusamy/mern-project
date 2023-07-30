const PostSchema=require('./model')
const likeDbHelper=require('../postlikes/dbHelper');
const { reset } = require('nodemon');
const dbHelper={}

dbHelper.create=async(req)=>{
    try {
        const obj=new PostSchema(req);
        return await obj.save();
    } catch (error) {
        return  Promise.reject(error)
    }
}

dbHelper.updateById=async(userId,postId,viewModel)=>{
    try {
        return await PostSchema.updateOne({_id:postId,userId},{$set:{...viewModel}})
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.delete=async(userId,postId)=>{
    try {
        return await PostSchema.updateOne({_id:postId,userId},{active:false})
    } catch (error) {
        return Promise.reject(error)
    }
}


dbHelper.hasLiked=async(postId,userId)=>{
    try {
        return await likeDbHelper.hasLiked(userId,postId);
        
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getAllImages=async (pageNumber,pagePerSize)=>{
    try {
        return await PostSchema.find({active:true}).select({
            _id:1,userId:1,aspectRatio:1,image:1
        }).sort({createdDate:-1}).skip((pageNumber-1)*pagePerSize).limit(pagePerSize);
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getUserByUserId=async (userId)=>{
    try {
      return PostSchema.findOne({_id:userId,active:true});
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getByPostId=async(postId)=>{
    try {
      return await PostSchema.findOne({_id:postId,active:true});
    } catch (error) {
        return  Promise.reject(error)
    }
}

dbHelper.getSelectedImageAndOtherRecommendations=async(postId,pageNumber,pagePerSize)=>{
    try {
        return await PostSchema.find({_id:{$nin:postId},active:true})
        .sort({createdDate:-1})
        .skip((pageNumber-1)*pagePerSize)
        .limit(pagePerSize);
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.deletePostByPostId=(userId)=>{
    try {
      return PostSchema.updateMany({_id:userId},{active:false});
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.deleteNotesByNotesIdAndUserId=(userId)=>{
    try {
      return PostSchema.updateMany({_id:userId},{active:false});
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports=dbHelper;