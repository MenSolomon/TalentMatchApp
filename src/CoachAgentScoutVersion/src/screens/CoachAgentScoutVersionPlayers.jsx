// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";
import { Pagination } from "@mui/material";

const CoachAgentScoutVersionPlayers = () => {
  const PlayerArray = useSelector(selectPlayersInAgencyArray);
  return (
    <div
      className="md:flex md:flex-col md:h-[100%] md:w-[100%]   
      sm:flex sm:flex-col sm:h-[100%] sm:w-[100%] 
      "
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   height: "100%",
      //   width: "100%",
      // }}
    >
      <div style={{ flex: ".1" }}>
        <h3 style={{ margin: 0, float: "left" }}>Players</h3>{" "}
      </div>

      <div
        className="md:flex md:flex-wrap md:gap-[0%] md:justify-center sm:flex  sm:flex-wrap sm:justify-center sm:gap-[15px] sm:overflow-y-scroll md:overflow-y-hidden "
        style={{ flex: ".8" }}
      >
        {PlayerArray.slice(0, 9).map((data, index) => {
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
              key={index}
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
