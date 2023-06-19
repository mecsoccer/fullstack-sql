"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateIdParam = exports.validateCreateFavorite = exports.validateChangePassword = exports.validateLogin = exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
const validateUser = () => {
    return [
        (0, express_validator_1.body)('username').optional().trim().isAlpha().toLowerCase().escape(),
        (0, express_validator_1.body)('first_name').notEmpty().trim().isAlpha().toLowerCase().escape(),
        (0, express_validator_1.body)('last_name').notEmpty().trim().isAlpha().toLowerCase().escape(),
        (0, express_validator_1.body)('email').notEmpty().trim().isEmail().toLowerCase().escape(),
        (0, express_validator_1.body)('password').notEmpty().trim(),
        (0, express_validator_1.body)('phone').optional().trim().isString().isLength({ min: 9, max: 13 }).escape()
    ];
};
exports.validateUser = validateUser;
const validateLogin = () => {
    return [
        (0, express_validator_1.body)('email').notEmpty().trim().isEmail().toLowerCase(),
        (0, express_validator_1.body)('password').notEmpty()
    ];
};
exports.validateLogin = validateLogin;
const validateChangePassword = () => {
    return [
        (0, express_validator_1.body)('oldPassword').exists().isString().trim(),
        (0, express_validator_1.body)('newPassword').exists().trim().isStrongPassword()
    ];
};
exports.validateChangePassword = validateChangePassword;
const validateCreateFavorite = () => {
    return [
        (0, express_validator_1.body)('asteroid').notEmpty().isNumeric(),
    ];
};
exports.validateCreateFavorite = validateCreateFavorite;
const validateIdParam = () => {
    return [(0, express_validator_1.param)('id').notEmpty().isNumeric()];
};
exports.validateIdParam = validateIdParam;
const validate = (req, res, next) => {
    const valResult = (0, express_validator_1.validationResult)(req);
    if (!valResult.isEmpty()) {
        return res.status(422).json({ error: valResult.array() });
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map