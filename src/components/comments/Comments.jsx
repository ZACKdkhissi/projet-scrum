import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import axios from "axios";


const Comments = ({ id_question }) => {

  const [detail_reponse, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["reponse"], () =>
    makeRequest.get("/reponse?id_question=" + id_question).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();
  

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/reponse", newComment);
    }
  );

  
  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({  detail_reponse, id_question });
    setDesc("");
    window.location.reload();

  };

  
  

  return (
    <div className="comments">
      <div className="write">
        
        <input
          type="text"
          placeholder="ecrire une reponse"
          name="detail_reponse"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>envoyer</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((reponse) => (
            <div className="comment">
              <div className="info">
              <span>{reponse.username}</span>

                <p>{reponse.detail_reponse}</p>
              </div>
              <span className="date">
                {moment(reponse.date_reponse).fromNow()}
              </span>
            </div>
          ))}
      </div>


  );
};
  export default Comments;




































/*import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import axios from "axios";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  /*const { isLoading, error, data } = useQuery(["reponse"], () =>
    makeRequest.get("/reponse").then((res) => {
      return res.data;
    })
  );*/
  

 /* const queryClient = useQueryClient();

  /*const mutation = useMutation(
    (newReponse) => {
      return makeRequest.post("/reponse", newReponse);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );*/

  /*const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };*/
 



  

      {/*
      return (

    <div className="comments">
      <div className="write">
        <img  alt="" />
        <input
          type="text"
          placeholder="write a comment"
          name="detail_reponse"
             
        />
        <button >envoyer</button>
      </div>*/}
      {/*error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img  alt="" />
              <div className="info">
               
                <p>{comment.detail_reponse}</p>
              </div>
              <span className="date">
                {moment(comment.date_reponse).fromNow()}
              </span>
            </div>
        ))
         </div>
  );
};

export default Comments;

*/
      }
   
