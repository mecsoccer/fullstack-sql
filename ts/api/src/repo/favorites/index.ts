import { execute } from '../../db/mysql.connector'

export interface Favorite {
  favorite_id: number,
  asteroid: number,
  user: number
}

export interface FavoriteQuery {
  user: number
  asteroid?: number
  limit?: string
  offset?: string
}

export interface Fav extends FavoriteQuery {
  asteroid: number
}

export const fetchFavoritesFromDB = async (query: FavoriteQuery): Promise<Favorite[]> => {
  const { limit, offset, user, asteroid } = query
  const values = [user]
  let newSql = `
    SELECT * FROM favorites
    INNER JOIN asteroids ON favorites.asteroid = asteroids.id
    WHERE favorites.user = ? 
  `
  if (asteroid) {
    newSql += ' AND favorites.asteroid = ?'
    values.push(asteroid)
  }
  newSql += ' LIMIT ?, ?;'
  values.push(parseInt(offset ?? '0'), parseInt(limit ?? '10'))

  return await execute(newSql, values)
    .then((data) => data as Favorite[])
    .catch(async (err) => await Promise.reject(err))
}

export const getFavoriteFromDB = async (id: number) => {
  let newSql = `SELECT * FROM favorites WHERE favorite_id = ?;`
  const values = [id]

  return await execute(newSql, values)
    .then((data) => data as Favorite[])
    .catch(async (err) => await Promise.reject(err))
}

export const addFavoriteToDB = async <T>(favorite: Omit<Favorite, 'favorite_id'>) => {
  const { user, asteroid } = favorite
  return await execute(
    'INSERT INTO favorites (user, asteroid) VALUES (?, ?);',
    [user, asteroid]
  )
  .then((data) => data as T)
  .catch(async (err) => await Promise.reject(err))
}

export const deleteFavoriteInDB = async (id: number) => {
  return await execute('DELETE FROM favorites WHERE favorite_id=?;', [id])
    .then((data) => data)
    .catch(async (err) => await Promise.reject(err))
}
