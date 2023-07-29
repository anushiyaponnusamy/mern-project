const Mongoose = require('mongoose');
const mainSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  // soft delete
  description: {
    type: Boolean,
    default: true,
  },
  tag: {
    type: String,
    default: 'general',
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

module.exports = Mongoose.model('note', mainSchema);
