import express from "express";
import { addreponse, deletereponse,  getreponses,  updatereponse } from "../controller/reponse.js";

const router = express.Router();

//router.get("/:id", getPost);
router.get("/", getreponses);
router.post("/", addreponse);
router.delete("/:id_reponse", deletereponse);
router.put("/:id_reponse", updatereponse);

export default router;