import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [err, setErr] = useState(null);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>logo name</h1>
          <p>
            
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
           
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {/*<input
              type="text"
              placeholder="role"
              name="role"
              onChange={handleChange}
  />*/}
             <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="role"
          label="Role"
          onChange={handleChange}
          >
          <MenuItem >------------</MenuItem>
          
          <MenuItem value={"Etudiant"}>Etudiant</MenuItem>
          <MenuItem value={"Prof"}>Prof</MenuItem>
        </Select>
      </FormControl>
    </Box>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
