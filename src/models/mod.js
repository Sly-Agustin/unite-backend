import mongoose, { Schema } from "mongoose";

const modSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  gameId: {
    type: mongoose.Types.ObjectId,
    ref: 'game'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ],
  picture: {
    type: mongoose.Types.ObjectId,
    ref: 'modPicture'
  }
})

export const ModSchema = new mongoose.model('mod', modSchema)