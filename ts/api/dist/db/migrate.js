"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mysql_connector_1 = __importStar(require("./mysql.connector"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_connector_1.execute)(`
    CREATE TABLE IF NOT EXISTS users(id INT NOT NULL AUTO_INCREMENT, username VARCHAR(100),
    first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL, phone VARCHAR(15), created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id))
  `, []);
    yield (0, mysql_connector_1.execute)(`
    CREATE TABLE IF NOT EXISTS asteroids(id INT NOT NULL, name VARCHAR(20), date DATE NOT NULL,
    absolute_magnitude_h FLOAT NOT NULL, estimated_diameter VARCHAR(400) NOT NULL,
    is_potentially_hazardous_asteroid BOOL NOT NULL, close_approach_data VARCHAR(500), orbital_data VARCHAR(1200),
    is_sentry_object BOOL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id))
  `, []);
    yield (0, mysql_connector_1.execute)(`
    CREATE TABLE IF NOT EXISTS favorites(favorite_id INT NOT NULL AUTO_INCREMENT, asteroid INT NOT NULL,
    user INT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asteroid) REFERENCES asteroids(id), FOREIGN KEY (user) REFERENCES users(id), PRIMARY KEY (favorite_id))
  `, []);
    mysql_connector_1.default.end();
}))();
//# sourceMappingURL=migrate.js.map