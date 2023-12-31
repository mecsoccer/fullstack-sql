import { createPool, type Pool } from 'mysql2'
import { DATA_SOURCES } from './config'
const dataSource = DATA_SOURCES.mySqlDataSource 

let pool: Pool

try {
  pool = createPool({
    connectionLimit: dataSource.DB_CONNECTION_LIMIT,
    host: dataSource.DB_HOST,
    user: dataSource.DB_USER,
    password: dataSource.DB_PASSWORD,
    database: dataSource.DB_DATABASE,
    insecureAuth: true
  })
 
  console.debug('MySql Adapter Pool generated successfully')
} catch (error) {
  console.error('[mysql.connector][init][Error]: ', error)
  throw new Error('failed to initialized pool')
}

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute = async <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.')

    return await new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error != null) reject(error)
        else resolve(results as T)
      })
    })
  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error)
    throw new Error('failed to execute MySQL query')
  }
}

export default pool
