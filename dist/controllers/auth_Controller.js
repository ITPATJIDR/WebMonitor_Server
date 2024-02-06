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
const lodash_1 = __importDefault(require("lodash"));
const database_1 = __importDefault(require("../utils/database"));
const hasher_1 = require("../utils/hasher");
const auth_Controller = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const checkUserExists = yield database_1.default.user.findUnique({
                where: {
                    username: username
                }
            });
            if (lodash_1.default.isNull(checkUserExists)) {
                const newPassword = yield (0, hasher_1.hash_Password)(password);
                const createNewUser = yield database_1.default.user.create({
                    data: {
                        username: username,
                        password: newPassword
                    }
                });
                if (!lodash_1.default.isEmpty(createNewUser)) {
                    res.status(200).json({ message: "Register Success", status: 200 });
                }
                else {
                    res.status(200).json({ message: "Register Failed", status: 400 });
                }
            }
            else {
                res.status(200).json({ message: "Username is already Exist", status: 400 });
            }
        }
        catch (err) {
            res.status(200).json({ message: "Internal Server Error", status: 500 });
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const checkUserExists = yield database_1.default.user.findUnique({
                where: {
                    username: username
                }
            });
            if (!lodash_1.default.isNull(checkUserExists)) {
                const comparePassword = yield (0, hasher_1.compare_Password)(password, checkUserExists.password);
                if (comparePassword) {
                    res.status(200).json({ message: "Login Success", status: 200 });
                }
                res.status(200).json({ message: "Login Failed", status: 400 });
            }
            else {
                res.status(200).json({ message: "Login Failed", status: 400 });
            }
        }
        catch (err) {
            res.status(200).json({ message: "Internal Server Error", status: 500 });
        }
    }),
};
exports.default = auth_Controller;
