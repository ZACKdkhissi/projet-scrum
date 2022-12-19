import express from "express";
import { login, logout, register, getUser } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user",getUser);




export default router;

