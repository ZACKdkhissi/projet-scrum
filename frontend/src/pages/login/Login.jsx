import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
              <img className="sz1" src="./dark.png" alt="" />

      <div className="card">
        <div className="left">
          <h1></h1>
          <p>
            
          </p>
          <span></span>
         { /*<Link to="/register">
            <button>Register</button>
          </Link>*/}
        </div>
        <div className="right">

          <h1>Login</h1>
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
            <button onClick={handleLogin}>Login</button>
            {err && <p className="vb">Mot de pass ou username incorrect !!!</p>}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
