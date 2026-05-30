import { Router } from 'express'
import { fiiDii, ipoDashboard, newsFeed, optionsChain, overview, screener } from '../controllers/market.controller'

const router = Router()

router.get('/overview', overview)
router.get('/screener', screener)
router.get('/options-chain', optionsChain)
router.get('/fii-dii', fiiDii)
router.get('/ipos', ipoDashboard)
router.get('/news', newsFeed)

export default router
