import mongoose from "mongoose";

const priorWorksSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
      required: false,
    },
  ],
  figmaLinks: [{ type: String, required: false }],
});

const PriorWorks = mongoose.model("priorWorks", priorWorksSchema, "priorWorks");

export default PriorWorks;
