import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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




export const getUser = (req,res) => {
const token= req.cookies.accessToken;
if(!token) return res.status(403).json("Token is not valid 1");
jwt.verify(token, "secretkey", (err, userInfo) => {
  
    if(err)return res.status(403).json("Token is not valid 2");
    if(userInfo.role == "Professeur"){
        //console.log('done');
        var sql ="select * from professeur where id_user=?";
      
        db.query(sql,userInfo.id_user ,(err,data)=> {
            if(err) {return res.status(500).json("err")};
           
            return res.status(200).json(data);
    
                  
        })
    
       }

      
    
   else if(userInfo.role=="Etudiant"){  
    var sql ="select * from etudiant where id_user=?";
    db.query(sql,userInfo.id_user ,(err,data)=> {
        if(err) return res.send(err)
 
        return res.status(200).json(data);

              
    })
   }
    
    })
   
}



 
 
// interface admin



export const AddProfesseur = (req,res) => {
    const q = "INSERT INTO users (`username`,`password`,`role`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.password,
       req.body.role
    ];
    db.query(q, [values], (err, result) => {
       
        
        if(err) return res.status(500).json(err);
        else{
        //console.log(result[id_user]);
        const d= " insert into  professeur(`nom`,`prenom`,`email`,`departement`,`id_user`) VALUES (?)";
        
        const values = [
              req.body.nom ,
              req.body.prenom ,
              req.body.email ,
             req.body.departement,
             result.insertId

            ]
          db.query(d,[values]  ,(err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    }
    })
    
    }
    
     
export const addEtudiants = (req,res) => {
    const q = "INSERT INTO users (`username`,`password`,`role`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.password,
       req.body.role
    ];
    db.query(q, [values], (err, result) => {
       
        
        if(err) return res.status(500).json(err);
        else{
        //console.log(result[id_user]);
        const d = "INSERT INTO etudiant (`nom`,`prenom`,`date_naissance`,`email`,`niveau`,`id_user`) VALUES (?)";
        const values = [
            req.body.nom,
            req.body.prenom,
            req.body.date_naissance,
            req.body.email,
            req.body.niveau,
             result.insertId

            ]
          db.query(d,[values]  ,(err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    }
    })
    
    }
    
    
    



    

    export const getProfesseurs = (req,res) => {
        
        var sql ="select * from professeur w";
        db.query(sql,(err,data)=> {
            if(err) return res.send(err)
     
            return res.status(200).json(data);
    
                  
        })
         
    
    
}
export const getEtudiants = (req,res) => {
    
    
    var sql ="select * from etudiant where id_user=?";
    db.query(sql,userInfo.id_user ,(err,data)=> {
        if(err) return res.send(err)
 
        return res.status(200).json(data);

     
     

})}
     