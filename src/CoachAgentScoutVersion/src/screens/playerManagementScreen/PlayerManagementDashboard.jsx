import { Avatar, Button, IconButton } from "@mui/material";

import { useSelector } from "react-redux";
import VideoImage from "../../assets/images/videoImage.svg";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import UploadVideoModal from "../../../../PlayerVersion/src/components/Modals/UploadVideosModal";
import { selectPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../../statemanager/slices/PlayersInAgencySlice";

const PlayerManagementDashboard = () => {
  const ThemeProvider = useSelector(selectThemeProviderObject);

  const { primaryTextColor } = ThemeProvider;

  const selectPlayer = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );

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

  return (
    <div
      className="md:flex md:flex-col md:h-[100%] md:w-[100%]    sm:flex sm:flex-col sm:h-[100%] sm:w-[100%]"
      style={{
        // display: "flex",
        // flexDirection: "column",
        // height: "100%",
        // width: "100%",
        fontSize: ".8em",
      }}
    >
      {/* // Heading Area */}

      {/* // Cards  (upload video card , analytics summary card and other information card) */}
      <div
        className="md:flex md:flex-row md:gap-[1.5vw]   sm:flex sm:flex-col sm:gap-[4.5vw]"
        style={{ flex: ".5" }}
      >
        <div style={{ flex: ".33" }}>
          {/* // DRAG AND DROP VIDEO CARD*/}
          <div
            className="cardBackground md:w-[100%] md:h-[120%] md:grid md:place-items-center md:relative       sm:w-[100%] sm:h-[120%] sm:grid sm:place-items-center sm:relative"
            style={{
              // width: "100%",
              // height: "120%",
              borderRadius: "1vw",
              // display: "grid",
              // placeItems: "center",
              // position: "relative",
            }}
          >
            {/* // DASHED BORDER DIV */}
            <div
              className="cardBackground md:w-[88%] md:h-[90%] md:grid md:place-items-center md:absolute       sm:w-[100%] sm:h-[40vh] sm:grid sm:place-items-center sm:relative"
              style={{
                // width: "88%",
                // height: "90%",
                borderRadius: ".7vw",
                border: `1px dashed ${primaryTextColor}`,
                // position: "absolute",
                // display: "grid",
                // placeItems: "center",
                // background: "red",
              }}
            >
              <img src={VideoImage} style={{ width: "150px", color: "red" }} />

              <span style={{ textAlign: "center" }}>
                Want to see metrics on your recent video? Upload and publish a
                video to get started.{" "}
              </span>
              <UploadVideoModal />
            </div>
          </div>
        </div>
        <div style={{ flex: ".33" }}>
          {/* PROFILE ANALYTICS */}
          <div
            className="cardBackground md:w-[100%] md:gap-[.5vh] md:pt-[3vh] md:pb-[2vh] md:pr-[2vw] md:pl-[2vw] md:h-[120%] md:flex md:flex-col     sm:w-[100%] sm:h-[120%] sm:flex sm:flex-col  sm:gap-[.5vh] sm:pt-[3vh] sm:pb-[2vh] sm:pr-[2vw] sm:pl-[2vw]"
            style={{
              // width: "100%",
              // height: "120%",
              borderRadius: "1vw",
              // display: "flex",
              // flexDirection: "column",
              // gap: ".5vh",
              // paddingLeft: "2vw",
              // paddingRight: "2vw",
              // paddingTop: "3vh",
              // paddingBottom: "2vh",
              // background: "green",
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

              <h6>Total profile views</h6>
              <h4>
                {selectPlayer?.views === undefined ? "0" : selectPlayer.views}
              </h4>
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
              <h6>Most viewed video</h6>
              <h6>-</h6>

              {/* <h6>Watch Time(hours)</h6>
               */}
            </div>

            {/* TOP VIDEOS SECTION */}
            {/* <div style={{ flex: ".3", paddingTop: "2vh" }}>
              <h6>Top videos</h6>
              <h6 className="secondaryTextColor">Last 48 hours</h6>
            </div>
            <div style={{ flex: ".05" }}>
              <Button>Go to profile analytics</Button>
            </div> */}
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
              // flex: ".5",
              borderRadius: "1vw",
              paddingLeft: "1vw",
              paddingRight: "1vw",
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
                flex: "1",
                maxHeight: "30vh",
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
        </div>
      </div>
    </div>
  );
};

export default PlayerManagementDashboard;

const RecentMessageCard = ({ message, userAvatar, date, userName }) => {
  return (
    <div
      className="md:w-[17vw] md:h-[10vh] md:flex    sm:w-[100%] sm:h-[8vh] sm:flex "
      style={{
        // position: "absolute",
        // width: "17vw",
        // height: "10vh",
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
