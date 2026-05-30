import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError'

export type AuthRole = 'user' | 'admin' | 'analyst'

export interface AuthRequest extends Request {
  user?: { id: string; role: AuthRole }
}

export function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = req.cookies?.token ?? req.header('Authorization')?.replace('Bearer ', '')
  if (!token) throw new ApiError(401, 'Authentication required')

  const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'stockedge-dev-secret') as { id: string; role: AuthRole }
  req.user = { id: payload.id, role: payload.role }
  next()
}

export function requireRole(...roles: AuthRole[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) throw new ApiError(403, 'Insufficient permissions')
    next()
  }
}
