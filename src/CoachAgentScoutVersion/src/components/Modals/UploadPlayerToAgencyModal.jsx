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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "94%",
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

function CreateAPlayerProfileModal() {
  const [open, setOpen] = React.useState(false);

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

  return (
    <React.Fragment>
      <Card
        onClick={handleOpen}
        className="background primaryTextColor uploadPlayerModalCard"
        style={{
          // background: "#E0FA55",
          height: "45vh",
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          padding: ".4vw",
        }}
      >
        {/* CARD HEADER */}

        <div style={{ flex: ".2" }}>
          <h4>Create a player profile</h4>
        </div>

        {/* Card CONTENT */}
        <div style={{ flex: ".4" }}>
          Profile will include the following: <br />
          <ul>
            <li>Name</li>
            <li>Date of birth</li>
            <li>Nationality</li>
            <li>Profile image , etc</li>
          </ul>
        </div>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor"
          sx={{ ...style, width: 1000 }}
        >
          <h2 id="child-modal-title">Create a player profile</h2>
          <Button
            sx={{ width: "10%", marginLeft: "80%", marginBottom: "1vh" }}
            onClick={handleClose}
          >
            Back
          </Button>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              gap: "1vw",
            }}
          >
            {/* LEFT INPUT PLAYER DETAILS */}
            <div
              style={{
                flex: ".35",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: "0.9",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CustomTextField placeholder={"First Name"} />
                <CustomTextField placeholder={"Surname"} />

                <DatePickerTool
                  style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh" }}
                  label="Date of birth"
                  // defaultValue={userData.DOB}
                  dateValue={(e) => {
                    setDOB(e);
                  }}
                />
                <CountrySelect
                  selectLabel="Nationality"
                  styles={{
                    minWidth: "23vw",
                    marginLeft: "-0.5vw",
                    marginTop: "1vh",
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="Height"
                  type="number"
                  variant="outlined"
                  fullWidth={true}
                  className="primaryTextColor"
                  sx={{ width: "23vw" }}
                />
              </div>
              <div style={{ flex: "0.1" }}>
                {/* BTN */}
                <Button
                  sx={{
                    width: "23vw",
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    position: "absolute",
                    bottom: 50,
                  }}
                  variant="contained"
                >
                  Create
                </Button>
              </div>
            </div>
            {/* MIDDLE INPUT PLAYER DETAILS */}
            <div
              style={{
                flex: ".35",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CountrySelect
                styles={{
                  minWidth: "23vw",
                  marginLeft: "-0.5vw",
                }}
                selectLabel="Club Name"
              />
              {clubSelected !== "" ? (
                <BasicSelect
                  label="Contract status"
                  itemsArray={contractStatusArray}
                  inputStyle={{ width: "23vw" }}
                />
              ) : (
                ""
              )}
              <BasicAutoComplete
                style={{ width: "23vw" }}
                ListArray={soccerPositions}
                label="Main Position"
              />{" "}
              {/* <CustomTextField placeholder={"Market value(optional)"} /> */}
              <GroupedRadio
                radioArray={preferredFootArray}
                labelName="Preferred foot"
              />
              {/* SOCIAL MEDIAL HANDLES*/}
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
                sx={{ width: "23vw" }}
              />
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
                sx={{ width: "23vw" }}
              />
            </div>
            {/* RIGHT SELECT IMAGES FROM FILES */}
            <div style={{ flex: ".3" }}>
              {/* MARKET VALUE RANGE */}
              <TextField
                id="outlined-basic"
                label="Market value(optional)"
                type="number"
                variant="outlined"
                fullWidth={true}
                sx={{ width: "23vw" }}
              />
              <div
                style={{
                  border: "2px dotted",
                  borderRadius: "1vw",
                  width: "23vw",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
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

                {/* ref input */}
                <div>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// MODAL TO ADD EXISTING PLAYER TO AGENCY   , paddingLeft: "5%"

function AddPlayerFromDatabaseModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const PlayerArray = useSelector(selectPlayersInAgencyArray);

  return (
    <React.Fragment>
      <Card
        className="background primaryTextColor uploadPlayerModalCard"
        onClick={handleOpen}
        style={{
          // background: "#E0FA55",
          height: "45vh",
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          padding: ".4vw",
        }}
      >
        {/* CARD HEADER */}

        <div style={{ flex: ".2" }}>
          <h4>Add existing player</h4>
        </div>

        {/* Card CONTENT */}
        <div style={{ flex: ".4" }}>
          Add any player(s) from our existing databases across our the world:{" "}
          <br />
        </div>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor"
          sx={{ ...style, width: 1000 }}
        >
          <h2 id="child-modal-title">Add existing player</h2>
          <Button
            onClick={handleClose}
            sx={{ width: "10%", marginLeft: "80%" }}
          >
            Back
          </Button>
          <div
            style={{
              // background: "red",
              width: "100%",
              height: "80%",
              display: "flex",
              // padding: "10px",
              flexDirection: "column",
            }}
          >
            {/* Search Bar */}
            <div style={{ flex: "0.1" }}>
              <TextField
                id="input-with-icon-textfield"
                label="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </div>
            {/* Player View Cards */}
            <div
              style={{
                flex: "0.8",
                // background: "peru",
                display: "flex",
                flexWrap: "wrap",
                overflowY: "scroll",
              }}
            >
              {PlayerArray.map((data) => {
                const {
                  firstName,
                  surName,
                  Age,
                  position,
                  Nationality,
                  jerseyNumber,
                  image,
                } = data;

                return (
                  <PlayerViewCardFromPlayersScreen
                    image={image}
                    surName={surName}
                    age={Age}
                    position={position}
                    jerseyNumber={jerseyNumber}
                    firstName={firstName}
                    nationality={Nationality}
                  />
                );
              })}
            </div>
            <div
              style={{
                flex: "0.1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination count={10} color="secondary" />
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function UploadPlayerToAgencyModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Upload player</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 1000,
            display: "flex",
            flexDirection: "column",
          }}
          className="cardBackground primaryTextColor"
        >
          {/* // UPLOAD A PLAYER HEADER */}

          <div style={{ flex: ".2", textAlign: "center" }}>
            <h2 style={{ margin: 0 }} id="parent-modal-title">
              Upload a player
            </h2>
            <Typography>
              Create a new player's profile into our database
            </Typography>
          </div>

          {/* // Create a new player profile or upload a player from database */}
          <div style={{ flex: ".7", display: "flex" }}>
            {/* Create a new player profile Area */}
            <div style={{ flex: ".45", display: "flex" }}>
              {/* IMAGE AREA   */}
              <div style={{ flex: ".4" }}>
                {/* <img
                  style={{
                    width: "150px",
                    height: "300px",
                    marginTop: "30%",
                  }}
                  src={youngerPlayerShadowImage}
                /> */}
              </div>

              {/* Card AREA */}
              <div
                style={{
                  flex: ".6",
                  padding: "1vw",
                  display: "grid",
                  placeContent: "center",
                  paddingLeft: "3vw",
                }}
              >
                <img
                  style={{ width: "200px", height: "400px" }}
                  src={playerShadowImage}
                />
              </div>
            </div>

            {/* upload a player from database  */}

            <div style={{ flex: ".4", display: "flex" }}>
              <div
                style={{
                  flex: ".6",

                  padding: ".4vw",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <CreateAPlayerProfileModal />

                {/* <AddPlayerFromDatabaseModal /> */}
              </div>

              <div style={{ flex: ".4" }}>
                {/* <img
                  style={{ width: "200px", height: "400px" }}
                  src={playerShadowImage}
                /> */}
              </div>
            </div>
          </div>

          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}

// const PlayerShadowAndCardComponent =()=>{

// return(
//   <div style={{ flex: ".5", display: "flex" }}>
//               {/* IMAGE AREA   */}
//               <div style={{ flex: ".4" }}>
//                 <img
//                   style={{ width: "200px", height: "400px" }}
//                   src={playerShadowImage}
//                 />
//               </div>

//               {/* Card AREA */}
//               <div
//                 style={{
//                   flex: ".6",

//                   padding: ".4vw",
//                   display: "grid",
//                   placeContent: "center",
//                 }}
//               >
//                 <Card
//                   style={{
//                     background: "#E0FA55",
//                     height: "45vh",
//                     width: "20vw",
//                     display: "flex",
//                     flexDirection: "column",
//                     padding: ".4vw",
//                   }}
//                 >
//                   {/* CARD HEADER */}

//                   <div style={{ flex: ".2" }}>
//                     <h4>Create a player profile</h4>
//                   </div>

//                   {/* Card CONTENT */}
//                   <div style={{ flex: ".4" }}>
//                     Profile will include the following: <br />
//                     <ul>
//                       <li>Name</li>
//                       <li>Date of birth</li>
//                       <li>Nationality</li>
//                       <li>Profile image , etc</li>
//                     </ul>
//                   </div>
//                 </Card>
//               </div>
//             </div>

// )

// }
