import { AccountCircleOutlined, Close, Flag } from "@mui/icons-material";
import { Avatar, Card, Divider, IconButton, Tooltip } from "@mui/material";
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
  playerId,
  statistics,
  clubName,
  Nationality,
  CountryCode,
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
      className="primaryTextColor cardBackground lg:w-[28%] lg:h-[70vh]  md:w-[100%] md:h-[70vh]     sm:w-[100%] sm:h-[70vh]"
      sx={{ borderRadius: "1vw" }}
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
              <Avatar src={image} sx={{ width: 80, height: 80 }}></Avatar>
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
              <h6 className="tb:text-[1.8em] md:text-[1.1em]">
                {`${firstName} ${surName} `}{" "}
              </h6>
              <h6> {position}</h6>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleCardClose}>
                <Close sx={{ fontSize: 30, color: "white" }} />
              </IconButton>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {/* <Flag sx={{ fontSize: "50px" }} /> */}
              <Tooltip title={Nationality}>
                {" "}
                <img
                  src={`https://flagcdn.com/${CountryCode.toLowerCase()}.svg`}
                  style={{ width: "45px" }}
                />{" "}
              </Tooltip>
            </div>
          </div>
        </div>
        {/* // CLubs Section */}
        <div style={{ flex: ".1", padding: "10px" }}>
          <h6 className="tb:text-[1.3em] md:text-[1.1em]">
            Club Name: {clubName}
          </h6>
          <h6 className="tb:text-[1.3em] md:text-[1.2em]">Age: {age}</h6>
          <h6 className="tb:text-[1.3em] md:text-[1.1em]">Height: {height} </h6>
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
          <PlayerComparisonAccordion
            GeneralObject={statistics[0].General}
            DefenseObject={statistics[0].Defence}
            AttackingObject={statistics[0].Attack}
            DistributionObject={statistics[0].Distribution}
            Discipline={statistics[0].Discipline}
          />
        </div>
      </div>
    </Card>
  );
};

export default PlayerComparisonCard;
