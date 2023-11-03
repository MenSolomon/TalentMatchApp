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

  // Attacker range
  // Goals  ,goal/matchplayed ratio , assits ,shots per game , goal conversion rate % , offside range

  // DEfender Range %
  // Clearance , interception , blocks , clean sheets per season , succesful tackes rate %,

  // Midfielder Range %
  // Pass success , total passes  , assits , key passes per game , interception , succesful tackles rate, successful crosses

  // Goal keeper range
  // CLeans sheets , saves , long pass accuracy , average goals  , bloacked shots ,aerial duels , penalty success

  // LIST OF LEAGUES

  //[ Top-Flight Division
  // Women's league
  // Second Division
  // Third Division
  // Regional Leagues
  // Semi-Professional Leagues
  // University and College Leagues
  // Recreational and Social Leagues
  // Youth Leagues
  // Grassroots and Mini Leagues
  // Juvenile league]

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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
