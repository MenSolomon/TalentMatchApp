import { Button, Card } from "@mui/material";
import { Carousel } from "react-bootstrap";
import CreateShowInterestModal from "../Modals/CreateShowInterestModal";

const Top10PlayerPicksOfTheWeek = ({
  PlayerImage,
  PlayerCountry,
  firstname,
  surname,
  position,
  rank,
}) => {
  return (
    <Carousel
      interval={200000}
      controls={false}
      style={{
        // background: "black",
        height: "100%",
        borderRadius: "1vw",
      }}
    >
      <Carousel.Item>
        {/* // Player Picks of the  weel card area */}
        <Card
          className="cardBackground primaryColor cardBorder"
          sx={{
            height: "34.5vh",
            background: "teal",
            padding: "1vh 1vw",
            borderRadius: "1vw",
            // background:
            //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
            // color: "white",
            borderBottom: "1px solid #0d818e",
            borderRight: "1px solid #0d818e",
          }}
        >
          <div
            className="newsGradient"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              borderRadius: "1vw",
              // background: "rgba(0, 0, 0, 0.2)",
            }}
          ></div>
          <div
            style={{
              // flex: "1",
              display: "flex",

              // background: "white",
            }}
          >
            {" "}
            {/* // Image Of player */}
            <div
              style={{
                flex: ".25",
                borderRadius: ".7vw",
                backgroundImage: `url(${PlayerImage.replace(/ /g, "%20")})`,
                backgroundSize: "cover",
              }}
            ></div>
            {/* Player information */}
            <div
              style={{
                flex: ".55",
                // background: "blue",
                display: "flex",
                flexDirection: "column",
                paddingLeft: ".5vw",
              }}
            >
              <div
                style={{
                  flex: ".15",
                  display: "flex",
                  fontWeight: "900",
                }}
              >
                {" "}
                {firstname} {surname}{" "}
              </div>
              <div style={{ flex: ".4" }}>
                {" "}
                <span style={{ fontWeight: "900" }}> market value: </span>{" "}
                $15.00m
                <br /> <span style={{ fontWeight: "900" }}>
                  {" "}
                  Position :{" "}
                </span>{" "}
                {position}
              </div>
            </div>
            {/* // Rank Number */}
            <div
              style={{
                flex: ".2",
                fontWeight: "900",
                fontSize: "2em",
              }}
            >
              {" "}
              #{rank}
              <img
                src={PlayerCountry}
                style={{ width: "60px", height: "45px" }}
              />
            </div>
          </div>
          {/* // View Profile Button Area */}
          <div
            style={{
              // flex: ".35",
              paddingTop: "3vh",
              display: "flex",
              // background: "white",
            }}
          >
            {/* // REmove this button */}

            {/* <Button
              sx={{
                textTransform: "none",

                fontWeight: "900",
                marginRight: "1vw",
                color: "white",
                background: "#5585FE",
              }}
            > */}
            <CreateShowInterestModal playerName={"Pepi"} />
            {/* </Button> */}
            {/* End of button */}
            <Button
              sx={{
                textTransform: "none",

                fontWeight: "900",
                color: "white",
                background: "#5585FE",
              }}
            >
              {" "}
              View Profile{" "}
            </Button>
          </div>{" "}
        </Card>
      </Carousel.Item>
      {/* <Carousel.Item>JEad</Carousel.Item> */}
    </Carousel>
  );
};

export default Top10PlayerPicksOfTheWeek;
