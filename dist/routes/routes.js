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
const express_1 = __importDefault(require("express"));
const skillsModel_1 = __importDefault(require("../models/skillsModel"));
const priorWorks_1 = __importDefault(require("../models/priorWorks"));
const messages_1 = __importDefault(require("../models/messages"));
const middleware_1 = require("../middleware");
const middleware = new middleware_1.Middleware();
const router = express_1.default.Router();
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
    catch (err) {
        console.error(err.message || "Failed while fetching skills");
        res.status(500).json({ message: "Error fetching skills", status: 500 });
    }
}));
router.get("/prior-works", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const priorWorks = yield priorWorks_1.default.find().populate("skills");
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
        console.error(err.message || "Failed while fetching prior works.");
        res
            .status(500)
            .json({ message: "Error fetching prior works", status: 500 });
    }
}));
router.post("/submit-contact-form", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject, message, contact_number } = req.body;
        const ipAddress = req.ip;
        const dateNow = new Date().toISOString();
        // check if ip address is blocked first and forment, then return if so, else
        if ((contact_number === null || contact_number === void 0 ? void 0 : contact_number.length) > 0) {
            // likely bot as that field should not be filled out.
            const logged = yield middleware.handleBots(ipAddress, dateNow);
            console.log(`and i read the return: `, logged);
            res.status(200).json({ message: "Successfully sent!" });
            return;
        }
        // now I can make the entry to messages
        const contactEntry = yield messages_1.default.create({
            name: name,
            email: email,
            subject: subject,
            message: message,
            dateSent: dateNow,
            status: "Unread",
        });
        if (contactEntry._id) {
            res.status(200).json({ message: "Successfully sent!" });
        }
        else {
            res.status(409).json({ message: "Failed to create message entry" });
        }
    }
    catch (err) {
        console.error(err.message || "Failed inside submit contact form.");
        res.status(500).json({
            message: err.message || "Error submitting message",
            status: 500,
        });
    }
}));
exports.default = router;
