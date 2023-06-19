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
const asteroids_1 = require("../../repo/asteroids");
const nasa_api_1 = require("../../nasa_api");
const seedTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingAsteroids = yield (0, asteroids_1.fetchAsteroidsFromDB)({ limit: '3' });
        if (existingAsteroids.length)
            return;
        const nasaAsteroids = yield (0, nasa_api_1.getAsteroidsFromNasa)();
        if (!!nasaAsteroids)
            yield Promise.all(nasaAsteroids === null || nasaAsteroids === void 0 ? void 0 : nasaAsteroids.map((item) => {
                return (0, asteroids_1.addAsteroidToDB)(item);
            }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = seedTasks;
//# sourceMappingURL=asteroids.js.map