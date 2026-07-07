const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  videoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video', 
    required: true 
  }
}, { 
  timestamps: true 
});

likeSchema.index({ userId: 1, videoId: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;