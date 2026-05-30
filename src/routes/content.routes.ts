import { Router } from 'express'
import { aiSummary, blogs, createNews } from '../controllers/content.controller'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()

router.get('/blogs', blogs)
router.post('/news', requireAuth, requireRole('admin', 'analyst'), createNews)
router.post('/ai-summary', requireAuth, aiSummary)

export default router
