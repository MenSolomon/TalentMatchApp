import { AccountCircleOutlined, Close, Flag } from "@mui/icons-material";
import { Avatar, Card, Divider, IconButton } from "@mui/material";
import PlayerComparisonAccordion from "../../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayerToCompareArray,
  setSelectedPlayerToCompareArray,
} from "../../../statemanager/slices/PlayersInAgencySlice";
import sourceLogo from "../../../../public/ghana.png";

const PlayerComparisonCard = ({
  firstName,
  surName,
  position,
  image,
  age,
  height,
  playerName,
}) => {
  const dispatch = useDispatch();
  const currentPlayerSelectedArray = useSelector(selectPlayerToCompareArray);

  const handleCardClose = () => {
    const filteredRemovedName = currentPlayerSelectedArray.filter((data) => {
      // CJANGE AND USE A UNIQUE ID INSTEAD OF NAME TO FITLER
      return `${data.firstName} ${data.surName}` !== `${firstName} ${surName}`;
    });

    dispatch(setSelectedPlayerToCompareArray(filteredRemovedName));
  };

  return (
    <Card
      className="primaryTextColor cardBackground md:w-[28%] md:h-[70vh]     sm:w-[100%] sm:h-[70vh]"
      sx={{ borderRadius: "1vw" }}
      // , width: "28%", height: "70vh"
    >
      <div
        className="md:w-[100%] md:h-[100%] md:flex md:flex-col       sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
        style={
          {
            // width: "100%",
            // height: "100%",
            // display: "flex",
            // flexDirection: "column",
          }
        }
      >
        {/* Player Profiles */}
        <div
          style={{
            flex: ".1",
            display: "flex",
            padding: "10px",
          }}
        >
          <div
            style={{
              flex: ".7",
              // background: "peru",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: ".5",
                //   background: "green",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {/* <AccountCircleOutlined sx={{ fontSize: "65px" }} /> */}
              <Avatar src={image} sx={{ width: 50, height: 50 }}></Avatar>
            </div>
            <div
              style={{
                flex: ".5",
                //   background: "cyan",
              }}
            >
              {/* NAME AND POSITION AREA  */}
              <div
                style={{
                  marginTop: "10px",
                }}
              ></div>
              <h6>{`${firstName} ${surName} `} </h6>
              <h6> {position}</h6>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleCardClose}>
                <Close />
              </IconButton>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {/* <Flag sx={{ fontSize: "50px" }} /> */}
              <img src={sourceLogo} style={{ width: "45px" }} />
            </div>
          </div>
        </div>
        {/* // CLubs Section */}
        <div style={{ flex: ".1", padding: "10px" }}>
          <h6>Club Name: {playerName}</h6>
          <h6>Age: {age}</h6>
          <h6>Height: {height} </h6>
        </div>
        <div
          style={{
            flex: ".8",
            // display: "flex",
            // flexDirection: "column",
            // gap: "15px",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          <PlayerComparisonAccordion />
        </div>
      </div>
    </Card>
  );
};

export default PlayerComparisonCard;
