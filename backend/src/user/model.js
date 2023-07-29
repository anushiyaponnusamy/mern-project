const Mongoose = require('mongoose');
const userSchema = new Mongoose.Schema({
  // idName:{
//like insta
  // },
  profilePhoto:{ 
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default:'general'
  },
  // soft delete
  active: {
    type: Boolean,
    default: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('user', userSchema);
