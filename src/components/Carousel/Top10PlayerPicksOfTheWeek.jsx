import { Avatar, Button, Card } from "@mui/material";
import { Carousel } from "react-bootstrap";
import CreateShowInterestModal from "../Modals/CreateShowInterestModal";
import BasicButton from "../Buttons/BasicButton";
// import ClubLogo from "../../../public/Medeama_SC_logo.png";
import BasicControlledRating from "../Ratings/BasicControlledRating";
import BasicButtonWithEndIcon from "../Buttons/BasicButtonWithEndIcon";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";

const Top10PlayerPicksOfTheWeek = ({
  PlayerImage,
  PlayerCountry,
  firstname,
  surname,
  position,
  rank,
}) => {
  const overlayStyle = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.15)",
    borderRadius: "1vw",
  };

  // const playerPicksArray = ["1", "1", "1", "1", "1"];

  const playerPicksArray = useSelector(selectPlayersInAgencyArray);

  return (
    <Carousel
      interval={10000}
      // controls={true}
      style={{
        // background: "black",
        height: "100%",
        borderRadius: "1vw",
      }}
    >
      {/* // Player Picks of the  weel card area */}

      {playerPicksArray.map((data, index) => {
        const {
          firstName,
          surName,
          position,
          Nationality,
          image,
          clubName,
          clubLogo,
        } = data;

        return (
          <Carousel.Item key={index}>
            <PickedPlayerCard
              PlayerImage={image}
              PlayerCountry={Nationality}
              firstname={firstName}
              surname={surName}
              position={position}
              clubLogo={clubLogo}
              clubName={clubName}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Top10PlayerPicksOfTheWeek;

const PickedPlayerCard = ({
  PlayerImage,
  PlayerCountry,
  clubLogo,
  clubName,
  firstname,
  surname,
  position,
  rank,
}) => {
  return (
    <Card
      className="cardBorder"
      sx={{
        height: "37.5vh",
        padding: "2vh .4vw",
        // paddingTop: "2vh",
        borderRadius: "1vw",
        color: "white",
        // backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.8747099767981439) 0%, rgba(55,54,54,0.8538283062645011) 28%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%),url("${ClubLogo}")`,

        backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.9582366589327146) 0%, rgba(55,54,54,0.9535962877030162) 31%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%),url("${clubLogo}")`,

        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",

        borderBottom: "1px solid #0d818e",
        borderRight: "1px solid #0d818e",
        display: "flex",
        gap: ".5vw",
      }}
    >
      {/* // Logo AREA */}
      <div
        style={{
          flex: ".35",
          display: "flex",
          // background: "green",
          flexDirection: "column",
        }}
      >
        {/* // watch video button area */}
        <div
          style={{
            flex: ".2",
            display: "flex",
            // justifyContent: "flex-end",
            paddingLeft: ".6vw",
          }}
        >
          {" "}
          <BasicButtonWithEndIcon
            className="md:w-[6.5vw] sm:w-[90%]"
            style={{ height: "4vh" }}
            innerText="Watch"
            endIcon="play_circle"
          />
        </div>

        {/* // Avatar area */}
        <div style={{ flex: ".8", display: "flex", justifyContent: "center" }}>
          <Avatar
            src={PlayerImage}
            sx={{ width: 80, height: 80, border: "3px solid #5585FE" }}
          />
        </div>
      </div>

      {/* // Player information */}
      <div
        style={{
          flex: ".65",

          // backgroundImage: `url(${ClubLogo})`,
          display: "flex",
          flexDirection: "column",
          backgroundRepeat: "no-repeat",
          // position: "relative",
        }}
      >
        {/* <div style={overlayStyle}></div> */}

        <div style={{ flex: ".25" }}>
          {" "}
          <h5>
            {" "}
            {firstname} {surname}{" "}
          </h5>
          <BasicControlledRating />
        </div>
        <div style={{ flex: ".5" }}>
          {" "}
          {firstname} {surname} is a player from {PlayerCountry} name who playes
          as {position} for {clubName}
        </div>

        <div style={{ flex: ".25" }}>
          {" "}
          3 Goals <span style={{ marginLeft: ".6vw" }}>
            2 Total attempts
          </span>{" "}
          <BasicButton innerText="See more" />{" "}
        </div>
      </div>
    </Card>
  );
};
