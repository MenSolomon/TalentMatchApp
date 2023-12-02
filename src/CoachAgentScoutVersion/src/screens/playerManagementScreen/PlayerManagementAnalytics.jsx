import { Button } from "@mui/material";
import ProfileViewGraphThirtyDays from "../../components/Graphs/Line/ProfileViewGraphThirtyDays";
import ProfileAnalyticsCard from "../../components/Cards/ProfileAnalyticsCard";

const PlayerManagementAnalytics = () => {
  return (
    <div
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "48vh",
          // width: "100%",
          // background: "Red",
        }
      }
      className="primaryTextColor md:flex md:flex-col md:h-[48vh] md:w-[100%]     sm:flex sm:flex-col sm:h-[100vh] sm:w-[100%]"
    >
      <div
        className="md:flex md:flex-row md:gap-[1vw]  sm:gap-[7vw]   sm:flex sm:flex-col"
        style={{
          flex: ".9",

          // display: "flex",
          // gap: "1vw",
        }}
      >
        {/* REALTIME CARD AREA */}
        <div
          style={{
            flex: ".3",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileAnalyticsCard />
        </div>
        {/* VIEWS GRAPH AREA */}
        <div
          style={{
            flex: ".7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* // VIEWS GRAPH HEADER */}
          <div style={{ flex: ".12" }}>
            <h5> Your profile has 10 view in the last 30 days </h5>
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

export default PlayerManagementAnalytics;
