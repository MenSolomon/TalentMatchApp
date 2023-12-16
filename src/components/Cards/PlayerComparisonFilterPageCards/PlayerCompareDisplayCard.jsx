import { AddOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import PlayerComparisonModal from "../../Modals/PlayerComparisonModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayerToCompareArray,
  setSelectedPlayerToCompareArray,
} from "../../../statemanager/slices/PlayersInAgencySlice";
import { useEffect } from "react";

const PlayerCompareDisplayCard = ({
  firstName,
  surName,
  position,
  image,
  statistics,
  playerId,
  clubName,
  Nationality,
  CountryCode,
  Age,
  height,
}) => {
  const dispatch = useDispatch();
  const currentPlayerSelectedArray = useSelector(selectPlayerToCompareArray);

  const handlePlayerSelectedClicked = () => {
    if (Array.isArray(currentPlayerSelectedArray)) {
      if (currentPlayerSelectedArray.length > 0) {
        dispatch(
          setSelectedPlayerToCompareArray([
            ...currentPlayerSelectedArray,
            {
              firstName,
              surName,
              position,
              image,
              statistics,
              playerId,
              clubName,
              Nationality,
              CountryCode,
              Age,
              height,
            },
          ])
        );
      } else {
        dispatch(
          setSelectedPlayerToCompareArray([
            {
              firstName,
              surName,
              position,
              image,
              statistics,
              playerId,
              clubName,
              Nationality,
              CountryCode,
              Age,
              height,
            },
          ])
        );
      }
    }
  };

  useEffect(() => {
    console.log(currentPlayerSelectedArray, "ARRAY SELECTED");
  }, [currentPlayerSelectedArray]);

  var positionABR = position.match(/\((.*?)\)/);

  // Check if there are matches and get the value inside parentheses
  var AbbreviatedPosition = positionABR ? positionABR[1] : null;

  return (
    <div
      className="primaryTextColor"
      style={{
        width: "100%",
        height: "10vh",
        display: "flex",
        borderBottom: "1px solid rgba(255, 255, 255, 0.066)",
        // alignItems: "center",
        // justifyContent: "center",
        // background: "red",
      }}
    >
      {/*ADD ICON AREA */}
      <div
        style={{
          flex: ".17",
          display: "grid",
          placeContent: "center",
        }}
      >
        {/* <PlayerComparisonModal /> */}

        <IconButton
          size="small"
          sx={{ background: "#5585FE" }}
          onClick={handlePlayerSelectedClicked}
        >
          <AddOutlined style={{ color: "white" }} />{" "}
        </IconButton>
      </div>
      {/* NAME AREA */}
      <div
        style={{
          flex: ".63",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "1.5vh",
        }}
      >
        <h6> {`${firstName} ${surName}`} </h6>
      </div>
      {/* POSITION AREA */}
      <div
        style={{
          flex: ".2",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "1.5vh",
        }}
      >
        <h6>
          {" "}
          <Tooltip title={position}>{AbbreviatedPosition}</Tooltip>{" "}
        </h6>
      </div>
    </div>
  );
};

export default PlayerCompareDisplayCard;
