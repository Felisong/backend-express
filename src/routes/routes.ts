import express, { Request, Response } from "express";
import Skills from "../models/skillsModel";
import PriorWorks from "../models/priorWorks";
import ReceivedMessages from "../models/messages";
import { Middleware } from "../middleware";
const middleware = new Middleware();
const router = express.Router();

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
        status: 404,
        message: "successfully fetched, but found no skills",
      });
    }
  } catch (err: any) {
    console.error(err.message || "Failed while fetching skills");
    res.status(500).json({ message: "Error fetching skills", status: 500 });
  }
});

router.get("/prior-works", async (req: Request, res: Response) => {
  try {
    const priorWorks = await PriorWorks.find().populate("skills");
    if (priorWorks.length > 0) {
      res.status(200).json({
        priorWorks,
        status: 200,
        message: "successfully fetched work",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "successfully fetched, but found no skills",
      });
    }
  } catch (err: any) {
    console.error(err.message || "Failed while fetching prior works.");
    res
      .status(500)
      .json({ message: "Error fetching prior works", status: 500 });
  }
});

router.post("/submit-contact-form", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, contact_number } = req.body;
    const ipAddress = req.ip;
    const dateNow = new Date().toISOString();
    // check if ip address is blocked first and forment, then return if so, else

    if (contact_number?.length > 0) {
      // likely bot as that field should not be filled out.
      const logged = await middleware.handleBots(ipAddress, dateNow);
      console.log(`and i read the return: `, logged);
      res.status(200).json({ message: "Successfully sent!" });
      return;
    }
    // now I can make the entry to messages
    const contactEntry = await ReceivedMessages.create({
      name: name,
      email: email,
      subject: subject,
      message: message,
      dateSent: dateNow,
      status: "Unread",
    });
    if (contactEntry._id) {
      res.status(200).json({ message: "Successfully sent!" });
    } else {
      res.status(409).json({ message: "Failed to create message entry" });
    }
  } catch (err: any) {
    console.error(err.message || "Failed inside submit contact form.");
    res.status(500).json({
      message: err.message || "Error submitting message",
      status: 500,
    });
  }
});

export default router;
