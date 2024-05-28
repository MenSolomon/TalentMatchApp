import {
  Avatar,
  Card,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../Buttons/BasicButton";
import { LocalPolice, Star, StarBorder, Verified } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

// Chose to add a margin right to the cards here instead of the calling it when

const MatchedPlayerCard = ({
  PlayerImage,
  PlayerClubImage,
  PlayerClubName,
  PlayerSurName,
  PlayerFirstName,
  MarketValue,
  PlayerPosition,
  PlayerPositionABR,
  PlayerCountry,
  PlayerCountryCode,
  PlayerId,
  // This is a temporal solution it is the only key identify to show the difference between player from Api (goalserve) from and player created on the platform
  DoesClubLogoKeyExist,
}) => {
  const navigate = useNavigate();
  const userLoginObject = useSelector(selectUserDetailsObject);
  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/player-details/${PlayerId}`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { primaryTextColor } = themeProviderObject;

  const handlePlayerAddToFavorite = async () => {
    try {
      // this is to make sure an owner of account's view doesnt get counted as player view
      if (userLoginObject.accountId !== PlayerId) {
        const userObjectRef = doc(db, `users_db/${userLoginObject.accountId}`);
        await updateDoc(userObjectRef, {
          favoritePlayers: arrayUnion(PlayerId),
        });

        // alert("Fav addedd");
      }
    } catch (error) {
      console.error(error);
      // alert("Fav addedd Error");
    }
  };

  const handlePlayerRemoveFromFavorite = async () => {
    try {
      // this is to make sure an owner of account's view doesnt get counted as player view
      if (userLoginObject.accountId !== PlayerId) {
        const userObjectRef = doc(db, `users_db/${userLoginObject.accountId}`);
        await updateDoc(userObjectRef, {
          favoritePlayers: arrayRemove(PlayerId),
        });

        // alert("Fav removed");
      }
    } catch (error) {
      console.error(error);
      // alert("Fav removed Error");
    }
  };

  const isPlayerInArray = (playerId, playerArr) => {
    if (playerArr && playerArr.some) {
      return playerArr.some((player) => player === playerId);
    } else {
      // Handle the case where playerArr is undefined
      return false; // or whatever makes sense in your context
    }
  };

  return (
    <div>
      <div
        // className="primaryColor"
        // className="concave"
        style={{
          // position: "relative",
          width: "100%",
          height: "43vh",
          // background: "peru",
          // background:
          //   "linear-gradient(133deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
          // background: "#1B1E2B",

          // borderBottomLeftRadius: "0px",
          // borderBottomRightRadius: "6%",
          // borderTopRightRadius: "6%",
          // borderTopLeftRadius: "6%",
          display: "flex",
          flexDirection: "column",
          padding: "1vh 2vw",
          gap: "1vh",
          cursor: "pointer",
          // background: "red",
          // zIndex: "1000",

          // borderBottom: "3px solid white",
          // borderLeft: "3px solid white",
          // background: "red",
        }}
      >
        {/* Player Image And Club */}
        <div
          style={{
            flex: ".4",

            display: "flex",
            gap: ".5vw",
            // background: "red",
          }}
        >
          {/* //Player Position Player CLub and Country */}
          <div
            style={{
              flex: ".4",

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
              <Tooltip
                style={{
                  zIndex: "1000",
                }}
                onClick={() => {
                  alert("free");
                }}
                title={PlayerPosition}
              >
                {PlayerPositionABR}
              </Tooltip>
            </div>
            {/* Player Country */}
            <div
              style={{
                flex: ".31",
                // backgroundImage: `url(${PlayerCountry})`,
                // backgroundSize: "cover",
              }}
            >
              <Tooltip
                style={{
                  zIndex: "1000",
                }}
                title={PlayerCountry.toString()}
              >
                <Avatar
                  sx={{
                    width: 46,
                    zIndex: "1000",
                    height: 46,
                    // position: "absolute",
                    // bottom: "-3vh",
                    // left: "30%",
                    // did the positioning Styling in css because wanted the tooltip to move with the avatar
                  }}
                  src={`https://flagcdn.com/${PlayerCountryCode.toLowerCase()}.svg`}
                  alt={PlayerCountryCode}
                />{" "}
              </Tooltip>{" "}
            </div>

            {/* Player Club */}
            <div
              style={{
                flex: ".39",
                //   background: "indigo",
                paddingTop: ".4vh",
                display: "grid",
                placeContent: "center",
                paddingRight: "1vw",
              }}
            >
              {/* {PlayerClubName} */}
              {PlayerClubName === "Free agent" ||
              PlayerClubImage === undefined ? (
                <Tooltip
                  onClick={() => {
                    alert("Vas");
                  }}
                  title="Free agent"
                >
                  {" "}
                  <LocalPolice
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      zIndex: "10000",
                    }}
                  />{" "}
                </Tooltip>
              ) : (
                <Tooltip
                  onClick={() => {
                    // alert("Vas");
                  }}
                  title={PlayerClubName}
                >
                  {" "}
                  <Avatar
                    src={PlayerClubImage}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      zIndex: "1000",
                    }}
                  />{" "}
                </Tooltip>
              )}
            </div>
          </div>
          {/* // Player Image */}
          <div
            style={{
              flex: ".6",
              // used the regex to fix bug of images not displaying (images with white white spaces between names ) .. regex replaces all the spaces with %20 to suit  ES6 imports rules
              // backgroundImage: `url(${PlayerImage.replace(/ /g, "%20")})`,
              // backgroundSize: "cover",
              // borderRadius: "15%",
              // backgroundPosition: "center",
              // backgroundColor: "red",
            }}
          >
            <Avatar
              src={PlayerImage}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "4px solid #5585FE",
                zIndex: "1000",
                // background: "blue",
              }}
            />
          </div>
        </div>
        {/*Player Name*/}
        <div
          className="tb:text-[.8em] md:text-[.8em] lg:text-[1em]  sm:text-[.8em]"
          style={{
            flex: ".2",
            // background: "blue",
            fontWeight: "900",
            display: "grid",
            placeContent: "center",
            zIndex: "1000",
          }}
        >
          {PlayerFirstName} <br />
          {PlayerSurName}
        </div>
        {/* Player Stats && Value */}
        <div style={{ flex: ".4", fontSize: ".8em" }}>
          {/* Age : {MarketValue} <br />
          <span>Height: 1.5cm</span> */}

          {/* <FormControlLabel
            control={
              <Checkbox onClick={handlePlayerAddToFavorite}
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
                  fontSize: "0.9em",
                  color: primaryTextColor,
                  zIndex: "1000",
                }}
              >
           
              </span>
            }
            sx={{ fontSize: ".8em" }}
          /> */}

          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => {
                  if (event.target.checked) {
                    handlePlayerAddToFavorite();
                  } else {
                    handlePlayerRemoveFromFavorite();
                  }
                }}
                checked={isPlayerInArray(
                  PlayerId,
                  userLoginObject?.favoritePlayers
                )}
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
                  fontSize: "0.9em",
                  color: primaryTextColor,
                  zIndex: "1000",
                }}
              >
                {DoesClubLogoKeyExist === true ? (
                  <Tooltip title="Verified">
                    <Verified sx={{ color: "#5585FE" }} />{" "}
                  </Tooltip>
                ) : (
                  ""
                )}
                {/* {
                  DoesClubLogoKeyExist === true  :  <Tooltip title="Verified"><Verified sx={{ color: "#5585FE" }} /></Tooltip>{" "} : ""
                } */}
                {/* Verified */}
              </span>
            }
            sx={{ fontSize: ".8em" }}
          />

          {/* // BUTTON CLICK DIV */}
          <div
            onClick={() => {
              handleNavigate();
              // handleProfileViewUpdate();
            }}
          >
            <BasicButton
              className="tb:text-[1.5em] lg:text-[1.2em] md:text-[1.8em]"
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
