import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Newselect({ selectedValue, selectArray }) {
  const [age, setAge] = React.useState("");

  React.useEffect(() => {
    // Update the selected value when it changes externally
    setAge(selectedValue);
  }, [selectedValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setAge(newValue);
    selectedValue(newValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Source</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Source"
          onChange={handleChange}
        >
          {selectArray &&
            selectArray.map((data, index) => (
              <MenuItem key={index} value={data}>
                {data}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
