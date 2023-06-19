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
exports.deleteAsteroidInDB = exports.markAsFavorite = exports.addAsteroidToDB = exports.getAsteroidFromDB = exports.fetchAsteroidsFromDB = void 0;
const mysql_connector_1 = require("../../db/mysql.connector");
const fetchAsteroidsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset, name, date_from, date_to } = query;
    let newSql = `
    SELECT * FROM asteroids
    LEFT JOIN favorites
    ON asteroids.id = favorites.asteroid
  `;
    const values = [];
    if (!!name) {
        newSql += ` WHERE name LIKE ?`;
        values.push(`%${name}%`);
    }
    if (!name && (date_from && date_to)) {
        newSql += ` WHERE date BETWEEN ? AND ?`;
        values.push(date_from, date_to);
    }
    newSql += ' ORDER BY date DESC LIMIT ?, ?;';
    values.push(parseInt(offset !== null && offset !== void 0 ? offset : '0'), parseInt(limit !== null && limit !== void 0 ? limit : '20'));
    return yield (0, mysql_connector_1.execute)(newSql, values)
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.fetchAsteroidsFromDB = fetchAsteroidsFromDB;
const getAsteroidFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)('SELECT * FROM asteroids WHERE id=?;', [id])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.getAsteroidFromDB = getAsteroidFromDB;
const addAsteroidToDB = (asteroid) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, date, absolute_magnitude_h, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data, orbital_data, is_sentry_object } = asteroid;
    return yield (0, mysql_connector_1.execute)(`
    INSERT INTO asteroids (id, name, date, absolute_magnitude_h, estimated_diameter,
    is_potentially_hazardous_asteroid, close_approach_data, orbital_data,
    is_sentry_object) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
        id, name, date, absolute_magnitude_h, JSON.stringify(estimated_diameter), is_potentially_hazardous_asteroid,
        JSON.stringify(close_approach_data), JSON.stringify(orbital_data), is_sentry_object
    ])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.addAsteroidToDB = addAsteroidToDB;
const markAsFavorite = (date_completed, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)(`
    UPDATE asteroids SET date_completed=?, completed=? WHERE id=?;
  `, [date_completed ? new Date(date_completed) : null, true, id])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.markAsFavorite = markAsFavorite;
const deleteAsteroidInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)('DELETE FROM asteroids WHERE id=?;', [id])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.deleteAsteroidInDB = deleteAsteroidInDB;
//# sourceMappingURL=index.js.map