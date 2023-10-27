import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
  return `${value}yrs`;
}

export default function BasicSlider({ style, rangeName }) {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="primaryTextColor" sx={{ color: "white", width: 300 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "700" }}>
        {rangeName}
      </Typography>
      <Slider
        getAriaLabel={() => "Age Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        max={50}
        min={10}
      />
    </Box>
  );
}
