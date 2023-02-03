import { Card, FormGroup, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Page2.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Page2 = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        role: "Prof",
        nom: "",
        prenom: "",
        email: "",
        departement: "",
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
    return(
        <div className="home">

<Card>
              <h1 className="sm-3">Ajouter un professeur</h1>
          <FormGroup className="BB">
            <TextField className="AA" label="username" name="username"
              onChange={handleChange}/>
            <br/>
            <TextField className="AA" label="password" type="password"  name="password"
              onChange={handleChange} />
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
        <InputLabel >Departement</InputLabel>
        <Select
          id="demo-simple-select"
          name="departement"
          label="departement"
          onChange={handleChange}
          >
          <MenuItem >------------</MenuItem>
          
          <MenuItem value={"informatique"}>informatique</MenuItem>
          <MenuItem value={"Reaseau"}>Reseau</MenuItem>
          <MenuItem value={"industriel"}>industriel</MenuItem>
         

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
export default Page2;