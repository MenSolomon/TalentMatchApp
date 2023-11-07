import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { setAutoCompletePlayerPosition } from "../../statemanager/slices/OtherComponentStatesSlice";

export default function BasicAutoComplete({ ListArray, label, style }) {
  const dispatch = useDispatch();

  const handlePositionChange = (e, newValue) => {
    // Assuming you have a Redux action called setAutoCompletePlayerPosition
    dispatch(setAutoCompletePlayerPosition(newValue));
    // alert(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ListArray}
      onChange={handlePositionChange}
      sx={{ ...style }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
