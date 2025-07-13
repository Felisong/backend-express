"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skillsSchema = new mongoose_1.default.Schema({
    id: { type: String, required: false },
    skill: { type: String, required: true },
    category: { type: String, required: true },
    logo_alt: { type: String, required: true },
    logo_svg: { type: String, required: true },
    url: { type: String, required: true },
});
const Skills = mongoose_1.default.model("skills", skillsSchema);
exports.default = Skills;
