import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: false },
  password: { type: String, required: false },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
