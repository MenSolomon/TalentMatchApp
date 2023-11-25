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
      className="primaryTextColor cardBackground md:h-[70vh] md:w-[28%]  sm:h-[70vh] sm:w-[100%]"
      sx={{ borderRadius: "1vw" }}
    >
      <div className="md:h-[100%] md:w-[100%] md:flex md:flex-col  sm:h-[100%] sm:w-[100%] sm:flex sm:flex-col">
        {/* Player Profiles */}
        <div className="md:basis-[10%] md:flex md:p-[10px]  sm:basis-[10%] sm:flex sm:p-[10px]">
          <div className="md:basis-[70%] md:flex md:flex-col  sm:basis-[70%] sm:flex sm:flex-col">
            <div className="md:basis-[50%] md:flex md:justify-start md:items-center  sm:basis-[50%] sm:flex sm:justify-start sm:items-center">
              {/* <AccountCircleOutlined sx={{ fontSize: "65px" }} /> */}
              <Avatar src={image} sx={{ width: 50, height: 50 }}></Avatar>
            </div>
            <div className="md:basis-[50%]  sm:basis-[50%]">
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
          <div className="md:basis-[30%]  sm:basis-[30%]">
            <div className="md:flex md:justify-end  sm:flex sm:justify-end">
              <IconButton onClick={handleCardClose}>
                <Close />
              </IconButton>
            </div>
            <div className="md:flex md:justify-end  sm:flex sm:justify-end">
              <img src={sourceLogo} style={{ width: "45px" }} />
            </div>
          </div>
        </div>
        {/* // CLubs Section */}
        <div className="md:basis-[10%] md:p-[10px]  sm:basis-[10%] sm:p-[10px]">
          <h6>Club Name: {playerName}</h6>
          <h6>Age: {age}</h6>
          <h6>Height: {height} </h6>
        </div>
        <div className="md:basis-[80%] md:p-[10px] md:overflow-y-scroll  sm:basis-[80%] sm:p-[10px] sm:overflow-y-scroll">
          <PlayerComparisonAccordion />
        </div>
      </div>
    </Card>
  );
};

export default PlayerComparisonCard;
