import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Shirt } from "../apiServices";

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Shirt.get()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Sex</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">
                  {new Date(row.createdDate)
                    .toISOString()
                    .slice(0, 19)
                    .replace(/-/g, "/")
                    .replace("T", " ")}
                </TableCell>
                <TableCell align="right">
                  {row.sex ? "Male" : "Female"}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">No Action</TableCell>
              </TableRow>
            ))
          ) : (
            <h1>No Data</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
