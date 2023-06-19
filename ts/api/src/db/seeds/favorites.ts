import { AxiosError } from 'axios'
import { fetchFavoritesFromDB } from '../../repo/favorites'
import { Favorite, addFavoriteToDB } from '../../repo/favorites'

const favorites: Array<Omit<Favorite, 'favorite_id'>> = [
  { user: 1, asteroid: 2277570 },
  { user: 1, asteroid: 2373503 },
  { user: 1, asteroid: 2456537 },
  { user: 1, asteroid: 2533638 },
  { user: 1, asteroid: 2549459 },
]

const seedFavorites = async () => {
  try {
    const existingFavorites = await fetchFavoritesFromDB({ limit: '3', user: 1 })
    if (existingFavorites!.length) return
    await Promise.all(favorites?.map((item) => addFavoriteToDB(item)))
  } catch (error: any) {
    console.log(error.message)
  }
}

export default seedFavorites
