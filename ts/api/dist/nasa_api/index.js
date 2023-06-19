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
exports.getAsteroidsFromNasa = exports.nasaApi = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURL = process.env.REACT_APP_ASTEROID_SERVICE || 'https://api.nasa.gov/neo/rest/v1/feed';
exports.nasaApi = axios_1.default.create({
    baseURL,
    params: {
        api_key: 'DEMO_KEY'
    }
});
const getAsteroidsFromNasa = (from = '2023-06-09', to = '2023-06-03') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = { start_date: from, end_date: to };
        const asteroids = yield exports.nasaApi.get('', { params: form });
        const objData = asteroids.data.near_earth_objects;
        const keys = Object.keys(objData);
        const values = Object.values(objData);
        const agg = [];
        keys.forEach((key, idx) => {
            const temp = values[idx].map(item => (Object.assign(Object.assign({}, item), { date: key })));
            agg.push(...temp);
        });
        return agg;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAsteroidsFromNasa = getAsteroidsFromNasa;
//# sourceMappingURL=index.js.map