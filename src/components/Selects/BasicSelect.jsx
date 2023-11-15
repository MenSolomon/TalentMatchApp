import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  itemsArray,
  inputStyle,
  selectedValue,
  defaultSelect,
}) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    // alert(event.target.value);
    selectedValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, ...inputStyle }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          defaultValue={defaultSelect}
          // label="Age"
          onChange={handleChange}
        >
          {itemsArray &&
            itemsArray?.map((data, index) => {
              return (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
