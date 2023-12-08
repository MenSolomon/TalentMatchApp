import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

// function valuetext(value) {
//   return `${value}yrs`;
// }

export default function BasicSlider({
  style,
  rangeName,
  max,
  min,
  sliderValue,
  steps,
  defaultValue,
}) {
  const handleChange = (event, newValue) => {
    sliderValue(newValue);
  };

  return (
    <Box
      className="primaryTextColor"
      sx={{ color: "white", width: 300, ...style }}
    >
      <Typography sx={{ textAlign: "center", fontWeight: "700" }}>
        {rangeName}
      </Typography>
      <Slider
        getAriaLabel={() => {
          rangeName;
        }}
        step={steps}
        marks
        defaultValue={defaultValue}
        onChange={handleChange}
        valueLabelDisplay="on"
        max={max}
        min={min}
      />
    </Box>
  );
}
