const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  firstName: { type: String, required: true, maxLength: 30, trim: true },
  lastName: { type: String, maxLength: 30, trim: true },
  profilePic: { type: String, },
  publicId: { type: String },
  bio: { type: String },
  interest: { type: String },
  location: { type: String },
  hireable: { type: Boolean, default: false },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  imageLikeCount: {
    type: Number,
    default: 0
  },
  collectionsCount: {
    type: Number,
    default: 0
  },
  socialMediaHandles: {
    type: Map,
    of: String
  }
}, {toJSON: {virtuals: true}})

// virtual property to get full name 
userSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName}`
});

// text indexing to search users 
userSchema.index({
  firstName: 'text',
  lastName: 'text',
  username: 'text'
})

const User = mongoose.model('User', userSchema);
module.exports = User;