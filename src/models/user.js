import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true
    },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: mongoose.Types.ObjectId,
      ref: 'profilePictureSchema'
    }
  }
)

module.exports = new mongoose.model('user', userSchema);