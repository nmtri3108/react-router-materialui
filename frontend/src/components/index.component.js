import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Shirt } from "../apiServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../store/actions/counter";

export default function Index() {
  const [data, setData] = useState([]);
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    Shirt.get()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteShirt = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Shirt._delete(id, user.token)
          .then((res) => {
            onLoad();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => console.log(err));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
  };

  return (
    <>
      <h1>{counter}</h1>
      <div>
        <button onClick={() => dispatch(increment(5))}>increment</button>
        <button onClick={() => dispatch(decrement(5))}>decrement</button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>

      <Button
        onClick={() => navigation("/create")}
        variant="contained"
        color="success"
      >
        Create
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                  <TableCell align="right">
                    {user?.token && (
                      <>
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ marginRight: 2 }}
                          onClick={() => navigation(`/update/${row.id}`)}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => deleteShirt(row.id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1>No Data</h1>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
