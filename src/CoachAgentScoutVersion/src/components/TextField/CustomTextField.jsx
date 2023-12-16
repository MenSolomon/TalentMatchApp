import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  value,
  onchange,
  placeholder,
  type,
  autoFocus,
  onFocus,
  error,
  helperText,
  inputProps,
}) => {
  return (
    // <div style={{ width: "30vw" }}>
    <TextField
      variant="outlined"
      value={value}
      onChange={onchange}
      onFocus={onFocus}
      placeholder={placeholder}
      type={type}
      autoFocus={autoFocus}
      error={error}
      helperText={helperText}
      inputProps={inputProps}
      fullWidth={true}
      sx={{ width: "23vw" }}
    />
    // </div>
  );
};

export default CustomTextField;
