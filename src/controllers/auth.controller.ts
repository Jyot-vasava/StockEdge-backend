import bcrypt from 'bcrypt'
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { ApiError } from '../utils/apiError'

function signToken(id: string, role: string) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET ?? 'stockedge-dev-secret', { expiresIn: '7d' })
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body
  if (!name || !email || !password) throw new ApiError(400, 'Name, email, and password are required')

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await User.create({ name, email, passwordHash })
  const token = signToken(user.id, user.role)
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).status(201).json({ user, token })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new ApiError(401, 'Invalid credentials')

  const token = signToken(user.id, user.role)
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json({ user, token })
}

export async function forgotPassword(_req: Request, res: Response) {
  res.json({ message: 'OTP delivery queued for password reset' })
}

export async function verifyOtp(_req: Request, res: Response) {
  res.json({ message: 'OTP verified' })
}

export async function googleAuth(_req: Request, res: Response) {
  res.json({ message: 'Google OAuth callback placeholder ready for provider integration' })
}
