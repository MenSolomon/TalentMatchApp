import { Avatar, Card, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../Buttons/BasicButton";
import { Star, StarBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";

// Chose to add a margin right to the cards here instead of the calling it when

const MatchedPlayerCard = ({
  PlayerImage,
  PlayerClub,
  PlayerSurName,
  PlayerFirstName,
  MarketValue,
  PlayerPosition,
  PlayerCountry,
}) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/player-details/${PlayerFirstName}${PlayerSurName}`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { primaryTextColor } = themeProviderObject;

  return (
    <div>
      <div
        className="primaryColor md:w-[100%] md:h-[43vh] md:flex md:flex-col sm:w-[100%] sm:h-[43vh] sm:flex sm:flex-col"
        // className="concave"
        style={{
          // display: "flex",
          // flexDirection: "column",
          padding: "1vh .7vw",
          gap: "1vh",
          cursor: "pointer",
        }}
      >
        {/* Player Image And Club */}
        <div
          style={{
            flex: ".4",
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
                backgroundSize: "cover",
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
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          {/* // Player Image */}
          <div
            className="md:h-[100%]  sm:h-[60%]"
            style={{
              flex: ".6",
              // used the regex to fix bug of images not displaying (images with white white spaces between names ) .. regex replaces all the spaces with %20 to suit  ES6 imports rules
              backgroundImage: `url(${PlayerImage.replace(/ /g, "%20")})`,
              backgroundSize: "cover",
              borderRadius: "15%",
              backgroundPosition: "center",
              // background: "red",
              // height: "100%",
            }}
          ></div>
        </div>
        {/*Player Name*/}
        <div
          className="sm:text-[1.5em]  md:text-[1.2em]"
          style={{
            flex: ".2",
            //   background: "blue",
            fontWeight: "900",
            display: "grid",
            placeContent: "center",
          }}
        >
          {PlayerFirstName} <br />
          {PlayerSurName}
        </div>
        {/* Player Stats && Value */}
        <div style={{ flex: ".4", fontSize: ".8em" }}>
          {/* Age : {MarketValue} <br />
          <span>Height: 1.5cm</span> */}

          <FormControlLabel
            control={
              <Checkbox
                icon={
                  <StarBorder
                    style={{ color: primaryTextColor, zIndex: "1000" }}
                  />
                }
                checkedIcon={<Star style={{ zIndex: "1000" }} />}
              />
            }
            label={
              <span
                className="primaryTextColor"
                style={{
                  fontSize: "0.8em",
                  color: primaryTextColor,
                  zIndex: "1000",
                }}
              >
                farvorite
              </span>
            }
            sx={{ fontSize: ".8em" }}
          />
          {/* // BUTTON CLICK DIV */}
          <div onClick={handleNavigate}>
            <BasicButton
              style={{
                textTransform: "none",
                color: "white",
                fontWeight: "bold",
                zIndex: "1000",
              }}
              innerText={"View profile"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedPlayerCard;
