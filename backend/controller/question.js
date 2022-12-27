import {db} from "../db.js"
import jwt from "jsonwebtoken";
import moment from "moment";



export const getQuestions = (req,res) => {
    /* const q = req.query.categ
     ?`SELECT * FROM posts WHERE categ=?`
     : `SELECT * FROM posts`;*/
     const q=`SELECT Q.*,username FROM question AS Q JOIN users AS u ON (u.id_user=Q.id_user)`;
     db.query(q, (err,data) => {
         if(err) return res.send(err)
 
         return res.status(200).json(data)
     })
 
    
 }

 export const addQuestion = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");
    
        const q = "INSERT INTO question (`id_user`,`detail_question`,`date_question`,`categorie`) VALUES (?)";
        const values = [
            userInfo.id_user,
            req.body.detail_question,
           
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.categorie,
            
        ];
    
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("post créer");
        })
    })
    
    }
    export const deleteQuestion = (req,res) =>  
    {
        const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");

       const q = "delete from question where id_question=? and id_user=?";
       const values = [
        req.params.id,
        userInfo.id_user
     ];
       db.query(q, [values], (err, data) => {
       if(err) return res.status(500).json(err);
       return res.status(200).json(data);
            })
        })
        }



