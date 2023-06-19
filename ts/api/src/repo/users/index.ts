import bcrypt from 'bcryptjs'
import { execute } from '../../db/mysql.connector'

export interface User {
  id: number
  username?: string
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

export const getUserByEmialFromDB = async (email: string): Promise<User[]> => {
  return await execute(`
    SELECT * FROM users WHERE email = ?;
  `, [email])
    .then((data) => data as User[])
    .catch(async (err) => await Promise.reject(err))
}


export const getUsersFromDB = async (): Promise<User[]> => {
  return await execute('SELECT * FROM users LIMIT 2 OFFSET 0;', [])
    .then((data) => data as User[])
    .catch(async (err) => await Promise.reject(err))
}

export const addUserToDB = async <T>(user: Omit<User, 'id'>): Promise<T> => {
  const { username, first_name, last_name, email, password, phone } = user
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return await execute(`
    INSERT INTO users (username, first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?);
  `, [username, first_name, last_name, email, hash, phone])
    .then((data) => data as T)
    .catch(async (err) => await Promise.reject(err))
}

export const updateUserPassword = async (id: number, password: string) => {
  return await execute('UPDATE users SET password=? WHERE id=?;', [password, id])
    .then((data) => data)
    .catch(async (err) => await Promise.reject(err))
}
