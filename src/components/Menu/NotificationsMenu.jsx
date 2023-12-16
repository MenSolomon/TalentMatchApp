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
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import {
  setSnackbarMessage,
  setSnackbarTriggerCounterToZero,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";

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

  // const { accountId } = userLoginDetailsObject;

  const handleUpdateReadStatus = async (dateSent, readStatus) => {
    // Let the notifications have an id (uuidV4) instead of using DateCreated as unique id

    // alert(dateSent + "in Work db" + userLoginDetailsObject.accountId);
    const LoginUserObjectRef = doc(
      db,
      `users_db/${userLoginDetailsObject.accountId}`
    );

    // const readStatusUpdateArray = userLoginDetailsObject?.Notifications.map(

    //   (data) => {
    //     // alert(`${data.dateCreated},${dateCreated} == ${readStatus}`);
    //     if (data.dateCreated === dateSent) {
    //       return { ...data, readStatus: true };
    //     }
    //     // Leave other seasons unchanged
    //     return data;
    //   }
    // );

    // const updatedNotifications = Object.keys(notifications).map(key => {
    //   const data = notifications[key];
    //   if (data.dateCreated === dateSent) {
    //     return { ...data, readStatus: true };
    //   }
    //   return data;
    // });

    alert("Trua" + userLoginDetailsObject?.accountId);
    const readStatusUpdateArray = (
      userLoginDetailsObject?.Notifications || []
    ).map((data) =>
      data.dateCreated === dateSent ? { ...data, readStatus: true } : data
    );

    console.log(readStatusUpdateArray, "axe");
    if (readStatus === false) {
      updateDoc(LoginUserObjectRef, {
        Notifications: readStatusUpdateArray,
      });

      // alert("update Successful");
    } else {
      // alert("no notifications ");
    }
  };

  const sortedNotificationsArray =
    userLoginDetailsObject?.Notifications &&
    [...userLoginDetailsObject?.Notifications].slice().sort((a, b) => {
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
            className="md:w-[35vw] md:h-[80vh] md:flex md:flex-col     
            sm:w-[100vw] sm:h-[100vh] sm:flex sm:flex-col
            "
            style={
              {
                // width: "35vw",
                // height: "80vh",
                // display: "flex",
                // flexDirection: "column",
              }
            }
          >
            {/* // Notification head and Notification type tabs  className="md:mr-[55%]  sm:mr-[90%]" */}
            <div style={{ flex: ".15" }}>
              <MenuItem sx={{ width: "35vw" }}>
                <div
                  className="md:flex md:w-[100%] md:justify-between  md:items-center  sm:flex sm:justify-between sm:w-[100%] sm:items-center"
                  style={{
                    width: "100%",
                    display: "flex",
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4 className="md:mr-[0%] sm:mr-[140%]">Notifications</h4>{" "}
                  <IconButton
                    onClick={handleClose}
                    className="md:float-right sm:float-right "
                  >
                    <Close />
                  </IconButton>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClose}>Tabs</MenuItem>
            </div>
            {/* // Menu Items */}
            <div style={{ flex: ".85", overflowY: "scroll" }}>
              {userLoginDetailsObject.Notifications === undefined ? (
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
                  } = data;

                  return (
                    <MenuItem
                      key={index}
                      sx={{ height: "15.5vh" }}
                      // onClick={() => {
                      //   handleUpdateReadStatus(dateCreated, readStatus);
                      // }}
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

    try {
      const playerObjetRef = doc(db, `players_database/${transferPlayerId}`);
      const LoginUserObjectRef = doc(
        db,
        `users_db/${userLoginDetailsObject.accountId}`
      );
      const senderObjectRef = doc(db, `users_db/${senderId}`);

      alert(senderId);
      await updateDoc(playerObjetRef, {
        clubName: userLoginDetailsObject?.club,
        jerseyNumber: "",
        TransferStatus: "",
      });

      await updateDoc(LoginUserObjectRef, {
        playersInPossession: arrayUnion({ playerId: transferPlayerId }),
      });

      await updateDoc(senderObjectRef, {
        playersInPossession: arrayRemove({ playerId: transferPlayerId }),
      });

      const playerMatchObject = allPlayersDatabase.find((obj) => {
        return obj.id === transferPlayerId;
      });

      const senderClub = allClubsInDatabase.filter((data) => {
        return data.clubName === userLoginDetailsObject.club;
      });

      await updateDoc(senderObjectRef, {
        Notifications: arrayUnion({
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
        }),
      });

      // THe sender needs to be alerted that the transfer is complete
      // /.////////

      alert("updated");
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
      alert("Error", error.message);
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
              !notificationMessage.includes("accepted") && (
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
                    style={{ maxHeight: "5vh" }}
                  />
                </>
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
