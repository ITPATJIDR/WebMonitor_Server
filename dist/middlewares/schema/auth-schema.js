"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const express_validator_1 = require("express-validator");
const authSchema = [
    (0, express_validator_1.body)("username").exists().notEmpty().withMessage("Please enter a Username"),
    (0, express_validator_1.body)("password").exists().notEmpty().withMessage("Please enter a Password"),
];
exports.authSchema = authSchema;
