import { AccountCircleOutlined, Close, Flag } from "@mui/icons-material";
import { Avatar, Card, Divider, IconButton } from "@mui/material";
import PlayerComparisonAccordion from "../../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayerToCompareArray,
  setSelectedPlayerToCompareArray,
} from "../../../statemanager/slices/PlayersInAgencySlice";

const PlayerComparisonCard = ({ firstName, surName, position, image }) => {
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
      className="primaryTextColor cardBackground"
      sx={{ borderRadius: "1vw", width: "28%", height: "70vh" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Player Profiles */}
        <div
          style={{
            flex: ".3",
            // background: "pink",
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
              <Flag sx={{ fontSize: "50px" }} />
            </div>
          </div>
        </div>
        {/* // CLubs Section */}
        <div style={{ flex: ".1", padding: "10px" }}>
          <h5>Clubs</h5>
          <Divider style={{ background: "black" }} />
          <div>
            <h6>Club Name: Odabo</h6>
            <h6>Club Seasons: Odabo</h6>
          </div>
        </div>
        <div
          style={{
            flex: ".6",
            // background: "pink",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
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
