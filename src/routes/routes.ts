import { Router, Request, Response } from "express";
import Skills from "../models/skillsModel";
import PriorWorks from "../models/priorWorks";
import mongoose from "mongoose";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  res.json([{ id: 1, test: "wheee" }]);
});

router.get("/skills", async (req: Request, res: Response) => {
  try {
    const skills = await Skills.find(); // Fetch skills from the database

    if (skills.length > 0) {
      res
        .status(200)
        .json({ skills, status: 200, message: "successfully fetched skills" });
    } else {
      res.status(404).json({
        error: "No skills found",
        status: 404,
        message: "successfully fetched, but found no skills",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills", status: 500 });
  }
});

router.get("/prior-work", async (req: Request, res: Response) => {
  try {
    console.log(`I am getting pinged!`);
    const priorWorks = await PriorWorks.find();
    console.log(`hello?: `, priorWorks);
    if (priorWorks.length > 0) {
      res.status(200).json({
        priorWorks,
        status: 200,
        message: "successfully fetched work",
      });
    } else {
      res.status(404).json({
        error: "No skills found",
        status: 404,
        message: "successfully fetched, but found no skills",
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: "Error fetching prior works" });
  }
});

export default router;
