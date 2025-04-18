"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// This just imports and re-exports your main app
const server_1 = __importDefault(require("../server"));
exports.default = server_1.default;
console.log("✅ Vercel entry point loaded");
