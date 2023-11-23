// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";

import { Pagination } from "@mui/material";
import { selectPlayersInAgencyArray } from "../../../statemanager/slices/PlayersInAgencySlice";

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
        {PlayerArray.slice(0, 9).map((data, index) => {
          const {
            firstName,
            surName,
            Age,
            position,
            Nationality,
            jerseyNumber,
            image,
            id,
          } = data;

          return (
            <PlayerViewCardFromPlayersScreen
              key={index}
              image={image}
              surName={surName}
              age={Age}
              position={position}
              jerseyNumber={jerseyNumber}
              firstName={firstName}
              nationality={Nationality}
              id={id}
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
