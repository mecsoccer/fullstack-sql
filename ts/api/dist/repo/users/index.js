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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.addUserToDB = exports.getUsersFromDB = exports.getUserByEmialFromDB = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mysql_connector_1 = require("../../db/mysql.connector");
const getUserByEmialFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)(`
    SELECT * FROM users WHERE email = ?;
  `, [email])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.getUserByEmialFromDB = getUserByEmialFromDB;
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)('SELECT * FROM users LIMIT 2 OFFSET 0;', [])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.getUsersFromDB = getUsersFromDB;
const addUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, first_name, last_name, email, password, phone } = user;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return yield (0, mysql_connector_1.execute)(`
    INSERT INTO users (username, first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?);
  `, [username, first_name, last_name, email, hash, phone])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.addUserToDB = addUserToDB;
const updateUserPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)('UPDATE users SET password=? WHERE id=?;', [password, id])
        .then((data) => data)
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.reject(err); }));
});
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=index.js.map