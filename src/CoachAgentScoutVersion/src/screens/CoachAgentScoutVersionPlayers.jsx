// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";

import { Pagination } from "@mui/material";
import { selectPlayersInAgencyArray } from "../../../statemanager/slices/PlayersInAgencySlice";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { useState } from "react";

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

  // Pagination settings
  const PlayersPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(playersInPossessionDetails.length / PlayersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getplayersInPossessionDetailsForPage = () => {
    const startIndex = (currentPage - 1) * PlayersPerPage;
    const endIndex = startIndex + PlayersPerPage;
    return playersInPossessionDetails.slice(startIndex, endIndex);
  };

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
        {playersInPossessionDetails === undefined ||
        playersInPossessionDetails?.length === 0 ? (
          <div> No players for this club yet </div>
        ) : (
          getplayersInPossessionDetailsForPage().map((data, index) => {
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
            count={getTotalPages()}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionPlayers;
