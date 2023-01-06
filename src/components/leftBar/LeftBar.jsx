import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  const [test,setTest] = useState();
  const fnct = () => {
    if(currentUser.role == "Etudiant"){
      setTest(true)
    }else{
      setTest(false)
    }
  }
  
  

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" +currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.username}</span>
          </div>
          {currentUser.role=="Admin" && 
            <div className="item">
            <img  alt="" />
            <Link className="ab-1" to="/page1">page1</Link>
          </div>
          }
          
        </div>
        <hr />
        <div className="menu">
        <div className="item">
            <img  alt="" />
            <Link className="ab-1" to="/">question</Link>
          </div>
        </div>
        <hr />
        <div className="menu">
        
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
