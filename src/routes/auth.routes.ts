import { Router } from 'express'
import { forgotPassword, googleAuth, login, register, verifyOtp } from '../controllers/auth.controller'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/google', googleAuth)

export default router
