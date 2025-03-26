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
const router = (0, express_1.Router)();
router.get("/users", (req, res) => {
    res.json([{ id: 1, test: "wheee" }]);
});
router.get("/skills", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield skillsModel_1.default.find(); // Fetch skills from the database
        if (skills.length > 0) {
            res.status(200).json({ skills, status: 200 });
        }
        else {
            res.status(404).json({ error: "No skills found", status: 404 });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching skills", status: 500 });
    }
}));
exports.default = router;
