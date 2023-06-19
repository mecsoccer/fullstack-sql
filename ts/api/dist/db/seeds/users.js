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
const users_1 = require("../../repo/users");
const users = [
    { username: 'luis', first_name: 'luis', last_name: 'marques', email: 'luis.marques@gmail.com', password: 'df1a&s*SDdfs9da', phone: '+351932824893' },
    { username: 'pedro', first_name: 'pedro', last_name: 'santos', email: 'pedro.santos@gmail.com', password: 'df1a&s*SDdfs9da', phone: '+351966824893' },
    { username: 'joao', first_name: 'joao', last_name: 'ramos', email: 'joao.ramos@gmail.com', password: 'df1a&s*SDdfs9da', phone: '+351966827893' }
];
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingUsers = yield (0, users_1.getUsersFromDB)();
    if (existingUsers.length)
        return;
    yield (0, users_1.addUserToDB)(users[0]);
    yield (0, users_1.addUserToDB)(users[1]);
    yield (0, users_1.addUserToDB)(users[2]);
});
exports.default = seedUsers;
//# sourceMappingURL=users.js.map