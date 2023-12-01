import { Button } from "@mui/material";
import ProfileViewGraphThirtyDays from "../components/Graphs/Line/ProfileViewGraphThirtyDays";
import ProfileAnalyticsCard from "../components/Cards/ProfileAnalyticsCard";

const PlayerVersionAnalytics = () => {
  return (
    <div
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "100%",
          // width: "100%",
        }
      }
      className="primaryTextColor md:flex md:flex-col md:w-[100%] md:h-[100%]     sm:flex sm:flex-col sm:w-[100%] sm:h-[100%]"
    >
      {/* // Heading Area */}
      <div className="md:basis-[10%]  sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }}>Profile Analytics</h3>{" "}
      </div>

      <div
        className="md:basis-[90%] md:flex md:gap-[1vw] md:flex-row    sm:basis-[90%] sm:flex  sm:flex-col sm:gap-[1vw]"
        style={
          {
            // flex: ".9",
            // display: "flex",
            // gap: "1vw",
          }
        }
      >
        {/* REALTIME CARD AREA */}
        <div
          className="md:flex md:justify-center    sm:flex sm:justify-center"
          style={{
            flex: ".3",

            // display: "flex",
            // justifyContent: "center",
          }}
        >
          <ProfileAnalyticsCard />
        </div>
        {/* VIEWS GRAPH AREA */}
        <div
          className="md:flex md:flex-col  sm:flex sm:flex-col"
          style={{
            flex: ".7",
            // display: "flex",
            // flexDirection: "column",
          }}
        >
          {/* // VIEWS GRAPH HEADER */}
          <div style={{ flex: ".12" }}>
            <h3> Your profile has 10 view in the last 30 days </h3>
          </div>

          {/* // VIEWS GRAPH CANVAS */}
          <div style={{ flex: ".7" }}>
            <ProfileViewGraphThirtyDays />
          </div>

          {/* // SEE MORE BUTTONS */}
          <div style={{ flex: ".15" }}>
            <Button> See More </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerVersionAnalytics;
