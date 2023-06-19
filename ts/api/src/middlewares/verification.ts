import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import { type User } from '../repo/users'

const secretAccess = process.env.JWT_AUTH_ACCESS_SECRET

export interface NewRequest extends Request {
  authData?: User
}

export const verifyAuthToken = (req: NewRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (authorization) {
    const authToken = authorization.split(' ')[1]

    if (!secretAccess) return res.status(400).json({ error: 'error occured' })

    jwt.verify(authToken, secretAccess, (err, authData) => {
      if (err != null) {
        return res.status(401).json({ error: 'invalid or expired token' })
      } else {
        req.authData = authData as User
        next()
      }
    })
  } else {
    return res.status(401).json({ error: 'you are not signed in' })
  }
}
