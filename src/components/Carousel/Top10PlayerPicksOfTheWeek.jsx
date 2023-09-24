import { Button, Card } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";

const Top10PlayerPicksOfTheWeek = ({ PlayerImage, PlayerCountry }) => {
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
          sx={{
            height: "34.5vh",
            background: "teal",
            padding: "1vh 1vw",
            borderRadius: "1vw",
            color: "white",
          }}
        >
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
                backgroundImage: `url(${PlayerImage})`,
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
                Cristiano Ronaldo{" "}
              </div>
              <div style={{ flex: ".4" }}>
                {" "}
                <span style={{ fontWeight: "900" }}> market value: </span>{" "}
                $15.00m
                <br /> <span style={{ fontWeight: "900" }}>
                  {" "}
                  Position :{" "}
                </span>{" "}
                Striker{" "}
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
              #1{" "}
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

              // background: "white",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                background: "black",
                fontWeight: "900",
                marginRight: "1vw",
              }}
            >
              {" "}
              Show Interest{" "}
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "black",
                fontWeight: "900",
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
