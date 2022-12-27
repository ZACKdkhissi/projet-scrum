import express from "express";
import { addQuestion, deleteQuestion, getQuestions } from "../controller/question.js";

const router = express.Router();

router.get("/", getQuestions);
router.post("/", addQuestion);
router.delete("/:id",deleteQuestion);





export default router;