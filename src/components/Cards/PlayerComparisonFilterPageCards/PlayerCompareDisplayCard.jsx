import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PlayerComparisonModal from "../../Modals/PlayerComparisonModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayerToCompareArray,
  setSelectedPlayerToCompareArray,
} from "../../../statemanager/slices/PlayersInAgencySlice";
import { useEffect } from "react";

const PlayerCompareDisplayCard = ({ firstName, surName, position, image }) => {
  const dispatch = useDispatch();
  const currentPlayerSelectedArray = useSelector(selectPlayerToCompareArray);

  const handlePlayerSelectedClicked = () => {
    if (Array.isArray(currentPlayerSelectedArray)) {
      if (currentPlayerSelectedArray.length > 0) {
        dispatch(
          setSelectedPlayerToCompareArray([
            ...currentPlayerSelectedArray,
            { firstName, surName, position, image },
          ])
        );
      } else {
        dispatch(
          setSelectedPlayerToCompareArray([
            { firstName, surName, position, image },
          ])
        );
      }
    }
  };

  useEffect(() => {
    console.log(currentPlayerSelectedArray, "ARRAY SELECTED");
  }, [currentPlayerSelectedArray]);

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
        <h6> {position} </h6>
      </div>
    </div>
  );
};

export default PlayerCompareDisplayCard;
