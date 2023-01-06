import { Card, FormGroup, TextField } from "@mui/material";
import React from "react";
import "./Page1.css";




const Page1 = () => {

    return(
        <div className="home">
            <Card>
          <FormGroup className="BB">
            <TextField className="AA" label="username" />
            <br/>
            <TextField className="AA" label="password" />
            <br/>
            <TextField className="AA" label="Nom" /> <br/>
            <TextField className="AA" label="Prenom" />
            <br/>
            <TextField className="AA" label="Date de naissance" />
            <br/>
            <TextField className="AA" label="confirmer password" /><br/>
            <TextField className="AA" label="email" />
            <br/>
            <TextField className="AA" label="role" />


             
          </FormGroup>
          </Card>

        </div>
    );
}

export default Page1;