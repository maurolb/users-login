"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = express_1.default();
router.post('/login', authController_1.default.logIn);
router.post('/register', authController_1.default.register);
exports.default = router;
