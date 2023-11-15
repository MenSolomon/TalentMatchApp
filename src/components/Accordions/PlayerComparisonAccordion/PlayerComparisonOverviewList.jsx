import { Divider } from "@mui/material";

function PlayerComparisonOverviewList({ names, numbers }) {
  return (
    <div
      className="primaryTextColor cardBackground"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>{names}</div>
      <div>{numbers}</div>
    </div>
  );
}

export default PlayerComparisonOverviewList;
