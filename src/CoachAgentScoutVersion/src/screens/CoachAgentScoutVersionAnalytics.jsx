import { Button } from "@mui/material";
import ProfileViewGraphThirtyDays from "../components/Graphs/Line/ProfileViewGraphThirtyDays";
import ProfileAnalyticsCard from "../components/Cards/ProfileAnalyticsCard";

const CoachAgentScoutVersionAnalytics = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
      className="primaryTextColor"
    >
      {/* // Heading Area */}
      <div style={{ flex: ".1" }}>
        <h3 style={{ margin: 0, float: "left" }}>Profile Analytics</h3>{" "}
      </div>

      <div
        style={{
          flex: ".9",

          display: "flex",
          gap: "1vw",
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

export default CoachAgentScoutVersionAnalytics;
