import { db }  from "../db.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from "moment";
import { ROLES } from "../constants.js";



//interface user getv specific user

export const getUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid 2");
        
        if (userInfo.role == ROLES.Prof) {
            
            let sql = "select username , password ,nom,prenom,email ,departement from professeur INNER JOIN users ON (professeur.id_user = users.id_user) where professeur.id_user=?";

            db.query(sql, userInfo.id_user, (err, data) => {
                if (err) { return res.status(500).json("err") };
                return res.status(200).json(data);
            })
        }
        else if (userInfo.role == ROLES.Etudiant) {
            
            let sql = "select username , password ,nom,prenom,email,date_naissance ,niveau from etudiant INNER JOIN users ON (etudiant.id_user = users.id_user) where etudiant.id_user=?";

            db.query(sql, userInfo.id_user, (err, data) => {
                if (err) return res.send(err)

                return res.status(200).json(data);

            })
        }

    })

}

// export const getProfesseur = (req, res) => {
//     let sql = "select * from professeur where id_user=?";
//     db.query(sql,userInfo.id_user, (err, data) => {
//         if (err) return res.send(err)

//         return res.status(200).json(data);
//     });
// }

// export const getEtudiant = (req, res) => {
//     let sql = "select * from etudiant where id_user=?";
//     db.query(sql, userInfo.id_user, (err, data) => {
//         if (err) return res.send(err)
//         return res.status(200).json(data);
//     })
// }





// interface admin delete /update /add/ get users 

// supprimer un user 
export const deleteUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json("Token not valid");
    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        let sql = "select * from users where id_user=?";

        db.query(sql, req.params.id_user, (err, data) => {
            if (err) { return res.status(500).json("err") };
            if (!data || data.length < 1) {
                return res.status(404).json("user not found")
            }

            if (data[0].role == ROLES.Etudiant) {
                deleteEtudiant(req, res);
            }
            else if (data[0].role == ROLES.Prof) {
                deleteProfesseur(req, res);
            }

        })
        
    })
}

export const deleteEtudiant = (req, res) => {
    const req_user = 'delete from users where id_user=?';
    db.query(req_user, [
        req.params.id_user
    ],
        (err, data) => {
            if (err) return res.json(err)
            else {
                const req_etudiant = 'delete from etudiant where id_user=?';
                db.query(req_etudiant, [
                    req.params.id_user
                ],
                    (err, data) => {
                        if (err) return res.json(err)
                        else return res.json(data);
                    })
            }
        })
}

export const deleteProfesseur = (req, res) => {
    const req_user = 'delete from users where id_user=?';
    db.query(req_user, [
        req.params.id_user
    ],
        (err, data) => {
            if (err) return res.json(err)
            else {
                const req_professeur = 'delete from professeur where id_user=?';
                db.query(req_professeur, [
                    req.params.id_user
                ],
                    (err, data) => {
                        if (err) return res.json(err)
                        else return res.json(data);
                    })
            }
        })
}


//update user

export const updateUser = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json("Token is not valid ");
    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");
        const sqlrole = "select role from users where id_user=?";
        db.query(sqlrole , req.params.id_user , 
            (err , data) => {
                if(err) { return res.status(500).json(err);};
                if (data[0].role == ROLES.etudiant) {
                    updateEtudiant(req, res);
                }
                else if (data[0].role == ROLES.professeur) {
                    updateProfesseur(req, res);
                }
            }            
        )
    })
}

export const updateEtudiant = (req, res) => {

    const q = "SELECT * FROM users WHERE id_user = ?";
    db.query(q, [req.params.id_user], (err, data) => {
        if (err) return res.status(500).json(" test ");
        else {
            if (data.length == 0) return res.status(409).json("ce user n'existe pas");
        else {
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
       
        const t = "UPDATE users SET password=? where id_user=?";
        const values = [
            hash,
            req.params.id_user
        ];
        db.query(t, values, (err, u_user) => {
            if (err) {console.log("wsalt"); return res.status(500).json(err); }
            else {
                console.log("hna hsn mn lhih");
                const query = " UPDATE etudiant SET nom=? ,prenom=? ,date_naissance=? ,email=? ,niveau=?  where id_user=?";
                const values_query = [
                    req.body.nom,
                    req.body.prenom,
                    req.body.date_naissance,
                    req.body.email,
                    req.body.niveau,
                    req.params.id_user
                ]
                db.query(query, values_query, (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data);
                })
            }
        })
    }}})
}

