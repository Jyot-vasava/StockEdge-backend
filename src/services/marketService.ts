import { MarketData } from '../models/MarketData'

const fallbackQuotes = [
  { symbol: 'RELIANCE', exchange: 'NSE', price: 2942.4, changePercent: 1.42, volume: 9182600, sector: 'Energy', sentiment: 'bullish' },
  { symbol: 'HDFCBANK', exchange: 'NSE', price: 1683.75, changePercent: 0.91, volume: 7422100, sector: 'Banking', sentiment: 'bullish' },
  { symbol: 'TCS', exchange: 'NSE', price: 3876.2, changePercent: -0.31, volume: 2219000, sector: 'IT', sentiment: 'neutral' },
]

export async function getMarketOverview() {
  const quotes = await MarketData.find().sort({ updatedAt: -1 }).limit(20).lean()
  return {
    indices: [
      { name: 'NIFTY 50', value: 22624.8, changePercent: 0.82 },
      { name: 'SENSEX', value: 74502.12, changePercent: 0.76 },
      { name: 'BANKNIFTY', value: 48146.3, changePercent: 1.14 },
    ],
    quotes: quotes.length ? quotes : fallbackQuotes,
    marketMood: { score: 74, label: 'Risk-on', summary: 'Broad participation led by banks, infra, and energy.' },
  }
}

export async function screenStocks(query: Record<string, string | undefined>) {
  const limit = Math.min(Number(query.limit ?? 25), 100)
  return MarketData.find(query.sector ? { sector: query.sector } : {}).limit(limit).lean()
}
