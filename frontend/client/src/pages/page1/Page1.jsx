import { Card, FormGroup, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Page1.css";

import Button from '@mui/material/Button';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';









const Page1 = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    role: "Etudiant",
    date_naissance: "",
    nom: "",
    prenom: "",
    email: "",
    niveau: "",
  });

  const mutation = useMutation(
    (aa) => {
      return makeRequest.post("/users/add",inputs);
    }
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({inputs});
    window.location.reload();
  };

  const [value, setValue] = React.useState();
  const [err, setErr] = useState(null);

  

    return(
        <div className="home">
            <Card>
              <h1 className="sm-3">Ajouter un etudiant</h1>
          <FormGroup className="BB">
            <TextField className="AA" label="username" name="username"
              onChange={handleChange}/>
            <br/>
            <TextField className="AA" label="password" type="password"  name="password"
              onChange={handleChange} />
            <br/>


      
            <TextField className="AA" type="date" label=".................................date_naissance" id="start" name="date_naissance"
       min="1993-01-01" onChange={handleChange} />
                        <br/>

            <TextField className="AA" label="Nom" name="nom"
              onChange={handleChange}/>
            <br/>
            <TextField className="AA" label="Prenom" name="prenom"
              onChange={handleChange}/>
            <br/>
            <TextField className="AA" label="email" name="email"
              onChange={handleChange}/>
            <br/>
            <Box sx={{ minWidth: 100 }}>
      <FormControl sx={{ minWidth: 756 }}>
        <InputLabel >Niveau</InputLabel>
        <Select
          id="demo-simple-select"
          name="niveau"
          label="niveau"
          onChange={handleChange}
          >
          <MenuItem >------------</MenuItem>
          
          <MenuItem value={"ginf1"}>ginf1</MenuItem>
          <MenuItem value={"ginf2"}>ginf2</MenuItem>
          <MenuItem value={"ginf3"}>ginf3</MenuItem>
         

        </Select>
      </FormControl>
    </Box>  

            <br/>
            
      
      <Button className="sm-4" variant="contained" color="primary" onClick={handleClick}>
        Ajouter
      </Button>

             
          </FormGroup>
          </Card>

        </div>
    );
}

export default Page1;