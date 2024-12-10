import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants/regex.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => {
        const emailRegex = EMAIL_REGEX;

        return emailRegex.test(email);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  roles: {
    type: [String],
    default: ["USER"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  profileImageUrl: String,
});

export default mongoose.model("User", userSchema);
