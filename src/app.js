"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loaders_1 = require("./loaders");
var dotenv_1 = require("dotenv");
var app = (0, express_1.default)();
dotenv_1.default.config();
var PORT = process.env.PORT || process.env.SERVER_PORT || 8080;
var end = (0, loaders_1.default)({
    expressApp: app,
    isTest: process.env.ENV === 'test' ? true : false,
})
    .then(function () {
    return app.listen(PORT, function () { return console.log("Server Running on Port ".concat(PORT)); });
})
    .catch(function (err) {
    console.log("Loader Failed err: ".concat(err));
});
exports.default = { server: app, end: end };
