import { Button, IconButton } from "@mui/material";
import BoxIcon from "../components/Icons/BoxIcon";
import VideoImage from "../assets/images/videoImage.svg";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../statemanager/slices/ThemeProviderSlice";
import UploadVideoModal from "../components/Modals/UploadVideosModal";

const PlayerVersionDashboard = () => {
  const ThemeProvider = useSelector(selectThemeProviderObject);

  const { primaryTextColor } = ThemeProvider;

  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[100%]  sm:flex sm:flex-col sm:w-[100%] sm:h-[100%]"
      style={
        {
          // background: "pink",
        }
      }
    >
      {/* // Heading Area */}
      <div className="md:basis-[10%] sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }} className="primaryTextColor">
          Profile dashboard
        </h3>{" "}
      </div>

      {/* // Cards  (upload video card , analytics summary card and other information card) */}
      <div className="md:basis-[90%] md:flex-row md:flex md:gap-[2.5vw]   sm:basis-[90%] sm:flex sm:flex-col sm:gap-[2.5vw] sm:overflow-y-scroll md:overflow-y-hidden">
        <div className="md:w-[30%] md:h-[100%] md:flex-shrink-0   sm:w-[100%] sm:h-[100%] sm:flex-shrink-0">
          {/* // DRAG AND DROP VIDEO CARD*/}
          <div
            className="cardBackground md:w-[100%] md:h-[96%] md:grid md:place-items-center md:relative   sm:w-[100%] sm:h-[96%] sm:grid sm:place-items-center sm:relative"
            style={{
              borderRadius: "1vw",
            }}
          >
            {/* // DASHED BORDER DIV */}
            <div
              className="md:w-[88%] md:h-[90%] md:absolute md:place-items-center md:grid   sm:w-[50%] sm:h-[90%] sm:absolute sm:place-items-center sm:grid"
              style={{
                borderRadius: ".7vw",
                border: `1px dashed ${primaryTextColor}`,
              }}
            >
              <img
                className="md:w-[200px] sm:w-[150px]"
                src={VideoImage}
                style={{ color: "red" }}
              />

              <span style={{ textAlign: "center" }}>
                Want to see metrics on your recent video? Upload and publish a
                video to get started.{" "}
              </span>
              <UploadVideoModal />
            </div>
          </div>
        </div>
        <div className="md:w-[30%] md:h-[100%] md:flex-shrink-0   sm:w-[100%] sm:h-[100%] sm:flex-shrink-0">
          {/* PROFILE ANALYTICS */}
          <div
            className="cardBackground md:w-[100%] md:h-[85%] md:flex md:flex-col md:gap-[1vh] md:pl-[2vw] md:pr-[2vw] md:pt-[3vh] md:pb-[2vh]  sm:w-[100%] sm:h-[85%] sm:flex sm:flex-col sm:gap-[1vh] sm:pl-[2vw] sm:pr-[2vw] sm:pt-[3vh] sm:pb-[2vh]"
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
          className="md:w-[30%] md:h-[100%] md:flex-shrink-0 md:flex md:flex-col md:gap-[2.4vh]   sm:w-[100%] sm:h-[100%] sm:flex-shrink-0 sm:flex sm:flex-col sm:gap-[2.4vh]"
          style={
            {
              // background: "white",
            }
          }
        >
          <div
            className="cardBackground md:basis-[50%] md:pl-[2vw] md:pr-[2vw] md:pt-[3vh] md:pb-[2vh]   sm:basis-[50%] sm:pl-[2vw] sm:pr-[2vw] sm:pt-[3vh] sm:pb-[2vh]"
            style={{
              borderRadius: "1vw",
            }}
          >
            <h5>Recent messages</h5>
          </div>
          <div
            className="cardBackground md:basis-[50%] md:pl-[2vw] md:pr-[2vw] md:pt-[3vh] md:pb-[2vh]   sm:basis-[50%] sm:pl-[2vw] sm:pr-[2vw] sm:pt-[3vh] sm:pb-[2vh]"
            style={{
              borderRadius: "1vw",
            }}
          >
            <h5>News</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerVersionDashboard;
