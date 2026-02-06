import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Ise hum bcrypt se hash karenge
});

export const Admin = mongoose.model('Admin', adminSchema);