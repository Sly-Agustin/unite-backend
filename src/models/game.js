import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

export const GameSchema = new mongoose.model('game', gameSchema);