import { type Request, type Response, type NextFunction } from 'express'
import { param, body, validationResult } from 'express-validator'

export const validateUser = () => {
  return [
    body('username').optional().trim().isAlpha().toLowerCase().escape(),
    body('first_name').notEmpty().trim().isAlpha().toLowerCase().escape(),
    body('last_name').notEmpty().trim().isAlpha().toLowerCase().escape(),
    body('email').notEmpty().trim().isEmail().toLowerCase().escape(),
    body('password').notEmpty().trim(),
    body('phone').optional().trim().isString().isLength({ min: 9, max: 13 }).escape()
  ]
}

export const validateLogin = () => {
  return [
    body('email').notEmpty().trim().isEmail().toLowerCase(),
    body('password').notEmpty()
  ]
}

export const validateChangePassword = () => {
  return [
    body('oldPassword').exists().isString().trim(),
    body('newPassword').exists().trim().isStrongPassword()
  ]
}

export const validateCreateFavorite = () => {
  return [
    body('asteroid').notEmpty().isNumeric(),
  ]
}

export const validateIdParam = () => {
  return [param('id').notEmpty().isNumeric()]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const valResult = validationResult(req)
  if (!valResult.isEmpty()) {
    return res.status(422).json({ error: valResult.array() })
  }

  next()
}
