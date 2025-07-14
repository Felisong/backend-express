"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const priorWorksSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    image1: { type: String, required: true },
    gif: { type: String, required: false },
    description: { type: String, required: true },
    deployedUrl: { type: String, required: false },
    githubFront: { type: String, required: false },
    githubBack: { type: String, required: false },
    timeframe: { type: String, required: false },
    willReturnTo: { type: Boolean, required: true },
    complete: { type: Boolean, required: true },
    skills: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Skills",
            required: false,
        },
    ],
    figmaLinks: [{ type: String, required: false }],
    alt: { type: String, required: true },
});
const PriorWorks = mongoose_1.default.model("priorWorks", priorWorksSchema, "priorWorks");
exports.default = PriorWorks;
