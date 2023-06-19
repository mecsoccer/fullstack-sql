"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsteroid = exports.getAllAsteroids = void 0;
const asteroids_1 = require("../repo/asteroids");
/**
 * @openapi
 * '/api/v1/asteroids':
 *  get:
 *     tags:
 *       - Asteroid
 *     security:
 *       - bearerAuth: []
 *     summary: get a list of asteroids
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Invalid token
 *
 */
const getAllAsteroids = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asteroids = yield (0, asteroids_1.fetchAsteroidsFromDB)(req.query);
        return res.status(200).json(asteroids);
    }
    catch (error) {
        return res.status(400).json({ error: 'invalid request' });
    }
});
exports.getAllAsteroids = getAllAsteroids;
/**
 * @openapi
 * '/api/v1/asteroids/:id':
 *  get:
 *     tags:
 *       - Asteroid
 *     security:
 *       - bearerAuth: []
 *     summary: get a single asteroid
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Invalid token
 *      404:
 *        description: asteroid not found
 *
 */
const getAsteroid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asteroids = yield (0, asteroids_1.getAsteroidFromDB)(parseInt(req.params.id));
        if (!(asteroids === null || asteroids === void 0 ? void 0 : asteroids.length))
            return res.status(404).json({ error: 'record not found' });
        const [asteroid] = asteroids;
        const { estimated_diameter, close_approach_data, orbital_data } = asteroid;
        asteroid.estimated_diameter = JSON.parse(estimated_diameter);
        asteroid.close_approach_data = JSON.parse(close_approach_data);
        if (!!orbital_data)
            asteroid.orbital_data = JSON.parse(orbital_data);
        return res.status(200).json(asteroid);
    }
    catch (error) {
        return res.status(400).json({ error: 'invalid request' });
    }
});
exports.getAsteroid = getAsteroid;
//# sourceMappingURL=asteroidsController.js.map