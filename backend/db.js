import mysql from "mysql";

export const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "12345678aya@",
    database: "db_forum",
})