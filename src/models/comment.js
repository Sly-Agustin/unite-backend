import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  body: {
    type: String,
  },
  modified: {
    type: boolean,
    default: false
  }
}, {timestamps: true});

export const CommentSchema = new mongoose.model('comment', commentSchema);