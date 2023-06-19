import pool, { execute } from './mysql.connector';

(async () => {
  await execute('DROP TABLE IF EXISTS favorites;', [])
  await execute('DROP TABLE IF EXISTS users;', [])
  await execute('DROP TABLE IF EXISTS asteroids;', [])

  pool.end()
})()
