// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";
import { Pagination } from "@mui/material";

const CoachAgentScoutVersionPlayers = () => {
  const PlayerArray = useSelector(selectPlayersInAgencyArray);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: ".1" }}>
        <h3 style={{ margin: 0, float: "left" }}>Players</h3>{" "}
      </div>

      <div style={{ flex: ".8", flexWrap: "wrap", display: "flex" }}>
        {PlayerArray.map((data) => {
          const {
            firstName,
            surName,
            Age,
            position,
            Nationality,
            jerseyNumber,
            image,
          } = data;

          return (
            <PlayerViewCardFromPlayersScreen
              image={image}
              surName={surName}
              age={Age}
              position={position}
              jerseyNumber={jerseyNumber}
              firstName={firstName}
              nationality={Nationality}
            />
          );
        })}
      </div>
      {/* // Pagination Area  */}

      <div style={{ flex: ".1", display: "grid", placeContent: "center" }}>
        {" "}
        <Pagination
          className="primaryTextColor"
          sx={{ color: "white" }}
          count={1}
          color="primary"
        />{" "}
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionPlayers;
