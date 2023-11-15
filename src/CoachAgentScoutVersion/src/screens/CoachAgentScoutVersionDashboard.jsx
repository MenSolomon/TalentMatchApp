import { Button, IconButton } from "@mui/material";
import PlayerSkeletonImage from "../assets/images/PlayerSkeleton.png";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../statemanager/slices/ThemeProviderSlice";
import UploadPlayerToAgencyModal from "../components/Modals/UploadPlayerToAgencyModal";

const CoachAgentScoutVersionDashboard = () => {
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
                Want to add a player to your talent meets's databse? Create new
                player profile and groom player with to become the next big name
                in football
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
              <h6>Most viewed player</h6>
              <h6 className="secondaryTextColor"> Ishak Shaibu </h6>
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
            }}
          >
            <h5>Recent messages</h5>
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
            <h5>News</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionDashboard;
