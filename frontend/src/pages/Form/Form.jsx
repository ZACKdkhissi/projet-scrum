import { Button, Card, FormGroup, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { makeRequest } from "../../axios";
const Form =()=>{
    return(
        <div>
<Card>
              <h1 className="sm-3">changer password</h1>
          <FormGroup className="BB">
            <TextField className="AA" label="password" type="password" name="password" 
        onChange={handleChange} />
              
            <br/>
            <TextField className="AA" label="password" type="password"  name="password" 
        onChange={handleChange} />
              
            <br/>


      
            
               <br/>
      
      <Button className="sm-4" variant="contained" color="primary" onClick={handleClick}>
        changer
      </Button>

             
          </FormGroup>
          </Card>
        </div>
    );

}
export default Form;