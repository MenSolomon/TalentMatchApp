import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Avatar,
  Card,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import BasicButton from "../Buttons/BasicButton";
import { Star, StarBorder } from "@mui/icons-material";
import PlayerOverallAttributes from "../Charts/Bars/PlayerOverallAttributes";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import { useNavigate } from "react-router-dom";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import {
  selectCurrentProfile,
  selectCurrentProfileFilterObject,
  selectUserSavedProfiles,
} from "../../statemanager/slices/SavedProfileSlice";
import { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { useQuery } from "@tanstack/react-query";

function createData(
  name,
  Age,
  Foot,
  Height,
  Country,
  MarketValue,
  Club,
  clubName,
  ContractExpiry,
  playerImage,
  playerId,
  Nationality,
  StatisticsOverall,
  StatisticsLastSeason
) {
  return {
    name,
    Age,
    Foot,
    Height,
    Country,
    MarketValue,
    Club,
    clubName,
    ContractExpiry,
    playerImage,
    playerId,
    Nationality,
    StatisticsOverall,
    // currently 23/24
    StatisticsLastSeason,
    history: [
      {
        period: "Career total",
        apperances: "320",
        goals: "102",
        assist: "23",
        passCompletionRate: "33",
        tacklesWon: "231",
        Interception: "97",
        CleanSheets: "59",
        DistanceCovered: "1451",
      },
      {
        period: "23/24 season",
        apperances: "21",
        goals: "8",
        assist: "6",
        passCompletionRate: "60",
        tacklesWon: "25",
        Interception: "17",
        CleanSheets: "2",
        DistanceCovered: "29",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  // const playerNameWithoutSpaces = row.name.replace(/\s/g, "");

  const handleProfileView = () => {
    navigate(`/player-details/${row.playerId}`);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },

          color: "white",
        }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Checkbox
          // checked={checker}
          // onClick={() => {
          //   handleCheckClicked();
          // }}
          />{" "}
        </TableCell>

        <TableCell component="th" scope="row">
          <div
            style={{
              display: "flex",
              // justifyContent: "center",

              alignItems: "center",
            }}
            className="primaryTextColor">
            <Avatar
              sx={{ width: 30, height: 30, marginRight: 1 }}
              src={row.playerImage}
            />{" "}
            {row.name.length >= 25 ? (
              <Tooltip title={row.name}>{`${row.name.slice(
                0,
                25
              )}...`}</Tooltip>
            ) : (
              row.name
            )}
          </div>
        </TableCell>
        <TableCell align="right">{row.Age}</TableCell>
        <TableCell align="right">{row.Foot}</TableCell>
        <TableCell align="right">{row.Height}</TableCell>
        <TableCell align="right">
          <Tooltip title={row.Nationality}>
            <img
              style={{ marginLeft: "1.5vw" }}
              src={`https://flagcdn.com/${row.Country.toLowerCase()}.svg`}
              width="30"
              alt=""
            />{" "}
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip title={row.clubName}>
            <Avatar
              sx={{ width: 30, height: 30, marginRight: 1 }}
              src={row.Club}
            />{" "}
          </Tooltip>
        </TableCell>
        <TableCell align="right">{row.MarketValue}</TableCell>
        <TableCell align="right">{row.ContractExpiry}</TableCell>
      </TableRow>
      {/* /// Collapsible data */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <TableRow
                sx={{ height: "20vh" }}

                // variant="h6"
                // gutterBottom
                // component="div"
              >
                <TableCell
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    // background: "blue",
                    width: "74vw",
                    display: "flex",
                    gap: "1vw",
                    height: "30vh",
                  }}
                  colSpan={3}>
                  {/* // Profile Image  */}
                  <div style={{ flex: ".15" }}>
                    <Avatar
                      sx={{ width: 70, height: 70, marginBottom: 2 }}
                      src={row.playerImage}
                    />

                    {/* ADD FAVORITE BUTTON */}
                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <StarBorder
                              style={{
                                //  color: primaryTextColor,
                                zIndex: "1000",
                              }}
                            />
                          }
                          checkedIcon={<Star style={{ zIndex: "1000" }} />}
                        />
                      }
                      label={
                        <span
                          className="primaryTextColor"
                          style={{
                            fontSize: "0.8em",
                            //   color: primaryTextColor,
                            zIndex: "1000",
                          }}
                        >
                          farvorite
                        </span>
                      }
                      sx={{ fontSize: ".8em" }}
                    /> */}
                    {/* // View button */}
                    <div onClick={handleProfileView}>
                      <BasicButton
                        style={{
                          textTransform: "none",
                          color: "white",
                          fontWeight: "bold",
                          zIndex: "1000",
                        }}
                        innerText={"View profile"}
                      />
                    </div>
                  </div>
                  {/* Stats Web */}
                  <div
                    style={{
                      flex: ".2",
                      //    background: "yellow"
                    }}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        // background: "red",
                      }}>
                      <PlayerOverallAttributes />
                    </div>
                  </div>
                  {/* Sample Video */}
                  <div
                    className="sm:basis-[80%] md:basis-[20%] "
                    // style={{ flex: ".2" }}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "10vh",
                        borderRadius: "1vw",
                        position: "relative",
                        paddingTop: "1vh",
                      }}
                      className="tableVideo">
                      <video
                        // id={`video-${index}`}
                        src="/believerJuggling.mp4"
                        width="100%"
                        // className="cardBackground md:w-[30vw] md:h-[90%] md:flex md:flex-col   sm:w-[90vw] sm:h-[100%] sm:flex sm:flex-col"
                        // height="10vh"
                        style={{ position: "absolute" }}
                        // autoPlay={true}
                        controls></video>
                    </div>
                  </div>
                </TableCell>{" "}
                {/* //// StatsRow */}
              </TableRow>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Period</TableCell>
                    <TableCell align="right">Apperance</TableCell>
                    <TableCell align="right">Goals</TableCell>
                    <TableCell align="right">Assists</TableCell>
                    <TableCell align="right">Pass success %</TableCell>
                    <TableCell align="right">Interceptions</TableCell>
                    <TableCell align="right">Tackles success %</TableCell>
                    <TableCell align="right">Yellow cards</TableCell>
                    <TableCell align="right">Minutes played</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* // Overall stats */}
                  <TableRow>
                    <TableCell>{row.StatisticsOverall.Season}</TableCell>
                    <TableCell>
                      {row.StatisticsOverall.General.Games_Played}
                    </TableCell>

                    <TableCell>
                      {row.StatisticsOverall.Attack.Goals_Scored}
                    </TableCell>
                    <TableCell align="right">
                      {row.StatisticsOverall.Distribution.Assists}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsOverall.Distribution.Pass_success_rate}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsOverall.Defence.Interceptions}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsOverall.Defence.Tackles}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsOverall.Discipline.Yellow_cards}
                    </TableCell>

                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsOverall.General.Minutes_Played}
                    </TableCell>
                  </TableRow>
                  {/* // Last season currently 23/24 */}
                  <TableRow>
                    <TableCell>{row.StatisticsLastSeason.Season}</TableCell>
                    <TableCell>
                      {row.StatisticsLastSeason.General.Games_Played}
                    </TableCell>

                    <TableCell>
                      {row.StatisticsLastSeason.Attack.Goals_Scored}
                    </TableCell>
                    <TableCell align="right">
                      {row.StatisticsLastSeason.Distribution.Assists}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsLastSeason.Distribution.Pass_success_rate}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsLastSeason.Defence.Interceptions}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsLastSeason.Defence.Tackles}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsLastSeason.Discipline.Yellow_cards}
                    </TableCell>

                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                      {row.StatisticsLastSeason.General.Minutes_Played}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     Age: PropTypes.number.isRequired,
