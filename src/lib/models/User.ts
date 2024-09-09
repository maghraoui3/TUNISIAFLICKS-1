import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  emailVerified: { type: Boolean, default: false },
  image: { type: String },
  bio: { type: String },
  birthdate: { type: Date },
  country: { type: String },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
