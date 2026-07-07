const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  uploaderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  videoUrl: { 
    type: String, 
    required: true // e.g., "/uploads/videos/gameplay.mp4"
  },
  thumbnailUrl: { 
    type: String, 
    required: true // e.g., "/uploads/thumbnails/gameplay_thumb.jpg"
  },
  views: { 
    type: Number, 
    default: 0 
  },
  likeCount: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true 
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;