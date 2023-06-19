import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { getUserByEmialFromDB, updateUserPassword, addUserToDB, type User } from '../repo/users'
import { execute } from '../db/mysql.connector'
import { type NewRequest } from '../middlewares/verification'

const secretAccess = process.env.JWT_AUTH_ACCESS_SECRET
const secret = process.env.JWT_AUTH_SECRET

/**
 * @openapi
 * '/api/v1/signup':
 *  post:
 *     tags:
 *       - User / Auth
 *     security:
 *       - bearerAuth: []
 *     summary: User signup
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - first_name
 *              - last_name
 *              - email
 *              - password
 *              - phone
 *            properties:
 *              username:
 *                type: string
 *                default: jon
 *              first_name:
 *                type: string
 *                default: john
 *              last_name:
 *                type: string
 *                default: doe
 *              email:
 *                type: email
 *                default: 'myname@mycompany.com'
 *              password:
 *                type: string
 *                default: jjdskdwe324
 *              phone:
 *                type: string
 *                default: '+351966824893'
 *     responses:
 *      200:
 *        description: Login successful
 *      401:
 *        description: Invalid token
 *      409:
 *        description: User already exists on platform
 *
 */
export const signUp = (req: NewRequest, res: Response) => {
  const { username, first_name, last_name, email, password, phone } = req.body

  getUserByEmialFromDB(email)
    .then((userData) => {
      if (userData.length > 0) { return res.status(409).json({ status: 'error', error: 'user with same email already exists' }) }

      addUserToDB<{ insertId: number }>({ username, first_name, last_name, email, password, phone })
        .then((data) => {
          const user = {
            id: data.insertId, username, first_name, last_name, email, phone,
          }

          if (!secretAccess || !secret) return res.status(400).json({ error: 'error occured' })
    
          const accessToken = jwt.sign(user, secretAccess, { expiresIn: '1h' })
          const token = jwt.sign(user, secret, { expiresIn: '30d' })
    
          return res.status(201).json({ accessToken, token, status: 'success' })
        })
        .catch((err) => {
          return res.status(400).json({ status: 'error', error: 'Error signing up user' })
        })
    })
    .catch(() => res.status(400).json({ status: 'error', error: 'Error signing up user' }))
}

/**
 * @openapi
 * '/api/v1/login':
 *  post:
 *     tags:
 *     - User / Auth
 *     summary: Login to the platform
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: email
 *                default: 'myname@mycompany.com'
 *              password:
 *                type: string
 *                default: jjdskdwe324
 *     responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/loginResponse'
 *      401:
 *        description: Invalid email or password
 */
export const signInUser = (req: Request, res: Response) => {
  const { email, password } = req.body

  execute<User[]>('SELECT * FROM users WHERE email=?;', [email.toLowerCase()])
    .then((data) => {
      if (data.length === 0) return res.status(401).json({ status: 'failed', error: 'incorrect credentials or user not found' })

      const user = data[0]
      const { id, username, first_name, last_name, email, phone } = user
      const authenticated = bcrypt.compareSync(password, user.password)

      if (!authenticated) {
        return res.status(401).json({ status: 'failed', error: 'incorrect email or password' })
      }

      const temp: Omit<User, 'password'> = { id, username, first_name, last_name, email, phone }

      if (!secretAccess || !secret) return res.status(400).json({ error: 'error occured' })

      const accessToken = jwt.sign(temp, secretAccess, { expiresIn: '1h' })
      const token = jwt.sign(temp, secret, { expiresIn: '30d' })

      return res.status(200).json({ accessToken, token, status: 'success' })
    })
    .catch(() => res.status(400).json({ status: 'failed', error: 'error signing in' }))
}

/**
 * @openapi
 * '/api/v1/auth/refresh':
 *  post:
 *     tags:
 *       - User / Auth
 *     security:
 *       - bearerAuth: []
 *     summary: Refresh auth token
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Token refresh successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/refreshedTokenResponse'
 *      401:
 *        description: Invalid email or password
 */
export const refreshToken = (req: Request, res: Response) => {
  const { authorization } = req.headers

  if (authorization) {
    const authToken = authorization.split(' ')[1]
    if (!secret) return res.status(400).json({ error: 'error occured' })

    jwt.verify(authToken, secret, (err, authData) => {
      if (err != null) {
        return res.status(401).json({ error: 'invalid or expired token' })
      } else {
        const { id, username, first_name, last_name, email, phone } = authData as User
        const temp = { id, username, first_name, last_name, email, phone }
        return res.status(200).json({ accessToken: jwt.sign(temp, secret, { expiresIn: '1h' }) })
      }
    })
  } else {
    return res.status(401).json({ error: 'you are not signed in' })
  }
}

/**
 * @openapi
 * '/api/v1/users/password':
 *  patch:
 *     tags:
 *       - User / Auth
 *     security:
 *       - bearerAuth: []
 *     summary: Reset password after onboarding
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *                default: 'password123'
 *              newPassword:
 *                type: string
 *                default: password456
 *     responses:
 *      200:
 *        description: Password reset successful
 *      401:
 *        description: Invalid email or password
 */
export const updatePassword = async (req: NewRequest, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body
    if (req.authData == null) return res.status(400).json({ error: 'error occured' })
    const { id, email } = req.authData
    const [user] = await getUserByEmialFromDB(email)
    const { password } = user
    if (!user) return res.status(404).json({ error: 'user not found' })
    const valid = bcrypt.compareSync(oldPassword, password)
    if (!valid) return res.status(401).json({ error: 'wrong old password' })
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(newPassword, salt)

    await updateUserPassword(id, hash)
    return res.status(200).json({ status: 'password update successful' })
  } catch (error) {
    return res.status(400).json({ error: 'invalid request' })
  }
}
