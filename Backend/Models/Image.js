const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publicId : {type: String, required: true},
  imageUrl : {type: String, required: true},
  description : {type: String, default: ''},
  height: Number,
  width: Number,
  location : {type: String, default: ''},
  likes : {type: Number, default: 0},
  views : {type: Number, default: 0},
  downloads : {type: Number, default: 0},
  tags : {type: String, required: true},
  
  createdAt : {
    type : Date,
    default : Date.now
  },
})

// text index with different field weights(weights must be in whole numbers)
imageSchema.index(
  {
    description: 'text',
    tags: 'text',
    location: 'text',
  },
  {
    weights: {
      description: 4,   // Higher weight for 'description'
      tags: 3,          // Moderate weight for 'tags'
      location: 1,    // Lower weight for 'location'
    },
  }
);

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;