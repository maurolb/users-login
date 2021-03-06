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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var config_1 = __importDefault(require("../config/config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var database_1 = __importDefault(require("../database"));
var UsersController = /** @class */ (function () {
    function UsersController() {
        var _this = this;
        this.updateUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, oldPassword, newPassword, username, email, user, normalPass, salt, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body //requiere los datos del front
                        , oldPassword = _a.oldPassword, newPassword = _a.newPassword, username = _a.username, email = _a.email;
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE id = ?', [id])];
                    case 1:
                        user = _b.sent();
                        normalPass = user[0].password // para usarlo mas despues
                        ;
                        //compara el password del front con el recibido de la base de datos, si coincide devuelve true sino false
                        if ((bcryptjs_1.default.compareSync(oldPassword, user[0].password)) == false) {
                            return [2 /*return*/, res.status(400).json({ message: 'Contraseña incorrecta' })];
                        }
                        //seteo los valores del usuario obtenido segun id con los campos que me llegan desde el front
                        user[0].username = username;
                        user[0].email = email;
                        //comprobacion, si tengo lleno el campo de nueva contraseña desde el front me crea un nuevo hash, sino setea el pass con la variable normalPasss
                        if (newPassword == null) {
                            user[0].password = normalPass;
                        }
                        else {
                            user[0].password = newPassword;
                            salt = bcryptjs_1.default.genSaltSync(10) // genera el salt
                            ;
                            user[0].password = bcryptjs_1.default.hashSync(user[0].password, salt); // le pasa el password del front y el salt generado
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, database_1.default.query('UPDATE users set ? WHERE id = ?', [user[0], id])]; //guarda el nuevo usuario modificado en la base de datos
                    case 3:
                        _b.sent(); //guarda el nuevo usuario modificado en la base de datos
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Error de al updatear ' })];
                    case 5:
                        res.json({ message: 'Usuario actualizado' });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    UsersController.prototype.listUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('SELECT * FROM users')];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.listOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE id = ?', [id])];
                    case 1:
                        user = _a.sent();
                        if (user.length > 0) {
                            return [2 /*return*/, res.json(user[0])];
                        }
                        res.status(404).json({ text: 'Usuario inexistente' });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, user, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                        //comprobar si existe
                        if (!(username && password && email)) {
                            return [2 /*return*/, res.status(400).json({ message: 'Datos incorrectos' })];
                        }
                        user = new user_1.UserI();
                        user.username = username;
                        user.password = password;
                        user.email = email;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        user.hashPassword(); // usa el metodo hash desde la entity user
                        return [4 /*yield*/, database_1.default.query('INSERT INTO users set ?', user)]; // se le pasa user para que lo guarde en la base de datos
                    case 2:
                        _b.sent(); // se le pasa user para que lo guarde en la base de datos
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Error de hash' })];
                    case 4:
                        //all ok
                        res.send('Usuario creado');
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.deleteUser = function (req, res) {
        var id = req.params.id;
        database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    };
    // funcion para verificar token
    UsersController.prototype.verifyToken = function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ msg: 'No hay token' });
        }
        var token = req.headers.authorization;
        var jwtPayload;
        try {
            jwtPayload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret); // metodo verify, le pasamos el token y el secret
            res.locals.jwtPayload = jwtPayload.userId;
        }
        catch (e) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // call next
        next(); // si todo fue bien llama a la funcion siguiente que lo indicamos en la ruta users
    };
    return UsersController;
}());
var usersController = new UsersController();
exports.default = usersController;
