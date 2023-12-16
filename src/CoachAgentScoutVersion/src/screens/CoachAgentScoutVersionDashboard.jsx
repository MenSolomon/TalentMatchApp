import { Avatar, Button, IconButton } from "@mui/material";
import PlayerSkeletonImage from "../assets/images/PlayerSkeleton.png";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../statemanager/slices/ThemeProviderSlice";
import UploadPlayerToAgencyModal from "../components/Modals/UploadPlayerToAgencyModal";
import NewsCard from "../../../components/Cards/NewsCard/NewsCard";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";

const CoachAgentScoutVersionDashboard = () => {
  const ThemeProvider = useSelector(selectThemeProviderObject);

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

  const userLoginObject = useSelector(selectUserDetailsObject);
  const allPlayersInDatabase = useSelector(selectPlayersDatabase);

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
  const validPlayers = playersInPossessionDetails.filter(Boolean);

  // Sort the validPlayers array based on the "views" property in descending order
  const sortedPlayers = validPlayers.sort((a, b) => b.views - a.views);

  // Return the player with the highest views, if any
  const playerWithHighestViews =
    sortedPlayers.length > 0 ? sortedPlayers[0] : null;

  console.log(playerWithHighestViews, "arrayWithHeighetView");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {/* // Heading Area */}
      <div style={{ flex: ".1" }}>
        <h3 style={{ margin: 0, float: "left" }} className="primaryTextColor">
          Profile dashboard
        </h3>{" "}
        {/* <IconButton sx={{ float: "right" }}>
          {" "}
          <BoxIcon IconClassName="bxs-video-plus" />{" "}
        </IconButton> */}
      </div>

      {/* // Cards  (upload video card , analytics summary card and other information card) */}
      <div style={{ flex: ".9", display: "flex", gap: "2.5vw" }}>
        <div style={{ flex: ".33" }}>
          {/* // DRAG AND DROP VIDEO CARD*/}
          <div
            className="cardBackground"
            style={{
              width: "100%",
              height: "96%",
              borderRadius: "1vw",
              display: "grid",
              placeItems: "center",
              position: "relative",
            }}
          >
            {/* // DASHED BORDER DIV */}
            <div
              style={{
                width: "88%",
                height: "90%",
                borderRadius: ".7vw",
                border: `1px dashed ${primaryTextColor}`,
                position: "absolute",
                display: "grid",
                placeItems: "center",
              }}
            >
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
        <div style={{ flex: ".33" }}>
          {/* PROFILE ANALYTICS */}
          <div
            className="cardBackground"
            style={{
              width: "100%",
              height: "85%",
              borderRadius: "1vw",
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              paddingTop: "3vh",
              paddingBottom: "2vh",
            }}
          >
            {/* // PROFILE ANALYTICS TOTAL VIEWS */}
            <div
              style={{
                flex: ".3",
                borderBottom: `1px solid ${primaryTextColor}`,
              }}
            >
              <h5>Profile Analytics</h5>

              <h6>Total players under management</h6>
              <h4> {userLoginObject?.playersInPossession.length} </h4>
            </div>

            {/* /// SUMMARY*/}
            <div
              style={{
                flex: ".35",
                paddingTop: "2vh",
                borderBottom: `1px solid ${primaryTextColor}`,
              }}
            >
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
          style={{
            flex: ".33",
            // background: "white",
            display: "flex",
            flexDirection: "column",
            gap: "2.4vh",
          }}
        >
          <div
            className="cardBackground"
            style={{
              flex: ".5",
              borderRadius: "1vw",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              paddingTop: "3vh",
              paddingBottom: "2vh",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: ".2" }}>
              <h5>Recent messages</h5>
            </div>

            <div
              style={{
                // background: "teal",
                overflowY: "scroll",
                flex: ".8",
                maxHeight: "26vh",
              }}
            >
              {dummyRecentMessages.map((data, index) => {
                const { message, userAvatar, date, userName } = data;

                return (
                  <div key={index}>
                    <RecentMessageCard
                      message={message}
                      userAvatar={userAvatar}
                      date={date}
                      userName={userName}
                    />
                    {/* <br /> */}
                  </div>
                );
              })}
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
            }}
          >
            <h5>Latest news</h5>

            {newData.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  style={{ minWidth: "20.5vw", minHeight: "27vh" }}
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

const RecentMessageCard = ({ message, userAvatar, date, userName }) => {
  return (
    <div
      style={{
        // position: "absolute",
        width: "20vw",
        height: "10vh",
        // background: "yellow",
        display: "flex",
        padding: ".3vw",
        cursor: "pointer",
      }}
    >
      <div style={{ flex: ".22" }}>
        <Avatar src={userAvatar} sx={{ width: 50, height: 50 }} />
      </div>
      <div style={{ flex: ".78", fontSize: ".85em" }}>
        {" "}
        <div>
          {" "}
          <span style={{ fontWeight: "bolder" }}> {userName} </span>{" "}
          <span style={{ float: "right" }}>{date} </span>
        </div>
        <p>{message?.length === 20 ? `${message}...` : message}</p>{" "}
      </div>
      {/* <div style={{ flex: ".2", background: "red" }}></div> */}
    </div>
  );
};
