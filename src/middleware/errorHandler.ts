import type { ErrorRequestHandler } from 'express'
import { ApiError } from '../utils/apiError'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500
  res.status(statusCode).json({
    success: false,
    message: error instanceof Error ? error.message : 'Unexpected server error',
  })
}
