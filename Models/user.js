import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true },
  domain: { type: String, required: true },
  available: { type: Boolean, default: true },
});

export default mongoose.model("user", userSchema);
