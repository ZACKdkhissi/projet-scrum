import "./share.scss";
import "./share.css";


import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { makeRequest } from "../../axios";
import axios from "axios";
import Post from "../post/Post";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';






const Share = () => {


  



  const [input, setInput] = useState({
        detail_question: "",
        categorie: "",
  });
  const { currentUser } = useContext(AuthContext);
  const mutation = useMutation(
        (aa) => {
          return makeRequest.post("/questions",input);
        }
        );
        const handlChange = (e) => {
          setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({input});
        window.location.reload();
  };
  
  const [search,setSearch] = useState("");

  const { isLoading, error, data } = useQuery(["questions"], () =>
    makeRequest.get("/questions").then((res) => {
      return res.data;
    })
  );



  /*const [input, setInput] = useState({
    detail_question: "",
  });
  const [erreur,setErreur] = useState(null);

  const handlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/questions", input);
    } catch (err) {
      setErreur(err.response.data);
    }
  };*/



/*
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };*/

  return (
    <div>
          <div className="search">
          <SearchOutlinedIcon />
          <input className="ss" type="text" placeholder="Search..." onChange={(event)=>{setSearch(event.target.value)}}  />
        </div>{currentUser.role=="Etudiant" &&
      <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src="z.png" alt="" />
            <input className="cl"
              type="text"
              placeholder={`écrivez votre question ${currentUser.username}?`}
              onChange={handlChange}
              name="detail_question"
            />
          </div>         
        </div>
        <hr />
        <div className="bottom">
          <div className="left"> 
    <div>
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel >categorie</InputLabel>
        <Select
          id="demo-simple-select"
          name="categorie"
          label="Role"
          onChange={handlChange}
          >
          <MenuItem >------------</MenuItem>
          
          <MenuItem value={"cateA"}>cateA</MenuItem>
          <MenuItem value={"cateB"}>cateB</MenuItem>
          <MenuItem value={"cateC"}>cateC</MenuItem>
          <MenuItem value={"cateD"}>cateD</MenuItem>
          <MenuItem value={"cateE"}>cateE</MenuItem>

        </Select>
      </FormControl>
    </Box>
    </div>


          </div>
          <div className="right">
            <button onClick={handleClick}>Partager</button>
          </div>
        </div>
      </div>
      

    </div>
    
    }
            <hr />

    {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.filter((val)=>{
          if(search=="")return val;
          else if(val.detail_question.toLowerCase().includes(search.toLowerCase())){return val;}
        }).map((post) => <Post post={post} key={post.id_question} />)}
    </div>
  );
};

export default Share;
