import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants.js";



// interface user

export const register = async(req,res) => {
    
    //verifier si le compte des deja existe
    const q="SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.status(500).json(" test");
        if(data.length) return res.status(409).json("ce compte deja existe");
         //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q ="INSERT INTO users(`username`,`password`,`role`) VALUE (?)";
        const values = [req.body.username,
            hash,
            req.body.role,

        ];

        db.query(q,[values] ,(err,data) =>{
            if(err)return res.json(err);
            return res.status(200).json("User créer !!");
             
        })
    });


}


export const login = (req,res) => {
    const q="SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("n'existe pas !!");

        const checlPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checlPassword) return res.status(400).json("err");
         
        const token = jwt.sign({ id_user: data[0].id_user, role: data[0].role }, "secretkey");
      
     
      
        const {password, ...orthers } = data[0];

        res.cookie("accessToken", token,{
            httpOnly: true,
        })
        .status(200)
        .json(orthers);
        
});
};

export const logout =async (req,res) => {
   

    res.clearCookie("accessToken",{
        
    sameSite:"none",
    secure:true
   }).status(200).json("logoutt");
   
 
}








// export const UpdateUser = (req,res) => {
// }
 
// interface admin





