import { Table, TableCell } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./Page5.scss"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Page5 = () => {

    const { isLoading, error, data } = useQuery(["users/user"], () =>
    makeRequest.get("/users/user").then((res) => {
      return res.data;
    })
  );

  const { currentUser } = useContext(AuthContext);
  function getFirstNCharacters(str, n) {
    return str.substring(0, n);
  }
    return(
    <div className="home">
     {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((user) =>
       

        <div class="frame">
        <div class="center">
          
              <div class="profile">
                  <div class="image">
                      <div class="circle-1"></div>
                      <div class="circle-2"></div>
                      <img src="z.png" width="70" height="70" alt="Jessica Potter"/>
                  </div>
                  
                  <div class="name">{user.username}</div>
                  {currentUser.role=="Prof" && <div class="job">professeur</div>}
                  {currentUser.role=="Etudiant" && <div class="job">Etudiant</div>}

                  
                  <div class="actions">
                      
                      <Link to="/" class="btn">Question</Link>
                  </div>
                  <div className="ec1">
                  <table>
                     <tr>
                        <th>Nom: </th>
                        <th><h5 >{user.nom}</h5></th>
                     </tr>
                     <br />
                     <tr>
                        <th>Prenom: </th>
                        <th><h5 >{user.prenom}</h5></th>
                     </tr>
                     <br />

                     <tr>
                        <th>Email: </th>
                        <th><h5 > {user.email}</h5></th>
                     </tr>
                     <br />

                     {currentUser.role=="Prof" &&<tr>
                        <th>Departement: </th>
                        <th><h5 > {user.departement}</h5></th>
                     </tr>     }  
                     <br />
  
                     {currentUser.role=="Etudiant" &&<tr>
                        <th>Date de naissance: </th>
                        <th><h5 > {getFirstNCharacters(user.date_naissance, 10)}</h5></th>
                     </tr>     }    
 <br />
                     {currentUser.role=="Etudiant" &&<tr>
                        <th>Departement: </th>
                        <th><h5 > {user.niveau}</h5></th>
                     </tr>     }            
                     </table>
                   

                  </div>
              </div>
              
              
        </div>
      </div>
        
        )}

    </div>
    );


}

export default Page5;