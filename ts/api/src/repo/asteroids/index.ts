import { execute } from '../../db/mysql.connector'
import { IAsteroidFromDB, type IAsteroid } from './types'

export interface NewAsteroid {
  title: string
  summary: string
  technician: number
  date_completed?: Date
}

export interface AsteroidQuery {
  name?: string
  date_from?: string
  date_to?: string
  limit?: string
  offset?: string
}

export const fetchAsteroidsFromDB = async (query: AsteroidQuery): Promise<IAsteroid[]> => {
  const { limit, offset, name, date_from, date_to } = query
  let newSql = `
    SELECT * FROM asteroids
    LEFT JOIN favorites
    ON asteroids.id = favorites.asteroid
  `
  const values = [] as Array<string | number>

  if (!!name) {
    newSql += ` WHERE name LIKE ?`
    values.push(`%${name}%`)
  }

  if (!name && (date_from && date_to)) {
    newSql += ` WHERE date BETWEEN ? AND ?`
    values.push(date_from, date_to)
  }

  newSql += ' ORDER BY date DESC LIMIT ?, ?;'
  values.push(parseInt(offset ?? '0'), parseInt(limit ?? '20'))

  return await execute(newSql, values)
    .then((data) => data as IAsteroid[])
    .catch(async (err) => await Promise.reject(err))
}

export const getAsteroidFromDB = async (id: number): Promise<IAsteroidFromDB[]> => {
  return await execute('SELECT * FROM asteroids WHERE id=?;', [id])
    .then((data) => data as IAsteroidFromDB[])
    .catch(async (err) => await Promise.reject(err))
}

export const addAsteroidToDB = async (asteroid: IAsteroid) => {
  const {
    id, name, date, absolute_magnitude_h, estimated_diameter,
    is_potentially_hazardous_asteroid, close_approach_data, orbital_data,
    is_sentry_object
  } = asteroid
  return await execute(`
    INSERT INTO asteroids (id, name, date, absolute_magnitude_h, estimated_diameter,
    is_potentially_hazardous_asteroid, close_approach_data, orbital_data,
    is_sentry_object) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    id, name, date, absolute_magnitude_h, JSON.stringify(estimated_diameter), is_potentially_hazardous_asteroid,
    JSON.stringify(close_approach_data), JSON.stringify(orbital_data), is_sentry_object
  ])
    .then((data) => data)
    .catch(async (err) => await Promise.reject(err))
}

export const markAsFavorite = async (date_completed: string, id: number) => {
  return await execute(`
    UPDATE asteroids SET date_completed=?, completed=? WHERE id=?;
  `, [date_completed ? new Date(date_completed) : null, true, id])
    .then((data) => data)
    .catch(async (err) => await Promise.reject(err))
}

export const deleteAsteroidInDB = async (id: number) => {
  return await execute('DELETE FROM asteroids WHERE id=?;', [id])
    .then((data) => data)
    .catch(async (err) => await Promise.reject(err))
}
