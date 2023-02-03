import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import "./Butto.css"

const Butto = ({row})=>{
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(
        (userId) => {
          return makeRequest.delete("/users/" + userId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
          },
        }
      );
      const handleDelete = () => {
        deleteMutation.mutate(row.id_user);
        window.location.reload();

      };
  return(
<div>
  <Link className="cv" onClick={handleDelete}><DeleteIcon /></Link>
  
</div>

  );
}

export default Butto;