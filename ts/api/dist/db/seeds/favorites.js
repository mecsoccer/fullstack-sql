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
const favorites_1 = require("../../repo/favorites");
const favorites_2 = require("../../repo/favorites");
const favorites = [
    { user: 1, asteroid: 2277570 },
    { user: 1, asteroid: 2373503 },
    { user: 1, asteroid: 2456537 },
    { user: 1, asteroid: 2533638 },
    { user: 1, asteroid: 2549459 },
];
const seedFavorites = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingFavorites = yield (0, favorites_1.fetchFavoritesFromDB)({ limit: '3', user: 1 });
        if (existingFavorites.length)
            return;
        yield Promise.all(favorites === null || favorites === void 0 ? void 0 : favorites.map((item) => (0, favorites_2.addFavoriteToDB)(item)));
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.default = seedFavorites;
//# sourceMappingURL=favorites.js.map