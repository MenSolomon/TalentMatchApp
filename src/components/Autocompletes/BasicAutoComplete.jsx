import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function BasicAutoComplete({ ListArray, label  ,style}) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ListArray}
      sx={{ ...style}}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
