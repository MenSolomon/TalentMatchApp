import PlayerComparisonDrawer from "../components/Drawer/PlayerComparisonDrawer";

const PlayerComparison = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: ".1" }}>
        <h3> PlayerComparison </h3>
      </div>
      <div
        style={{
          flex: ".9",
          display: "flex",
          justifyContent: "center",
          gap: "8vw",
        }}
      >
        <PlayerComparisonDrawer />
        <PlayerComparisonDrawer />
      </div>
    </div>
  );
};

export default PlayerComparison;
