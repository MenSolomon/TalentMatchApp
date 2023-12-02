// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";

import { Pagination } from "@mui/material";
import { selectPlayersInAgencyArray } from "../../../statemanager/slices/PlayersInAgencySlice";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";

const CoachAgentScoutVersionPlayers = () => {
  // const PlayerArray = useSelector(selectPlayersInAgencyArray);
  const allPlayersInDatabase = useSelector(selectPlayersDatabase);

  const userLoginObject = useSelector(selectUserDetailsObject);
  const playersInPossessionDetails =
    userLoginObject?.playersInPossession &&
    userLoginObject?.playersInPossession.map((player) => {
      const playerIdToMatch = player.playerId;
      // Find the player in allPlayersArray based on playerId
      const matchedPlayer = allPlayersInDatabase.find(
        (player) => player.id === playerIdToMatch
      );

      return matchedPlayer;
    });

  console.log(
    playersInPossessionDetails,
    allPlayersInDatabase,
    "PROAS",
    userLoginObject?.playersInPossession,
    userLoginObject
  );

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
        {playersInPossessionDetails === undefined ? (
          <div> No players for this club yet </div>
        ) : (
          playersInPossessionDetails?.slice(0, 9).map((data, index) => {
            const {
              firstName,
              surName,
              Age,
              position,
              Nationality,
              jerseyNumber,
              player_profile_image,
              id,
            } = data;

            // A reget to extract the position Abreviation

            var positionABR = position.match(/\((.*?)\)/);

            // Check if there are matches and get the value inside parentheses
            var result = positionABR ? positionABR[1] : null;

            return (
              <PlayerViewCardFromPlayersScreen
                key={index}
                image={player_profile_image}
                surName={surName}
                age={Age}
                position={result}
                positionToolTipInFull={position}
                jerseyNumber={jerseyNumber}
                firstName={firstName}
                nationality={Nationality}
                id={id}
              />
            );
          })
        )}
      </div>
      {/* // Pagination Area  */}

      <div style={{ flex: ".1", display: "grid", placeContent: "center" }}>
        {playersInPossessionDetails === undefined ? (
          ""
        ) : (
          <Pagination
            className="primaryTextColor"
            sx={{ color: "white" }}
            count={1}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionPlayers;
