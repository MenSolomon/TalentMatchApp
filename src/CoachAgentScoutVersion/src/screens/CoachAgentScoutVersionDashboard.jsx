import { Avatar, Button, Chip, Stack, Switch } from "@mui/material";
import PlayerSkeletonImage from "../assets/images/PlayerSkeleton.png";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeProviderObject } from "../statemanager/slices/ThemeProviderSlice";
import UploadPlayerToAgencyModal from "../components/Modals/UploadPlayerToAgencyModal";
import NewsCard from "../../../components/Cards/NewsCard/NewsCard";
import {
  selectIsSubscriptionActive,
  selectSubscriptionFeatures,
  selectUserDetailsObject,
} from "../../../statemanager/slices/LoginUserDataSlice";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";
import { useEffect, useState } from "react";
import {
  setContactSelectedForMessaging,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../statemanager/slices/OtherComponentStatesSlice";
import { auth, db } from "../../../Firebase/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const CoachAgentScoutVersionDashboard = () => {
  const ThemeProvider = useSelector(selectThemeProviderObject);
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const { boostPoints } = userLoginDetailsObject;
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);

  const navigate = useNavigate();

  const [latestMessages, setLatestMessages] = useState([]);

  const { primaryTextColor } = ThemeProvider;

  const newData = [
    {
      title:
        "India vs Kuwait: Chhetri and co. aim to regain form in tricky World Cup qualifier",
      url: "https://www.espn.in/football/story/_/id/38902184/india-vs-kuwait-preview-sunil-chhetri-igor-stimac-regain-form-tricky-fifa-world-cup-qualifier",
      img: "https://a.espncdn.com/photo/2023/1115/r1253445_1296x729_16-9.jpg",
    },
  ];

  const dummyRecentMessages = [
    {
      message: "Sample message for display",
      userAvatar: "/richard attah.jpeg",
      date: "10:02 AM",
      userName: "Richard Attah",
    },
    {
      message: "Sample message for display",
      userAvatar: "/bature.jpg",
      date: "11/21/2023",
      userName: "Benjamin Bature",
    },
    {
      message: "Sample message for display",
      userAvatar: "/OlderPlayer.jpg",
      date: "Yesterday",
      userName: "Ishak Shaibu",
    },
    {
      message: "Sample message for display",
      userAvatar: "/acheampong.webp",
      date: "3:25 PM",
      userName: "Amos Acheampong",
    },
  ];

  const compareDates = (a, b) => {
    const dateA = new Date(a.dateSent);
    const dateB = new Date(b.dateSent);
    return dateB - dateA;
  };

  // Sorting the array
  useEffect(() => {
    // const fetchData = async () => {
    //   const items = [];

    //   if (userLoginDetailsObject && userLoginDetailsObject.Connections) {
    //     for (const connection of userLoginDetailsObject.Connections) {
    //       const querySnapshot = await getDocs(
    //         collection(
    //           db,
    //           `Chats/${userLoginDetailsObject.accountId}/Contacts/Messages/${connection}`
    //         )
    //       );
    //       querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         items.push(doc.data());
    //       });
    //     }
    //     // Do something with the fetched data
    //     console.log(items, "AllChatMessages");
    //   }

    //   const usersItems = []; // Array to store documents

    //   try {
    //     const videosQuery = query(
    //       collection(db, `users_db`),
    //       where("accountId", "in", userLoginDetailsObject.Connections)
    //     );

    //     const videosSnapshot = await getDocs(videosQuery);

    //     videosSnapshot.forEach((doc) => {
    //       usersItems.push(doc.data());
    //     });

    //     // Now items array contains all the documents
    //     console.log(usersItems);
    //     // setConnections(items);
    //   } catch (error) {
    //     console.log("Error getting documents: ", error);
    //   }

    // };
    const fetchData = async () => {
      const items = []; // Array to store messages
      const usersItems = []; // Array to store user profiles
      const agentConnections =
        userLoginDetailsObject?.AgentandScoutConnections === undefined
          ? []
          : userLoginDetailsObject?.AgentandScoutConnections;
      const playerConnections =
        userLoginDetailsObject?.Connections === undefined
          ? []
          : userLoginDetailsObject?.Connections;

      const allScoutsandAgentsConnections = [
        ...playerConnections,
        ...agentConnections,
      ];
      if (userLoginDetailsObject && allScoutsandAgentsConnections) {
        // Fetch messages for each connection
        // *********** Retrieving all messages *********
        for (const connection of allScoutsandAgentsConnections) {
          const querySnapshot = await getDocs(
            collection(
              db,
              `Chats/${userLoginDetailsObject.accountId}/Contacts/Messages/${connection}`
            )
          );
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            items.push(doc.data());
          });
        }

        // Retrieve all data of user docs in the  connections  ***************
        try {
          const senderIds = items.map((message) => message.senderId);
          const usersQuery = query(
            collection(db, `users_db`),
            where("accountId", "in", senderIds)
          );
          const usersSnapshot = await getDocs(usersQuery);
          usersSnapshot.forEach((doc) => {
            usersItems.push(doc.data());
          });

          // Adding profileImage to filtered messages ***************
          items.forEach((message) => {
            const sender = usersItems.find(
              (user) => user.accountId === message.senderId
            );
            if (sender) {
              message.profileImage = sender.profileImage;
            }
          });

          /// Getting the latest message of each connection *************
          const groupedMessages = {};
          items.forEach((message) => {
            if (
              !(message.senderId in groupedMessages) ||
              new Date(message.dateSent) >
                new Date(groupedMessages[message.senderId].dateSent)
            ) {
              groupedMessages[message.senderId] = message;
            }
          });

          // Convert groupedMessages object to array
          const latestMessagesTempDB = Object.values(groupedMessages);

          setLatestMessages(
            latestMessagesTempDB
              .filter(
                (data) => data.senderId !== userLoginDetailsObject.accountId
              )
              .sort(compareDates)
          );

          // Do something with the latest messages
          console.log(latestMessagesTempDB, "latestMessage");
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
      }
    };

    fetchData();
  }, [userLoginDetailsObject]);

  const userLoginObject = useSelector(selectUserDetailsObject);
  const { accountId } = userLoginObject;
  const subscriptionFeaturesObject = useSelector(selectSubscriptionFeatures);
  // state to hold maximum number of profiles
  const { maxPlayersInAgency } = subscriptionFeaturesObject;
  const allPlayersInDatabase = useSelector(selectPlayersDatabase);
  const dispatch = useDispatch();
  // state to manage ability to set visibility
  const { canHideVisibility } = subscriptionFeaturesObject;
  // triggerWarningAlertModal
  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };
  // function to set profile visibility
  const handleVisibility = async (event) => {
    if (canHideVisibility == true) {
      // setIsVisible(event.target.checked);
      if (event.target.checked === true) {
        const canHideVisibilityRef = doc(db, `users_db`, accountId);
        await updateDoc(canHideVisibilityRef, {
          isVisible: true,
        });
        fetchIsVisibleFn();
      } else if (event.target.checked === false) {
        const canHideVisibilityRef = doc(db, `users_db`, accountId);
        await updateDoc(canHideVisibilityRef, {
          isVisible: false,
        });
        fetchIsVisibleFn();
      }
    } else if (canHideVisibility == false) {
      triggerWarningAlertModal(
        "Upgrade subscription to change profile visibility"
      );
    }
  };

  // usequery to get isVisible value

  const fetchIsVisible = async () => {
    const canHideVisibilityRef = doc(db, `users_db`, accountId);
    const canHideVisibilitySnap = await getDoc(canHideVisibilityRef);
    // console.log(canHideVisibilitySnap.data().isVisible);
    return canHideVisibilitySnap.exists()
      ? canHideVisibilitySnap.data().isVisible
      : [];
  };

  const {
    status,
    data: canHideVisibilityValue,
    error,
    refetch: fetchIsVisibleFn,
  } = useQuery({ queryKey: ["fetchIsVisible"], queryFn: fetchIsVisible });

  const playersInPossessionDetails =
    userLoginObject?.playersInPossession &&
    userLoginObject?.playersInPossession.map((player) => {
      const playerIdToMatch = player.playerId;
      // Find the player in allPlayersArray based on playerId
      const matchedPlayer = allPlayersInDatabase.find(
        (databasePlayer) => databasePlayer.id === playerIdToMatch
      );

      return matchedPlayer;
    });

  // Filter out undefined or null values from the array
  console.log(playersInPossessionDetails, "debut");
  const validPlayers =
    playersInPossessionDetails === undefined
      ? []
      : playersInPossessionDetails.filter(Boolean);

  // Sort the validPlayers array based on the "views" property in descending order
  const sortedPlayers = validPlayers.sort((a, b) => b.views - a.views);

  // Return the player with the highest views, if any
  const playerWithHighestViews =
    sortedPlayers.length > 0 ? sortedPlayers[0] : null;

  // console.log(playerWithHighestViews, "arrayWithHeighetView");

  return (
    <div
      className="md:flex md:flex-col md:h-[100%] md:w-[100%] sm:flex sm:flex-col sm:h-[100%] sm:w-[100%]"
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "100%",
          // width: "100%",
        }
      }>
      {/* // Heading Area   style={{ flex: ".1" }}*/}
      <div className="md:basis-[10%] sm:basis-[10%] grid md:grid-cols-2 sm:grid-cols-2">
        <h3 style={{ margin: 0, float: "left" }} className="primaryTextColor">
          Profile dashboard
          <Stack direction="row" spacing={1}>
            <Chip
              label={`${
                boostPoints == undefined ? 0 : boostPoints
              } Boost Points`}
              color="primary"
              variant="contained"
            />
            <Chip
              label="Buy Points"
              color="success"
              variant="contained"
              onClick={() => {
                if (subscriptionStatus == true) {
                  navigate("/buyBoostPoints");
                } else {
                  triggerWarningAlertModal("You need an active subscription");
                }
              }}
            />
          </Stack>
        </h3>
        <div className="flex justify-self-end">
          <Switch
            checked={canHideVisibilityValue}
            onChange={handleVisibility}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Chip
            variant="contained"
            label={canHideVisibilityValue ? "Visible" : "Hidden"}
            color={canHideVisibilityValue ? "success" : "error"}
          />
        </div>
      </div>

      {/* // Cards  (upload video card , analytics summary card and other information card) */}
      <div className="md:basis-[90%] md:flex-row md:flex md:gap-[2.5vw]     sm:basis-[90%] sm:flex-col sm:flex sm:gap-[2.5vw]">
        {maxPlayersInAgency > 0 ? (
          <div style={{ flex: ".33" }}>
            {/* // DRAG AND DROP VIDEO CARD*/}
            <div
              className="cardBackground md:w-[100%] md:h-[85%] md:grid md:place-items-center md:relative    sm:w-[100%] sm:h-[50vh] sm:grid sm:place-items-center sm:relative"
              style={{
                // width: "100%",
                // height: "96%",
                borderRadius: "1vw",
                // display: "grid",
                // placeItems: "center",
                // position: "relative",
              }}>
              {/* // DASHED BORDER DIV */}
              <div
                className="cardBackground md:w-[88%] md:h-[90%] md:grid md:place-items-center md:absolute     sm:w-[88%] sm:h-[90%] sm:grid sm:place-items-center sm:relative"
                style={{
                  // width: "88%",
                  // height: "90%",
                  borderRadius: ".7vw",
                  border: `1px dashed ${primaryTextColor}`,
                  // position: "absolute",
                  // display: "grid",
                  // placeItems: "center",
                }}>
                <img
                  src={PlayerSkeletonImage}
                  style={{ width: "200px", color: "red" }}
                />
                <span style={{ textAlign: "center" }}>
                  Want to add a player to talent meet's database? Create new
                  player profile and groom player to become the next big name in
                  football
                </span>
                <UploadPlayerToAgencyModal />
              </div>
            </div>
          </div>
        ) : null}
        <div style={{ flex: ".33" }}>
          {/* PROFILE ANALYTICS */}
          <div
            className="cardBackground md:h-[85%] md:w-[100%] md:flex-col md:flex    sm:h-[50vh] sm:w-[100%] sm:flex-col sm:flex"
            style={{
              // width: "100%",
              // height: "85%",
              borderRadius: "1vw",
              // display: "flex",
              // flexDirection: "column",
              gap: "1vh",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              paddingTop: "3vh",
              paddingBottom: "2vh",
            }}>
            {/* // PROFILE ANALYTICS TOTAL VIEWS */}
            <div
              style={{
                flex: ".3",
                borderBottom: `1px solid ${primaryTextColor}`,
              }}>
              <h5>Profile Analytics</h5>

              <h6>Total players under management</h6>
              <h4>
                {" "}
                {userLoginObject?.playersInPossession === undefined
                  ? "0"
                  : userLoginObject?.playersInPossession.length}{" "}
              </h4>
            </div>

            {/* /// SUMMARY*/}
            <div
              style={{
                flex: ".35",
                paddingTop: "2vh",
                borderBottom: `1px solid ${primaryTextColor}`,
              }}>
              <h6>Summary</h6>
              <h6 className="secondaryTextColor">Last 28 days</h6>
              <h6>Most viewed player</h6>
              <h6 className="secondaryTextColor">
                {" "}
                {playerWithHighestViews &&
                  `${playerWithHighestViews?.firstName} ${playerWithHighestViews?.surName}`}{" "}
              </h6>
            </div>

            {/* TOP VIDEOS SECTION */}
            <div style={{ flex: ".3", paddingTop: "2vh" }}>
              <h6>Top videos</h6>
              <h6 className="secondaryTextColor">Last 48 hours</h6>
            </div>
            <div style={{ flex: ".05" }}>
              <Button>Go to profile analytics</Button>
            </div>
          </div>
        </div>

        {/* // LATEST NEWS AND COMMENTS */}
        <div
          className="md:flex md:flex-col md:gap-[2vh]     sm:flex sm:flex-col sm:gap-[2.4vh]"
          style={{
            flex: ".33",
            // background: "white",
            // display: "flex",
            // flexDirection: "column",
            // gap: "2.4vh",
          }}>
          <div
            className="cardBackground md:basis-[50%] md:relative md:flex-col md:flex   sm:basis-[50%] sm:relative sm:flex-col sm:flex"
            style={{
              // flex: ".5",
              borderRadius: "1vw",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              paddingTop: "3vh",
              paddingBottom: "2vh",
              // position: "relative",
              // display: "flex",
              // flexDirection: "column",
            }}>
            <div style={{ flex: ".2" }}>
              <h5>Recent messages</h5>
            </div>

            <div
              style={{
                // background: "teal",
                overflowY: "scroll",
                flex: ".8",
                maxHeight: "26vh",
              }}>
              {latestMessages.length === 0 ? (
                <span>No messages yet</span>
              ) : (
                latestMessages.map((data, index) => {
                  const {
                    message,
                    senderId,
                    senderName,
                    profileImage,
                    dateSent,
                  } = data;

                  return (
                    <div key={index}>
                      <RecentMessageCard
                        message={message}
                        userAvatar={profileImage}
                        date={dateSent}
                        userName={senderName}
                        accountId={senderId}
                      />
                      {/* <br /> */}
                    </div>
                  );
                })
              )}
              <br />
            </div>
          </div>
          <div
            className="cardBackground"
            style={{
              flex: ".5",

              borderRadius: "1vw",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              paddingTop: "3vh",
              paddingBottom: "2vh",
            }}>
            <h5>Latest news</h5>

            {newData.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  style={{ minWidth: "20.1vw", minHeight: "24vh" }}
                  // style={{ minWidth: "20.5vw", minHeight: "27vh" }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionDashboard;

const RecentMessageCard = ({
  message,
  userAvatar,
  date,
  userName,
  accountId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMessageUserSelect = () => {
    // alert(accountId, " for messaging");
    dispatch(
      setContactSelectedForMessaging({
        contactId: accountId,
        name: userName,
        profileImage: userAvatar,
      })
    );

    navigate("/multiStudio/messages");
  };

  const parsedTimestamp = new Date(date);
  const formattedRelativeTime = formatDistanceToNow(parsedTimestamp, {
    addSuffix: true,
  });

  return (
    <div
      className="md:20vw md:h-[10vh]  sm:20vw sm:h-[10vh]"
      style={{
        // position: "absolute",
        // width: "20vw",
        // height: "10vh",
        // background: "yellow",
        display: "flex",
        padding: ".3vw",
        cursor: "pointer",
      }}
      onClick={handleMessageUserSelect}>
      <div style={{ flex: ".22" }}>
        <Avatar src={userAvatar} sx={{ width: 50, height: 50 }} />
      </div>
      <div style={{ flex: ".78", fontSize: ".85em" }}>
        {" "}
        <div>
          {" "}
          <span style={{ fontWeight: "bolder" }}> {userName} </span>{" "}
          <span style={{ float: "right", fontSize: ".7em" }}>
            {formattedRelativeTime}{" "}
          </span>
        </div>
        <p>{message?.length === 20 ? `${message}...` : message}</p>{" "}
      </div>
      {/* <div style={{ flex: ".2", background: "red" }}></div> */}
    </div>
  );
};
