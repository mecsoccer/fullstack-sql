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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsteroidInDB = exports.markAsFavorite = exports.addAsteroidToDB = exports.getAsteroidFromDB = exports.fetchAsteroidsFromDB = void 0;
const mysql_connector_1 = require("../../db/mysql.connector");
const fetchAsteroidsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset } = query, colQuery = __rest(query, ["limit", "offset"]);
    let newSql = 'SELECT * FROM asteroids';
    const limitOffsetQuery = ' ORDER BY created_on DESC LIMIT ? OFFSET ?';
    const values = Object.values(colQuery);
    if (Object.keys(colQuery).length > 0)
        newSql += ' WHERE';
    Object.keys(colQuery).forEach((item, idx) => {
        if (idx === 0)
            newSql += ` WHERE ${item}=?`;
        else
            newSql += ` AND ${item}=?`;
    });
    newSql += limitOffsetQuery;
    values.push(...[limit !== null && limit !== void 0 ? limit : 25, offset !== null && offset !== void 0 ? offset : 0]);
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
//# sourceMappingURL=asteroids.js.map