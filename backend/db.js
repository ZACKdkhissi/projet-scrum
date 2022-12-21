import mysql from "mysql";

export const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Zakaria1234@",
    database: "db_forum",
})