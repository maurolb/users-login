"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserI = void 0;
var bcrypt = __importStar(require("bcryptjs"));
var UserI = /** @class */ (function () {
    function UserI() {
    }
    UserI.prototype.hashPassword = function () {
        var salt = bcrypt.genSaltSync(10); // genera el salt
        this.password = bcrypt.hashSync(this.password, salt); // le pasa el password del front y el salt generado
    };
    UserI.prototype.checkPassword = function (password) {
        return bcrypt.compareSync(password, this.password); //compara ese password con el que recibimos de la base de datos, si coincide devuelve true sino false
    };
    return UserI;
}());
exports.UserI = UserI;
