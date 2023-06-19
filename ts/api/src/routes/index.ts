import express, { type Router, type Response } from 'express'
import {  getAllAsteroids, getAsteroid } from '../controllers/asteroidsController'
import { createFavorite, deleteFavorite, getAllFavorites } from '../controllers/favoritesController'
import { signUp, signInUser, refreshToken } from '../controllers/usersController'
import { validate, validateCreateFavorite, validateIdParam, validateUser, validateLogin } from '../middlewares/validation'
import { verifyAuthToken } from '../middlewares/verification'

const router: Router = express.Router()

router.head('/health', (_, res: Response) => res.sendStatus(200))
router.post('/signup', validateUser(), validate, signUp)
router.post('/login', validateLogin(), validate, signInUser)
router.post('/auth/refresh', refreshToken)

router.get('/asteroids', getAllAsteroids)
router.get('/asteroids/:id', validateIdParam(), validate, getAsteroid)

router.post('/favorites', verifyAuthToken, validateCreateFavorite(), validate, createFavorite)
router.get('/favorites', verifyAuthToken, getAllFavorites)
router.delete('/favorites/:id', verifyAuthToken, validateIdParam(), validate, deleteFavorite)

export default router
