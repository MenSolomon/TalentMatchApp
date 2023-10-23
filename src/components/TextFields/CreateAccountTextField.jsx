import { TextField } from "@mui/material";
import React from "react";

export const CreateAccountTextField = ({
  value,
  onchange,
  placeholder,
  type,
  autoFocus,
  onFocus,
  error,
  helperText,
  inputProps,
  variant,
  style,
}) => {
  return (
    <div>
      <TextField
        sx={{ width: `${style}` }}
        variant={variant}
        value={value}
        onChange={onchange}
        onFocus={onFocus}
        placeholder={placeholder}
        type={type}
        autoFocus={autoFocus}
        error={error}
        helperText={helperText}
        inputProps={inputProps}
      />
    </div>
  );
};
