import mongoose from "mongoose";
import { UserDocument } from "../types";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  last_login: {
    type: Date,
  },
});

export default mongoose.models.User ||
  mongoose.model<UserDocument>("User", userSchema);
