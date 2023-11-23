import BasicAutoComplete from "../../components/Autocompletes/BasicAutoComplete";
import CountrySelect from "../../components/Autocompletes/CountrySelect";
import PlayerCompareDisplayCard from "../../components/Cards/PlayerComparisonFilterPageCards/PlayerCompareDisplayCard";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import { useSelector } from "react-redux";
import RangeSlider from "../../components/Slider/RangeSlider";

const PlayerFilter = () => {
  const soccerPositions = [
    "Any",
    "Goalkeeper (GK)",
    "Defender (D)",
    "Center Back (CB)",
    "Full-back (FB)",
    "Wing-back (WB)",
    "Midfielder (MF)",
    "Central Midfielder (CM)",
    "Defensive Midfielder (CDM)",
    "Attacking Midfielder (CAM)",
    "Wide Midfielder (WM)",
    "Forward (F)",
    "Striker (ST)",
    "Center Forward (CF)",
    "Winger (W)",
  ];

  const inputStyles = {
    width: "85%",
    marginBottom: "3vh",
    marginTop: "1vh",
  };

  const playerData = useSelector(selectPlayersInAgencyArray);

  return (
    <div style={{ height: "77vh", display: "flex", flexDirection: "column" }}>
      {/* // FILTER OPTIONS AREA */}
      <div style={{ flex: ".5" }}>
        <BasicAutoComplete
          style={inputStyles}
          ListArray={soccerPositions}
          label="Position"
        />{" "}
        <CountrySelect selectLabel="Club Country" />
        <br />
        <RangeSlider
          // rangeValue={handleAgeRangeValue}
          rangeName={"Age range"}
          max={40}
          min={0}
          // editDefaultValue={AgeRangeValue}
        />
      </div>

      {/* // FILTERED PLAYER SECTION */}
      <div
        style={{
          flex: ".5",
          overflowY: "scroll",
          //   background: "white",
          //   display: "flex",
          //   flexDirection: "column",
        }}
      >
        {playerData.map((data, index) => {
          const { firstName, surName, position, image } = data;

          return (
            <PlayerCompareDisplayCard
              key={index}
              firstName={firstName}
              surName={surName}
              position={position}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerFilter;
