import { Avatar, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// Chose to add a margin right to the cards here instead of the calling it when

const MatchedPlayerCard = ({
  PlayerImage,
  PlayerClub,
  PlayerName,
  MarketValue,
  PlayerPosition,
  PlayerCountry,
}) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/player-details`);
  };

  return (
    <div onClick={handleNavigate}>
      <Card
        className="cardBackground primaryColor cardBorder"
        // className="concave"
        sx={{
          position: "relative",
          width: "10vw",
          height: "30vh",
          // background:
          //   "linear-gradient(133deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
          // background: "#1B1E2B",

          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "6%",
          borderTopRightRadius: "6%",
          borderTopLeftRadius: "6%",
          display: "flex",
          flexDirection: "column",
          padding: "1vh .7vw",
          gap: "1vh",
          cursor: "pointer",
          // borderBottom: "3px solid white",
          // borderLeft: "3px solid white",
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
                flex: ".31",
                backgroundImage: `url(${PlayerCountry})`,
                backgroundSize: "contain",
              }}
            ></div>
            {/* Player Club */}
            <div
              style={{
                flex: ".39",
                //   background: "indigo",
                paddingTop: ".4vh",
                display: "grid",
                placeContent: "center",
              }}
            >
              <Avatar
                src={PlayerClub}
                style={{ width: "23px", height: "23px", borderRadius: "50%" }}
              />
            </div>
          </div>
          {/* // Player Image */}
          <div
            style={{
              flex: ".6",
              // used the regex to fix bug of images not displaying (images with white white spaces between names ) .. regex replaces all the spaces with %20 to suit  ES6 imports rules
              backgroundImage: `url(${PlayerImage.replace(/ /g, "%20")})`,
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
          Defense : {MarketValue} <br />
          <span>Goal Ratio : 0.61</span>
        </div>
      </Card>
    </div>
  );
};

export default MatchedPlayerCard;
