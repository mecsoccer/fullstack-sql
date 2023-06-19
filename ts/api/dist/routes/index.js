"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asteroidsController_1 = require("../controllers/asteroidsController");
const favoritesController_1 = require("../controllers/favoritesController");
const usersController_1 = require("../controllers/usersController");
const validation_1 = require("../middlewares/validation");
const verification_1 = require("../middlewares/verification");
const router = express_1.default.Router();
router.head('/health', (_, res) => res.sendStatus(200));
router.post('/signup', (0, validation_1.validateUser)(), validation_1.validate, usersController_1.signUp);
router.post('/login', (0, validation_1.validateLogin)(), validation_1.validate, usersController_1.signInUser);
router.post('/auth/refresh', usersController_1.refreshToken);
router.get('/asteroids', asteroidsController_1.getAllAsteroids);
router.get('/asteroids/:id', (0, validation_1.validateIdParam)(), validation_1.validate, asteroidsController_1.getAsteroid);
router.post('/favorites', verification_1.verifyAuthToken, (0, validation_1.validateCreateFavorite)(), validation_1.validate, favoritesController_1.createFavorite);
router.get('/favorites', verification_1.verifyAuthToken, favoritesController_1.getAllFavorites);
router.delete('/favorites/:id', verification_1.verifyAuthToken, (0, validation_1.validateIdParam)(), validation_1.validate, favoritesController_1.deleteFavorite);
exports.default = router;
//# sourceMappingURL=index.js.map