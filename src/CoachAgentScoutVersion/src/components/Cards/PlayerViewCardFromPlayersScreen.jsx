import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlayerViewCardFromPlayersScreen = ({
  image,
  firstName,
  surName,
  age,
  nationality,
  position,
  jerseyNumber,
}) => {
  const navigate = useNavigate();

  const handlePlayerManagementNavigation = () => {
    navigate(`/multiStudio/players/${firstName}${surName}`);
  };

  return (
    <div onClick={handlePlayerManagementNavigation}>
      {/* cardBackground primaryTextColor */}
      <Card
        className="cardBackground primaryTextColor md:flex md:flex-row md:w-[24.8vw] md:h-[20vh] md:p-[.7vw] md:gap-[.4vw] md:mr-[1.2vw] cursor-pointer  sm:flex sm:flex-col sm:w-[40vw] sm:h-[100%] sm:gap-[.4vw]"
        style={{
          // display: "flex",
          // width: "24.7vw",
          // height: "20vh",
          borderRadius: "1vw",
          // padding: ".7vw",
          // gap: ".4vw",
          // marginRight: "1.2vw",
          // cursor: "pointer",
        }}
      >
        {/* first */}
        <div
          className="md:w-[30%] md:h-[100%] md:flex-shrink-0 md:flex  sm:w-[100%] sm:h-[45%] sm:flex-shrink-0 sm:flex sm:justify-center sm:items-center"
          style={{ borderRadius: ".8vw" }}
        >
          <img
            src={image}
            className="sm:h-[100%]  sm:w-[25vw] md:h-[100%] md:w-[20vw]"
            style={{ borderRadius: ".8vw" }}
          />
        </div>
        {/* second */}
        <div
          className="sm:w-[100%] sm:h-[40%] sm:flex-shrink-0 sm:flex sm:flex-col  md:w-[55%] md:h-[100%] md:flex-shrink-0 md:flex md:flex-col"
          // style={{ background: "yellow" }}
        >
          {/* Name Details */}
          <div className="md:basis-[50%] sm:basis-[50%]">
            <p style={{ margin: 0 }}>{firstName}</p>{" "}
            <h4 style={{ margin: 0 }}>{surName}</h4>
          </div>
          {/* Descriptive area (Age , Nationality , Postion) */}
          <div className="md:basis-[50%] md:flex sm:flex sm:basis-[50%]">
            {/* Age */}
            <div className="md:basis-[25%]">
              <span style={{ fontWeight: "700" }}>Age</span> <br />
              {age}
            </div>
            {/* Nationality */}
            <div className="md:basis-[5%]">
              <span style={{ fontWeight: "700" }}>Country </span> <br />{" "}
              {nationality}
            </div>
            {/* Position */}
            <div className="md:basis-[25%]">
              {" "}
              <span style={{ fontWeight: "700" }}>Pos </span> <br /> {position}
            </div>
          </div>
        </div>
        {/* third */}
        <div
          className="sm:w-[50%] sm:h-[15%] sm:flex-shrink-0 sm:flex   
        md:w-[50%] md:h-[15%] md:flex-shrink-0 md:flex
        md:justify-start
        "
          style={
            {
              // background: "pink",
              // flex: ".1",
              // display: "flex",
              // alignContent: "center",
              // justifyContent: "center",
            }
          }
        >
          <h2>{jerseyNumber}</h2>
        </div>
      </Card>
    </div>
  );
};

export default PlayerViewCardFromPlayersScreen;
