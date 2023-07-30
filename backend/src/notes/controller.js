const dbHelper = require('./dbHelper');
const notesViewModel = require('./viewModel');

const controller = {}
controller.create = async (req) => {
    try {
        const viewModel = notesViewModel.createViewModel(req);
        return await dbHelper.create(viewModel);
    } catch (error) {
        return  Promise.reject(error)
    }
}

controller.updateById = async (req) => {
    try {
        const viewModel = userViewModel.updateViewModel(req);
        return await dbHelper.updateById(req.params.userId,req.params.notesId,viewModel);
    } catch (error) {
        return   Promise.reject(error)
    }
}

controller.getNotesByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.getNotesByUserId(req.params.userId);
    } catch (error) {
        return  Promise.reject(error)
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
controller.deleteNotesByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteNotesByUserId(req.params.userId);
    } catch (error) {
        return   Promise.reject(error)
    }
}

controller.deleteNotesByNotesId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteNotesByNotesId(req.params.userId);
    } catch (error) {
        return  Promise.reject(error)
    }
}
module.exports = controller;