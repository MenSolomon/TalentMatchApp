import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PlayerComparisonModal from "../../Modals/PlayerComparisonModal";

const PlayerCompareDisplayCard = ({ playerName, playerPosition }) => {
  return (
    <div
      className="primaryTextColor"
      style={{
        width: "100%",
        height: "10vh",
        display: "flex",
        borderBottom: "1px solid rgba(255, 255, 255, 0.066)",
        // alignItems: "center",
        // justifyContent: "center",
        // background: "red",
      }}
    >
      {/*ADD ICON AREA */}
      <div
        style={{
          flex: ".17",
          display: "grid",
          placeContent: "center",
        }}
      >
        <PlayerComparisonModal />
      </div>
      {/* NAME AREA */}
      <div
        style={{
          flex: ".63",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "1.5vh",
        }}
      >
        <h6> {playerName} </h6>
      </div>
      {/* POSITION AREA */}
      <div
        style={{
          flex: ".2",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "1.5vh",
        }}
      >
        <h6> {playerPosition} </h6>
      </div>
    </div>
  );
};

export default PlayerCompareDisplayCard;
