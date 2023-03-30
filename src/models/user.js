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
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
      }
    ],
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

export const UserSchema = new mongoose.model('user', userSchema);