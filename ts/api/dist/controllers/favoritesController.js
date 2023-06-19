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
exports.deleteFavorite = exports.createFavorite = exports.getAllFavorites = void 0;
const favorites_1 = require("../repo/favorites");
/**
 * @openapi
 * '/api/v1/favorites':
 *  get:
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     summary: get a list of favorites
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Invalid token
 *
 */
const getAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.authData) === null || _a === void 0 ? void 0 : _a.id;
        if (!user)
            return res.status(400).json({ error: 'invalid request' });
        const favorites = yield (0, favorites_1.fetchFavoritesFromDB)(Object.assign(Object.assign({}, req.query), { user }));
        return res.status(200).json(favorites);
    }
    catch (error) {
        return res.status(400).json({ error: 'invalid request' });
    }
});
exports.getAllFavorites = getAllFavorites;
/**
 * @openapi
 * '/api/v1/favorites':
 *  post:
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     summary: mark favorite as favorite
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user
 *              - asteroid
 *            properties:
 *              user:
 *                type: number
 *                default: id of user
 *              asteroid:
 *                type: number
 *                default: id of asteroid
 *     responses:
 *      200:
 *        description: Favorite update successful
 *      401:
 *        description: Invalid token
 *
 */
const createFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = (_b = req.authData) === null || _b === void 0 ? void 0 : _b.id;
        const { asteroid } = req.body;
        if (!user)
            return res.status(400).json({ error: 'invalid request' });
        const [existing] = yield (0, favorites_1.fetchFavoritesFromDB)({ user, asteroid, limit: '1' });
        if (!!existing)
            return res.status(409).json({ error: 'favorite already exists' });
        const result = yield (0, favorites_1.addFavoriteToDB)({ user, asteroid });
        return res.status(200).json({ id: result.insertId, user, asteroid });
    }
    catch (error) {
        return res.status(400).json({ error: 'invalid request' });
    }
});
exports.createFavorite = createFavorite;
/**
 * @openapi
 * '/api/v1/favorites/:id':
 *  delete:
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a task (by manager)
 *     responses:
 *      200:
 *        description: Delete successful
 *      401:
 *        description: Invalid token
 *      403:
 *        description: User not authorized
 *      404:
 *        description: Task not found
 *
 */
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [favorite] = yield (0, favorites_1.getFavoriteFromDB)(Number(id));
        if (!favorite)
            return res.status(404).json({ error: 'favorite not found' });
        yield (0, favorites_1.deleteFavoriteInDB)(Number(id));
        return res.status(200).json({ message: 'favorite delete successful' });
    }
    catch (error) {
        return res.status(400).json({ error: 'invalid request' });
    }
});
exports.deleteFavorite = deleteFavorite;
//# sourceMappingURL=favoritesController.js.map