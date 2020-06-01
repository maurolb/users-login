"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersController_1 = __importDefault(require("../controllers/usersController"));
var router = express_1.Router();
router.get('/', usersController_1.default.verifyToken, usersController_1.default.listUsers);
router.get('/:id', usersController_1.default.verifyToken, usersController_1.default.listOneUser);
router.post('/', usersController_1.default.verifyToken, usersController_1.default.createUser);
router.delete('/:id', usersController_1.default.verifyToken, usersController_1.default.deleteUser);
router.put('/:id', usersController_1.default.verifyToken, usersController_1.default.updateUser);
exports.default = router;
