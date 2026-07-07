const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  videoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true 
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;