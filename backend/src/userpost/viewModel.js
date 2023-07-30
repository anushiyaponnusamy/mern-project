const userViewModel = {}

userViewModel.createViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    viewModel.image = body.image;
    viewModel.userId = body.userId;
    viewModel.userName = body.userName;
    // viewModel.profilePhoto = body.profilePhoto;
    viewModel.description = body.description;
    viewModel.type = body.type;
    viewModel.aspectRatio=body.aspectRatio;
    if (body.tag) {
        viewModel.tag = body.tag;
    }
    return viewModel
}
userViewModel.updateViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    if (body.description) {
        viewModel.description = body.description;
    }
    return viewModel
}
module.exports = userViewModel;