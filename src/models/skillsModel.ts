import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  category: { type: String, required: true },
  logo_alt: { type: String, required: true },
  logo_url: { type: String, required: true },
  url: { type: String, required: true },
});
const Skills = mongoose.model("skills", skillsSchema);

export default Skills;
