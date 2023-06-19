import { type Request, type Response } from 'express'
import { addFavoriteToDB, deleteFavoriteInDB, fetchFavoritesFromDB, getFavoriteFromDB } from '../repo/favorites'
import { type NewRequest } from '../middlewares/verification'

/**
 * @openapi
 * '/api/v1/favorites':
 *  get:
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     summary: get a list of favorites
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Invalid token
 *
 */
export const getAllFavorites = async (req: NewRequest, res: Response) => {
  try {
    const user = req.authData?.id
    if (!user) return res.status(400).json({ error: 'invalid request' })
    const favorites = await fetchFavoritesFromDB({ ...req.query, user })
    return res.status(200).json(favorites)
  } catch (error) {
    return res.status(400).json({ error: 'invalid request' })
  }
}

/**
 * @openapi
 * '/api/v1/favorites':
 *  post:
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     summary: mark favorite as favorite
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user
 *              - asteroid
 *            properties:
 *              user:
 *                type: number
 *                default: id of user
 *              asteroid:
 *                type: number
 *                default: id of asteroid
 *     responses:
 *      200:
 *        description: Favorite update successful
 *      401:
 *        description: Invalid token
 *
 */
export const createFavorite = async (req: NewRequest, res: Response) => {
  try {
    const user = req.authData?.id
    const { asteroid } = req.body
    if (!user) return res.status(400).json({ error: 'invalid request' })
    const [existing] = await fetchFavoritesFromDB({ user, asteroid, limit: '1' })
    if (!!existing) return res.status(409).json({ error: 'favorite already exists' })
    const result = await addFavoriteToDB<{ insertId: number }>({ user, asteroid })

    return res.status(200).json({ id: result.insertId, user, asteroid })
  } catch (error) {
    return res.status(400).json({ error: 'invalid request' })
  }
}

/** 
 * @openapi
 * '/api/v1/favorites/:id':
 *  delete:
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a task (by manager)
 *     responses:
 *      200:
 *        description: Delete successful
 *      401:
 *        description: Invalid token
 *      403:
 *        description: User not authorized
 *      404:
 *        description: Task not found
 *
 */
export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const [favorite] = await getFavoriteFromDB(Number(id))
    if (!favorite) return res.status(404).json({ error: 'favorite not found' })
    await deleteFavoriteInDB(Number(id))
    return res.status(200).json({ message: 'favorite delete successful' })
  } catch (error) {
    return res.status(400).json({ error: 'invalid request' })
  }
}
