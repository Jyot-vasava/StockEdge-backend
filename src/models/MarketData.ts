import mongoose from 'mongoose'

const marketDataSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, index: true },
    exchange: { type: String, enum: ['NSE', 'BSE'], required: true },
    price: Number,
    changePercent: Number,
    volume: Number,
    sector: String,
    ohlc: {
      open: Number,
      high: Number,
      low: Number,
      close: Number,
    },
    technicals: {
      rsi: Number,
      macd: Number,
      ema20: Number,
      sma50: Number,
    },
    sentiment: { type: String, enum: ['bullish', 'neutral', 'bearish'], default: 'neutral' },
  },
  { timestamps: true },
)

export const MarketData = mongoose.model('MarketData', marketDataSchema)
