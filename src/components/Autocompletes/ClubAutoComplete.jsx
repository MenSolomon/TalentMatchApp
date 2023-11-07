import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { setAutoCompletePlayerPosition } from "../../statemanager/slices/OtherComponentStatesSlice";

export default function ClubAutoComplete({
  ListArray,
  label,
  style,
  onClubSelect,
}) {
  const dispatch = useDispatch();

  const handleClubChange = (e, newValue) => {
    // dispatch(setAutoCompletePlayerPosition(newValue));
    if (onClubSelect) {
      onClubSelect(newValue.clubName);
    }
  };

  const renderOption = (props, option) => (
    <li {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={option.clubImage}
          alt={option.clubName}
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        />
        {option.clubName}
      </div>
    </li>
  );

  return (
    <Autocomplete
      freeSolo
      style={style}
      disablePortal
      id="club-autocomplete"
      options={ListArray}
      getOptionLabel={(option) => option.clubName}
      onChange={handleClubChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          helperText="Type club name if not found"
        />
      )}
      renderOption={renderOption}
    />
  );
}
