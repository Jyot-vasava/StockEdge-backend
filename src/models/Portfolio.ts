import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    symbol: String,
    side: { type: String, enum: ['buy', 'sell'] },
    quantity: Number,
    price: Number,
    tradedAt: Date,
  },
  { _id: false },
)

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    name: { type: String, default: 'Core Portfolio' },
    holdings: [
      {
        symbol: String,
        exchange: { type: String, enum: ['NSE', 'BSE'], default: 'NSE' },
        quantity: Number,
        averagePrice: Number,
        currentPrice: Number,
        sector: String,
      },
    ],
    transactions: [transactionSchema],
    analytics: {
      xirr: Number,
      beta: Number,
      riskScore: Number,
      concentrationRisk: String,
    },
  },
  { timestamps: true },
)

export const Portfolio = mongoose.model('Portfolio', portfolioSchema)
