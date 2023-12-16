import { useSelector } from "react-redux";
import PlayerComparisonDrawer from "../components/Drawer/PlayerComparisonDrawer";
import {
  selectPlayerToCompareArray,
  selectPlayersInAgencyArray,
} from "../statemanager/slices/PlayersInAgencySlice";
import PlayerCompareDisplayCard from "../components/Cards/PlayerComparisonFilterPageCards/PlayerCompareDisplayCard";
import PlayerComparisonCard from "../components/Cards/PlayerComparisonPageCards/PlayerComparisonCard";

const PlayerComparison = () => {
  const selectedPlayersToCompare = useSelector(selectPlayerToCompareArray);

  console.log(selectedPlayersToCompare, "SSA");

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: ".1" }}>
        <h3> PlayerComparison </h3>
      </div>

      {selectedPlayersToCompare && selectedPlayersToCompare.length <= 0 ? (
        // DISPLAY TWO DRAWER ICONS WITH PERSONS
        <div
          style={{
            flex: ".9",
            display: "flex",
            justifyContent: "center",
            gap: "8vw",
          }}
        >
          {/* <PlayerComparisonDrawer /> */}
          <PlayerComparisonDrawer />
          <PlayerComparisonDrawer />
        </div>
      ) : (
        // DISPLAY CARDS WITH PLAYERS DETAILS

        <div
          style={{
            flex: ".9",
            display: "flex",
            justifyContent: "center",
            gap: "3vw",
          }}
        >
          {selectedPlayersToCompare.map((data, index) => {
            const {
              firstName,
              surName,
              position,
              image,
              height,
              Age,
              clubName,
              playerId,
              statistics,
              CountryCode,
              Nationality,
            } = data;

            return (
              <>
                <PlayerComparisonCard
                  firstName={firstName}
                  surName={surName}
                  position={position}
                  image={image}
                  height={height}
                  age={Age}
                  clubName={clubName}
                  CountryCode={CountryCode}
                  statistics={statistics}
                  Nationality={Nationality}
                  playerId={playerId}
                  key={index}
                />
              </>
            );
          })}
          {/* // ADDING THE  DRAWER TRIGGER ICON IF ARRAY IS LESS THAN 3 */}

          {selectedPlayersToCompare.length < 3 ? (
            <PlayerComparisonDrawer />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerComparison;
