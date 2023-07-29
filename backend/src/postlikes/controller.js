const dbHelper = require('./dbHelper');
const notesViewModel = require('./viewModel');

const controller = {}
controller.create = async (req) => {
    try {
        const viewModel = notesViewModel.createViewModel(req);
        return await dbHelper.create(viewModel);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.updateById = async (req) => {
    try {
        // const viewModel = userViewModel.updateViewModel(req);
        return await dbHelper.updateById(req.params.userId,req.params.postId);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.getLikesByPostId = async (req) => {
    try {
        if (!req.params.postId) return "field required";
        return await dbHelper.getLikesByPostId(req.params.postId);
    } catch (error) {
        Promise.reject(error)
    }
}

controller.getLikesByUserIdAndPostId = async (req) => {
    try {
        if (!req.params.userId && !req.params.postId) return "field required";
        return await dbHelper.getLikesByUserIdAndPostId(req.params.userId,req.params.postId);
    } catch (error) {
        Promise.reject(error)
    }
}
module.exports = controller;