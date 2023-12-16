import { useSelector } from "react-redux";

import { useState } from "react";
import { Pagination } from "@mui/material";
import FavoritePlayerViewCard from "../components/Cards/FavoritePlayerViewCard";
import { selectPlayersDatabase } from "../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";

const Favorites = () => {
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
  const PlayersPerPage = 9;

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
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: ".05" }}>
        <h3 style={{ margin: 0, float: "left" }}>Favourites</h3>{" "}
      </div>

      <div style={{ flex: ".75", flexWrap: "wrap", display: "flex" }}>
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

      <div style={{ flex: ".1", display: "grid", placeContent: "center" }}>
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
