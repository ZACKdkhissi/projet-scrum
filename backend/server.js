

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");



const app=express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Zakaria1234@",
    database: "scrum1",
});

app.post("/register", (req, res) => {

const username =req.body.username;
const password =req.body.password;

    db.query(
        "INSERT INTO user (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);

        }

    );
});


app.post("/login", (req, res) => {

    const username =req.body.username;
    const password =req.body.password;
    
        db.query(
            "SELECT * FROM user WHERE username=? and password=?",
            [username, password],
            (err, result) => {
             if(err){
                res.send({err:err});
             }
             if(result.length > 0) {
                res.send(result);
             }else{
                res.send({message: "eroooooooooooor"});
             }
            }
    
        );
    });

app.listen(3001, () => {
    console.log("run on 3001");
})
