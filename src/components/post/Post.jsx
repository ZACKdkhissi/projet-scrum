import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  /*const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );*/

  const queryClient = useQueryClient();

  /*const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );*/
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/questions/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["questions"]);
      },
    }
  );

  /*const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };*/

  const handleDelete = () => {
    deleteMutation.mutate(post.id_question);
  };
/*
  const [inputs, setInputs] = useState({
    detail_reponse: "",
    post,
  });

  const handleChangee = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleClicke = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/reponse", inputs);
    } catch (err) {
      console.log(err);
    }
  };*/
  const [desc, setDesc] = useState("");


  const mutation = useMutation(
    (newReponse) => {
      return makeRequest.post("/reponse", newReponse);
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc, post});
    setDesc("");
  }
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img  alt="" />
            <div className="details">
            <span className="name">{post.username}</span>

              <span className="date">{moment(post.date_question).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.id_user === currentUser.id_user && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.detail_question}</p>
        </div>
        <div className="info">
          <div className="item">
            {/*isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )*/}
          
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            voir reponses
          </div>
          
        </div>
        {commentOpen && <Comments id_question={post.id_question} />}    
          </div>
    </div>
  );
};

export default Post;