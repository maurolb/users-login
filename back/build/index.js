"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var app = express_1.default();
//middlewares
app.set('port', process.env.PORT || 7000);
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use('/users', usersRoutes_1.default);
app.use('/auth', authRoutes_1.default);
//start
app.listen(app.get('port'), function () {
    console.log('Server on por', app.get('port'));
});
