import { Card, FormGroup, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Page4.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Butto from "../Button/Butto";

const Page4 = () => {
    const { isLoading, error, data } = useQuery(["users/Profs"], () =>
    makeRequest.get("/users/Profs").then((res) => {
      return res.data;
    })
  );

return(
    <div className="home">
        <h1 className="sq">Les professeurs</h1>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : (
        <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650 }} aria-label="simple table">
             <TableHead>
          <TableRow>
            <TableCell><b>Nom</b></TableCell>
            <TableCell align="right"><b>Prenom</b></TableCell>
            <TableCell align="right"><b>email</b></TableCell>
            <TableCell align="right"><b>Departement</b></TableCell>
            <TableCell align="right"><b>Action</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              <TableCell align="right">{row.prenom}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.departement}</TableCell>
              <TableCell align="right"><Butto row={row} key={row.id_user}/></TableCell>

            </TableRow>
          ))}
        </TableBody>

             </Table>
        </TableContainer>
        

        )}

    </div>
);
}

export default Page4;
