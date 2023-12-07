import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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

const Create = () => {
  const onSubmit = (e) => {};

  return (
    <>
      <h1
        style={{ textAlign: "center", color: "#1976D2", marginBottom: "10px" }}
      >
        Create New Shirt
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
              label="Uncontrolled picker"
              defaultValue={dayjs("2022-04-17T15:30")}
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
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
