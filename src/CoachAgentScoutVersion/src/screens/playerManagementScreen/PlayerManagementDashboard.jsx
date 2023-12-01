import { Avatar, Button, IconButton } from "@mui/material";

import { useSelector } from "react-redux";
import VideoImage from "../../assets/images/videoImage.svg";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import UploadVideoModal from "../../../../PlayerVersion/src/components/Modals/UploadVideosModal";

const PlayerManagementDashboard = () => {
  const ThemeProvider = useSelector(selectThemeProviderObject);

  const { primaryTextColor } = ThemeProvider;

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
      className="md:w-[100%] md:h-[100%] md:flex md:flex-col       sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
      style={{
        fontSize: ".8em",
      }}
    >
      {/* // Heading Area */}
      {/* // Cards  (upload video card , analytics summary card and other information card) */}

      <div
        className="md:flex md:gap-[1.5vw] md:flex-row     sm:flex-col sm:flex sm:gap-[4.5vw]"
        style={{
          flex: ".5",
        }}
      >
        <div style={{ flex: ".33" }}>
          {/* // DRAG AND DROP VIDEO CARD*/}
          <div
            className="cardBackground md:w-[100%] md:h-[120%] md:grid md:place-items-center md:relative              sm:w-[100%] sm:h-[120%] sm:grid sm:place-items-center sm:relative"
            style={{
              borderRadius: "1vw",
            }}
          >
            {/* // DASHED BORDER DIV */}
            <div
              className="cardBackground md:w-[88%] md:h-[90%] md:grid md:place-items-center md:absolute            sm:w-[100%] sm:h-[40vh] sm:grid sm:place-items-center sm:relative"
              style={{
                borderRadius: ".7vw",
                border: `1px dashed ${primaryTextColor}`,
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
            className="cardBackground md:flex md:flex-col md:w-[100%] md:h-[120%] md:pt-[3vh] md:pr-[2vw] md:pl-[2vw] md:gap-[.5vh] md:pb-[2vh]                 sm:flex sm:flex-col sm:w-[100%] sm:h-[120%] sm:pt-[3vh] sm:pr-[2vw] sm:pl-[2vw] sm:gap-[.5vh] sm:pb-[2vh]"
            style={{
              borderRadius: "1vw",
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
              <h4>12</h4>
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
              <h6>Views</h6>
              <h6>Watch Time(hours)</h6>
            </div>
          </div>
        </div>

        {/* // LATEST NEWS AND COMMENTS */}
        <div
          className="md:flex md:flex-col md:gap-[2.4vh]        sm:flex sm:flex-col sm:gap-[2.4vh]"
          style={{
            flex: ".33",
            // display: "flex",
            // flexDirection: "column",
            // gap: "2.4vh",
          }}
        >
          <div
            className="cardBackground md:relative md:flex md:flex-col md:pb-[2vh] md:pt-[3vh] md:pr-[1vw] md:pl-[1vw]                   sm:relative sm:flex sm:flex-col sm:pb-[2vh] sm:pt-[3vh] sm:pr-[1vw] sm:pl-[1vw]"
            style={{
              // flex: ".5",
              borderRadius: "1vw",
              // paddingLeft: "1vw",
              // paddingRight: "1vw",
              // paddingTop: "3vh",
              // paddingBottom: "2vh",
              // position: "relative",
              // display: "flex",
              // flexDirection: "column",
            }}
          >
            <div style={{ flex: ".2" }}>
              <h5>Recent messages</h5>
            </div>

            <div
              className="md:max-h-[30vh]  sm:max-h-[30vh]"
              style={{
                // background: "teal",
                overflowY: "scroll",
                flex: "1",
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
      className="md:w-[17vw] md:h-[10vh]  sm:w-[100%] sm:h-[8vh]"
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
