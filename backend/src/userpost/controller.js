const dbHelper = require('./dbHelper');
const postViewModel = require('./viewModel');

const controller = {}
controller.create = async (req) => {
    try {
        const viewModel = postViewModel.createViewModel(req);
        return await dbHelper.create(viewModel);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.getAllImages=async(req)=>{
    try {
        const all=await dbHelper.getAllImages(req.params.pageNumber,req.params.pagePerSize);
        for(let i=0;i<all.length;i+=1){
            all[i].liked=await dbHelper.hasLiked(all[i]._id,req.params.userId)
        }
        return all;
    } catch (error) {
     Promise.reject(error)   
    }
}

controller.updateById = async (req) => {
    try {
        const viewModel = postViewModel.updateViewModel(req);
        return await dbHelper.updateById(req.params.userId,req.params.postId,viewModel);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.getNotesByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.getNotesByUserId(req.params.userId);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.getNotesByNotesIdAndUserId = async (req) => {
    try {
        if (!req.params.userId && !req.params.notesId) return "field required";
        return await dbHelper.getNotesByNotesIdAndUserId(req.params.userId,req.params.notesId);
    } catch (error) {
        Promise.reject(error)
    }
}
controller.deleteNotesByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteNotesByUserId(req.params.userId);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.deleteNotesByNotesId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteNotesByNotesId(req.params.userId);
    } catch (error) {
        Promise.reject(error)
    }
}
module.exports = controller;