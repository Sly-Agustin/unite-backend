import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: mongoose.Types.ObjectId,
    ref: 'gamePicture.files'
  }
})

export const GameSchema = new mongoose.model('game', gameSchema);