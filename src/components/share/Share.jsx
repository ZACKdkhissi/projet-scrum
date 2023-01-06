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
const Share = () => {
  const [input, setInput] = useState({
    detail_question: "",
  });
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState({
    detail_question: "",
  });
  //const queryClient = useQueryClient();
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
    mutation.mutate({desc});
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
        </div>
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img  alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={handlChange}
              name="detail_question"
            />
          </div>
          
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
      

    </div>
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
