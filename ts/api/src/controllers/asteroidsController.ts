import { type Request, type Response } from 'express'
import { fetchAsteroidsFromDB, getAsteroidFromDB } from '../repo/asteroids'

/**
 * @openapi
 * '/api/v1/asteroids':
 *  get:
 *     tags:
 *       - Asteroid
 *     security:
 *       - bearerAuth: []
 *     summary: get a list of asteroids
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Invalid token
 *
 */
export const getAllAsteroids = async (req: Request, res: Response) => {
  try {
    const asteroids = await fetchAsteroidsFromDB(req.query)
    return res.status(200).json(asteroids)
  } catch (error) {
    return res.status(400).json({ error: 'invalid request' })
  }
}


/**
 * @openapi
 * '/api/v1/asteroids/:id':
 *  get:
 *     tags:
 *       - Asteroid
 *     security:
 *       - bearerAuth: []
 *     summary: get a single asteroid
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Invalid token
 *      404:
 *        description: asteroid not found
 *
 */
export const getAsteroid = async (req: Request, res: Response) => {
  try {
    const asteroids = await getAsteroidFromDB(parseInt(req.params.id))
    if (!asteroids?.length) return res.status(404).json({ error: 'record not found' })
    const [asteroid] = asteroids
    const { estimated_diameter, close_approach_data, orbital_data } = asteroid
    asteroid.estimated_diameter = JSON.parse(estimated_diameter)
    asteroid.close_approach_data = JSON.parse(close_approach_data)
    if (!!orbital_data) asteroid.orbital_data = JSON.parse(orbital_data)

    return res.status(200).json(asteroid)
  } catch (error) {
    return res.status(400).json({ error: 'invalid request' })
  }
}
