import { Button, Card, FormGroup, TextField, IconButton  } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { makeRequest } from "../../axios";
import "./Page6.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Page6 = () => {
    
    const [inputs, setInputs] = useState({       
            oldpassword: "",
            newpassword: "",         
      });
      
      const [err, setErr] = useState(null);
      const [valide, setValide] = useState(null);
      const [showPassword, setShowPassword] = useState(false);
      const [showPassword1, setShowPassword1] = useState(false);


      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
      const handleClickShowPassword1 = () => {
        setShowPassword1(!showPassword1);
      };



      const queryClient = useQueryClient();

      const mutation = useMutation(
        () => {
            return makeRequest.patch("/users/ChangePwd", inputs);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("users");
                setValide("password modifier");

            },
            onError: (err) => {
                setErr("password non modifier");
            }
        }
    );
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));    
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        setErr(null);
        mutation.mutate({inputs});
    };

  
    return(
<div className="home">
<Card>
              <h1 className="sm-3">changer password</h1>
          <FormGroup className="BB">
            <TextField className="AA" label="old password"  type={showPassword ? "text" : "password"} name="oldpassword" 
            InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>),
              }}
        onChange={handleChange} />             
            <br/>
            <TextField className="AA" label="new password"  type={showPassword1 ? "text" : "password"}  name="newpassword" 

InputProps={{
    endAdornment: (
      <IconButton
        onClick={handleClickShowPassword1}
        onMouseDown={(e) => e.preventDefault()}>
        {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
    ),
  }}
        onChange={handleChange} />
              
            <br/>


      
            
               <br/>
      
      <Button className="sm-4" variant="contained" color="primary" onClick={handleClick}>
        changer password
      </Button>
      {err && <div className="cl2">{err}</div>}
      {valide && <div className="cl1">{valide}</div>}


             
          </FormGroup>
          </Card>
</div>

    );
}

export default Page6;