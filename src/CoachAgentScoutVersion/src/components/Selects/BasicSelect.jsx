import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function BasicSelect({ widthSize, label, MenuItemArray }) {
  const [selectValue, setSelectValue] = useState("");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label} </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        label="selectValue"
        // size="small"
        sx={{ width: widthSize ? widthSize : 200 }}
        onChange={handleChange}
      >
        {MenuItemArray &&
          MenuItemArray?.map((data, index) => {
            const { Label, Value } = data;

            return (
              <MenuItem key={index} value={Value}>
                {Label}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
