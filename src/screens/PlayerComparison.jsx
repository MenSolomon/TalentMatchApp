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
    <div className="md:flex md:w-[100%] md:h-[100%] md:flex-col  sm:flex sm:w-[100%] sm:h-[100%] sm:flex-col ">
      <div className="md:basis-[10%]  sm:basis-[10%]">
        <h3> PlayerComparison </h3>
      </div>

      {selectedPlayersToCompare && selectedPlayersToCompare.length <= 0 ? (
        // DISPLAY TWO DRAWER ICONS WITH PERSONS
        <div className="md:basis-[90%] md:flex md:justify-center md:gap-[8vw]  sm:basis-[90%] sm:flex sm:justify-center sm:gap-[8vw]">
          {/* <PlayerComparisonDrawer /> */}
          <PlayerComparisonDrawer />
          <PlayerComparisonDrawer />
        </div>
      ) : (
        // DISPLAY CARDS WITH PLAYERS DETAILS

        <div className="md:basis-[90%] md:flex md:justify-center md:gap-[3vw] md:flex-row  sm:basis-[90%] sm:flex sm:flex-wrap sm:justify-center sm:gap-[3vw] ">
          {/* sm:overflow-y-scroll */}
          {selectedPlayersToCompare.map((data, index) => {
            const { firstName, surName, position, image } = data;

            return (
              <>
                <PlayerComparisonCard
                  firstName={firstName}
                  surName={surName}
                  position={position}
                  image={image}
                  height={"1'7"}
                  age={20}
                  playerName={"King"}
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
