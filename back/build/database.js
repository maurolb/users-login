"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promise_mysql_1 = __importDefault(require("promise-mysql"));
var pool = promise_mysql_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
});
pool.getConnection()
    .then(function (connection) {
    pool.releaseConnection(connection);
    console.log('Base de datos conectada');
});
exports.default = pool;
