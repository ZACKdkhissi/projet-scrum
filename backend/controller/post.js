import {db} from "../db.js"
import jwt from "jsonwebtoken";
import moment from "moment";



export const getPosts = (req,res) => {
   /* const q = req.query.categ
    ?`SELECT * FROM posts WHERE categ=?`
    : `SELECT * FROM posts`;*/
    const q=`SELECT p.*,username,nom,prenom FROM posts AS p JOIN userss AS u ON (u.id=p.uid)`;
    db.query(q, (err,data) => {
        if(err) return res.send(err)

        return res.status(200).json(data)
    })

   
}


 




export const getPost = (req,res) => {
    const q = "SELECT * FROM userss"; 

     db.query(q, (err,data) => {
         if(err) return res.send(err)
 
         return res.status(200).json(data)
     })
    
}

export const addPost = (req,res) => {
const token = req.cookies.accessToken;
if(!token) return res.status(403).json("Token is not valid 1");
jwt.verify(token, "secretkey", (err, userInfo) => {
    if(err)return res.status(403).json("Token is not valid 2");

    const q = "INSERT INTO posts (`title`,`question`,`date`,`categ`,`uid`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.question,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.categ,
        userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("post créer");
    })
})

}



export const deletePost = (req,res) => {
}

export const updatePost = (req,res) => {
}
