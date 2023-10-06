import { Mail } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
      color: "white",
    },
    "&:hover fieldset": {
      color: "white",
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
      color: "white",
    },
  },
});

export default function CustomizedInputsStyled() {
  return (
    <CssTextField
      sx={{ width: "80%", marginBottom: "4vh" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Mail />
          </InputAdornment>
        ),
      }}
      label="Custom CSS"
      id="custom-css-outlined-input"
    />
  );
}
