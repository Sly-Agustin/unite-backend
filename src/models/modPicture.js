const modPictureSchema = new mongoose.Schema({
  length: { type: Number },
  chunkSize: { type: Number },
  uploadDate: { type: Date },
  filename: { type: String, trim: true, searchable: true },
}, { collection: 'modPicture.files', id: false });

const Track = mongoose.model('modPicture', modPictureSchema);