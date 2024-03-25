import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import { Avatar, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  arrayRemove,
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { v4 } from "uuid";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import { db } from "../../Firebase/Firebase";
import {
  setSnackbarMessage,
  setSnackbarTriggerCounterToZero,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { setPlayerSelectedByClubOrScoutInPlayerManagement } from "../../statemanager/slices/PlayersInAgencySlice";
import BasicButton from "../../components/Buttons/BasicButton";
import { selectUserNotifications } from "../../statemanager/slices/NofiticationsSlice";
import { formatDistanceToNow } from "date-fns";

const Transfers = () => {
  const dispatch = useDispatch();

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const notificationsArray = useSelector(selectUserNotifications);
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

  const TransferRequestNotifications = notificationsArray.filter((data) =>
    data.type.toLowerCase().includes("transfer")
  );

  const sortedNotificationsArray =
    TransferRequestNotifications &&
    [...TransferRequestNotifications].slice().sort((a, b) => {
      const dateA = moment(a.dateCreated, "YYYY-MM-DD HH:mm:ss");
      const dateB = moment(b.dateCreated, "YYYY-MM-DD HH:mm:ss");

      // Compare the dates in descending order
      return dateB.diff(dateA);
    });

  return (
    <div
      style={{
        color: "black",
        // background: "red",
        height: "57vh",
        overflowY: "scroll",
      }}
    >
      {/* All */}
      {/* <MenuItem
        // key={index}
        sx={{ height: "15.5vh" }}
        onClick={() => {
          // handleUpdateReadStatus(NotificationId, readStatus);
        }}
        // onClick={handleClose}
      >
        <MenuItemRow
          type={"Transfer"}
          readStatus={true}
          senderAddress={""}
          transferPlayerId={"transferPlayerId"}
          senderImage={"senderProfileImage"}
          notificationMessage={"message sending thisasa sa"}
          dateSent={"December 20, 2024"}
          senderId={"data.senderId"}
          notificationId={"NotificationId"}
          transferCompleteStatus={"transferComplete"}
        />
      </MenuItem> */}

      {sortedNotificationsArray.length <= 0 ? (
        <h5 style={{ textAlign: "center" }}>No notifications yet </h5>
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
  );
};

export default Transfers;

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
  const parsedTimestamp = new Date(dateSent);
  const relativeDate = formatDistanceToNow(parsedTimestamp, {
    addSuffix: true,
  });
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
