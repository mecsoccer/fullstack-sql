import pool from '../mysql.connector'
import seedAsteroids from './asteroids'
import seedFavorites from './favorites'
import seedUsers from './users'

(async () => {
  try {
    await seedAsteroids()
    await seedUsers()
    await seedFavorites()
  } catch (error) {
    console.log('error seeding data', error)
  } finally {
    pool.end()
  }
})()
