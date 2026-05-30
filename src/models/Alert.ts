import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    symbol: String,
    type: { type: String, enum: ['price', 'volume', 'news', 'technical'] },
    condition: String,
    threshold: Number,
    isActive: { type: Boolean, default: true },
    lastTriggeredAt: Date,
  },
  { timestamps: true },
)

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: String,
    body: String,
    severity: { type: String, enum: ['info', 'success', 'warning', 'critical'], default: 'info' },
    readAt: Date,
  },
  { timestamps: true },
)

export const Alert = mongoose.model('Alert', alertSchema)
export const Notification = mongoose.model('Notification', notificationSchema)
