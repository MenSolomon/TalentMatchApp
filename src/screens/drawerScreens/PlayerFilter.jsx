import { IconButton } from "@mui/material";
import BasicAutoComplete from "../../components/Autocompletes/BasicAutoComplete";
import CountrySelect from "../../components/Autocompletes/CountrySelect";
import AgeRangeSlider from "../../components/Slider/AgeRangeSlider";
import { AddOutlined } from "@mui/icons-material";
import PlayerCompareDisplayCard from "../../components/Cards/PlayerComparisonFilterPageCards/PlayerCompareDisplayCard";

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

  const dummyPlayerFilteredArray = [
    { name: "Jerry Akamenko", position: "ST" },
    { name: "Agyekum Boateng", position: "DEF" },
    { name: "Yamal Sulemann", position: "GK" },
    { name: "Sammy Adjei", position: "MDF" },
    { name: "John Asante", position: "LWB" },
  ];

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
        <AgeRangeSlider style={{ marginTop: "3vh", marginLeft: "0vw" }} />
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
        {dummyPlayerFilteredArray.map((data, index) => {
          const { name, position } = data;

          return (
            <PlayerCompareDisplayCard
              key={index}
              playerName={name}
              playerPosition={position}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerFilter;
