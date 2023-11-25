import { Button } from "@mui/material";
import ProfileViewGraphThirtyDays from "../components/Graphs/Line/ProfileViewGraphThirtyDays";
import ProfileAnalyticsCard from "../components/Cards/ProfileAnalyticsCard";

const CoachAgentScoutVersionAnalytics = () => {
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
      className="primaryTextColor md:flex md:flex-col md:h-[100%] md:w-[100%]  sm:flex sm:flex-col sm:h-[100%] sm:w-[100%]"
    >
      {/* // Heading Area */}
      <div className="md:basis-[10%]  sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }}>Profile Analytics</h3>{" "}
      </div>

      <div
        className="md:basis-[90%] md:flex md:flex-row md:gap-[1vw]  sm:basis-[90%] sm:flex sm:flex-col sm:gap-[1vw]"
        style={{
          overflowY: "scroll",
          // flex: ".9",
          // display: "flex",
          // gap: "1vw",
          // flexDirection:""
        }}
      >
        {/* REALTIME CARD AREA */}
        <div className="md:basis-[30%] md:flex md:w-[0%]md:justify-center  sm:basis-[30%] sm:flex  sm:justify-center">
          <ProfileAnalyticsCard />
        </div>
        {/* VIEWS GRAPH AREA */}
        <div className="md:basis-[70%] md:flex md:flex-col  sm:basis-[70%] sm:flex sm:flex-col">
          {/* // VIEWS GRAPH HEADER */}
          <div style={{ flex: ".12" }}>
            <h3> Your profile has 10 view in the last 30 days </h3>
          </div>

          {/* // VIEWS GRAPH CANVAS */}
          <div className="md:w-[100%] sm:w-[80%]" style={{ flex: ".7" }}>
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

export default CoachAgentScoutVersionAnalytics;
