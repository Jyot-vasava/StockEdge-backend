import mongoose from 'mongoose'

const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    name: { type: String, default: 'Primary Watchlist' },
    symbols: [
      {
        symbol: String,
        exchange: { type: String, enum: ['NSE', 'BSE'], default: 'NSE' },
        alertAbove: Number,
        alertBelow: Number,
        notes: String,
      },
    ],
  },
  { timestamps: true },
)

export const Watchlist = mongoose.model('Watchlist', watchlistSchema)
