import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Add, Settings } from "@mui/icons-material";
import { Card, Divider, TextField, IconButton, Tooltip } from "@mui/material";
import CountrySelect from "../Autocompletes/CountrySelect";
import IconTooltip from "../Tooltips/IconToolTip";
import DatePickerTool from "../DatePicker/DatePicker";
import BasicAutoComplete from "../Autocompletes/BasicAutoComplete";
import GroupedRadio from "../Radio/GroupedRadio";
import CheckboxesGroup from "../CheckBoxes/GroupedCheckBox";
import AgeRangeSlider from "../Slider/AgeRangeSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserDetailsObject,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import BasicButton from "../Buttons/BasicButton";
import { useNavigate } from "react-router-dom";
import {
  selectTempUsersDatabase,
  setTempUsersDatabase,
} from "../../statemanager/slices/TempDatabaseSlice";
import {
  selectCurrentProfile,
  setCurrentProfile,
} from "../../statemanager/slices/SavedProfileSlice";
import {
  selectAutoCompletePlayerPosition,
  setAutoCompletePlayerPosition,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import BasicSelect from "../Selects/BasicSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "2vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

const inputStyles = {
  width: "85%",
};

// const selectFieldStyle ={
//   width:130
// } ;

export default function CreateProfileModal({ ProfileType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setAutoCompletePlayerPosition(""));
    dispatch(setCurrentProfile(""));
  };

  const leagueDivisions = [
    "Top-Flight Division",
    "Women's league",
    "Second Division",
    "Third Division",
    "Regional Leagues",
    "Semi-Professional Leagues",
    "University and College Leagues",
    "Recreational and Social Leagues",
    "Youth Leagues",
    "Grassroots and Mini Leagues",
    "Juvenile league",
  ];

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

  const GKTextFieldArray = [
    "Clean sheets",
    "Saves",
    " long pass accuracy ",
    "Bloccked shots ",
    "Aerial duels",
    "penalty stop success",
  ];

  const DefendersTextFieldArray = [
    "Clearance",
    "Interception",
    "Blocks",
    "Clean sheets per season",
    "Successful tackles rate %",
  ];
  const MidfieldersTextFieldArray = [
    "pass success",
    "total passes",
    "assists",
    "key passes per game",
    "interceptions",
    "successful tackles rate",
    "successful crosses",
  ];
  const AttackerTextFieldArray = [
    "Goals",
    "Goal/match played ratio",
    "Assists",
    "Shots per game",
    "Goal conversion rate %",
    "Offside range",
  ];

  const autocompletePositionSelected = useSelector(
    selectAutoCompletePlayerPosition
  );

  const preferredFootArray = ["Left", "Right", "Both", "Any"];
  const captainArray = ["Yes", "No", "Any"];

  const contractStatusArray = [
    "Transfer Listed",
    "Loan Listed",
    "Free Agent",
    "Youth Player",
    "Contract Expiring less than 6 months",
    "Currently renewed contract",
  ];

  const loginUserDetails = useSelector(selectUserDetailsObject);
  const { savedProfile, email } = loginUserDetails;
  const allUsers = useSelector(selectTempUsersDatabase);
  const currentProfileClicked = useSelector(selectCurrentProfile);
  //
  const [profileName, setProfileName] = useState("");
  const [editedProfileName, setEditedProfileName] = useState("");

  // FUNCTION FOR CREATING PROFILE
  const handleCreateProfile = () => {
    const unMacthedPlayerDatabase = allUsers.filter((data) => {
      return data.email !== email;
    });

    if (savedProfile.length <= 0) {
      // cont newProfile == log
      // alert("less");

      // This is the rest of users in the database devoid of the current user logged in

      console.log(unMacthedPlayerDatabase, "unmatched players");

      dispatch(
        setUserDetailsObject({
          ...loginUserDetails,
          savedProfile: [{ label: "Default", filter: {} }],
        })
      );
      // doing this because its not an online database and not a snapshot or realtime update so i have to update the logged in user object and also same user object in the database

      dispatch(
        setTempUsersDatabase([
          ...unMacthedPlayerDatabase,
          {
            ...loginUserDetails,
            savedProfile: [{ label: "Default", filter: {} }],
          },
        ])
      );
    } else {
      // loginUserDetails
      // allUsers
      const { savedProfile } = loginUserDetails;

      dispatch(
        setUserDetailsObject({
          ...loginUserDetails,
          savedProfile: [...savedProfile, { label: profileName, filter: {} }],
        })
      );

      dispatch(
        setTempUsersDatabase([
          ...unMacthedPlayerDatabase,
          {
            ...loginUserDetails,
            savedProfile: [...savedProfile, { label: profileName, filter: {} }],
          },
        ])
      );
    }
    // changing the click current clicked value to the edited name

    handleClose();

    // reset the textfields after save
  };

  // FUNCTION FOR CREATING PROFILE
  const handleSaveProfile = () => {
    // alert("Save");

    const unMacthedPlayerDatabase = allUsers.filter((data) => {
      return data.email !== email;
    });

    const tempSavedProfile = [...savedProfile];
    let indexOfCurrentProfile = savedProfile.findIndex(
      (item) => currentProfileClicked === item.label
    );
    if (indexOfCurrentProfile !== -1) {
      tempSavedProfile[indexOfCurrentProfile] = {
        label: editedProfileName,
        filter: {},
      };

      dispatch(
        setUserDetailsObject({
          ...loginUserDetails,
          savedProfile: tempSavedProfile,
        })
      );

      dispatch(
        setTempUsersDatabase([
          ...unMacthedPlayerDatabase,
          {
            ...loginUserDetails,
            savedProfile: tempSavedProfile,
          },
        ])
      );

      console.log(tempSavedProfile);
    }

    dispatch(setCurrentProfile(editedProfileName));

    console.log(currentProfileClicked);

    handleClose();
  };

  // REview this
  useEffect(() => {
    setEditedProfileName(currentProfileClicked);
  }, [currentProfileClicked]);

  return (
    <div>
      {ProfileType === "Edit" ? (
        <Tooltip title={"Edit Profile"}>
          <IconButton onClick={handleOpen}>
            <Settings />
          </IconButton>
        </Tooltip>
      ) : savedProfile.length <= 0 ? (
        <div onClick={handleOpen}>
          {/* // CHANING THE MODAL ENTRY ICON / CARD */}
          <BasicButton
            innerText="Get started"
            style={{ width: "15vw", marginBottom: "3vh" }}
          />{" "}
        </div>
      ) : (
        <Card
          onClick={handleOpen}
          sx={{
            width: 145,
            height: 80,
            marginLeft: "4.6vw",
            paddingTop: "1vh",
            paddingLeft: ".6vw",
            paddingRight: ".6vw",
            display: "flex",
            // background:
            //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
            background: "#5585fe",
            // background: "#1B1E2B",
            color: "white",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              flex: ".93",
              fontSize: "1em",
              display: "grid",
              placeItems: "center",
            }}
          >
            {" "}
            Create new profile{" "}
          </div>
          <div
            style={{
              flex: ".07",
              display: "flex",
            }}
          >
            {" "}
            <Add sx={{ marginTop: "4.4vh", color: "gold" }} />{" "}
          </div>
        </Card>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="cardBackground primaryTextColor" style={style}>
            {/* HEader MEssage */}
            <div
              style={{
                flex: ".1",
                // background: "green",
                display: "flex",
                gap: "4vw",
              }}
            >
              <h2 className="secondaryTextColor">
                {" "}
                {ProfileType === "Edit"
                  ? "Edit Profile"
                  : savedProfile.length <= 0
                  ? "Default Profile"
                  : "Search Profile"}{" "}
              </h2>{" "}
              <h6>Who are you looking for?</h6>{" "}
              <div style={{ justifySelf: "flex-end" }}>
                {" "}
                {savedProfile.length <= 0 ? (
                  ""
                ) : currentProfileClicked.toLowerCase() === "default" ? (
                  ""
                ) : (
                  <TextField
                    size="small"
                    id="outlined-basic"
                    label="Profile Name"
                    variant="outlined"
                    defaultValue={
                      ProfileType === "Edit" ? currentProfileClicked : ""
                    }
                    onChange={(e) => {
                      setProfileName(e.target.value);
                      setEditedProfileName(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            <div style={{ flex: ".9", display: "flex" }}>
              {/* // Personal information */}
              <div
                style={{
                  flex: ".33",
                  display: "flex",
                  gap: "2vh",
                  flexDirection: "column",
                  paddingRight: "1.5vw",
                  position: "relative",
                }}
              >
                {" "}
                <h4 className="secondaryTextColor">
                  Personal Information{" "}
                  <IconTooltip
                    info={
                      "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
                    }
                    image="help"
                  />{" "}
                </h4>{" "}
                {/* Place of birth */}
                <CountrySelect selectLabel="Place of birth" />
                {/* Nationality  */}
                <CountrySelect selectLabel="Nationality" />
                {/* Height rANGE */}
                <AgeRangeSlider
                  rangeName={"Height range (m)"}
                  max={2.5}
                  min={0.5}
                />
                {/* <DatePickerTool style={inputStyles} label="Date of birth" /> */}
                {/* Age */}
                <AgeRangeSlider rangeName={"Age range"} max={40} min={10} />
                <Button
                  sx={{
                    width: "23vw",
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    position: "absolute",
                    bottom: 50,
                  }}
                  onClick={
                    ProfileType === "Edit"
                      ? handleSaveProfile
                      : handleCreateProfile
                  }
                >
                  {ProfileType === "Edit" ? "Save" : "Create"}
                </Button>{" "}
              </div>
              {/* Player Data */}
              <div
                style={{
                  flex: ".34",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: ".1",
                  }}
                >
                  {" "}
                  <h4 className="secondaryTextColor">
                    Player Information{" "}
                    <IconTooltip
                      info={
                        "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
                      }
                      image="help"
                    />{" "}
                  </h4>
                </div>

                {/* // Player stats information area */}
                <div
                  style={{
                    // flex: ".9",
                    height: "68vh",
                    // overflowY: "scroll",
                    paddingLeft: "1vw",
                    paddingTop: "3vh",
                    overflowY: "scroll",
                  }}
                >
                  <BasicAutoComplete
                    style={{ ...inputStyles, marginBottom: "2.5vh" }}
                    ListArray={soccerPositions}
                    label="Main Position"
                  />{" "}
                  {/* <BasicAutoComplete
                    style={inputStyles}
                    ListArray={soccerPositions}
                    label="Other Positions"
                  /> */}
                  {autocompletePositionSelected === ""
                    ? ""
                    : //Goalkeeper
                    autocompletePositionSelected === "Goalkeeper (GK)"
                    ? GKTextFieldArray.map((data, index) => {
                        return (
                          <AgeRangeSlider
                            key={index}
                            rangeName={data}
                            max={50}
                            min={1}
                          />
                        );
                      })
                    : // DEFEMDERS
                    autocompletePositionSelected === "Defender (D)" ||
                      autocompletePositionSelected === "Center Back (CB)" ||
                      autocompletePositionSelected === "Full-back (FB)" ||
                      autocompletePositionSelected === "Wing-back (WB)"
                    ? DefendersTextFieldArray.map((data, index) => {
                        return (
                          <AgeRangeSlider
                            key={index}
                            rangeName={data}
                            max={50}
                            min={1}
                          />
                        );
                      })
                    : // MIDFIELDERS
                    autocompletePositionSelected === "Midfielder (MF)" ||
                      autocompletePositionSelected ===
                        "Central Midfielder (CM)" ||
                      autocompletePositionSelected ===
                        "Defensive Midfielder (CDM)" ||
                      autocompletePositionSelected ===
                        "Attacking Midfielder (CAM)" ||
                      autocompletePositionSelected === "Wide Midfielder (WM)"
                    ? MidfieldersTextFieldArray.map((data, index) => {
                        return (
                          <AgeRangeSlider
                            key={index}
                            rangeName={data}
                            max={50}
                            min={1}
                          />
                        );
                      }) // Attackers
                    : autocompletePositionSelected === "Forward (F)" ||
                      autocompletePositionSelected === "Striker (ST)" ||
                      autocompletePositionSelected === "Center Forward (CF)" ||
                      autocompletePositionSelected === "Winger (W)"
                    ? AttackerTextFieldArray.map((data, index) => {
                        return (
                          <AgeRangeSlider
                            key={index}
                            rangeName={data}
                            max={50}
                            min={1}
                          />
                        );
                      })
                    : ""}
                  {/* MARKET VALUE RANGE */}
                  <AgeRangeSlider
                    rangeName={"Market Value ($ 000,000)"}
                    max={50}
                    min={1}
                  />
                  {/* Captiain Selection */}
                  <GroupedRadio radioArray={captainArray} labelName="Captain" />
                  {/* // Preffered foot */}
                  <GroupedRadio
                    radioArray={preferredFootArray}
                    labelName="Preferred foot"
                  />
                </div>
              </div>
              {/* Extra Info Data */}
              <div
                style={{
                  flex: ".33",
                  display: "flex",
                  gap: "2vh",
                  flexDirection: "column",
                }}
              >
                <h4 className="secondaryTextColor">
                  Other Information{" "}
                  <IconTooltip
                    info={
                      "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
                    }
                    image="help"
                  />{" "}
                </h4>

                <CountrySelect selectLabel="Club Country" />

                <BasicSelect
                  label={"Division"}
                  inputStyle={{ width: 300 }}
                  itemsArray={leagueDivisions}
                />

                <CheckboxesGroup
                  CheckboxLabel="Contract Status"
                  checkboxArray={contractStatusArray}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
