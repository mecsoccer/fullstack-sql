import { addAsteroidToDB, fetchAsteroidsFromDB } from '../../repo/asteroids'
import { getAsteroidsFromNasa } from '../../nasa_api'

const seedTasks = async () => {
  try {
    const existingAsteroids = await fetchAsteroidsFromDB({ limit: '3' })
    if (existingAsteroids!.length) return
    const nasaAsteroids = await getAsteroidsFromNasa()
    if (!!nasaAsteroids) await Promise.all(nasaAsteroids?.map((item) => {
      return addAsteroidToDB(item)
    }))
  } catch (error) {
    console.log(error)
  }
}

export default seedTasks
