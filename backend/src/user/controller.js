
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbHelper = require('./dbHelper');
const userViewModel = require('./viewModel');
const jwtSecretKey = require('../../enum');
const ONE_MONTH_IN_SECONDS = 30 * 24 * 60 * 60; 

const controller = {}
controller.create = async (req) => {
    try {
        const { email, password } = req.body;
        const existingUser = await dbHelper.emailExists(email)
        if (existingUser) {
            return 'Email already exists';
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const viewModel = userViewModel.createViewModel(req, hashedPassword);
        const result = await dbHelper.create(viewModel);
        const token = jwt.sign({ userId: result._id }, jwtSecretKey, { expiresIn: ONE_MONTH_IN_SECONDS });
        return { ...result, token }
    } catch (error) {
        return  Promise.reject(error)
    }
}
// Route to handle user login
controller.login=async (req) => {
    const { email, password } = req.body;
  
    try {
      const user = await dbHelper.emailExists(email );
      if (!user) {
        return 'Invalid credentials';
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return 'Invalid credentials';
      }
  
      // Generate and send JWT token
      const token = jwt.sign({ userId: user._id },jwtSecretKey, { expiresIn: ONE_MONTH_IN_SECONDS });
      return{...user._doc, token };
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
controller.updateById = async () => {
    try {
        const viewModel = userViewModel.updateViewModel(req);
        return await dbHelper.updateById(viewModel);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllUsers = async (req) => {
    try {
        return await dbHelper.getAllUsers(req.params.pageNumber,req.params.pagePerSize);
    } catch (error) {
        return  Promise.reject(error)
    }
}

controller.getUserByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.getUserByUserId(req.params.userId);
    } catch (error) {
        return  Promise.reject(error)
    }
}

controller.deleteUserByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteUserByUserId(req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = controller;