
import Post from "../post/Post";
import "./posts.scss";
import "../post/post.scss"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AuthContext } from "../../context/authContext";


import React,{ useContext, useEffect, useState } from "react";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

import moment from "moment";

import axios from "axios";

const Posts = ({userId}) => {
  const [search,setSearch] = useState("");
  /*******************const [posts,setPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);





    useEffect(()=>{
        const fetchData = async ()=>{
           try{
            const res = await axios.get("http://localhost:3001/api/questions")

            setPosts(res.data);
           }catch (err){
             console.log(err);
           }
        };
        fetchData();
     },[])********************/

     /* axios.delete(`http://localhost:3001/api/questions/${id_question}`)  
        .then(res => {  
          console.log("a");  
          console.log(res.data);  
      
           
        }).catch((err) => {
          console.log("err");
      })
     const deleteRow = async() => {  
    

      try {
        const response = await axios.delete('http://localhost:3001/api/questions/'+{
          params: {
           id_question:""
          }
        });
        console.log(response.data);  

      } catch (error) {
        console.log(error)
      }
      
    } 
    await axios.delete('http://localhost:3001/api/questions/' + question.id_question);
      setPosts(posts.filter((p)=>p.id_question !== question.id_question));
    
    */
      
    /*************************const deleteMutation = useMutation(
      (questionId) => {
        return makeRequest.delete('/questions/' + questionId);
      }
    );

     const handlDelete = async(question) => {
      deleteMutation.mutate(question);
      window.location.reload();


    };******************************/

    /**************************const [input, setInput] = useState({
      detail_reponse: "",
      id_question: "",
    });
    const [desc, setDesc] = useState({
      detail_reponse: "",
    id_question: "",});

    const mutation = useMutation(
      (newComment) => {
        return makeRequest.post("/reponse", input);
      }
    );
    const handlChange = (e) => {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
   

    const handleClick = async (e,post) => {
      e.preventDefault();
      mutation.mutate({ desc,post });
      setDesc("");
      window.location.reload();

    };
    ***************************************/
    const { isLoading, error, data } = useQuery(["questions"], () =>
    makeRequest.get("/questions").then((res) => {
      return res.data;
    })
  );



  return (
    <div>
      
      
      {/*error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.filter((val)=>{
          if(search=="")return val;
          else if(val.detail_question.toLowerCase().includes(search.toLowerCase())){return val;}
        }).map((post) => <Post post={post} key={post.id_question} />)*/}
      
      
      {/****************** 
    <div >
    {posts.map((post) =>
     (
    
      <div className="post">
      <div className="container">
      
        <div className="user">
          <div className="userInfo">
            {post.id_user === currentUser.id_user &&<MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>}
          
          {menuOpen && post.id_user === currentUser.id_user && <button  onClick={()=>handlDelete(post.id_question)}>Delete</button>}
            <div className="details">
            <span className="name">{post.username}</span>
            <span className="date">{moment(post.date_question).fromNow()}</span>
            <p>{post.detail_question}</p>
            <div className="item" >
            <p>voir les reponse</p>
          </div>
          <input  name="detail_reponse"
          onChange={handlChange}/>
          <button onClick={handleClick(post.id_question)}>-</button>
              </div>
              </div>
              </div>
              </div>
              </div>
              


)


)}
</div>


     *************************************/}
   

</div>
  );
};

export default Posts;
