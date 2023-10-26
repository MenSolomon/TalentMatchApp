import { Button, IconButton } from "@mui/material";

import { useSelector } from "react-redux";
import VideoImage from "../../assets/images/videoImage.svg";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import UploadVideoModal from "../../components/Modals/UploadVideosModal";
import BoxIcon from "../../components/Icons/BoxIcon";

const PlayerManagementDashboard = () => {
  const ThemeProvider = useSelector(selectThemeProviderObject);

  const { primaryTextColor } = ThemeProvider;

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

      {/* // Cards  (upload video card , analytics summary card and other information card) */}
      <div style={{ flex: ".5", display: "flex", gap: "2.5vw" }}>
        <div style={{ flex: ".33" }}>
          {/* // DRAG AND DROP VIDEO CARD*/}
          <div
            className="cardBackground"
            style={{
              width: "100%",
              height: "120%",
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
            className="cardBackground"
            style={{
              width: "100%",
              height: "120%",
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
              flex: "1",

              borderRadius: "1vw",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              paddingTop: "3vh",
              paddingBottom: "2vh",
            }}
          >
            <h5>Recent messages</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerManagementDashboard;
