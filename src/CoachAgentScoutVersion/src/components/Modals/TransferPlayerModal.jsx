import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  ArrowRight,
  Close,
  DoubleArrow,
  HighlightOffOutlined,
  InfoOutlined,
  SwapHoriz,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import BasicButtonWithEndIcon from "../../../../components/Buttons/BasicButtonWithEndIcon";
import { Avatar, Tooltip } from "@mui/material";
import TransferClubSelect from "../Selects/TransferClubSelect";
import DatePickerTool from "../../../../components/DatePicker/DatePicker";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { selectClubsInDatabase } from "../../../../statemanager/slices/ClubsInDatabaseSlice";
import { selectPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../../statemanager/slices/PlayersInAgencySlice";
import {
  setSnackbarMessage,
  setSnackbarTriggerCounter,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1vw",
  boxShadow: 24,

  p: 0.5,
};

export default function TransferPlayerModal() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setStartDate("");
    setEndDate("");
    setNameOfDestinatedClub("Designated club");
    setOpen(false);
  };

  const [nameOfDestinatedClub, setNameOfDestinatedClub] =
    useState("Designated club");
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const allClubsInDatabase = useSelector(selectClubsInDatabase);
  const selectedPlayerInManagementObject = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );
  const { club } = userLoginDetailsObject;
  const { firstName, surName } = selectedPlayerInManagementObject;
  const matchedClubObject = allClubsInDatabase.filter((data) => {
    const { clubName } = data;
    return clubName === club;
  });

  const extractClubNameSelected = (e) => {
    setNameOfDestinatedClub(e);
  };

  const handleSendTransferRequest = () => {
    dispatch(
      setSnackbarMessage(`Transfer request sent to ${nameOfDestinatedClub}`)
    );
    dispatch(setSnackbarTriggerCounter());
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <BasicButtonWithEndIcon
          innerText="Transfer "
          style={{ width: "9vw", height: "6vh", marginBottom: "1.5vh" }}
          endIcon={"swap_horiz"}
        />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ borderRadius: "1vw" }}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade s in={open}>
          <div
            className="cardBackground primaryTextColor"
            style={{ ...style, display: "flex", flexDirection: "column" }}
          >
            <div
              className="cardBackground"
              style={{
                flex: ".45",
                // #DD717B
                borderTopLeftRadius: "1vw",
                borderTopRightRadius: "1vw",
                display: "flex",
                placeContent: "center",
                alignItems: "center",
                gap: "1.5vw",
                background: "#5585FE",
              }}
            >
              <AvatarWithLabel
                label="Current Club"
                avatarSrc={matchedClubObject[0]?.clubImage}
                clubName={matchedClubObject[0]?.clubName}
              />
              <DoubleArrow
                className={"primaryTextColor"}
                sx={{ width: 90, height: 39 }}
              />
              {/* <DoubleArrow
                className={"primaryTextColor"}
                sx={{ width: 90, height: 39 }}
              /> */}
              <TransferClubSelect
                nameOfClubSelected={extractClubNameSelected}
              />
            </div>

            <div
              style={{
                flex: ".55",
                // background: "blue",
                padding: "2vh 0",
                textAlign: "center",
                // color: "black",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h6> Contract period </h6>
              <div
                style={{
                  flex: ".3",
                  // background: "yellow",
                  gap: "2vw",
                  padding: "0 2vw",
                  display: "flex",
                }}
              >
                {/* // Start Date`` */}
                <DatePickerTool
                  style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh" }}
                  label="Start date"
                  // defaultValue={startDate}
                  dateValue={(e) => {
                    setStartDate(e.$d.toISOString());
                    // alert(e);
                    console.log(e, "start");
                  }}
                />
                {/* End Date */}
                <DatePickerTool
                  style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh" }}
                  label="End date"
                  // defaultValue={userData.DOB}
                  dateValue={(e) => {
                    setEndDate(e.$d.toISOString());
                    console.log(e, "end");
                    // alert(e);
                  }}
                />
              </div>

              {/* /// BUTOON AREA */}

              <div
                style={{
                  flex: ".7",
                  // background: "violet",
                  display: "grid",
                  placeContent: "center",
                  placeItems: "center",
                  padding: "0 2vw",
                  gap: "2vh",
                }}
              >
                <div>
                  <br />
                  <b> Disclaimer: </b> You are about to send a request to{" "}
                  <span
                    style={{
                      fontWeight: "800",
                      fontStyle: "italic",
                      textDecoration: "underline",
                    }}
                  >
                    {" "}
                    {nameOfDestinatedClub}{" "}
                  </span>{" "}
                  for a transfer of{" "}
                  <span
                    style={{
                      fontWeight: "800",
                      fontStyle: "italic",
                      textDecoration: "underline",
                    }}
                  >{`${firstName} ${surName} `}</span>
                  in Talent meet's database. Please
                  <span style={{ cursor: "pointer", color: "#5585FE" }}>
                    {" "}
                    read more{" "}
                  </span>
                  before proceeding with request to understand what that
                  entirely means.
                </div>
                <Button
                  onClick={() => {
                    handleSendTransferRequest();
                    handleClose();
                  }}
                  disabled={
                    startDate === "" ||
                    endDate === "" ||
                    nameOfDestinatedClub === "Designated club" ||
                    firstName === "" ||
                    surName === ""
                      ? true
                      : false
                  }
                  sx={{
                    background: "#5585FE",
                    borderRadius: "2vw",
                    color: "white",
                    height: "8vh",
                    width: "20vw",
                    padding: "0 2vw",
                    // marginTop: "8%",
                  }}
                  endIcon={<SwapHoriz sx={{ color: "white" }} />}
                >
                  Send transfer request
                </Button>{" "}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const AvatarWithLabel = ({ label, avatarSrc, style, clubName }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", placeContent: "center" }}
    >
      <Tooltip title={clubName}>
        <Typography variant="h5">
          {label}
          <Avatar
            sx={{ ...style, marginLeft: 4, width: 90, height: 90 }}
            src={avatarSrc}
            alt="Avatar"
          />
        </Typography>
      </Tooltip>
    </div>
  );
};
