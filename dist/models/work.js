"use strict";

const { default: mongoose } = require("mongoose");

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const worksSchema = new mongoose_1.default.Schema({
  id: { type: String, required: false },
  work_title: { type: String, required: true },
  images: {
    preview_image: { type: String, required: true },
    preview_image_alt: { type: String, required: true },
    image_one: { type: String, required: true },
    image_one_alt: { type: String, required: true },
    image_two: { type: String, required: true },
    image_two_alt: { type: String, required: true },
  },
  urls: {
    url_one: { type: String, required: true },
    url_two: { type: String, required: false },
    url_three: { type: String, required: false },
  },
  length_of_time: { type: String, required: true },
  short_description: { type: String, required: true },
  long_description: {
    type: String,
    required: true,
    get: (text) => text.replace(/\n/g, "<br>"),
  },
  skills_used: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Skills", required: true },
  ],
});
const Works = mongoose_1.default.model("works", worksSchema);
exports.default = PriorWork;
