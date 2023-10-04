import React from "react";
import PlayerStatsDoughnut from "../../../../components/Charts/Doughnut/PlayerStatsDoughnut";

const Defense = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // background: "yellow",
        width: "100%",
        height: "100%",
        paddingLeft: "5vw",
        paddingRight: "5vw",
      }}
    >
      {/* // Displaying Figures without Chart */}
      <div style={{ flex: ".4", display: "flex" }}>
        {/* Clearance */}
        <span style={{ flex: ".33" }}>
          <RawStatsDisplay value="0" label="Clearances" />
        </span>
        {/* Interceptions */}
        <span style={{ flex: ".33" }}>
          <RawStatsDisplay value="0" label="Interceptions" />
        </span>
        {/* Blocks */}
        <span style={{ flex: ".33" }}>
          <RawStatsDisplay value="0" label="Blocks" />
          {}
        </span>
      </div>
      {/* Displaying Doughnut CHart */}
      <div style={{ flex: ".6", display: "flex" }}>
        {/* Clearance */}
        <span style={{ flex: ".33", display: "grid", placeContent: "center" }}>
          <PlayerStatsDoughnut Percentage2ValuesArray={[90, 10]} />
        </span>
        {/* Interceptions */}
        <span style={{ flex: ".33", display: "grid", placeContent: "center" }}>
          <PlayerStatsDoughnut
            Percentage2ValuesArray={[100]}
            // style={{ width: "15%", height: "4vh" }}
          />
        </span>
        {/* Blocks */}
        <span style={{ flex: ".33", display: "grid", placeContent: "center" }}>
          <PlayerStatsDoughnut
            Percentage2ValuesArray={[50, 10]}
            // style={{ width: "15%", height: "4vh" }}
          />

          {}
        </span>
      </div>
    </div>
  );
};

export default Defense;

const RawStatsDisplay = ({ value, label }) => {
  const hTagStyle = {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
  };
  return (
    <>
      <h2
        className="primaryColor"
        style={{ ...hTagStyle, textAlign: "center" }}
      >
        {value}
      </h2>{" "}
      <h6 className="primaryColor" style={{ textAlign: "center" }}>
        {label}
      </h6>{" "}
    </>
  );
};
