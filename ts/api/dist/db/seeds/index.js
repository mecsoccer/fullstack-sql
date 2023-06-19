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
const mysql_connector_1 = __importDefault(require("../mysql.connector"));
const asteroids_1 = __importDefault(require("./asteroids"));
const favorites_1 = __importDefault(require("./favorites"));
const users_1 = __importDefault(require("./users"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, asteroids_1.default)();
        yield (0, users_1.default)();
        yield (0, favorites_1.default)();
    }
    catch (error) {
        console.log('error seeding data', error);
    }
    finally {
        mysql_connector_1.default.end();
    }
}))();
//# sourceMappingURL=index.js.map