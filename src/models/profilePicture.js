const profilePictureSchema = new mongoose.Schema({
  length: { type: Number },
  chunkSize: { type: Number },
  uploadDate: { type: Date },
  filename: { type: String, trim: true, searchable: true },
}, { collection: 'profilePicture.files', id: false });

const Track = mongoose.model('profilePicture', profilePictureSchema);