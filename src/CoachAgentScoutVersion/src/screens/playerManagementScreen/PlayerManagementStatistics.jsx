import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import BasicButton from "../../../../components/Buttons/BasicButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayerSelectedByClubOrScoutInPlayerManagement,
} from "../../../../statemanager/slices/PlayersInAgencySlice";
import {
  setCloseCircularLoadBackdrop,
  setOpenCircularLoadBackdrop,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";
import { arrayUnion, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const PlayerManagementStatistics = () => {
  const seasonsMenu = [
    // {
    //   value: "Overall",
    //   label: "Overall",
    // },
    {
      value: "23/24",
      label: "23/24",
    },
    {
      value: "22/23",
      label: "22/23",
    },
    {
      value: "21/22",
      label: "21/22",
    },
    {
      value: "20/21",
      label: "20/21",
    },
    {
      value: "19/20",
      label: "19/20",
    },
  ];

  const dispatch = useDispatch();

  const currentPlayerSelectedObject = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );

  const { Statistics, id } = currentPlayerSelectedObject;

  console.log(
    // OverallStatsObj[0],
    // currentPlayerSelectedObject,
    "Disp Statistics",
    Statistics,
    currentPlayerSelectedObject
    // currentPlayerSelectedObject.Statistics,
    // currentPlayerSelectedObject.Age
  );

  const OverallStatsObj = currentPlayerSelectedObject?.Statistics.filter(
    (data) => {
      return "Overall" === data.Season;
    }
  );

  const [inputValues, setInputValues] = useState(OverallStatsObj[0]);
  const [seasonsRange, setSeasonsRange] = useState("Overall");

  // THis use effect retrieves the statas for specific season selected
  useEffect(() => {
    const SeasonStatsObj = currentPlayerSelectedObject?.Statistics.filter(
      (data) => {
        return seasonsRange === data.Season;
      }
    );

    setInputValues(SeasonStatsObj[0]);
    console.log(seasonsRange, "Changing", SeasonStatsObj);
  }, [seasonsRange]);

  // {
  //   gamesPlayed: 0,
  //   minutesPlayed: 0,
  //   starts: 0,
  //   subbedOff: 0,
  //   clearance: 0,
  //   tackles: 0,
  //   duels: 0,
  //   aerialDuels: 0,
  //   blocks: 0,
  //   interceptions: 0,
  //   totalShots: 0,
  //   shotsOnTarget: 0,
  //   goalsScored: 0,
  //   conversionRate: 0,
  //   minutesPerGoal: 0,
  //   headerGoals: 0,
  //   leftGoals: 0,
  //   rightGoals: 0,
  //   otherGoals: 0,
  //   goalsOutsideTheBox: 0,
  //   goalsInsideTheBox: 0,
  //   goalsFromFreekicks: 0,
  //   foulsConceded: 0,
  //   foulsWon: 0,
  //   yellowCards: 0,
  //   redCards: 5, // Assuming a default value of 5 for red cards
  //   assists: 0,
  //   passSuccessRate: 0,
  //   longPassesRate: 0,
  //   opponentHalfPassAccuracy: 0,
  //   ownHalfPassAccuracy: 0,
  //   passDirectionForward: 0,
  //   passDirectionBackward: 0,
  //   passDirectionLeft: 0,
  //   passDirectionRight: 0,
  //   totalPasses: 0,
  //   successfulPasses: 0,
  //   keyPasses: 0,
  //   totalPassesPer90Mins: 0,
  //   // ... Add more fields as needed
  // }

  // const handleInputChange = (fieldName) => (event) => {
  //   // Update the state for the specific field
  //   setInputValues({
  //     ...inputValues,
  //     [fieldName]: event.target.value,
  //   });
  // };

  const handleInputChange = (fieldName) => (event) => {
    // Extract the nested field name (e.g., "General.Games_Played")
    const [category, subField] = fieldName.split(".");

    const numericValue = parseFloat(event.target.value);
    // Update the state for the specific field
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [category]: {
        ...prevInputValues[category],
        [subField]: numericValue,
      },
    }));
  };

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const handleSaveStats = async () => {
    try {
      console.log("Inpt", inputValues);
      const updatedSeasonsArray = Statistics.map((data) => {
        if (data.Season === seasonsRange) {
          // Update the value for the target season
          // alert(`${data.Season} ${seasonsRange}`);
          return { Season: seasonsRange, ...inputValues };
        }
        // Leave other seasons unchanged
        return data;
      });

      // const filedsMinusUpadted = currentPlayerSelectedObject.Statistics.filter((data) => {
      //   return data.Season !== seasonsRange;
      // });

      // console.log(
      //   " = ",
      //   seasonsRange,
      //   "Testing Update",
      //   updatedSeasonsArray,
      //   inputValues
      // );

      dispatch(setOpenCircularLoadBackdrop());

      const playerObjectRef = doc(db, `players_database/${id}`);

      console.log(
        updatedSeasonsArray,
        id,
        "Android"
        //  updatedSeasonsArray
      );

      await updateDoc(playerObjectRef, {
        Statistics: deleteField(),
      });

      await updateDoc(playerObjectRef, {
        Statistics: updatedSeasonsArray,
      });

      await dispatch(
        setPlayerSelectedByClubOrScoutInPlayerManagement({
          ...currentPlayerSelectedObject,
          Statistics: updatedSeasonsArray,
        })
      );

      dispatch(setCloseCircularLoadBackdrop());

      dispatch(
        setSnackbarMessage(` ${seasonsRange} stats updated successfully`)
      );
      dispatch(setSnackbarTriggerCounter());
    } catch (error) {
      // write a code that reverts the stats  back to previous if one of them fails
      console.error(error);
      dispatch(setCloseCircularLoadBackdrop());
      triggerWarningAlertModal(
        "Something went wrong ... please try again after a while"
      );
    }
  };

  // const handleSaveStats = async () => {
  //   try {
  //     console.log("Input", inputValues);

  //     const filedsMinusUpadted = currentPlayerSelectedObject.Statistics.filter((data) => {
  //       return data.Season !== seasonsRange;
  //     });

  //     const newData = [inputValues, ...filedsMinusUpadted];
  //     console.log(
  //       newData,
  //       " = ",
  //       seasonsRange,
  //       "Testing Update",
  //       filedsMinusUpadted,
  //       inputValues
  //     );

  //     dispatch(setOpenCircularLoadBackdrop());

  //     const playerObjectRef = doc(db, `players_database/${id}`);

  //     await updateDoc(playerObjectRef, {
  //       Statistics: deleteField(),
  //     });

  //     await updateDoc(playerObjectRef, {
  //       Statistics: newData,
  //     });

  //     console.log(newData, "New Data");

  //     // dispatch(
  //     //   setPlayerSelectedByClubOrScoutInPlayerManagement({
  //     //     ...currentPlayerSelectedObject,
  //     //     Statistics: [inputValues],
  //     //   })
  //     // );

  //     dispatch(setCloseCircularLoadBackdrop());

  //     dispatch(
  //       setSnackbarMessage(`Stats updated for ${seasonsRange} successfully`)
  //     );
  //     dispatch(setSnackbarTriggerCounter());
  //   } catch (error) {
  //     console.error(error);
  //     dispatch(setCloseCircularLoadBackdrop());
  //     triggerWarningAlertModal(
  //       "Something went wrong... please try again after a while"
  //     );
  //   }
  // };

  useEffect(() => {
    console.log("PUTA", inputValues);
  }, [inputValues]);

  return (
    <div
      style={{
        width: "100%",
        height: "48vh",
        overflowY: "scroll",
        // background: "red",
      }}
    >
      <div style={{ display: "flex", gap: "1vw" }}>
        <TextField
          id="outlined-select-currency"
          size="small"
          select
          // label="Select"
          defaultValue="Overall"
          style={{ width: "15%" }}
          onChange={(e) => {
            setSeasonsRange(e.target.value);
            // alert(e.target.value);
          }}
        >
          {seasonsMenu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>{" "}
        <div onClick={handleSaveStats}>
          <BasicButton innerText={"Save"} />{" "}
        </div>{" "}
      </div>
      <br />
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        General
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Games played">
                <TextField
                  id="standard-basic"
                  label="Games played"
                  variant="standard"
                  value={inputValues.General.Games_Played}
                  onChange={handleInputChange("General.Games_Played")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Minutes Played">
                <TextField
                  id="standard-basic"
                  label="Minutes Played"
                  variant="standard"
                  value={inputValues.General.Minutes_Played}
                  onChange={handleInputChange("General.Minutes_Played")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Starts">
                <TextField
                  id="standard-basic"
                  label="Starts"
                  variant="standard"
                  value={inputValues.General.Starts}
                  onChange={handleInputChange("General.Starts")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Subbed off">
                <TextField
                  id="standard-basic"
                  label="Subbed off"
                  variant="standard"
                  value={inputValues.General.Subbed_off}
                  onChange={handleInputChange("General.Subbed_off")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        Defence
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Clearance">
                <TextField
                  id="standard-basic"
                  label="Clearance"
                  variant="standard"
                  value={inputValues.Defence.Clearance}
                  onChange={handleInputChange("Defence.Clearance")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Tackles">
                <TextField
                  id="standard-basic"
                  label="Tackles"
                  variant="standard"
                  value={inputValues.Defence.Tackles}
                  onChange={handleInputChange("Defence.Tackles")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Duels">
                <TextField
                  id="standard-basic"
                  label="Duels"
                  variant="standard"
                  value={inputValues.Defence.Duels}
                  onChange={handleInputChange("Defence.Duels")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Aerial duels">
                <TextField
                  id="standard-basic"
                  label="Aerial duels"
                  variant="standard"
                  value={inputValues.Defence.Aeriel_duels}
                  onChange={handleInputChange("Defence.Aeriel_duels")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Blocks">
                <TextField
                  id="standard-basic"
                  label="Blocks"
                  variant="standard"
                  value={inputValues.Defence.Blocks}
                  onChange={handleInputChange("Defence.Blocks")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Interceptions">
                <TextField
                  id="standard-basic"
                  label="Interceptions"
                  variant="standard"
                  value={inputValues.Defence.Interceptions}
                  onChange={handleInputChange("Defence.Interceptions")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>Attack</h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Total shots">
                <TextField
                  id="standard-basic"
                  label="Total shots"
                  variant="standard"
                  value={inputValues.Attack.Total_shots}
                  onChange={handleInputChange("Attack.Total_shots")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Shots on target">
                <TextField
                  id="standard-basic"
                  label="Shots on target"
                  variant="standard"
                  value={inputValues.Attack.Shots_on_target}
                  onChange={handleInputChange("Attack.Shots_on_target")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Goals scored">
                <TextField
                  id="standard-basic"
                  label="Goals scored"
                  variant="standard"
                  value={inputValues.Attack.Goals_Scored}
                  onChange={handleInputChange("Attack.Goals_Scored")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Conversion rate">
                <TextField
                  id="standard-basic"
                  label="Conversion rate"
                  variant="standard"
                  value={inputValues.Attack.Goal_conversion_rate}
                  onChange={handleInputChange("Attack.Goal_conversion_rate")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            {/* <TableCell>
              <Tooltip title="Minutes per goal">
                <TextField
                  id="standard-basic"
                  label="Minutes per goal"
                  variant="standard"
                  value={inputValues.Attack.Minutes_per_goal}
                  onChange={handleInputChange("Attack.Minutes_per_goal")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Header goals">
                <TextField
                  id="standard-basic"
                  label="Header goals"
                  variant="standard"
                  value={inputValues.Attack.Header_goals}
                  onChange={handleInputChange("Attack.Header_goals")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Left goals">
                <TextField
                  id="standard-basic"
                  label="Left goals"
                  variant="standard"
                  value={inputValues.Attack.Left_goals}
                  onChange={handleInputChange("Attack.Left_goals")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Right goals">
                <TextField
                  id="standard-basic"
                  label="Right goals"
                  variant="standard"
                  value={inputValues.Attack.Right_goals}
                  onChange={handleInputChange("Attack.Right_goals")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Other goals">
                <TextField
                  id="standard-basic"
                  label="Other goals"
                  variant="standard"
                  value={inputValues.Attack.Other_goals}
                  onChange={handleInputChange("Attack.Other_goals")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Goals outside the box">
                <TextField
                  id="standard-basic"
                  label="Goals outside the box"
                  variant="standard"
                  value={inputValues.Attack.Goals_outside_the_box}
                  onChange={handleInputChange("Attack.Goals_outside_the_box")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Goals inside the box">
                <TextField
                  id="standard-basic"
                  label="Goals inside the box"
                  variant="standard"
                  value={inputValues.Attack.Goals_inside_the_box}
                  onChange={handleInputChange("Attack.Goals_inside_the_box")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Goals from freekicks">
                <TextField
                  id="standard-basic"
                  label="Goals from freekicks"
                  variant="standard"
                  value={inputValues.Attack.Goals_from_freekicks}
                  onChange={handleInputChange("Attack.Goals_from_freekicks")}
                  type="number"
                />
              </Tooltip>
            </TableCell> */}
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        Discipline
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Fouls conceded">
                <TextField
                  id="standard-basic"
                  label="Fouls conceded"
                  variant="standard"
                  value={inputValues.Discipline.Fouls_conceeded}
                  onChange={handleInputChange("Discipline.Fouls_conceeded")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            {/* <TableCell>
              <Tooltip title="Fouls won">
                <TextField
                  id="standard-basic"
                  label="Fouls won"
                  variant="standard"
                  value={inputValues.Discipline.Fouls_won}
                  onChange={handleInputChange("Discipline.Fouls_won")}
                  type="number"
                />
              </Tooltip>
            </TableCell> */}
            <TableCell>
              <Tooltip title="Yellow cards">
                <TextField
                  id="standard-basic"
                  label="Yellow cards"
                  variant="standard"
                  value={inputValues.Discipline.Yellow_cards}
                  onChange={handleInputChange("Discipline.Yellow_cards")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Red cards">
                <TextField
                  id="standard-basic"
                  label="Red cards"
                  variant="standard"
                  value={inputValues.Discipline.Red_cards}
                  onChange={handleInputChange("Discipline.Red_cards")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        Distribution
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Assists">
                <TextField
                  id="standard-basic"
                  label="Assists"
                  variant="standard"
                  value={inputValues.Distribution.Assists}
                  onChange={handleInputChange("Distribution.Assists")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Received passes">
                <TextField
                  id="standard-basic"
                  label="Received passes"
                  variant="standard"
                  value={inputValues.Distribution.Received_passes}
                  onChange={handleInputChange("Distribution.Received_passes")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Successful cross rate">
                <TextField
                  id="standard-basic"
                  label="Successful cross rate"
                  variant="standard"
                  value={inputValues.Distribution.Succesful_cross_rate}
                  onChange={handleInputChange(
                    "Distribution.Succesful_cross_rate"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Successful key passes">
                <TextField
                  id="standard-basic"
                  label="Successful key passes"
                  variant="standard"
                  value={inputValues.Distribution.Successful_key_passes}
                  onChange={handleInputChange(
                    "Distribution.Successful_key_passes"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Successful long passes rate">
                <TextField
                  id="standard-basic"
                  label="Successful long passes rate"
                  variant="standard"
                  value={inputValues.Distribution.Successful_long_passes_rate}
                  onChange={handleInputChange(
                    "Distribution.Successful_long_passes_rate"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Successful pass rate">
                <TextField
                  id="standard-basic"
                  label="Successful pass rate"
                  variant="standard"
                  value={inputValues.Distribution.Successful_pass_rate}
                  onChange={handleInputChange(
                    "Distribution.Successful_pass_rate"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Successful passes">
                <TextField
                  id="standard-basic"
                  label="Successful passes"
                  variant="standard"
                  value={inputValues.Distribution.Successful_passes}
                  onChange={handleInputChange("Distribution.Successful_passes")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            {/* <TableCell>
              <Tooltip title="Pass direction left percent">
                <TextField
                  id="standard-basic"
                  label="Pass direction left percent"
                  variant="standard"
                  value={inputValues.Distribution.Pass_direction_left_percent}
                  onChange={handleInputChange(
                    "Distribution.Pass_direction_left_percent"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell> */}
            {/* <TableCell>
              <Tooltip title="Pass direction right percent">
                <TextField
                  id="standard-basic"
                  label="Pass direction right percent"
                  variant="standard"
                  value={inputValues.Distribution.Pass_direction_right_percent}
                  onChange={handleInputChange(
                    "Distribution.Pass_direction_right_percent"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell> */}
            <TableCell>
              <Tooltip title="Total passes">
                <TextField
                  id="standard-basic"
                  label="Total passes"
                  variant="standard"
                  value={inputValues.Distribution.Total_passes}
                  onChange={handleInputChange("Distribution.Total_passes")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            {/* <TableCell>
              <Tooltip title="Successful passes">
                <TextField
                  id="standard-basic"
                  label="Successful passes"
                  variant="standard"
                  value={inputValues.Distribution.Successful_passes}
                  onChange={handleInputChange("Distribution.Successful_passes")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Key passes">
                <TextField
                  id="standard-basic"
                  label="Key passes"
                  variant="standard"
                  value={inputValues.Distribution.Key_passes}
                  onChange={handleInputChange("Distribution.Key_passes")}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Total passes per 90 mins">
                <TextField
                  id="standard-basic"
                  label="Total passes per 90 mins"
                  variant="standard"
                  value={inputValues.Distribution.Total_passes_per_90_mins}
                  onChange={handleInputChange(
                    "Distribution.Total_passes_per_90_mins"
                  )}
                  type="number"
                />
              </Tooltip>
            </TableCell> */}
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};

export default PlayerManagementStatistics;
