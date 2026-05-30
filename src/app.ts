import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.routes'
import marketRoutes from './routes/market.routes'
import portfolioRoutes from './routes/portfolio.routes'
import contentRoutes from './routes/content.routes'
import adminRoutes from './routes/admin.routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') ?? true, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'stockedge-api', uptime: process.uptime() })
})

app.use('/api/auth', authRoutes)
app.use('/api/market', marketRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

export default app
