// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    phone: {
      type: String,
    },
    contactPreference: {
      type: String,
      enum: ['Email', 'Phone', 'Text'],
      default: 'Email',
    },
    goals: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
