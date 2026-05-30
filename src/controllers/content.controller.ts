import type { Request, Response } from 'express'
import { Blog, News } from '../models/Content'

export async function blogs(_req: Request, res: Response) {
  res.json(await Blog.find({ status: 'published' }).sort({ createdAt: -1 }).lean())
}

export async function createNews(req: Request, res: Response) {
  const news = await News.create(req.body)
  res.status(201).json(news)
}

export async function aiSummary(_req: Request, res: Response) {
  res.json({
    summary: 'AI summary engine placeholder. Connect OpenAI or your preferred model provider here.',
    sentiment: 'neutral',
    impact: 'medium',
  })
}
