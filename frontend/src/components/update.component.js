import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Shirt } from "../apiServices";
import { useNavigate, useParams } from "react-router-dom";

const brands = [
  {
    value: "GUCCI",
    label: "GUCCI",
  },
  {
    value: "LV",
    label: "LV",
  },
  {
    value: "ADIDAS",
    label: "ADIDAS",
  },
  {
    value: "NIKE",
    label: "NIKE",
  },
];

const sex = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const initialValue = {
  name: "",
  brand: "GUCCI",
  createdDate: new Date(),
  sex: true,
  price: 0,
};

const Update = () => {
  const { id } = useParams();
  const [shirt, setShirt] = useState(initialValue);
  const navigation = useNavigate();

  useEffect(() => {
    Shirt.get(id)
      .then((res) => {
        setShirt({
          name: res.data[0].name,
          brand: res.data[0].brand,
          createdDate: new Date(res.data[0].createdDate),
          sex: res.data[0].sex,
          price: res.data[0].price,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log(shirt);
  // }, [shirt]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShirt({ ...shirt, [name]: value });
  };

  const handleChangePrice = (event) => {
    const { name, value } = event.target;
    setShirt({ ...shirt, [name]: Number(value) });
  };

  const handleChangeSex = (event) => {
    const { name, value } = event.target;
    setShirt({ ...shirt, [name]: value === "Male" });
  };

  const handleChangeDate = (value) => {
    setShirt({ ...shirt, createdDate: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    Shirt.put(id, shirt)
      .then((res) => {
        navigation("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1
        style={{ textAlign: "center", color: "#1976D2", marginBottom: "10px" }}
      >
        Update Shirt
      </h1>
      <form
        style={{
          diplay: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: 3,
        }}
        onSubmit={onSubmit}
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          fullWidth
          required
          value={shirt.name}
          onChange={(e) => handleChange(e)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Brand"
          variant="outlined"
          name="brand"
          fullWidth
          required
          select
          sx={{ marginBottom: 2 }}
          value={shirt.brand}
          onChange={(e) => handleChange(e)}
        >
          {brands.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* <TextField
        label="Created Date"
        variant="outlined"
        name="createdDate"
        fullWidth
        required
        type="date"
        sx={{ marginBottom: 2 }}
      /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="Created Date"
              value={dayjs(shirt.createdDate)}
              onChange={(newValue) => handleChangeDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          label="Sex"
          variant="outlined"
          name="sex"
          fullWidth
          required
          select
          value={shirt.sex ? "Male" : "Female"}
          onChange={(e) => handleChangeSex(e)}
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          {sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Price"
          variant="outlined"
          name="price"
          fullWidth
          required
          type="number"
          value={shirt.price}
          onChange={(e) => handleChangePrice(e)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Update;
