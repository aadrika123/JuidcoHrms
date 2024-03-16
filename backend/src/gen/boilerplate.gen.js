"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import fs  from "fs";
var readline = require("readline");
var fs = require("fs");
var dao_foler = "";
var controller_folder = "";
var route_folder = "";
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var FileGenerator = /** @class */ (function () {
    function FileGenerator() {
        this.generate_dao = function () {
            fs;
        };
    }
    return FileGenerator;
}());
rl.question("what is your name", function (ans) {
    fileGenerator(ans);
    rl.close();
});
