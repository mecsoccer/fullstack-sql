"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretAccess = process.env.JWT_AUTH_ACCESS_SECRET;
const verifyAuthToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const authToken = authorization.split(' ')[1];
        if (!secretAccess)
            return res.status(400).json({ error: 'error occured' });
        jsonwebtoken_1.default.verify(authToken, secretAccess, (err, authData) => {
            if (err != null) {
                return res.status(401).json({ error: 'invalid or expired token' });
            }
            else {
                req.authData = authData;
                next();
            }
        });
    }
    else {
        return res.status(401).json({ error: 'you are not signed in' });
    }
};
exports.verifyAuthToken = verifyAuthToken;
//# sourceMappingURL=verification.js.map