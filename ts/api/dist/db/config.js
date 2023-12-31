"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_SOURCES = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATA_SOURCES = {
    mySqlDataSource: {
        DB_HOST: process.env.MY_SQL_DB_HOST,
        DB_USER: process.env.MY_SQL_DB_USER,
        DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
        DB_PORT: process.env.MY_SQL_DB_PORT,
        DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
        DB_CONNECTION_LIMIT: parseInt((_a = process.env.MY_SQL_DB_CONNECTION_LIMIT) !== null && _a !== void 0 ? _a : '4')
    }
};
//# sourceMappingURL=config.js.map