export const updateProfesseur = (req, res) => {

    const q = "SELECT * FROM users WHERE id_user = ?";
    db.query(q, [req.params.id_user], (err, data) => {
        if (err) return res.status(500).json(" test ");
        if (data.length == 0) return res.status(409).json("ce user n'existe pas");
        else {
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const t = "UPDATE users SET  password =? where id_user=?";
        const values = [
            hash,
            req.params.id_user
        ];

        db.query(t, values, (err, u_user) => {

            if (err) return res.status(500).json(err);
            else {
                //console.log(result[id_user]);
                const query = " UPDATE professeur SET nom=? ,prenom=? ,email=? ,departement=?  where id_user=?";

                const values_query = [
                    req.body.nom,
                    req.body.prenom,
                    req.body.email,
                    req.body.departement,
                    req.params.id_user
                ]
                db.query(query, values_query, (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data);
                })
            }
        })
    }})
}

export const addUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid 2");

        if (req.body.role == ROLES.Etudiant) {
           
            addEtudiants(req, res);
        }
        else if (req.body.role == ROLES.Prof) {
         
            AddProfesseur(req, res);
        }
    })
}


export const AddProfesseur = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(" test");
        if (data.length) return res.status(409).json("ce username est deja existe");
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`,`password`,`role`) VALUES (?)";
        const values = [
            req.body.username,
            hash,
            // req.body.password,
            req.body.role
        ];
        db.query(q, [values], (err, result) => {

            if (err) return res.status(500).json(err);
            else {
                //console.log(result[id_user]);
                const d = " insert into  professeur(`nom`,`prenom`,`email`,`departement`,`id_user`) VALUES (?)";

                const values = [
                    req.body.nom,
                    req.body.prenom,
                    req.body.email,
                    req.body.departement,
                    result.insertId
                ]

                db.query(d, [values], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data);
                })
            }
        })
    });

}

export const addEtudiants = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(" test");
        if (data.length) return res.status(409).json("ce username est deja existe");
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`,`password`,`role`) VALUES (?)";
        const values = [
            req.body.username,
            hash,
            // req.body.password,
            req.body.role
        ];
        db.query(q, [values], (err, result) => {

            if (err) return res.status(500).json(err);
            else {
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
                db.query(d, [values], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data);
                })
            }
        })
    });
}

export const getProfesseurs = (req, res) => {
    let sql = "select * from professeur";
    db.query(sql, (err, data) => {
        if (err) return res.send(err)
        return res.status(200).json(data);
    })
}

export const getEtudiants = (req, res) => {
    let sql = "select * from etudiant";
    db.query(sql, (err, data) => {
        if (err) return res.send(err)
        return res.status(200).json(data);
    })
}



/*export const  ChangePwd = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");
        
        const checkQuery = "SELECT * FROM users WHERE id_user = ? ";
       
        db.query(checkQuery,[userInfo.id_user],(err,res) => {
            if(err) return res.status(500).json(err);
      
            const checlPassword = bcrypt.compareSync(req.body.oldpassword, res[0].password);
            if(!checlPassword) return res.status(400).json("err chek");
            else{
               
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newpassword,salt);
                const q = "UPDATE users SET password=? where id_user=?";
                db.query(q,[hash,userInfo.id_user],(err,data)=>{
                    if(err)return res.status(500).json(err);
                    return res.status(500).json(data);  
                })
                return res.status(500).json("update done"); 
            }
        })
    
    });

}*/

export const ChangePwd = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Token is not valid 1");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err)return res.status(403).json("Token is not valid 2");
        
        const checkQuery = "SELECT * FROM users WHERE id_user = ? ";
       
        db.query(checkQuery,[userInfo.id_user],(err,result) => {
            if(err) return res.status(500).json(err);
      
            const checlPassword = bcrypt.compareSync(req.body.oldpassword, result[0].password);
            if(!checlPassword) return res.status(400).json("err chek");
            else{
               
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newpassword,salt);
                const q = "UPDATE users SET password=? where id_user=?";
                db.query(q,[hash,userInfo.id_user],(err,data)=>{
                    if(err) return res.status(500).json(err);
                    return res.status(200).json(data);  
                }) 
            }
        });
    });
}