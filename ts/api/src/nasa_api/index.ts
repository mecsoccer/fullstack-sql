import axios from 'axios';
import { IAsteroid } from '../repo/asteroids/types'

const baseURL = process.env.REACT_APP_ASTEROID_SERVICE || 'https://api.nasa.gov/neo/rest/v1/feed';

export const nasaApi =  axios.create({
  baseURL,
  params: {
    api_key: 'DEMO_KEY'
  }
});

export const getAsteroidsFromNasa = async (from='2023-06-09', to='2023-06-03') => {
  try {
    const form = { start_date: from, end_date: to };
    const asteroids = await nasaApi.get('', { params: form });
    const objData = asteroids.data.near_earth_objects;
    const keys = Object.keys(objData);
    const values = Object.values(objData) as Array<Array<IAsteroid>>;
    const agg: Array<IAsteroid> = [];
    keys.forEach((key, idx) => {
      const temp = values[idx].map(item => ({ ...item, date: key }));
      agg.push(...temp);
    })
  
    return agg;
  } catch (error) {
    console.log(error)
    return null
  }
}