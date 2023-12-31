import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function BasicSelect({
  selectedValue,
  widthSize,
  label,
  MenuItemArray,
  defaultValue,
  fullWidth,
  sx,
  className,
}) {
  // const [selectValue, setSelectValue] = useState("");

  const handleChange = (event) => {
    selectedValue(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label} </InputLabel>
      <Select
        className={className}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={selectValue}
        label="selectValue"
        defaultValue={defaultValue}
        // size="small"
        fullWidth={fullWidth}
        sx={{ ...sx, width: widthSize ? widthSize : 200 }}
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
