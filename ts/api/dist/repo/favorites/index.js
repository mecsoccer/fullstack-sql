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
exports.deleteFavoriteInDB = exports.addFavoriteToDB = exports.getFavoriteFromDB = exports.fetchFavoritesFromDB = void 0;
const mysql_connector_1 = require("../../db/mysql.connector");
const fetchFavoritesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset, user, asteroid } = query;
    const values = [user];
    let newSql = `
    SELECT * FROM favorites
    INNER JOIN asteroids ON favorites.asteroid = asteroids.id
    WHERE favorites.user = ? 
  `;
    if (asteroid) {
        newSql += ' AND favorites.asteroid = ?';
        values.push(asteroid);
    }
    newSql += ' LIMIT ?, ?;';
    values.push(parseInt(offset !== null && offset !== void 0 ? offset : '0'), parseInt(limit !== null && limit !== void 0 ? limit : '10'));
    return yield (0, mysql_connector_1.execute)(newSql, values)
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.fetchFavoritesFromDB = fetchFavoritesFromDB;
const getFavoriteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let newSql = `SELECT * FROM favorites WHERE favorite_id = ?;`;
    const values = [id];
    return yield (0, mysql_connector_1.execute)(newSql, values)
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.getFavoriteFromDB = getFavoriteFromDB;
const addFavoriteToDB = (favorite) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, asteroid } = favorite;
    return yield (0, mysql_connector_1.execute)('INSERT INTO favorites (user, asteroid) VALUES (?, ?);', [user, asteroid])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.addFavoriteToDB = addFavoriteToDB;
const deleteFavoriteInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)('DELETE FROM favorites WHERE favorite_id=?;', [id])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.deleteFavoriteInDB = deleteFavoriteInDB;
//# sourceMappingURL=index.js.map