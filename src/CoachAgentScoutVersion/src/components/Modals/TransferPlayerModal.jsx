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
import {
  selectPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayerSelectedByClubOrScoutInPlayerManagement,
} from "../../../../statemanager/slices/PlayersInAgencySlice";
import {
  selectCurrentBrowserSize,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";
import { selectUsersDatabase } from "../../../../statemanager/slices/DatabaseSlice";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../Firebase/Firebase";
import moment from "moment";
import { v4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50vw",
  // height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1vw",
  boxShadow: 24,

  p: 0.5,
};

export default function TransferPlayerModal() {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // width: browserWidth >= 1024 ? "9vw" : "40vw",

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
  const allUsersDatabase = useSelector(selectUsersDatabase);
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

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  // const handleSendTransferRequest = async () => {
  //   try {
  //     const uuid = v4();
  //     const userRef = collection(db, `users_db`);

  //     const q = query(userRef, where("club", "==", nameOfDestinatedClub));
  //     const alldata = onSnapshot(q, (querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((doc) => {
  //         items.push(doc.data());
  //       });

  //       items.forEach((item) => {
  //         if (item.dateCreated !== "" && item.dateCreated !== null) {
  //           const firestoreTimestamp = item.dateCreated;
  //           const date = firestoreTimestamp.toDate();
  //           const options = {
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //             hour: "numeric",
  //             minute: "numeric",
  //             second: "numeric",
  //           };
  //           const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  //           const dateString = dateTimeFormat.format(date);
  //           item.dateCreated = dateString;
  //         }
  //       });

  //       if (items.length > 0) {
  //         const playerObjectInjectionRef = doc(
  //           db,
  //           `players_database`,
  //           selectedPlayerInManagementObject?.id
  //         );

  //         // alert("RECEPIENT ID" + items[0].accountId);

  //         const userToSendNotificationRef = doc(
  //           db,
  //           `users_db/${items[0].accountId}/Notifications`,
  //           uuid
  //         );

  //         const senderClub = allClubsInDatabase.filter((data) => {
  //           return data.clubName === userLoginDetailsObject.club;
  //         });

  //         updateDoc(playerObjectInjectionRef, {
  //           TransferStatus: "Transfer Listed",
  //         });

  //         setDoc(userToSendNotificationRef, {
  //           NotificationId: uuid,
  //           transferComplete: "pending",
  //           dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
  //           senderAddress: userLoginDetailsObject.email,
  //           senderId: userLoginDetailsObject.accountId,
  //           type: "Transfer request",
  //           message:
  //             userLoginDetailsObject.role === "Club"
  //               ? `Transfer request from ${userLoginDetailsObject.club} for transfer of ${firstName} ${surName} valid from ${startDate} to ${endDate}  `
  //               : "",
  //           senderProfileImage:
  //             userLoginDetailsObject.role === "Club"
  //               ? senderClub[0]?.clubImage
  //               : "",
  //           readStatus: false,
  //           transferPlayerId: selectedPlayerInManagementObject?.id,
  //         });

  //         dispatch(
  //           setSnackbarMessage(
  //             `Transfer request sent to ${nameOfDestinatedClub}`
  //           )
  //         );
  //         dispatch(setSnackbarTriggerCounter());
  //       } else {
  //         alert("The club adminstrative account hasnt been activated yet");
  //       }
  //     });
  //     return () => {
  //       alldata();
  //     };
  //   } catch (error) {
  //     alert("error with sending notification retry");
  //   }
  // };
  const handleSendTransferRequest = async () => {
    try {
      const uuid = v4();
      const userRef = collection(db, `users_db`);

      // Create a promise that resolves when onSnapshot is done
      const onSnapshotPromise = new Promise((resolve) => {
        const q = query(userRef, where("club", "==", nameOfDestinatedClub));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });

          items.forEach((item) => {
            if (item.dateCreated !== "" && item.dateCreated !== null) {
              const firestoreTimestamp = item.dateCreated;
              const date = firestoreTimestamp.toDate();
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              };
              const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
              const dateString = dateTimeFormat.format(date);
              item.dateCreated = dateString;
            }
          });

          // Resolve the promise with the items array
          // console.log("items")
          // alert(items.length);
          resolve(items);

          unsubscribe(); // Unsubscribe from the snapshot after resolving
        });
      });

      // Wait for onSnapshot to complete and get the items array
      const items = await onSnapshotPromise;

      // alert(items.length);
      console.log(items.length);

      if (items.length > 0) {
        const playerObjectInjectionRef = doc(
          db,
          `players_database`,
          selectedPlayerInManagementObject?.id
        );

        const userToSendNotificationRef = doc(
          db,
          `users_db/${items[0].accountId}/Notifications`,
          uuid
        );

        const senderClub = allClubsInDatabase.filter((data) => {
          return data.clubName === userLoginDetailsObject.club;
        });

        await updateDoc(playerObjectInjectionRef, {
          TransferStatus: "Transfer Listed",
        });

        await setDoc(userToSendNotificationRef, {
          NotificationId: uuid,
          transferComplete: "pending",
          dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
          senderAddress: userLoginDetailsObject.email,
          senderId: userLoginDetailsObject.accountId,
          type: "Transfer request",
          message:
            userLoginDetailsObject.role === "Club"
              ? `Transfer request from ${userLoginDetailsObject.club} for transfer of ${firstName} ${surName} valid from ${startDate} to ${endDate}  `
              : "",
          senderProfileImage:
            userLoginDetailsObject.role === "Club"
              ? senderClub[0]?.clubImage
              : "",
          readStatus: false,
          transferPlayerId: selectedPlayerInManagementObject?.id,
        });

        // UPDATING THE TRANSFERED PLAYER REALTIME IN REDUX .. to prevent  sender from sending transfer request to another club

        const docRef = doc(
          db,
          "players_database",
          selectedPlayerInManagementObject?.id
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          dispatch(
            setPlayerSelectedByClubOrScoutInPlayerManagement(docSnap.data())
          );
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

        dispatch(
          setSnackbarMessage(`Transfer request sent to ${nameOfDestinatedClub}`)
        );
        dispatch(setSnackbarTriggerCounter());
      } else {
        alert("The club administrative account hasn't been activated yet");
      }
    } catch (error) {
      alert("Error with sending notification, please retry" + error);
      console.error(error);
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          selectedPlayerInManagementObject?.TransferStatus === undefined
            ? handleOpen()
            : selectedPlayerInManagementObject?.TransferStatus ===
              "Transfer Listed"
            ? triggerWarningAlertModal(
                `Player transfer already sent wait till ... to try send request`
              )
            : handleOpen();
        }}
      >
        <BasicButtonWithEndIcon
          // disabled={
          //   selectedPlayerInManagementObject?.TransferStatus === undefined
          //     ? false
          //     : selectedPlayerInManagementObject?.TransferStatus ===
          //       "Transfer Listed"
          //     ? true
          //     : false
          // }
          innerText="Transfer "
          style={{
            width: browserWidth >= 1024 ? "9vw" : "40vw",
            height: "6vh",
            marginBottom: "1.5vh",
          }}
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
            className="cardBackground primaryTextColor md:w-[50%] md:h-[76vh] md:flex md:flex-col     sm:w-[100%] sm:h-[90vh] sm:flex sm:flex-col"
            style={{ ...style }}
          >
            <div
              className="cardBackground md:flex md:justify-end  sm:flex sm:justify-end"
              style={{
                flex: ".01",
              }}
            >
              <Button onClick={handleClose}>
                <Close sx={{ fontSize: "30px" }} />
              </Button>
            </div>
            <div
              className="cardBackground"
              style={{
                flex: ".44",
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
                    setStartDate(
                      e.$d.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    );
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
                    setEndDate(
                      e.$d.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    );
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
                  className="md:h-[8vh] md:w-[20vw]     sm:h-[8vh] sm:w-[60vw]"
                  sx={{
                    background: "#5585FE",
                    borderRadius: "2vw",
                    color: "white",
                    // height: "8vh",
                    // width: "20vw",
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
