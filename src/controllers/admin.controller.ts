import type { Request, Response } from 'express'
import { Blog, News } from '../models/Content'
import { User } from '../models/User'

export async function adminOverview(_req: Request, res: Response) {
  const [users, blogs, news] = await Promise.all([User.countDocuments(), Blog.countDocuments(), News.countDocuments()])
  res.json({ users, subscriptions: { free: 0, pro: 0, institutional: 0 }, blogs, news, system: { status: 'healthy' } })
}

export async function users(_req: Request, res: Response) {
  res.json(await User.find().select('-passwordHash -otpHash').limit(100).lean())
}

export async function moderateContent(req: Request, res: Response) {
  res.json({ message: 'Content moderation action recorded', target: req.body.target, action: req.body.action })
}
