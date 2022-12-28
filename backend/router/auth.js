import express from "express";
import { login, logout, register, getUser, addEtudiants, AddProfesseur, getProfesseurs, getEtudiants } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user",getUser);


router.post("/AddEtudiant",addEtudiants);
router.get("/Etudiants",getEtudiants);
router.post("/AddProfesseur",AddProfesseur);
router.get("/Professeurs",getProfesseurs);




export default router;

