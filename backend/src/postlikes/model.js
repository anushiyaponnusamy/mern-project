const Mongoose = require('mongoose');
const mainSchema = new Mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  // soft delete
  postId: {
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
  active:{
    type:Boolean,
    required:true
  }
});

module.exports = Mongoose.model('likes', mainSchema);
