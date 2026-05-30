import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth'
import { Alert, Notification } from '../models/Alert'
import { Portfolio } from '../models/Portfolio'
import { Watchlist } from '../models/Watchlist'

export async function myPortfolio(req: AuthRequest, res: Response) {
  const portfolio = await Portfolio.findOne({ userId: req.user?.id }).lean()
  res.json(portfolio ?? { holdings: [], transactions: [], analytics: {} })
}

export async function saveWatchlist(req: AuthRequest, res: Response) {
  const watchlist = await Watchlist.findOneAndUpdate(
    { userId: req.user?.id, name: req.body.name ?? 'Primary Watchlist' },
    { $set: { symbols: req.body.symbols ?? [] } },
    { upsert: true, new: true },
  )
  res.json(watchlist)
}

export async function createAlert(req: AuthRequest, res: Response) {
  const alert = await Alert.create({ ...req.body, userId: req.user?.id })
  res.status(201).json(alert)
}

export async function notifications(req: AuthRequest, res: Response) {
  res.json(await Notification.find({ userId: req.user?.id }).sort({ createdAt: -1 }).limit(50).lean())
}
