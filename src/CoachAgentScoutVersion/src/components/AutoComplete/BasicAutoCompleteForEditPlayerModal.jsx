import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Clear } from "@mui/icons-material";

export default function BasicAutoCompleteForEditPlayerModal({
  ListArray,
  label,
  style,
  countryValue,
  AutoCompleteValue,
  defaultValue,
}) {
  const handlePositionChange = (e, newValue) => {
    // Assuming you have a Redux action called setAutoCompletePlayerPosition
    // the dispatch below has to be removed but before that check where else its being used and get a better way of using it

    if (newValue === null) {
      AutoCompleteValue("Any");
    } else {
      AutoCompleteValue(newValue);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ListArray}
      onChange={handlePositionChange}
      // onClose={handleAutocompleteClose}
      defaultValue={ListArray.find((item) => item === defaultValue)}
      //   value={ListArray.find((item) => item === defaultValue)}
      sx={{ ...style, color: "black" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      clearIcon={<Clear style={{ display: "none" }} />}
      clearOnBlur={false} // Prevent clearing on blur
    />
  );
}
