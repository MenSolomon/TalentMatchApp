import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { db } from "../../Firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function BasicSelect({
  label,
  itemsArray,
  inputStyle,
  selectedValue,
  defaultSelect,
}) {
  const [age, setAge] = React.useState("");
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

  const handleChange = (event) => {
    setAge(event.target.value);
    // alert(event.target.value);
    // alert(event.target.value);
    if (label === "saved profiles") {
      const userRef = doc(db, `users_db`, userLoginDetailsObject?.accountId);

      updateDoc(userRef, {
        carouselProfileName: event.target.value,
      });

      // alert("Saved");
      selectedValue(event.target.value);
    } else {
      selectedValue(event.target.value);
    }
  };

  return (
    <Box sx={{ minWidth: 120, ...inputStyle }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          defaultValue={defaultSelect}
          // label="Age"
          onChange={handleChange}
        >
          {itemsArray &&
            itemsArray?.map((data, index) => {
              return (
                <MenuItem sx={{ color: "black" }} key={index} value={data}>
                  {data}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
