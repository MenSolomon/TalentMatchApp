// import image from "../assets/images/avatar.jpg"

import { useSelector } from "react-redux";
import PlayerViewCardFromPlayersScreen from "../components/Cards/PlayerViewCardFromPlayersScreen";

import { Pagination } from "@mui/material";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { useState } from "react";
import { selectCurrentBrowserSize } from "../../../statemanager/slices/OtherComponentStatesSlice";

const CoachAgentScoutVersionPlayers = () => {
  // const PlayerArray = useSelector(selectPlayersInAgencyArray);
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

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

  // console.log(
  //   playersInPossessionDetails,
  //   allPlayersInDatabase,
  //   "PROAS",
  //   userLoginObject?.playersInPossession,
  //   userLoginObject
  // );

  // Pagination settings
  const PlayersPerPage = browserWidth <= 1024 ? 4 : 9;

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
      className="
    md:flex md:flex-col md:h-[100%] md:w-[100%]    sm:flex sm:flex-col sm:h-[100%] sm:w-[100%]"
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "100%",
          // width: "100%",
        }
      }>
      <div className="md:basis-[10%] sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }}>Players</h3>{" "}
      </div>

      <div className="md:flex md:flex-row md:gap-[0em] md:flex-wrap md:basis-[70%]  sm:flex sm:flex-col sm:gap-[1em] sm:basis-[70%]">
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

      <div
        className="md:basis-[10%]   sm:basis-[10%]"
        style={{ display: "grid", placeContent: "center" }}>
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
