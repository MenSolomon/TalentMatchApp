// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";

import { Pagination } from "@mui/material";
import { selectPlayersInAgencyArray } from "../../../statemanager/slices/PlayersInAgencySlice";

const CoachAgentScoutVersionPlayers = () => {
  const PlayerArray = useSelector(selectPlayersInAgencyArray);
  return (
    <div
      className="
    md:flex md:flex-col md:h-[100%] md:w-[100%]    sm:flex sm:flex-col sm:h-[100%] sm:w-[100%]"
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "100%",
          // width: "100%",
          // background: "red",
        }
      }
    >
      <div className="md:basis-[10%] sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }}>Players</h3>{" "}
      </div>

      <div
        className="md:flex md:flex-row md:gap-[0em] md:flex-wrap md:basis-[70%]  sm:flex sm:flex-col sm:gap-[1em] sm:basis-[70%]"
        // style={{ flex: ".8" }}
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

      <div
        className="md:basis-[10%]   sm:basis-[10%]"
        style={{ display: "grid", placeContent: "center" }}
      >
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
