import { Router } from 'express'
import { createAlert, myPortfolio, notifications, saveWatchlist } from '../controllers/portfolio.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.use(requireAuth)
router.get('/', myPortfolio)
router.put('/watchlist', saveWatchlist)
router.post('/alerts', createAlert)
router.get('/notifications', notifications)

export default router
