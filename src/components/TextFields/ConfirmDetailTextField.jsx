import { TextField } from "@mui/material";
import React from "react";

export const ConfirmDetailTextField = ({
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
  sxStyle,
}) => {
  return (
    <div style={{ width: `${style}` }}>
      <TextField
        sx={sxStyle}
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
