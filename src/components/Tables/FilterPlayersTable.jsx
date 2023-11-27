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
  playerImage
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

  const playerNameWithoutSpaces = row.name.replace(/\s/g, "");

  const handleProfileView = () => {
    navigate(`/player-details/${playerNameWithoutSpaces}`);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },

          color: "white",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
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
            className="primaryTextColor"
          >
            <Avatar
              sx={{ width: 30, height: 30, marginRight: 1 }}
              src={row.playerImage}
            />{" "}
            {row.name}
          </div>
        </TableCell>
        <TableCell align="right">{row.Age}</TableCell>
        <TableCell align="right">{row.Foot}</TableCell>
        <TableCell align="right">{row.Height}</TableCell>
        <TableCell align="right">
          <img
            style={{ marginLeft: "1.5vw" }}
            src={`https://flagcdn.com/${row.Country.toLowerCase()}.svg`}
            width="30"
            alt=""
          />
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
                  colSpan={3}
                >
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
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        // background: "red",
                      }}
                    >
                      <PlayerOverallAttributes />
                    </div>
                  </div>
                  {/* Sample Video */}
                  <div style={{ flex: ".2" }}>
                    <div
                      style={{
                        width: "90%",
                        height: "10vh",
                        borderRadius: "1vw",
                        position: "relative",
                        paddingTop: "1vh",
                      }}
                      className="tableVideo"
                    >
                      <video
                        // id={`video-${index}`}
                        src="/believerJuggling.mp4"
                        width="100%"
                        // height="10vh"
                        style={{ position: "absolute" }}
                        // autoPlay={true}
                        controls
                      ></video>
                    </div>
                  </div>
                </TableCell>{" "}
                {/* //// StatsRow */}
              </TableRow>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Period</TableCell>
                    <TableCell>Apperance</TableCell>
                    <TableCell>Goals</TableCell>
                    <TableCell align="right">Assists</TableCell>
                    <TableCell align="right">Pass success %</TableCell>
                    <TableCell align="right">Interceptions</TableCell>
                    <TableCell align="right">Tackles won</TableCell>
                    <TableCell align="right">Clean sheets</TableCell>
                    <TableCell align="right">Distatnce covered(km)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow, key) => (
                    <TableRow key={key}>
                      <TableCell>{historyRow.period}</TableCell>
                      <TableCell>{historyRow.apperances}</TableCell>

                      <TableCell>{historyRow.goals}</TableCell>
                      <TableCell align="right">{historyRow.assist}</TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                        {historyRow.passCompletionRate}
                      </TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                        {historyRow.Interception}
                      </TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                        {historyRow.tacklesWon}
                      </TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                        {historyRow.CleanSheets}
                      </TableCell>

                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.Club * 100) / 100} */}
                        {historyRow.DistanceCovered}
                      </TableCell>
                    </TableRow>
                  ))}
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
  const playersInAgencyArray = useSelector(selectPlayersInAgencyArray);

  const rows = playersInAgencyArray.map((data) => {
    const {
      firstName,
      surName,
      Age,
      position,
      CountryCode,
      Nationality,
      jerseyNumber,
      image,
      clubName,
      clubLogo,
      preferredFoot,
      height,
      marketValue,
      contractExpiryDate,
    } = data;

    return createData(
      `${firstName} ${surName}`,
      Age,
      preferredFoot,
      height,
      CountryCode,
      marketValue,
      clubLogo,
      clubName,
      contractExpiryDate,
      image
    );
  });

  console.log("Table Row", rows);

  return (
    <div
      className="md:w-[100%] md:h-[42.5vh] sm:h-[42.5vh] sm:w-[100%]"
      // style={{ height: "42.5vh" }}
    >
      {/* <TableContainer>
        <Table
          aria-label="collapsible table"
          sx={{ width: "100%", height: "80%" }}
        >
       
        </Table>
      </TableContainer> */}

      <TableContainer
        className="cardBackground primaryTextColor md:w-[100%] md:h-[30%]  sm:w-[100%] sm:h-[30%]"
        sx={{
          // width: "100%",
          // height: "30%",
          overflowY: "scroll",
          borderRadius: "0vw",
          borderTopLeftRadius: ".4vw",
          borderTopRightRadius: ".4vw",
          // background: "pink",
        }}
        component={Card}
      >
        <Table
          aria-label="collapsible table"
          sx={{ width: "100%", height: "80%" }}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              <TableCell />
              <TableCell />

              <TableCell sx={{ marginLeft: "4vw" }}>
                &nbsp; &nbsp;&nbsp;
                <Checkbox />{" "}
              </TableCell>
              <TableCell> &nbsp; &nbsp; Personal</TableCell>
              <TableCell />

              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />

              <TableCell align="right">Age</TableCell>
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
        component={Card}
      >
        <Table
          aria-label="collapsible table"
          sx={{ width: "100%", height: "80%" }}
        >
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
            }}
          >
            {/* <div style={{ overflowY: "scroll", height: "300px" }}> */}
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {/* </div> */}
          </TableBody>{" "}
        </Table>
      </TableContainer>
    </div>
  );
}
