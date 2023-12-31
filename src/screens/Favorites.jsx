import { useSelector } from "react-redux";

import { useState } from "react";
import { Pagination } from "@mui/material";
import FavoritePlayerViewCard from "../components/Cards/FavoritePlayerViewCard";
import { selectPlayersDatabase } from "../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";
import { selectCurrentBrowserSize } from "../statemanager/slices/OtherComponentStatesSlice";

const Favorites = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  const allPlayersInDatabase = useSelector(selectPlayersDatabase);

  const userLoginObject = useSelector(selectUserDetailsObject);
  const playersInFavoriteArray =
    userLoginObject?.favoritePlayers &&
    userLoginObject?.favoritePlayers.map((player) => {
      const playerIdToMatch = player;
      // Find the player in allPlayersArray based on playerId
      const matchedPlayer = allPlayersInDatabase.find(
        (player) => player.id === playerIdToMatch
      );

      return matchedPlayer;
    });

  console.log(
    playersInFavoriteArray,
    allPlayersInDatabase,
    "PROAS",
    userLoginObject?.favoritePlayers,
    userLoginObject
  );

  // Pagination settings

  const PlayersPerPage = browserWidth <= 1024 ? 4 : 9;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(playersInFavoriteArray.length / PlayersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getplayersInFavoriteArrayForPage = () => {
    const startIndex = (currentPage - 1) * PlayersPerPage;
    const endIndex = startIndex + PlayersPerPage;
    return playersInFavoriteArray.slice(startIndex, endIndex);
  };

  return (
    <div
      className="
    md:flex md:flex-col md:h-[100%] md:w-[100%]    sm:flex sm:flex-col sm:h-[100%] sm:w-[100%]"
    >
      <div className="md:basis-[10%] sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }}>Favourites</h3>{" "}
      </div>

      <div className="md:flex md:flex-row md:gap-[1em] md:flex-wrap md:basis-[70%]  sm:flex sm:flex-col sm:gap-[1em] sm:basis-[70%]">
        {playersInFavoriteArray === undefined ||
        playersInFavoriteArray?.length === 0 ? (
          <div> No players for this club yet </div>
        ) : (
          getplayersInFavoriteArrayForPage().map((data, index) => {
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

            // Similar card from players page in multiStudio systtem

            return (
              <FavoritePlayerViewCard
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
        style={{ display: "grid", placeContent: "center" }}
      >
        {userLoginObject?.favoritePlayers === undefined ? (
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

export default Favorites;
