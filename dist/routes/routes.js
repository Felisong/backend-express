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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skillsModel_1 = __importDefault(require("../models/skillsModel"));
const priorWorks_1 = __importDefault(require("../models/priorWorks"));
const router = (0, express_1.Router)();
router.get("/users", (req, res) => {
    res.json([{ id: 1, test: "wheee" }]);
});
router.get("/skills", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield skillsModel_1.default.find(); // Fetch skills from the database
        if (skills.length > 0) {
            res
                .status(200)
                .json({ skills, status: 200, message: "successfully fetched skills" });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "successfully fetched, but found no skills",
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching skills", status: 500 });
    }
}));
router.get("/prior-works", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`I am getting pinged!`);
        const priorWorks = yield priorWorks_1.default.find().populate("skills");
        console.log(`hello?: `, priorWorks);
        if (priorWorks.length > 0) {
            res.status(200).json({
                priorWorks,
                status: 200,
                message: "successfully fetched work",
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: "successfully fetched, but found no skills",
            });
        }
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error fetching prior works", status: 500 });
    }
}));
exports.default = router;
