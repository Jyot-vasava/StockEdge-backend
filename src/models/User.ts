import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'analyst'], default: 'user' },
    plan: { type: String, enum: ['free', 'pro', 'institutional'], default: 'free' },
    googleId: String,
    otpHash: String,
    otpExpiresAt: Date,
    preferences: {
      theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
      defaultExchange: { type: String, enum: ['NSE', 'BSE'], default: 'NSE' },
    },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
