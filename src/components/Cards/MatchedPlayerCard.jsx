import { Card } from "@mui/material";
import React from "react";

// Chose to add a margin right to the cards here instead of the calling it when
const MatchedPlayerCard = ({
  PlayerImage,
  PlayerClub,
  PlayerName,
  MarketValue,
  PlayerPosition,
  PlayerCountry,
}) => {
  return (
    <Card
      // className="concave"
      sx={{
        position: "relative",
        width: "10vw",
        height: "30vh",
        // background: "red",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "6%",
        borderTopRightRadius: "6%",
        borderTopLeftRadius: "6%",
        display: "flex",
        flexDirection: "column",
        padding: "1vh .7vw",
        gap: "1vh",
      }}
    >
      {/* Player Image And Club */}
      <div
        style={{
          flex: ".5",
          //   background: "white",
          display: "flex",
          gap: ".5vw",
        }}
      >
        {/* //Player Position Player CLub and Country */}
        <div
          style={{
            flex: ".4",
            // background: "blue",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* // Player Position */}
          <div
            style={{
              flex: ".25",
              //   background: "white",
              display: "grid",
              placeContent: "center",
              fontWeight: "700",
            }}
          >
            {" "}
            {PlayerPosition}
          </div>
          {/* Player Country */}
          <div
            style={{
              flex: ".4",
              backgroundImage: `url(${PlayerCountry})`,
              backgroundSize: "contain",
            }}
          ></div>
          {/* Player Club */}
          <div
            style={{
              flex: ".35",
              //   background: "indigo",
              paddingTop: ".4vh",
              display: "grid",
              placeContent: "center",
            }}
          >
            <img
              src={PlayerClub}
              style={{ width: "23px", borderRadius: "50%" }}
            />
          </div>
        </div>
        {/* // Player Image */}
        <div
          style={{
            flex: ".6",
            backgroundImage: `url(${PlayerImage})`,
            backgroundSize: "cover",
            borderRadius: "15%",
          }}
        ></div>
      </div>
      {/*Player Name*/}
      <div
        style={{
          flex: ".2",
          //   background: "blue",
          fontWeight: "900",
          display: "grid",
          placeContent: "center",
        }}
      >
        {PlayerName}
      </div>
      {/* Player Stats && Value */}
      <div style={{ flex: ".3", fontSize: ".7em" }}>
        Value : {MarketValue} <br />
        <span>Goal Ratio : 0.61</span>
      </div>
    </Card>
  );
};

export default MatchedPlayerCard;
