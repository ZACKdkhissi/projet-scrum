import express from "express";
import { login, logout, register, getUser, addEtudiants, getEtudiant, AddProfesseur, getProfesseur } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user",getUser);
router.post("/AddEtudiant",addEtudiants);
router.get("/Etudiant",getEtudiant);
router.post("/AddProfesseur",AddProfesseur);
router.get("/Professeur",getProfesseur);




export default router;

