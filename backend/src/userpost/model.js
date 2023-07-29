const Mongoose = require('mongoose');
const mainSchema = new Mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  userName:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  aspectRatio:{
    type:String,
  },
  profilePhoto:{
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  // soft delete
  active: {
    type: Boolean,
    default: true,
  },
  tag:[],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('posts', mainSchema);
