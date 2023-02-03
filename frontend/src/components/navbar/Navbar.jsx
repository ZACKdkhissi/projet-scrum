import "./navbar.scss";
import "./Navbar.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Posts from "../posts/Posts";


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span><img className="sz" src="./logo.png" alt="" /></span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        
      </div>
      <div className="right">
        { darkMode ? ((currentUser.role=="Etudiant" || currentUser.role=="Prof") && <Link to="/page5" className="cl2"><PersonOutlinedIcon /></Link>):((currentUser.role=="Etudiant" || currentUser.role=="Prof") && <Link to="/page5" className="cl3"><PersonOutlinedIcon /></Link>)}
        <LogoutIcon onClick={logout} />
        <div className="user">
          <img
            src="z.png"
            alt=""
          />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
