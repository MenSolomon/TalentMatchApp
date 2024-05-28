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
      className="md:flex md:w-[100%] md:h-[100%] md:flex-col    sm:flex sm:w-[100%] sm:h-[100%] sm:flex-col"
      style={
        {
          // display: "flex",
          // width: "100%",
          // height: "100%",
          // flexDirection: "column",
        }
      }
    >
      <div className="md:basis-[10%] sm:basis-[10%]">
        <h3 className=" lg:text-[2em] tb:text-[1.8em] md:text-[1.7em]">
          {" "}
          Player Comparison{" "}
        </h3>
      </div>

      {selectedPlayersToCompare && selectedPlayersToCompare.length <= 0 ? (
        // DISPLAY TWO DRAWER ICONS WITH PERSONS
        <div
          className="md:basis-[90%] md:flex md:justify-center md:gap-[8vw]   sm:basis-[90%] sm:flex sm:justify-center sm:gap-[5vw]"
          style={
            {
              // flex: ".9",
              // display: "flex",
              // justifyContent: "center",
              // gap: "8vw",
            }
          }
        >
          {/* <PlayerComparisonDrawer /> */}
          <PlayerComparisonDrawer />
          <PlayerComparisonDrawer />
        </div>
      ) : (
        // DISPLAY CARDS WITH PLAYERS DETAILS

        <div
          className="lg:basis-[90%] lg:flex lg:justify-center lg:gap-[3vw] lg:flex-row       md:basis-[90%] md:flex md:justify-center md:gap-[3vw] md:flex-col    sm:basis-[90%] sm:flex sm:justify-center sm:gap-[2vw] sm:flex-col"
          style={
            {
              // flex: ".9",
              // display: "flex",
              // justifyContent: "center",
              // gap: "3vw",
            }
          }
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
