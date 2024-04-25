import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSubscriptionActive,
  selectUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import {
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../Firebase/Firebase";
import moment from "moment";
import { selectInterestedPlayers } from "../../statemanager/slices/InterestedPlayersSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "65vh",
  width: "55vw",
  bgcolor: "background.paper",
  //   border: "2px solid wheat",
  //   boxShadow: 24,
  borderRadius: "1vw",
  p: 5,
};

export default function CreateShowInterestModal({
  playerName,
  playerId,
  currentAccountOwner,
}) {
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Message, setMessage] = React.useState("");
  const [DisableButton, setDisableButton] = React.useState(false);

  const dispatch = useDispatch();

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const userLoginAccount = useSelector(selectUserDetailsObject);

  const interestedPlayersArray = useSelector(selectInterestedPlayers);
  const [isPlayerInterestPending, setIsplayerInterestPending] = React.useState(
    []
  );
  // const establishedConnections =userLoginAccount?.Connections

  const submitInterest = async () => {
    const uuid = v4();

    const interestsUuid = v4();

    // FOR PLAYER ACC HOLDER
    const userNotificationRef = doc(
      db,
      `users_db/${userLoginAccount.accountId}/Notifications`,
      uuid
    );

    /// FOR SELF
    const playerNotificationRef = doc(
      db,
      `users_db/${currentAccountOwner}/Notifications`,
      uuid
    );

    //Notification sent

    await setDoc(userNotificationRef, {
      NotificationId: uuid,
      requestAccepted: false,
      dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
      senderAddress: userLoginAccount.email,
      senderId: userLoginAccount.accountId,
      type: "Connection request",
      message: `Your interest with ${playerName} has been established`,
      readStatus: false,
    });

    await setDoc(playerNotificationRef, {
      NotificationId: uuid,
      requestAccepted: false,
      dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
      senderAddress: userLoginAccount.email,
      senderId: userLoginAccount.accountId,
      type: "Connection request",
      message: `${userLoginAccount.firstName} has shown interest in your profile. Accept to view message sent`,
      readStatus: false,
    });

    // UPDATE THE USER DOC TO PREVENT USER FROM SENDING MESSAGE AGAIN

    const userPlayerInterestRef = doc(
      db,
      `users_db/${userLoginAccount.accountId}/PlayerInterests`,
      uuid
    );

    //Notification sent

    await setDoc(userPlayerInterestRef, {
      interestedPlayerId: playerId,
      Current_Account_Owner: currentAccountOwner,
      dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
      interestStatus: "Pending",
    });

    dispatch(
      setSnackbarMessage(
        `You have succesfully established a connection with ${playerName}`
      )
    );
    dispatch(setSnackbarTriggerCounter());
  };

  React.useEffect(() => {
    const filteredPlayer =
      interestedPlayersArray &&
      interestedPlayersArray?.filter(
        (data) =>
          (data?.interestStatus === "Pending" &&
            data?.interestedPlayerId === playerId) ||
          (data?.interestStatus === "Accepted" &&
            data?.interestedPlayerId === playerId)
      );

    setIsplayerInterestPending(filteredPlayer);
  }, [interestedPlayersArray]);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {/* ========================= */}

      {isPlayerInterestPending?.length > 0 ||
      playerId === userLoginAccount?.accountId ? (
        ""
      ) : (
        <Button
          disabled={!subscriptionStatus}
          sx={{
            textTransform: "none",
            fontWeight: "900",
            marginRight: "1vw",
            color: "white",
            background: "#5585FE",
          }}
          onClick={handleOpen}>
          {" "}
          Show Interest{" "}
        </Button>
      )}

      {/* ========================= */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="primaryTextColor cardBackground">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}>
            Player Name: {playerName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            Send Request to show interest and establish connections
            {/* <TextField
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              id="outlined-multiline-static"
              label="Messages"
              rows={7}
              multiline
              //   defaultValue="Messages"
              sx={{ width: "45vw" }}
              type="text"
            /> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <Button
              onClick={() => {
                setDisableButton(true);
                submitInterest();
              }}
              disabled={DisableButton}
              sx={{
                textTransform: "none",

                fontWeight: "900",
                // marginLeft: "35vw",
                color: "white",
                background: "#5585FE",
              }}>
              Send request
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
