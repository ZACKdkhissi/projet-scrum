import express from "express";

import {  addUser, updateUser,getUser, deleteUser,getProfesseurs ,getEtudiants,ChangePwd} from "../controller/user.js";
const router = express.Router();
//interface user
router.get("/user",getUser); // pour interface user affiche info selon id stocke en token
router.patch("/ChangePwd",ChangePwd);

// interface admin
router.post("/add",addUser);//fait appel a add professseur et add etudiant 
router.put("/:id_user", updateUser);//fait appel a update professseur and update etudiant 

router.delete("/:id_user", deleteUser);//fait appel a delete professseur and delete etudiant 

//affiche la liste des etudiants pour admin
router.get("/Etuds",getEtudiants);
router.get("/Profs",getProfesseurs);



// used en adduser
// router.post("/AddProf",AddProfesseur);
// router.post("/AddEtud",addEtudiant);





export default router;
