import type { Request, Response } from 'express'
import { News, Ipo } from '../models/Content'
import { getMarketOverview, screenStocks } from '../services/marketService'

export async function overview(_req: Request, res: Response) {
  res.json(await getMarketOverview())
}

export async function screener(req: Request, res: Response) {
  res.json(await screenStocks(req.query as Record<string, string | undefined>))
}

export async function optionsChain(_req: Request, res: Response) {
  res.json({ symbol: 'NIFTY', expiry: 'weekly', pcr: 1.18, maxPain: 22600, strikes: [] })
}

export async function fiiDii(_req: Request, res: Response) {
  res.json({ fii: 1982, dii: 644, currency: 'INR crore', trend: 'net inflow' })
}

export async function ipoDashboard(_req: Request, res: Response) {
  const ipos = await Ipo.find().sort({ openDate: 1 }).limit(20).lean()
  res.json(ipos)
}

export async function newsFeed(_req: Request, res: Response) {
  const items = await News.find().sort({ publishedAt: -1 }).limit(30).lean()
  res.json(items)
}
