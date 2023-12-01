import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import playerShadowImage from "../../assets/images/playernowatermarks.png";
import youngerPlayerShadowImage from "../../assets/images/youngerplayer.png";
import {
  Input,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "react-bootstrap";
import CustomTextField from "../TextField/CustomTextField";
import { AddAPhoto, Facebook, Instagram, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import PlayerViewCardFromPlayersScreen from "../Cards/PlayerViewCardFromPlayersScreen";
import CountrySelect from "../../../../components/Autocompletes/CountrySelect";
import DatePickerTool from "../../../../components/DatePicker/DatePicker";
import GroupedRadio from "../../../../components/Radio/GroupedRadio";
import BasicAutoComplete from "../../../../components/Autocompletes/BasicAutoComplete";
import BasicSelect from "../../../../components/Selects/BasicSelect";
import ClubAutoComplete from "../../../../components/Autocompletes/ClubAutoComplete";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import BasicButtonWithEndIcon from "../../../../components/Buttons/BasicButtonWithEndIcon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "65%",
  // height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "0vw 1vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

const inputStyles = {
  width: "85%",
};

// MODAL TO CREATE A new profile

const EditPlayerProfileModal = () => {
  const [open, setOpen] = React.useState(false);

  const userLoginObject = useSelector(selectUserDetailsObject);
  const [DOB, setDOB] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const preferredFootArray = ["Left", "Right", "Both"];
  const soccerPositions = [
    "Any",
    "Goalkeeper (GK)",
    "Defender (D)",
    "Center Back (CB)",
    "Full-back (FB)",
    "Wing-back (WB)",
    "Midfielder (MF)",
    "Central Midfielder (CM)",
    "Defensive Midfielder (CDM)",
    "Attacking Midfielder (CAM)",
    "Wide Midfielder (WM)",
    "Forward (F)",
    "Striker (ST)",
    "Center Forward (CF)",
    "Winger (W)",
  ];
  const contractStatusArray = [
    "Transfer Listed",
    "Loan Listed",
    "Free Agent",
    "Youth Player",
    "Contract Expiring less than 6 months",
    "Currently renewed contract",
  ];

  const clubSelected = "";
  const [selectedClubName, setSelectedClubName] = React.useState("");
  const handleClubSelect = (selectedClubName) => {
    // Do something with the selected clubName
    // alert(selectedClubName);
    setSelectedClubName(selectedClubName);
    // console.log("Selected club:", selectedClubName);
  };

  const clubImageLinks = [
    {
      clubName: "Asante Kotoko SC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/f/fd/Asante_Kotoko_SC_%28logo%29.png",
    },
    {
      clubName: "Accra Lions",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/commons/e/e8/Accra_lions_logo.png",
    },
    {
      clubName: "Berekum Chelsea",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/1/1a/Berekum_Chelsea_Logo.png",
    },
    {
      clubName: "Accra Great Olympics",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/8/8f/The_Official_Accra_Great_Olympics_logo.jpg",
    },
    {
      clubName: "Karela United FC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/6/69/Karela_United_FC_logo.png",
    },
    {
      clubName: "King Faisal Babes FC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/c/c7/King_Faisal_Babes_FC_%28logo%29.png",
    },
    {
      clubName: "Kotoku Royals F.C.",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/a/a0/Kotoku_Royals_F.C._logo.png",
    },
    {
      clubName: "Legon Cities FC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/b/b1/Legon_Cities_FC.png",
    },
    {
      clubName: "Medeama SC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/b/bb/Medeama_SC_logo.png",
    },
    {
      clubName: "Real Tamale United",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/b/b1/Real_Tamale_United_logo.png",
    },
    {
      clubName: "Samartex",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/f/fb/Samartex_logo.png",
    },
    {
      clubName: "Bofoakwa Tano",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/a/a5/Bofoakwa_Tano.jpg",
    },
    {
      clubName: "Hasmal",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Hasmal_logo.jpg",
    },
    {
      clubName: "Sekondi Wise Fighters",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/2/21/Sekondi_Wise_Fighters_logo.jpg",
    },
    {
      clubName: "Berekum Arsenal",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/0/0a/Berekum_Arsenal_Logo.png",
    },
    {
      clubName: "New Edubiase United",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/6/61/New_Edubiase_United.gif",
    },
  ];

  return (
    <React.Fragment>
      <div onClick={handleOpen}>
        <BasicButtonWithEndIcon
          innerText="Edit Profile"
          className="md:w-[9vw] sm:w-[9vw]"
          style={{ height: "6vh", marginBottom: "1.5vh" }}
          endIcon={"edit"}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor md:h-[94%] md:w-[80%] sm:w-[80%]  sm:h-[90%]"
          sx={{ ...style }}
        >
          <h2 id="child-modal-title">Edit a player profile</h2>
          <Button
            sx={{ width: "10%", marginLeft: "80%", marginBottom: "1vh" }}
            onClick={handleClose}
          >
            Back
          </Button>
          <div
            className="md:w-[100%] md:h-[80%] md:flex md:flex-row md:gap-[1vw] md:overflow-y-hidden       sm:w-[100%] sm:h-[75%] sm:flex sm:flex-col sm:gap-[1vw] sm:overflow-y-scroll"
            style={
              {
                // width: "100%",
                // height: "80%",
                // display: "flex",
                // gap: "1vw",
                // overflowY: "scroll",
              }
            }
          >
            {/* LEFT INPUT PLAYER DETAILS */}
            <div
              className="md:basis-[35%] md:flex md:flex-col   sm:basis-[30%] sm:flex sm:flex-col "
              style={
                {
                  // flex: ".35",
                  // display: "flex",
                  // flexDirection: "column",
                  // overflowY: "",
                }
              }
            >
              <div
                className="md:flex md:flex-col md:items-center md:justify-center md:m-[-15vh] md:gap-[25px]    sm:flex sm:items-center sm:flex-col sm:justify-center sm:gap-[10px] sm:m-[0vh]"
                style={{
                  flex: "0.9",
                  // display: "flex",
                  // gap: "20px",
                  // alignItems: "center",
                  // flexDirection: "column",
                  // overflowY: "scroll",
                  // margin: "-15vh",
                }}
              >
                {/* <CustomTextField placeholder={"First Name"} />
                <CustomTextField placeholder={"Surname"} /> */}

                <div className="md:w-[23vw] sm:w-[90%]">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    fullWidth={true}
                    // sx={{ width: "23vw" }}
                  />
                </div>
                <div className="md:w-[23vw] sm:w-[90%]">
                  <TextField
                    id="outlined-basic"
                    label="Surname"
                    variant="outlined"
                    fullWidth={true}
                    // sx={{ width: "23vw" }}
                  />
                </div>
                <div className="md:w-[23vw] sm:w-[90%]">
                  <DatePickerTool
                    // style={{ width: "23vw" }}
                    containerStyle={{ marginTop: "-1vh" }}
                    label="Date of birth"
                    // defaultValue={userData.DOB}
                    dateValue={(e) => {
                      setDOB(e);
                    }}
                  />
                </div>
                <div className="md:w-[23vw] sm:w-[90%]">
                  <CountrySelect
                    selectLabel="Nationality"
                    styles={{
                      minWidth: "23vw",
                      marginLeft: "-0.1vw",
                      marginTop: "1vh",
                    }}
                  />
                </div>
                <div className="md:w-[23vw] sm:w-[90%]">
                  <TextField
                    id="outlined-basic"
                    label="Height"
                    type="number"
                    variant="outlined"
                    fullWidth={true}
                    className="primaryTextColor"
                    // sx={{ width: "23vw" }}
                  />
                </div>
              </div>
              <div style={{ flex: "0.1" }}>
                {/* BTN */}
                <Button
                  className="md:w-[23vw]  md:bottom-[5%] sm:bottom-[3%]   sm:w-[98%]"
                  sx={{
                    // width: "23vw",
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    position: "absolute",
                    // bottom: 25,
                  }}
                  variant="contained"
                >
                  Edit
                </Button>
              </div>
            </div>
            {/* MIDDLE INPUT PLAYER DETAILS */}
            <div
              className="md:flex md:gap-[15px] md:flex-col md:items-center md:m-[1vh]   sm:flex sm:gap-[10px] sm:flex-col sm:items-center   md:basis-[35%] sm:basis-[30%] sm:m-[0vh]"
              style={
                {
                  // flex: ".35",
                  // overflowY: "scroll",
                  // display: "flex",
                  // gap: "20px",
                  // alignItems: "center",
                  // flexDirection: "column",
                  // margin: "1vh",
                }
              }
            >
              <div className="md:w-[23vw] sm:w-[90%]">
                <TextField
                  id="outlined-basic"
                  label="Market value(optional)"
                  type="number"
                  variant="outlined"
                  fullWidth={true}
                  // sx={{ width: "23vw" }}
                />
              </div>
              <div className="md:w-[23vw] sm:w-[90%]">
                {clubSelected !== "" ? (
                  <BasicSelect
                    label="Contract status"
                    itemsArray={contractStatusArray}
                    inputStyle={{ width: "23vw" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="md:w-[23vw] sm:w-[90%]">
                <BasicAutoComplete
                  // style={{ width: "23vw" }}
                  ListArray={soccerPositions}
                  label="Main Position"
                />{" "}
              </div>
              {/* <CustomTextField placeholder={"Market value(optional)"} /> */}
              <div className="md:w-[23vw] sm:w-[90%]">
                <GroupedRadio
                  radioArray={preferredFootArray}
                  labelName="Preferred foot"
                />
              </div>
              {/* SOCIAL MEDIAL HANDLES*/}
              <div className="md:w-[23vw] sm:w-[90%]">
                <TextField
                  id="outlined-basic"
                  label="Instagram Handle"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  // sx={{ width: "23vw" }}
                />
              </div>
              <div className="md:w-[23vw] sm:w-[90%]">
                <TextField
                  id="outlined-basic"
                  label="Facebook Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  // sx={{ width: "23vw" }}
                />
              </div>
            </div>
            {/* RIGHT SELECT IMAGES FROM FILES */}
            <div
              className="md:basis-[32%] sm:basis-[40%] "
              // style={{ overflowY: "scroll" }} md:overflow-y-hidden sm:overflow-y-scroll
            >
              {/* MARKET VALUE RANGE */}

              {userLoginObject.role == "Club" ? (
                ""
              ) : userLoginObject.role == "Scout" ||
                userLoginObject.role == "Coach" ? (
                <ClubAutoComplete
                  ListArray={clubImageLinks}
                  label="Select a club"
                  style={{ width: "23vw" }}
                  onClubSelect={handleClubSelect}
                />
              ) : (
                ""
              )}

              <div
                className="md:w-[20vw] md:flex md:justify-center md:items-center md:self-center md:h-[20vh]      sm:flex sm:justify-center sm:items-center sm:self-center  sm:h-[10vh] sm:w-[100%]"
                style={{
                  border: "2px dotted",
                  borderRadius: "1vw",

                  marginTop: "3vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "baseline",
                    gap: 10,
                  }}
                >
                  <AddAPhoto />
                  <Typography sx={{ fontWeight: "600" }}>
                    Select or drag profile Image
                  </Typography>
                </div>

                <div>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* // Start Date`` */}
              <h6 style={{ marginTop: "9.5vh" }}>Contract period</h6>
              <div className="md:w-[23vw] sm:w-[90%]">
                <DatePickerTool
                  // style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh", marginBottom: "3vh" }}
                  label="Start date"
                  // defaultValue={startDate}
                  dateValue={(e) => {
                    // setStartDate(e.$d.toISOString());
                    // alert(e);
                    console.log(e, "start");
                  }}
                />
              </div>
              {/* End Date */}
              <div className="md:w-[23vw] sm:w-[90%]">
                <DatePickerTool
                  // style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh" }}
                  label="End date"
                  dateValue={(e) => {
                    console.log(e, "end");
                  }}
                />
              </div>
            </div>
            {/* <Button
              className="md:w-[23vw] md:bottom-[5%] sm:bottom-[5%] md:hidden sm:block  sm:w-[50vw] "
              sx={{
                // width: "23vw",
                background: "blue",
                color: "white",
                border: ".5vw",
                position: "absolute",
                // bottom: 25,
              }}
              variant="contained"
            >
              Create
            </Button> */}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default EditPlayerProfileModal;
// MODAL TO ADD EXISTING PLAYER TO AGENCY   , paddingLeft: "5%"