//     Height: PropTypes.number.isRequired,
//     Foot: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     Club: PropTypes.number.isRequired,
//     Country: PropTypes.number.isRequired,
//   }).isRequired,
// };

// ,MarketValue,ContractExpiry

const rows = [
  createData("Bature", 159, 6.0, 24, "US", 3.99, 24, 4.0, 3.99),
  createData("Ekow", 237, 9.0, 37, "GH", 4.99, 24, 4.0, 3.99),
  createData("Dennis", 262, 16.0, 24, "RS", 3.79, 24, 4.0, 3.99),
  createData("Rico", 305, 3.7, 67, "NG", 2.5, 24, 4.0, 3.99),
  createData("Andrew", 356, 16.0, 49, "GH", 1.5, 24, 4.0, 3.99),
];

export default function FilteredPlayersTable() {
  const currentProfileNameSelected = useSelector(selectCurrentProfile);

  const savedUserProfiles = useSelector(selectUserSavedProfiles);
  // const MatchedPlayersArray = useSelector(selectPlayersDatabase);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const playersQuery = query(collection(db, "players_database"));
  //     const playersSnapshot = await getDocs(playersQuery);
  //     const allProducts = [];
  //     const playersSnapshotData = await playersSnapshot.forEach((doc) => {
  //       // save them to allProducts array
  //       allProducts.push(doc.data());
  //     });
  //     console.log("playersSnapshotData", allProducts);
  //     return allProducts;
  //   };
  //   fetch();
  // }, []);

  const {
    status,
    data: MatchedPlayersArray,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchAllPlayers"],
    queryFn: async () => {
      const playersQuery = query(collection(db, "players_database"));
      const playersSnapshot = await getDocs(playersQuery);
      const allProducts = [];
      const playersSnapshotData = await playersSnapshot.forEach((doc) => {
        // save them to allProducts array
        allProducts.push(doc.data());
      });
      console.log("playersSnapshotData", allProducts);
      return allProducts;
    },
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });

  const currentProfileFilterObjectInEffect = savedUserProfiles.find((data) => {
    return (
      data.label.toLowerCase() === currentProfileNameSelected.toLowerCase()
    );
  });

  const ExistingPlayerProfile = MatchedPlayersArray?.filter((data) => {
    const {
      Nationality,
      position,
      // date_of_birth,
      Statsitics,
      height,
    } = data;

    // Define the variables to compare
    const variablesToCompare = [
      Nationality.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
      Nationality.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
      data?.Age >=
        currentProfileFilterObjectInEffect?.filter.AgeRangeValue[0] &&
        data?.Age <=
          currentProfileFilterObjectInEffect?.filter.AgeRangeValue[1],
      height >=
        currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0] &&
        height <=
          currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1],
      data?.marketValue >=
        currentProfileFilterObjectInEffect?.filter.MarketValue[0] &&
        data?.marketValue <=
          currentProfileFilterObjectInEffect?.filter.MarketValue[1],
      currentProfileFilterObjectInEffect?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
        position.toLowerCase(),
      data?.preferredFoot.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue.toLowerCase(),
      currentProfileFilterObjectInEffect?.filter.ContractStatusCheckBoxes.includes(
        data?.clubName
      ),
      // Add more variables to compare as needed
    ];

    // Count the number of matches
    const numberOfMatches = variablesToCompare.filter((match) => match).length;

    // Check if at least 4 variables match
    return numberOfMatches >= 5;
  });

  console.log("All Players", MatchedPlayersArray);

  const allClubsInDatabase = useSelector(selectClubsInDatabase);

  // const ExistingPlayerProfile = MatchedPlayersArray.filter((data) => {
  //   const {
  //     Nationality,
  //     position,
  //     // date_of_birth,
  //     Statsitics,
  //     height,
  //   } = data;

  //   // Define the variables to compare
  //   const variablesToCompare = [
  //     Nationality.toLowerCase() ===
  //       currentProfileFilterObject?.filter.NationalityValue.toLowerCase(),
  //     Nationality.toLowerCase() ===
  //       currentProfileFilterObject?.filter.NationalityValue.toLowerCase(),
  //     data?.Age >= currentProfileFilterObject?.filter.AgeRangeValue[0] &&
  //       data?.Age <= currentProfileFilterObject?.filter.AgeRangeValue[1],
  //     height >= currentProfileFilterObject?.filter.HeightRangeValue[0] &&
  //       height <= currentProfileFilterObject?.filter.HeightRangeValue[1],
  //     data?.marketValue >= currentProfileFilterObject?.filter.MarketValue[0] &&
  //       data?.marketValue <= currentProfileFilterObject?.filter.MarketValue[1],
  //     currentProfileFilterObject?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
  //       position.toLowerCase(),
  //     data?.preferredFoot.toLowerCase() ===
  //       currentProfileFilterObject?.filter.PrefferedFootRadioValue.toLowerCase(),
  //     currentProfileFilterObject?.filter.ContractStatusCheckBoxes.includes(
  //       data?.clubName
  //     ),
  //     // Add more variables to compare as needed
  //   ];

  //   // Count the number of matches
  //   const numberOfMatches = variablesToCompare.filter((match) => match).length;

  //   // alert(numberOfMatches);
  //   // Check if at least 4 variables match
  //   return numberOfMatches >= 5;
  // });

  // alert("first one" + ExistingPlayerProfile.length);

  // const [PossiblePlayerMatch, setPossiblePlayerMatch] = React.useState(
  //   ExistingPlayerProfile
  // );
  const [PossiblePlayerMatch, setPossiblePlayerMatch] = React.useState(
    ExistingPlayerProfile
  );

  React.useEffect(() => {
    const currentProfileFilterObjectInEffect = savedUserProfiles.find(
      (data) => {
        return (
          data.label.toLowerCase() === currentProfileNameSelected.toLowerCase()
        );
      }
    );

    const ExistingPlayerProfile = MatchedPlayersArray?.filter((data) => {
      const {
        Nationality,
        position,
        // date_of_birth,
        Statsitics,
        height,
      } = data;

      // Define the variables to compare
      const variablesToCompare = [
        Nationality.toLowerCase() ===
          currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
        Nationality.toLowerCase() ===
          currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
        data?.Age >=
          currentProfileFilterObjectInEffect?.filter.AgeRangeValue[0] &&
          data?.Age <=
            currentProfileFilterObjectInEffect?.filter.AgeRangeValue[1],
        height >=
          currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0] &&
          height <=
            currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1],
        data?.marketValue >=
          currentProfileFilterObjectInEffect?.filter.MarketValue[0] &&
          data?.marketValue <=
            currentProfileFilterObjectInEffect?.filter.MarketValue[1],
        currentProfileFilterObjectInEffect?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
          position.toLowerCase(),
        data?.preferredFoot.toLowerCase() ===
          currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue.toLowerCase(),
        currentProfileFilterObjectInEffect?.filter.ContractStatusCheckBoxes.includes(
          data?.clubName
        ),
        // Add more variables to compare as needed
      ];

      // Count the number of matches
      const numberOfMatches = variablesToCompare.filter(
        (match) => match
      ).length;

      // Check if at least 4 variables match
      return numberOfMatches >= 5;
    });

    console.log(ExistingPlayerProfile + "Mawu");
    setPossiblePlayerMatch(ExistingPlayerProfile);
    // alert(ExistingPlayerProfile.length);
  }, [currentProfileNameSelected, savedUserProfiles]);

  const rows = PossiblePlayerMatch?.map((data, index) => {
    const {
      firstName,
      surName,
      Age,
      position,
      CountryCode,
      Nationality,
      jerseyNumber,
      player_profile_image,
      clubName,
      Statistics,
      preferredFoot,
      height,
      marketValue,
      contractStartDate,
      id,
    } = data;

    const clubObject = allClubsInDatabase.find((data) => {
      return data.clubName === clubName;
    });

    const ClubLogo = clubObject === undefined ? "" : clubObject?.clubImage;

    return createData(
      `${firstName} ${surName}`,
      Age,
      preferredFoot,
      height,
      CountryCode,
      marketValue,
      ClubLogo,
      clubName,
      contractStartDate,
      player_profile_image,
      id,
      Nationality,
      Statistics[0],
      Statistics[1]
    );
  });

  console.log("Table Row", rows);

  return (
    <div style={{ height: "42.5vh", width: "100%" }}>
      {/* <TableContainer>
        <Table
          aria-label="collapsible table"
          sx={{ width: "100%", height: "80%" }}
        >
       
        </Table>
      </TableContainer> */}

      {PossiblePlayerMatch?.length === 0 ? (
        " No Matches "
      ) : (
        <>
          <TableContainer
            className="cardBackground primaryTextColor"
            sx={{
              width: "100%",
              height: "30%",
              overflowY: "scroll",
              borderRadius: "0vw",
              borderTopLeftRadius: ".4vw",
              borderTopRightRadius: ".4vw",
            }}
            component={Card}>
            <Table
              aria-label="collapsible table"
              sx={{ width: "100%", height: "80%" }}>
              <TableHead>
                <TableRow>
                  {/* <TableCell /> */}
                  <TableCell />
                  <TableCell />

                  <TableCell sx={{ marginLeft: "4vw" }}>
                    &nbsp; &nbsp;&nbsp;
                    <Checkbox />{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    &nbsp; &nbsp; Personal
                    {/* {PossiblePlayerMatch?.length} */}
                  </TableCell>
                  <TableCell />

                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />

                  <TableCell align="right"> Age</TableCell>
                  <TableCell align="right">Foot</TableCell>
                  <TableCell align="right">Height</TableCell>
                  <TableCell align="right">Country</TableCell>
                  <TableCell align="right">Club</TableCell>
                  <TableCell align="right">Market value</TableCell>
                  <TableCell align="right">Contract Expiry</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          <TableContainer
            className="cardBackground primaryTextColor"
            sx={{
              width: "100%",
              height: "130%",
              overflowY: "scroll",
              borderRadius: "0vw",
            }}
            component={Card}>
            <Table
              aria-label="collapsible table"
              sx={{ width: "100%", height: "80%" }}>
              {/* <TableHead
      sx={{
        // visibility: "hidden",
        height: "0vh",
        backround: "red",
      }}
    >
      <TableRow>
        <TableCell />

        <TableCell>
          {" "}
          <Checkbox />{" "}
        </TableCell>
        <TableCell>Personal</TableCell>
        <TableCell align="right">Age</TableCell>
        <TableCell align="right">Foot</TableCell>
        <TableCell align="right">Height</TableCell>
        <TableCell align="right">Country</TableCell>
        <TableCell align="right">Club</TableCell>
        <TableCell align="right">Market value</TableCell>
        <TableCell align="right">Contract Expiry</TableCell>
      </TableRow>
    </TableHead> */}
              <TableBody
                sx={{
                  overflowY: "scroll",
                  maxHeight: "20vh",
                }}>
                {/* <div style={{ overflowY: "scroll", height: "300px" }}> */}
                {rows?.map((row, key) => (
                  <Row key={key} row={row} />
                ))}
                {/* </div> */}
              </TableBody>{" "}
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

// export default function FilteredPlayersTable() {
//   // const playersInAgencyArray = useSelector(selectPlayersInAgencyArray);

//   // Age,
//   // Foot,
//   // Height,
//   // Country,
//   // MarketValue,
//   // clubName,
//   // Nationality,
//   // StatisticsOverall,
//   const currentProfileFilterObject = useSelector(
//     selectCurrentProfileFilterObject
//   );

//   const MatchedPlayersArray = useSelector(selectPlayersDatabase);

//   const allClubsInDatabase = useSelector(selectClubsInDatabase);

//   const calculateMatches = (player, conditionsArray) => {
//     return conditionsArray.filter((condition) => condition(player)).length;
//   };

//   // Define variablesToCompare outside the IIFE
//   const {
//     Nationality,
//     position,
//     height,
//     marketValue,
//     // Add more properties as needed
//   } = MatchedPlayersArray[0]; // Use the first player as an example to get the properties

//   const variablesToCompare = [
//     (player) =>
//       Nationality.toLowerCase() ===
//       currentProfileFilterObject.NationalityValue.toLowerCase(),
//     (player) =>
//       player?.Age >= currentProfileFilterObject.AgeRangeValue[0] &&
//       player?.Age <= currentProfileFilterObject.AgeRangeValue[1],
//     (player) =>
//       height >= currentProfileFilterObject.HeightRangeValue[0] &&
//       height <= currentProfileFilterObject.HeightRangeValue[1],
//     (player) =>
//       player?.marketValue >= currentProfileFilterObject.MarketValue[0] &&
//       player?.marketValue <= currentProfileFilterObject.MarketValue[1],
//     (player) =>
//       currentProfileFilterObject?.PlayerPositionAutoCompleteValue.toLowerCase() ===
//       position.toLowerCase(),
//     (player) =>
//       player?.preferredFoot.toLowerCase() ===
//       currentProfileFilterObject.PrefferedFootRadioValue.toLowerCase(),
//     (player) =>
//       currentProfileFilterObject.ContractStatusCheckBoxes.includes(
//         player?.clubName
//       ),
//     // Add more conditions as needed
//   ];

//   console.log(variablesToCompare, "matches comps");

//   // Filter players based on the comparison array
//   const filteredPlayers = MatchedPlayersArray.filter((player) => {
//     const numberOfMatches = variablesToCompare.filter((condition) =>
//       condition(player)
//     ).length;
//     return numberOfMatches >= 4;
//   });

//   // Now, you can use variablesToCompare in the sort function
//   const sortedPlayers = filteredPlayers.sort((playerA, playerB) => {
//     // Sorting logic here
//     // For example, you can compare the number of matches
//     const matchesA = calculateMatches(playerA, variablesToCompare);
//     const matchesB = calculateMatches(playerB, variablesToCompare);

//     // Sort in descending order (from higher matches to lower)
//     return matchesB - matchesA;
//   });

//   // Console log to display sorted player objects
//   console.log("Sorted Players:", sortedPlayers);

//   // Console log to display sorted player objects
//   console.log(filteredPlayers, "Sorted Players:", sortedPlayers);

//   const rows = sortedPlayers?.map((data) => {
//     const {
//       firstName,
//       surName,
//       Age,
//       position,
//       CountryCode,
//       Nationality,
//       jerseyNumber,
//       player_profile_image,
//       clubName,
//       Statistics,
//       preferredFoot,
//       height,
//       marketValue,
//       contractStartDate,
//       id,
//     } = data;

//     const clubObject = allClubsInDatabase.find((data) => {
//       return data.clubName === clubName;
//     });

//     const ClubLogo = clubObject === undefined ? "" : clubObject?.clubImage;

//     return createData(
//       `${firstName} ${surName}`,
//       Age,
//       preferredFoot,
//       height,
//       CountryCode,
//       marketValue,
//       ClubLogo,
//       clubName,
//       contractStartDate,
//       player_profile_image,
//       id,
//       Nationality,
//       Statistics[0],
//       Statistics[1]
//     );
//   });

//   console.log("Table Row", rows);

//   return (
//     <div style={{ height: "42.5vh", width: "100%" }}>
//       {/* <TableContainer>
//         <Table
//           aria-label="collapsible table"
//           sx={{ width: "100%", height: "80%" }}
//         >

//         </Table>
//       </TableContainer> */}

//       {sortedPlayers?.length === 0 ? (
//         " No Matches "
//       ) : (
//         <>
//           <TableContainer
//             className="cardBackground primaryTextColor"
//             sx={{
//               width: "100%",
//               height: "30%",
//               overflowY: "scroll",
//               borderRadius: "0vw",
//               borderTopLeftRadius: ".4vw",
//               borderTopRightRadius: ".4vw",
//             }}
//             component={Card}
//           >
//             <Table
//               aria-label="collapsible table"
//               sx={{ width: "100%", height: "80%" }}
//             >
//               <TableHead>
//                 <TableRow>
//                   {/* <TableCell /> */}
//                   <TableCell />
//                   <TableCell />

//                   <TableCell sx={{ marginLeft: "4vw" }}>
//                     &nbsp; &nbsp;&nbsp;
//                     <Checkbox />{" "}
//                   </TableCell>
//                   <TableCell> &nbsp; &nbsp; Personal</TableCell>
//                   <TableCell />

//                   <TableCell />
//                   <TableCell />
//                   <TableCell />
//                   <TableCell />

//                   <TableCell align="right">Age</TableCell>
//                   <TableCell align="right">Foot</TableCell>
//                   <TableCell align="right">Height</TableCell>
//                   <TableCell align="right">Country</TableCell>
//                   <TableCell align="right">Club</TableCell>
//                   <TableCell align="right">Market value</TableCell>
//                   <TableCell align="right">Contract Expiry</TableCell>
//                 </TableRow>
//               </TableHead>
//             </Table>
//           </TableContainer>

//           <TableContainer
//             className="cardBackground primaryTextColor"
//             sx={{
//               width: "100%",
//               height: "130%",
//               overflowY: "scroll",
//               borderRadius: "0vw",
//             }}
//             component={Card}
//           >
//             <Table
//               aria-label="collapsible table"
//               sx={{ width: "100%", height: "80%" }}
//             >
//               {/* <TableHead
//       sx={{
//         // visibility: "hidden",
//         height: "0vh",
//         backround: "red",
//       }}
//     >
//       <TableRow>
//         <TableCell />

//         <TableCell>
//           {" "}
//           <Checkbox />{" "}
//         </TableCell>
//         <TableCell>Personal</TableCell>
//         <TableCell align="right">Age</TableCell>
//         <TableCell align="right">Foot</TableCell>
//         <TableCell align="right">Height</TableCell>
//         <TableCell align="right">Country</TableCell>
//         <TableCell align="right">Club</TableCell>
//         <TableCell align="right">Market value</TableCell>
//         <TableCell align="right">Contract Expiry</TableCell>
//       </TableRow>
//     </TableHead> */}
//               <TableBody
//                 sx={{
//                   overflowY: "scroll",
//                   maxHeight: "20vh",
//                 }}
//               >
//                 {/* <div style={{ overflowY: "scroll", height: "300px" }}> */}
//                 {rows.map((row) => (
//                   <Row key={row.name} row={row} />
//                 ))}
//                 {/* </div> */}
//               </TableBody>{" "}
//             </Table>
//           </TableContainer>
//         </>
//       )}
//     </div>
//   );
// }
