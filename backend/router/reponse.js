import express from "express";
import { addreponse, deletereponse,  getreponses,  updatereponse } from "../controller/reponse.js";

const router = express.Router();

//router.get("/:id", getPost);
router.get("/:id_question", getreponses);

router.post("/:id_question", addreponse);
router.delete("/:id", deletereponse);
router.put("/:id", updatereponse);

export default router;