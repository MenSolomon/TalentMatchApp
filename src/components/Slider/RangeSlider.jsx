import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import {
  selectAutoCompletePlayerPosition,
  selectEditFilterModalButtonClicked,
  selectFilterModalType,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { useSelector } from "react-redux";

function valuetext(value) {
  return `${value}yrs`;
}

export default function RangeSlider({
  editDefaultValue,
  style,
  rangeName,
  max,
  min,
  onChange,
  rangeValue,
}) {
  const filterModalType = useSelector(selectFilterModalType);
  const EditFilterModalButtonClicked = useSelector(
    selectEditFilterModalButtonClicked
  );

  const [value, setValue] = React.useState(
    filterModalType === "Create"
      ? [0, max]
      : filterModalType === "Edit"
      ? editDefaultValue
      : [0, max]
  );

  const [rangeLabel, setRangeLabel] = React.useState(rangeName);

  /// counter used to make sure that the use effect only restes the stats range in the edit filter profile moadl only if the position value has been changed the second time .. technically it is change the first time when opening so if we dont catch it it will also begin with a rest every stats to its max instead  of the user seeing user's saved setting
  const [positionChangeCounter, setPositionChangeCounter] = React.useState(0);

  const autocompletePositionSelected = useSelector(
    selectAutoCompletePlayerPosition
  );

  // this use effect is to set the range slider to its default min and max value if the user changes position selected

  React.useEffect(() => {
    if (filterModalType === "Create" || filterModalType === "") {
      // cbanged max to 100 to observe behavior

      if (
        rangeLabel !== "Height range (m)" &&
        rangeLabel !== "Age range" &&
        rangeLabel !== "Market Value ($ 000,000)"
      ) {
        // alert(rangeLabel, "TRUMUU");
        // alert(rangeName);
        setValue([0, max]);
      }
    } else if (filterModalType === "Edit") {
      setPositionChangeCounter(positionChangeCounter + 1);

      if (positionChangeCounter >= 1) {
        if (
          rangeLabel !== "Height range (m)" &&
          rangeLabel !== "Age range" &&
          rangeLabel !== "Market Value ($ 000,000)"
        ) {
          // alert(rangeLabel, "TRUMUU");
          // alert(rangeName);
          setValue([0, max]);
        }
      }
    }
  }, [autocompletePositionSelected]);

  // React.useEffect(() => {
  //   alert(positionChangeCounter);
  // }, [positionChangeCounter]);

  // React.useEffect(() => {
  //   setValue(editDefaultValue);
  // }, [EditFilterModalButtonClicked]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    rangeValue(newValue);
    console.log(newValue, "NewVal");
    onChange(newValue);
  };

  return (
    <Box className="primaryTextColor md:w-[90%] sm:w-[99%]" sx={{ ...style }}>
      <Typography sx={{ textAlign: "center", fontWeight: "700" }}>
        {rangeName}
        {/* {positionChangeCounter} */}
      </Typography>
      <Slider
        getAriaLabel={() => "Age Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        max={max}
        min={min}
      />
    </Box>
  );
}
