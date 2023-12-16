import React from "react";
import PlayerStatsDoughnut from "../../../../components/Charts/Doughnut/PlayerStatsDoughnut";
import { useSelector } from "react-redux";
import { selectPlayerSelectedToView } from "../../../../statemanager/slices/PlayersInAgencySlice";

const Defense = ({ Period }) => {
  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  // Write a snapshot function that receives data updated in realtime

  const { Statistics } = PlayerSelectedToViewObject;

  const filteredSeasonStats = Statistics.find((data) => {
    return data.Season === Period;
  });

  console.log(filteredSeasonStats);

  const { Defence } = filteredSeasonStats;
  console.log(Defence);

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
      {/* Clearance: 0,
    : 0,
    : 0,
    : 0,
    : 0,
    : 0 */}
      {/* // Displaying Figures without Chart */}
      <div style={{ flex: ".4", display: "flex" }}>
        {/* Clearance */}
        <span style={{ flex: ".33" }}>
          <RawStatsDisplay value={Defence.Clearance} label="Clearances" />
        </span>
        {/* Interceptions */}
        <span style={{ flex: ".33" }}>
          <RawStatsDisplay value={Defence.Aeriel_duels} label="Aerial duels" />
        </span>
        {/* Blocks */}
        <span style={{ flex: ".33" }}>
          <RawStatsDisplay value={Defence.Duels} label="Duels" />
          {}
        </span>
      </div>
      {/* Displaying Doughnut CHart */}
      <div style={{ flex: ".6", display: "flex" }}>
        {/* Clearance */}
        <span style={{ flex: ".33", display: "grid", placeContent: "center" }}>
          <PlayerStatsDoughnut
            PercentageSuccess={Defence.Interceptions}
            Label={"Interceptions"}
          />
        </span>
        {/* Interceptions */}
        <span style={{ flex: ".33", display: "grid", placeContent: "center" }}>
          <PlayerStatsDoughnut
            PercentageSuccess={Defence.Tackles}
            Label="Tackles"
            // style={{ width: "15%", height: "4vh" }}
          />
        </span>
        {/* Blocks */}
        <span style={{ flex: ".33", display: "grid", placeContent: "center" }}>
          <PlayerStatsDoughnut
            PercentageSuccess={Defence.Blocks}
            Label="Blocks"
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
