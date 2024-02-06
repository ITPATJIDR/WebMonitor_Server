"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_Router = require("express").Router();
const auth_Controller_1 = __importDefault(require("../controllers/auth_Controller"));
const auth_schema_1 = require("../middlewares/schema/auth-schema");
const validate_request_1 = require("../middlewares/validate/validate-request");
auth_Router.post("/register", auth_schema_1.authSchema, validate_request_1.validateRequestSchema, auth_Controller_1.default.register);
auth_Router.post("/login", auth_schema_1.authSchema, validate_request_1.validateRequestSchema, auth_Controller_1.default.login);
exports.default = auth_Router;
