import { Router, Request, Response } from "express";
import Skills from "../models/skillsModel";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  res.json([{ id: 1, test: "wheee" }]);
});

router.get("/skills", async (req: Request, res: Response) => {
  try {
    const skills = await Skills.find(); // Fetch skills from the database
    console.log(skills);
    if (skills.length > 0) {
      res.status(200).json({ skills, status: 200 });
    } else {
      res.status(404).json({ error: "No skills found", status: 404 });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills", status: 500 });
  }
});

export default router;
