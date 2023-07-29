const userViewModel = {}

userViewModel.createViewModel = (req,password) => {
    const { body } = req;
    const viewModel = {}
    viewModel.userName = body.userName;
    viewModel.email = body.email;
    viewModel.password = password;
    return viewModel
}
userViewModel.updateViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    if( body.userName){
        viewModel.userName = body.userName;
    }
    if( body.email){
    viewModel.email = body.email;
    }
    if( body.password){
        viewModel.password = body.password;
    }
    return viewModel
}
module.exports = userViewModel;