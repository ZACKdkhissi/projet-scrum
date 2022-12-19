import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    
    //verifier si le compte des deja existe
    const q="SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("ce compte deja existe");
         //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q ="INSERT INTO userss(`username`,`password`,`nom`,`prenom`,`email`,`role`) VALUE (?)";
        const values = [req.body.username,
            hash,
            req.body.nom,
            req.body.prenom,
            req.body.email,
            req.body.role,




        ];

        db.query(q,[values] ,(err,data) =>{
            if(err)return res.json(err);
            return res.status(200).json("User créer !!");
             
        })
    });


}


export const login = (req,res) => {
    const q="SELECT * FROM userss WHERE username = ?";
    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("n'existe pas !!");

        const checlPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checlPassword) return res.status(400).json("ereur");
         
        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const {password, ...orthers } = data[0];

        res.
        cookie("accessToken", token,{
            httpOnly: true,
        })
        .status(200)
        .json(orthers);
        
});
};

export const logout = (req,res) => {
   res.clearCookie("access token",{
    sameSite:"none",
    secure:true
   }).status(200).json("logoutt");

}

export const getUser = (req,res) => {
    /*const q=`SELECT * FROM userss where `;
    db.query(q, (err,data) => {
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
   /* if(req.session.username){
        res.send({loggedIn:true, username: req.session.username});
    }else{
        res.send({loggedIn:false});
    }*/
 
 }