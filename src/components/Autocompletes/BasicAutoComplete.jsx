import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { setAutoCompletePlayerPosition } from "../../statemanager/slices/OtherComponentStatesSlice";
import { Clear } from "@mui/icons-material";

export default function BasicAutoComplete({
  ListArray,
  label,
  style,
  countryValue,
  AutoCompleteValue,
  defaultValue,
}) {
  const dispatch = useDispatch();

  const handlePositionChange = (e, newValue) => {
    // Assuming you have a Redux action called setAutoCompletePlayerPosition
    // the dispatch below has to be removed but before that check where else its being used and get a better way of using it

    if (newValue === null) {
      dispatch(setAutoCompletePlayerPosition("Any"));
      // alert(newValue);
      AutoCompleteValue("Any");
    } else {
      dispatch(setAutoCompletePlayerPosition(newValue));
      // alert(newValue);
      AutoCompleteValue(newValue);
    }
  };

  // const handleAutocompleteClose = () => {
  //   if (AutoCompleteValue === null) {
  //     // Set the value to "Any" when the user clears the selection
  //     AutoCompleteValue("Any");
  //     defaultValue("Any");
  //   }
  // };

  return (
    <Autocomplete
      className="md:w-[23vw] sm:w-[100%]"
      disablePortal
      id="combo-box-demo"
      options={ListArray}
      onChange={handlePositionChange}
      // onClose={handleAutocompleteClose}
      value={ListArray.find((item) => item === defaultValue)}
      sx={{ ...style, color: "black" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      clearIcon={<Clear style={{ display: "none" }} />}
      clearOnBlur={false} // Prevent clearing on blur
    />
  );
}
