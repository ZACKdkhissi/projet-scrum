import express from "express";
import cors from "cors";
import postRoutes from "./router/posts.js"
import userRoutes from "./router/users.js"
import authRoutes from "./router/auth.js"
import reponseRoutes from "./router/reponse.js"
import questionRoutes from "./router/questions.js"
import cookieParser from "cookie-parser";
import { db } from "./db.js";


//const express = require("express");
//require("./router/posts.js");
//import './router/posts.js';


const app=express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  
  app.use(cookieParser());





app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/reponse", reponseRoutes);




app.listen(3001, () => {
    console.log("run on 3001");
})
























/*
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
})*/
