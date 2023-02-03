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
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SchoolIcon from '@mui/icons-material/School';
import Face6RoundedIcon from '@mui/icons-material/Face6Rounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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
              src="z.png"
              alt=""
            />
            <span className="kb">{currentUser.username}</span>
          </div>
          <br />
          {currentUser.role=="Admin" && 
            <div className="tl">
            <div className="item">
            <img  alt="" />
            <SchoolIcon className="ab-2" /><Link className="ab-2" to="/page1">Ajouter un Etudiant</Link>
          </div>
          <br/>

        <div className="item">
        <img  alt=""/>
        <Face6RoundedIcon className="ab-2" /><Link className="ab-2" to="/page2">Ajouter un professeur</Link>
        </div>        

        <br/>

        <div className="item">
        <img  alt=""/>
        <GroupRoundedIcon className="ab-2" /><Link className="ab-2" to="/page3">Etudiants</Link>
        </div>  
        <br/>

        <div className="item">
        <img  alt=""/>
        <PersonOutlineRoundedIcon className="ab-2" /><Link className="ab-2" to="/page4">Professeurs</Link>
        </div>  
        </div>

          }
          
        </div>
        
        <div className="menu">
          {(currentUser.role=="Etudiant" || currentUser.role=="Prof") &&
          <div>
        <div className="item">
            <img  alt="" />
            <QuestionAnswerIcon className="ab-1" /><Link className="ab-1" to="/"> question</Link>
          </div>
          <div className="item">
          <img  alt="" />
          <VpnKeyIcon className="ab-1" /><Link className="ab-1" to="/page6"> mot de pass</Link>
        </div></div>}
        </div>
        <div className="menu">
        
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
