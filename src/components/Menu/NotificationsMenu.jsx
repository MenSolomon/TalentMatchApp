import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import NotificationBadge from "../Badges/NotificationBadge";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  selectUserDetailsObject,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import BasicButton from "../../components/Buttons/BasicButton";
import {
  arrayRemove,
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import {
  setSnackbarMessage,
  setSnackbarTriggerCounterToZero,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import { selectUserNotifications } from "../../statemanager/slices/NofiticationsSlice";
import { v4 } from "uuid";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { setPlayerSelectedByClubOrScoutInPlayerManagement } from "../../statemanager/slices/PlayersInAgencySlice";

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //   <NotificationBadge onClick={handleClick} />

  const dispatch = useDispatch();

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const notificationsArray = useSelector(selectUserNotifications);
  // const savedProfileSubCollectionRef = doc(
  //   db,
  //   `users_db/${accountId}/SavedProfiles`,
  //   uuid
  // );
  // const { accountId } = userLoginDetailsObject;

  const handleUpdateReadStatus = async (
    notificationId,
    notificationReadStatus
  ) => {
    // Let the notifications have an id (uuidV4) instead of using DateCreated as unique id

    // alert(dateSent + "in Work db" + userLoginDetailsObject.accountId);
    const userNotificationObjectRef = doc(
      db,
      `users_db/${userLoginDetailsObject.accountId}/Notifications`,
      notificationId
    );

    if (notificationReadStatus === false) {
      updateDoc(userNotificationObjectRef, {
        readStatus: true,
      });

      // alert("update Successful");
    } else {
      // alert("no notifications ");
    }
  };

  const sortedNotificationsArray =
    notificationsArray &&
    [...notificationsArray].slice().sort((a, b) => {
      const dateA = moment(a.dateCreated, "YYYY-MM-DD HH:mm:ss");
      const dateB = moment(b.dateCreated, "YYYY-MM-DD HH:mm:ss");

      // Compare the dates in descending order
      return dateB.diff(dateA);
    });

  return (
    <div>
      <div
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <NotificationBadge />
      </div>
      <div style={{ position: "absolute", right: "30vw" }}>
        <Menu
          sx={{}}
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <div
            style={{
              width: "35vw",
              height: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* // Notification head and Notification type tabs */}
            <div style={{ flex: ".15" }}>
              <MenuItem sx={{ width: "35vw" }}>
                <div style={{ width: "100%", display: "flex" }}>
                  <h4 style={{ marginRight: "55%" }}>Notifications</h4>{" "}
                  <IconButton sx={{ float: "right" }}>
                    <Close />
                  </IconButton>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClose}>Tabs</MenuItem>
            </div>
            {/* // Menu Items */}
            <div style={{ flex: ".85", overflowY: "scroll" }}>
              {notificationsArray.length <= 0 ? (
                <h5>No notifications yet </h5>
              ) : (
                sortedNotificationsArray.map((data, index) => {
                  const {
                    dateCreated,
                    senderAddress,
                    type,
                    message,
                    senderProfileImage,
                    readStatus,
                    transferPlayerId,
                    NotificationId,
                    transferComplete,
                  } = data;

                  return (
                    <MenuItem
                      key={index}
                      sx={{ height: "15.5vh" }}
                      onClick={() => {
                        handleUpdateReadStatus(NotificationId, readStatus);
                      }}
                      // onClick={handleClose}
                    >
                      <MenuItemRow
                        type={type}
                        readStatus={readStatus}
                        senderAddress={senderAddress}
                        transferPlayerId={transferPlayerId}
                        senderImage={senderProfileImage}
                        notificationMessage={message}
                        dateSent={dateCreated}
                        senderId={data.senderId}
                        notificationId={NotificationId}
                        transferCompleteStatus={transferComplete}
                      />
                    </MenuItem>
                  );
                })
              )}
            </div>
          </div>
        </Menu>
      </div>
    </div>
  );
}

const MenuItemRow = ({
  senderImage,
  notificationMessage,
  dateSent,
  type,
  readStatus,
  senderAddress,
  senderId,
  transferPlayerId,
  notificationId,
  transferCompleteStatus,
}) => {
  // const handleAcceptPlayerTransfer =async({dateCreated,userId,playerId,readStatus})=>{
  //   const playerObjectRef = doc(db, `players_database/${playerId}`);
  //   const userLoginObjectRef = doc(db, `players_database/${userId}`);

  //   await updateDoc(playerObjectRef, {
  //     TransferStatus: deleteField(),
  //   });

  //   // Remove the player from the old Club (playerSinpossesion Array from the accounts that have the player's old club name)..

  //   // Bring the player to new club ..
  //   // Edit Contract Date Values .. Edit Club Name ,

  // }
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const dispatch = useDispatch();
  const relativeDate = moment(dateSent).startOf("hour").fromNow();
  const allPlayersDatabase = useSelector(selectPlayersDatabase);
  const allClubsInDatabase = useSelector(selectClubsInDatabase);
  // moment(dateSent).startOf('hour').fromNow()

  const handleAcceptClick = async () => {
    // Update player club
    // Delelte playerId from sendrs PlayersInPossession Array
    // Add playerId to loggedIn Club's PlayersInpossession Array

    // const savedProfileSubCollectionRef = doc(
    //   db,
    //   `users_db/${accountId}/SavedProfiles`,
    //   uuid
    // );

    try {
      const uuid = v4();
      const playerObjetRef = doc(db, `players_database/${transferPlayerId}`);
      const LoginUserObjectRef = doc(
        db,
        `users_db/${userLoginDetailsObject.accountId}`
      );
      const senderObjectRef = doc(db, `users_db`, senderId);
      const senderNotificationObjectRef = doc(
        db,
        `users_db/${senderId}/Notifications`,
        uuid
      );
      const userOldNotificationMessageObjectRef = doc(
        db,
        `users_db/${userLoginDetailsObject.accountId}/Notifications`,
        notificationId
      );

      await updateDoc(LoginUserObjectRef, {
        playersInPossession: arrayUnion({ playerId: transferPlayerId }),
      });

      await updateDoc(senderObjectRef, {
        playersInPossession: arrayRemove({ playerId: transferPlayerId }),
      });

      await updateDoc(playerObjetRef, {
        clubName: userLoginDetailsObject?.club,
        jerseyNumber: "",
        TransferStatus: "",
      });

      const playerMatchObject = allPlayersDatabase.find((obj) => {
        return obj.id === transferPlayerId;
      });

      const senderClub = allClubsInDatabase.filter((data) => {
        return data.clubName === userLoginDetailsObject.club;
      });

      // update  users's notification as transfer  successful or accepted

      await updateDoc(userOldNotificationMessageObjectRef, {
        transferComplete: "accepted",
      });

      await setDoc(senderNotificationObjectRef, {
        NotificationId: uuid,
        dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
        senderAddress: userLoginDetailsObject.email,
        senderId: userLoginDetailsObject.accountId,
        type: "Transfer request",
        message:
          userLoginDetailsObject.role === "Club"
            ? `Transfer request from ${userLoginDetailsObject.club} for transfer of ${playerMatchObject?.firstName} ${playerMatchObject?.surName}  accepted`
            : "",
        senderProfileImage:
          userLoginDetailsObject.role === "Club"
            ? senderClub[0]?.clubImage
            : "",
        readStatus: false,
        transferPlayerId: transferPlayerId,
      });

      // THe sender needs to be alerted that the transfer is complete
      // /.////////

      // alert("updated");
      dispatch(setSnackbarMessage(`Player's clubName update successfully`));
      dispatch(setSnackbarTriggerCounterToZero());

      // console.log(data.dateCreated, "Date0", dateCreated);
      // const readStatusUpdateArray = userLoginDetailsObject?.Notifications.map(
      //   (data) => {
      //     // alert(`${data.dateCreated},${dateCreated} == ${readStatus}`);
      //     if (data.dateCreated === dateCreated) {
      //       return { ...data, readStatus: true };
      //     }
      //     // Leave other seasons unchanged
      //     return data;
      //   }
      // );
    } catch (error) {
      console.error(error, "NotifError");
      alert("Error", error.message);
    }
  };

  const handleDeclineClick = async () => {
    try {
      const uuid = v4();
      const playerObjetRef = doc(db, `players_database/${transferPlayerId}`);

      const senderNotificationObjectRef = doc(
        db,
        `users_db/${senderId}/Notifications`,
        uuid
      );

      const playerMatchObject = allPlayersDatabase.find((obj) => {
        return obj.id === transferPlayerId;
      });

      const senderClub = allClubsInDatabase.filter((data) => {
        return data.clubName === userLoginDetailsObject.club;
      });

      const userOldNotificationMessageObjectRef = doc(
        db,
        `users_db/${userLoginDetailsObject.accountId}/Notifications`,
        notificationId
      );

      await updateDoc(userOldNotificationMessageObjectRef, {
        transferComplete: "declined",
      });

      await updateDoc(playerObjetRef, {
        // TransferStatus: "Currently renewed contract",
        TransferStatus: "",
      });

      await setDoc(senderNotificationObjectRef, {
        NotificationId: uuid,
        dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
        senderAddress: userLoginDetailsObject.email,
        senderId: userLoginDetailsObject.accountId,
        type: "Transfer request",
        message:
          userLoginDetailsObject.role === "Club"
            ? `Transfer request from ${userLoginDetailsObject.club} for transfer of ${playerMatchObject?.firstName} ${playerMatchObject?.surName}  declined`
            : "",
        senderProfileImage:
          userLoginDetailsObject.role === "Club"
            ? senderClub[0]?.clubImage
            : "",
        readStatus: false,
        transferPlayerId: transferPlayerId,
      });

      // UPDATING THE TRANSFERED PLAYER REALTIME IN REDUX

      const docRef = doc(db, "players_database", transferPlayerId);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        fontSize: ".85em",
        // background: "red",
      }}
    >
      <div
        style={{
          flex: "0.95",
          display: "flex",
        }}
      >
        {/* UserImage */}
        <div
          style={{
            flex: "0.2",
            // background: "blue",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Avatar sx={{ width: 60, height: 60 }} src={senderImage}>
            sx
          </Avatar>
        </div>
        {/* Texts and Wordings */}
        <div
          style={{
            flex: "0.8",
            // background: "yellow",
            // Use "normal" to allow text to wrap
            display: "flex",
            flexDirection: "column",
            // overflow: "hidden", // Remove this line
          }}
        >
          {/* Notification Message */}
          <div
            style={{
              flex: "0.65",
              maxWidth: "10vw", // Adjust the maximum width as needed
              fontWeight: readStatus === false ? "bolder" : "",
            }}
          >
            {notificationMessage.substring(0, 50)} <br />
            {notificationMessage.substring(50, 99)} <br />
            {notificationMessage.substring(99, 145)}...
          </div>

          {/* Date and buttons */}
          <div
            style={{
              flex: "0.35",
              color: "grey",
              fontSize: ".95em",
              // background: "orange",
            }}
          >
            {relativeDate} &nbsp;
            {type === "Transfer request" &&
            transferCompleteStatus === "pending" ? (
              <>
                <BasicButton
                  onClick={handleAcceptClick}
                  innerText="Accept"
                  style={{
                    maxHeight: "5vh",
                    marginLeft: "1vw",
                    marginRight: ".4vw",
                  }}
                />

                <BasicButton
                  innerText="Decline"
                  onClick={handleDeclineClick}
                  style={{ maxHeight: "5vh" }}
                />
              </>
            ) : (
              <b> {transferCompleteStatus}</b>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: "0.05",
          display: "grid",
          placeContent: "center",
        }}
      >
        {readStatus === false ? (
          <div
            style={{
              width: "5px",
              height: "5px",
              background: "blue",
              borderRadius: "50%",
            }}
          >
            {" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
