import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  }
);

export const RoleSchema = new mongoose.model('role', roleSchema);