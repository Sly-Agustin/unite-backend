import mongoose from "mongoose";

const gamePictureSchema = new mongoose.Schema({
  length: { type: Number },
  chunkSize: { type: Number },
  uploadDate: { type: Date },
  filename: { type: String, trim: true, searchable: true },
}, { collection: 'gamePicture.files', id: false });

export const GamePictureSchema = new mongoose.model('gamePicture', gamePictureSchema);