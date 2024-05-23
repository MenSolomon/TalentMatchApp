import { Avatar, Card, Chip, Stack } from "@mui/material";
import { selectInterestedConnections } from "../../../../statemanager/slices/InterestedConnectionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { selectUserNotifications } from "../../../../statemanager/slices/NofiticationsSlice";

const ScoutsDisplayCard = ({
  backgroundUrl,
  playerImageUrl,
  UserName,
  AgencyName,
  // style,
  handleConnect,
  handleDelete,
  deleteBtnVisible,
  AccountId,
}) => {
  const [DisableButton, setDisableButton] = useState(false);

  const userLoginAccount = useSelector(selectUserDetailsObject);

  const InterestedConnectionsArray = useSelector(selectInterestedConnections);
  const NotificationArray = useSelector(selectUserNotifications);
  const [isConnectionInterestPending, setisConnectionInterestPending] =
    useState([]);
  useEffect(() => {
    const filteredPlayer =
      InterestedConnectionsArray &&
      InterestedConnectionsArray?.filter(
        (data) =>
          (data?.interestStatus === "Pending" &&
            data?.interestedConnectionAccountId === AccountId) ||
          (data?.interestStatus === "Accepted" &&
            data?.interestedConnectionAccountId === AccountId)
      );

    const filteredNotificationToShowUserHasSentRequest =
      NotificationArray.filter(
        (data) =>
          data?.senderId === AccountId &&
          (data?.requestAccepted === "Pending" ||
            data?.requestAccepted === "Accepted") &&
          data?.type === "Connection request"
      );

    setisConnectionInterestPending([
      ...filteredPlayer,
      ...filteredNotificationToShowUserHasSentRequest,
    ]);
  }, [InterestedConnectionsArray, NotificationArray]);

  return (
    <Card
      className="playerCard primaryTextColor md:mb-[3vh] md:p-[0px] md:flex md:flex-col md:w-[100%] md:h-[18vh]  sm:flex sm:flex-col sm:w-[100%] sm:p-[10px] sm:h-[18vh] sm:mb-[3vh]  
      tb:flex tb:flex-col tb:w-[100%] tb:h-[18vh] tb:p-[15px]
      lg:flex lg:flex-col lg:w-[25vw] lg:h-[18vh] lg:p-[0px]
      "
      style={{
        // ...style,
        // display: "flex",
        // flexDirection: "column",
        // width: "20vw",
        // height: "23vh",
        borderRadius: "1vw",
        // background: "red",
        // marginBottom: "3vh",
        padding: 10,
      }}
    >
      {/* <div
        style={{
          flex: ".5",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          //   paddingLeft: ".5vw",
          //   paddingRight: ".5w",
        }}></div> */}
      <div
        className="md:flex md:basis-[100%] md:justify-center md:items-center md:gap-[.3vw]     sm:flex sm:basis-[100%] sm:justify-center sm:items-center sm:gap-[.3vw]"
        style={{
          // flex: "1",
          // justifyContent: "center",
          // alignItems: "center",
          paddingLeft: ".5vw",
          paddingRight: ".5vw",
          // gap: ".3vw",
        }}
      >
        {/* AVATAR */}
        <div style={{ flex: ".2" }}>
          <Avatar
            style={{ width: 65, height: 65 }}
            // className="md:text-[10.3]"
            src={playerImageUrl}
          ></Avatar>
        </div>
        {/* NAME AND AGENCY OR CLUB NAME */}
        <div style={{ flex: ".5" }}>
          <h5
            className="tb:text-[1em] md:text-[1em] sm:text-[1em]"
            style={{ marginBottom: ".7vh" }}
          >
            {UserName}
          </h5>
          <h6 className="tb:text-[1em] md:text-[1em] sm:text-[1em]">
            {AgencyName}
          </h6>
        </div>
        {/* SIGN UP CHIP */}
        <div style={{ flex: ".3" }}>
          {isConnectionInterestPending?.length > 0 ||
          AccountId === userLoginAccount?.accountId ? (
            ""
          ) : (
            <Stack direction="row" spacing={1}>
              <Chip
                sx={{ cursor: "pointer", fontSize: 20 }}
                label="Connect"
                color="primary"
                onClick={() => {
                  setDisableButton(true);
                  handleConnect();
                }}
                disabled={DisableButton}
              />
              {deleteBtnVisible && (
                <Chip
                  sx={{ cursor: "pointer", fontSize: 20 }}
                  color="error"
                  label="Delete"
                  onClick={handleDelete}
                />
              )}
            </Stack>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ScoutsDisplayCard;
