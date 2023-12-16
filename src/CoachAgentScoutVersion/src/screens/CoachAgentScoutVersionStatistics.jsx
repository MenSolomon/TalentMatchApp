import StatisticsScreenTab from "../components/Tabs/StatisticsScreenTab";

const CoachAgentScoutVersionStatistics = () => {
  const StatisticsTabItemsArray = ["Overview", "History"];

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
        <h3 style={{ margin: 0, float: "left" }}>Profile Statistics</h3>{" "}
      </div>
      {/* Video DISPLAY AREA */}
      <div
        style={{
          flex: ".9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StatisticsScreenTab
          StatisticsTabItemsArray={StatisticsTabItemsArray}
        />
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionStatistics;
