"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
exports.log = {
    info: (args) => console.log("%c[INFO]", "color: green;", args),
    warn: (args) => console.warn("%c[WARN]", "color: orange;", args),
    error: (args) => console.error("%c[ERROR]", "color: red;", args),
};
