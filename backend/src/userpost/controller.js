const dbHelper = require('./dbHelper');
const postViewModel = require('./viewModel');
const likedbHelper=require('../postlikes/dbHelper');
const controller = {}
controller.create = async (req) => {
    try {
        const viewModel = postViewModel.createViewModel(req);
        return await dbHelper.create(viewModel);
    } catch (error) {
        return    Promise.reject(error)
    }
}

controller.getAllImages=async(req)=>{
    try {
        let liked=false;
        let all1=[]
        let all=await dbHelper.getAllImages(req.params.pageNumber,req.params.pagePerSize);
     for (let index = 0; index < all.length; index += 1) {
            const element = all[index];
            liked=await likedbHelper.hasLiked(all[index]._id,req.params.userId);
            const updatedElement = { ...element._doc, liked};
            all1.push(updatedElement);
          }
        return all1;
    } catch (error) {
     return Promise.reject(error)   
    }
}

controller.getSelectedImageAndOtherRecommendations=async(req)=>{
    try {
        if(!req.params.userId &&!req.params.postId && !req.params.pageNumber && !req.params.pagePerSize) return "field required";
        let arr=[];
        let arr2=[];
        let liked=false;
        let getByPostId=await dbHelper.getByPostId(req.params.postId);
        arr.push[getByPostId]
        const all=await dbHelper.getSelectedImageAndOtherRecommendations(req.params.postId,req.params.pageNumber,req.params.pagePerSize);
        arr.push(...all)
        if(arr.length>0)
        for (let index = 0; index < arr.length; index += 1) {
            const element = all[index];
            liked=await likedbHelper.hasLiked(arr[index]._id,req.params.userId);
            const updatedElement = { ...element._doc, liked};
            arr2.push(updatedElement);
          }
        return arr2;
    } catch (error) {
     return Promise.reject(error)   
    }
}
controller.updateById = async (req) => {
    try {
        const viewModel = postViewModel.updateViewModel(req);
        return await dbHelper.updateById(req.params.userId,req.params.postId,viewModel);
    } catch (error) {
        return Promise.reject(error)
    }
}
controller.delete = async (req) => {
    try {
        return await dbHelper.delete(req.params.userId,req.params.postId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getNotesByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.getNotesByUserId(req.params.userId);
    } catch (error) {
        return   Promise.reject(error)
    }
}

controller.getNotesByNotesIdAndUserId = async (req) => {
    try {
        if (!req.params.userId && !req.params.notesId) return "field required";
        return await dbHelper.getNotesByNotesIdAndUserId(req.params.userId,req.params.notesId);
    } catch (error) {
        return  Promise.reject(error)
    }
}
controller.deletePostByPostId = async (req) => {
    try {
        if (!req.params.postId) return "field required";
        return await dbHelper.deletePostByPostId(req.params.postId);
    } catch (error) {
        return  Promise.reject(error)
    }
}

controller.deleteNotesByNotesId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteNotesByNotesId(req.params.userId);
    } catch (error) {
        return   Promise.reject(error)
    }
}
module.exports = controller;