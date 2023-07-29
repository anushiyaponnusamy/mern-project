const userViewModel = {}

userViewModel.createViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    viewModel.title = body.title;
    viewModel.userId = body.userId;
    viewModel.description = body.description;
    if(body.tag){
    viewModel.tag = body.tag;
    }
    return viewModel
}
userViewModel.updateViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    if( body.title){
        viewModel.title = body.title;
    }
    if( body.description){
        viewModel.description = body.description;
    }
    if(body.tag){
        viewModel.tag = body.tag;
        }
    return viewModel
}
module.exports = userViewModel;