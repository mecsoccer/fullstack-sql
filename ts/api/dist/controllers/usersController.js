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
exports.updatePassword = exports.refreshToken = exports.signInUser = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../repo/users");
const mysql_connector_1 = require("../db/mysql.connector");
const secretAccess = process.env.JWT_AUTH_ACCESS_SECRET;
const secret = process.env.JWT_AUTH_SECRET;
/**
 * @openapi
 * '/api/v1/signup':
 *  post:
 *     tags:
 *       - User / Auth
 *     security:
 *       - bearerAuth: []
 *     summary: User signup
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - first_name
 *              - last_name
 *              - email
 *              - password
 *              - phone
 *            properties:
 *              username:
 *                type: string
 *                default: jon
 *              first_name:
 *                type: string
 *                default: john
 *              last_name:
 *                type: string
 *                default: doe
 *              email:
 *                type: email
 *                default: 'myname@mycompany.com'
 *              password:
 *                type: string
 *                default: jjdskdwe324
 *              phone:
 *                type: string
 *                default: '+351966824893'
 *     responses:
 *      200:
 *        description: Login successful
 *      401:
 *        description: Invalid token
 *      409:
 *        description: User already exists on platform
 *
 */
const signUp = (req, res) => {
    const { username, first_name, last_name, email, password, phone } = req.body;
    (0, users_1.getUserByEmialFromDB)(email)
        .then((userData) => {
        if (userData.length > 0) {
            return res.status(409).json({ status: 'error', error: 'user with same email already exists' });
        }
        (0, users_1.addUserToDB)({ username, first_name, last_name, email, password, phone })
            .then((data) => {
            const user = {
                id: data.insertId, username, first_name, last_name, email, phone,
            };
            if (!secretAccess || !secret)
                return res.status(400).json({ error: 'error occured' });
            const accessToken = jsonwebtoken_1.default.sign(user, secretAccess, { expiresIn: '1h' });
            const token = jsonwebtoken_1.default.sign(user, secret, { expiresIn: '30d' });
            return res.status(201).json({ accessToken, token, status: 'success' });
        })
            .catch((err) => {
            return res.status(400).json({ status: 'error', error: 'Error signing up user' });
        });
    })
        .catch(() => res.status(400).json({ status: 'error', error: 'Error signing up user' }));
};
exports.signUp = signUp;
/**
 * @openapi
 * '/api/v1/login':
 *  post:
 *     tags:
 *     - User / Auth
 *     summary: Login to the platform
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: email
 *                default: 'myname@mycompany.com'
 *              password:
 *                type: string
 *                default: jjdskdwe324
 *     responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/loginResponse'
 *      401:
 *        description: Invalid email or password
 */
const signInUser = (req, res) => {
    const { email, password } = req.body;
    (0, mysql_connector_1.execute)('SELECT * FROM users WHERE email=?;', [email.toLowerCase()])
        .then((data) => {
        if (data.length === 0)
            return res.status(401).json({ status: 'failed', error: 'incorrect credentials or user not found' });
        const user = data[0];
        const { id, username, first_name, last_name, email, phone } = user;
        const authenticated = bcryptjs_1.default.compareSync(password, user.password);
        if (!authenticated) {
            return res.status(401).json({ status: 'failed', error: 'incorrect email or password' });
        }
        const temp = { id, username, first_name, last_name, email, phone };
        if (!secretAccess || !secret)
            return res.status(400).json({ error: 'error occured' });
        const accessToken = jsonwebtoken_1.default.sign(temp, secretAccess, { expiresIn: '1h' });
        const token = jsonwebtoken_1.default.sign(temp, secret, { expiresIn: '30d' });
        return res.status(200).json({ accessToken, token, status: 'success' });
    })
        .catch(() => res.status(400).json({ status: 'failed', error: 'error signing in' }));
};
exports.signInUser = signInUser;
/**
 * @openapi
 * '/api/v1/auth/refresh':
 *  post:
 *     tags:
 *       - User / Auth
 *     security:
 *       - bearerAuth: []
 *     summary: Refresh auth token
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Token refresh successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/refreshedTokenResponse'
 *      401:
 *        description: Invalid email or password
 */
const refreshToken = (req, res) => {
    const { authorization } = req.headers;
    if (authorization) {
        const authToken = authorization.split(' ')[1];
        if (!secret)
            return res.status(400).json({ error: 'error occured' });
        jsonwebtoken_1.default.verify(authToken, secret, (err, authData) => {
            if (err != null) {
                return res.status(401).json({ error: 'invalid or expired token' });
            }
            else {
                const { id, username, first_name, last_name, email, phone } = authData;
                const temp = { id, username, first_name, last_name, email, phone };
                return res.status(200).json({ accessToken: jsonwebtoken_1.default.sign(temp, secret, { expiresIn: '1h' }) });
            }
        });
    }
    else {
        return res.status(401).json({ error: 'you are not signed in' });
    }
};
exports.refreshToken = refreshToken;
/**
 * @openapi
 * '/api/v1/users/password':
 *  patch:
 *     tags:
 *       - User / Auth
 *     security:
 *       - bearerAuth: []
 *     summary: Reset password after onboarding
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *                default: 'password123'
 *              newPassword:
 *                type: string
 *                default: password456
 *     responses:
 *      200:
 *        description: Password reset successful
 *      401:
 *        description: Invalid email or password
 */
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword } = req.body;
        if (req.authData == null)
            return res.status(400).json({ error: 'error occured' });
        const { id, email } = req.authData;
        const [user] = yield (0, users_1.getUserByEmialFromDB)(email);
        const { password } = user;
        if (!user)
            return res.status(404).json({ error: 'user not found' });
        const valid = bcryptjs_1.default.compareSync(oldPassword, password);
        if (!valid)
            return res.status(401).json({ error: 'wrong old password' });
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(newPassword, salt);
        yield (0, users_1.updateUserPassword)(id, hash);
        return res.status(200).json({ status: 'password update successful' });
    }
    catch (error) {
        return res.status(400).json({ error: 'invalid request' });
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=usersController.js.map