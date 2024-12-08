import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 300000, // 5 minutes
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("ResetPassword", resetPasswordSchema);
