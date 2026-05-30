import { Router } from 'express'
import { adminOverview, moderateContent, users } from '../controllers/admin.controller'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()

router.use(requireAuth, requireRole('admin'))
router.get('/overview', adminOverview)
router.get('/users', users)
router.post('/moderation', moderateContent)

export default router
