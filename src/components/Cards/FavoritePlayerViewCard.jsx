import { Star, StarBorder } from "@mui/icons-material";
import { Card, Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { selectPlayerSelectedToView } from "../../statemanager/slices/PlayersInAgencySlice";
import { db } from "../../Firebase/Firebase";

const FavoritePlayerViewCard = ({
  image,
  firstName,
  surName,
  age,
  nationality,
  position,
  jerseyNumber,
  id,
  positionToolTipInFull,
}) => {
  const navigate = useNavigate();

  const handlePlayerNavigation = () => {
    navigate(`/player-details/${id}`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { primaryTextColor } = themeProviderObject;
  const userLoginObject = useSelector(selectUserDetailsObject);
  const playerToViewObject = useSelector(selectPlayerSelectedToView);

  const handlePlayerAddToFavorite = async () => {
    try {
      // this is to make sure an owner of account's view doesnt get counted as player view
      if (userLoginObject.accountId !== playerToViewObject.id) {
        const userObjectRef = doc(db, `users_db/${userLoginObject.accountId}`);
        await updateDoc(userObjectRef, {
          favoritePlayers: arrayUnion(playerToViewObject.id),
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
      if (userLoginObject.accountId !== playerToViewObject.id) {
        const userObjectRef = doc(db, `users_db/${userLoginObject.accountId}`);
        await updateDoc(userObjectRef, {
          favoritePlayers: arrayRemove(playerToViewObject.id),
        });

        // alert("Fav addedd");
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
    <div
      // style={{ width: "24.7vw", height: "20vh", marginRight: "1.2vw" }}
      onClick={handlePlayerNavigation}
    >
      <Card
        className="cardBackground primaryTextColor md:flex md:w-[24.7vw] md:h-[23.5vh]    sm:flex sm:w-[95vw] sm:h-[15vh]"
        style={{
          // display: "flex",
          // width: "100%",
          // height: "100%",
          borderRadius: "1vw",
          padding: ".7vw",
          gap: ".4vw",
          cursor: "pointer",
        }}
      >
        {/* Image Area */}
        <div style={{ flex: ".3" }}>
          <img
            src={image}
            style={{ width: "100%", height: "100%", borderRadius: ".8vw" }}
          />

          {}
        </div>
        {/* NAme Details  and Descriptive Data*/}
        <div
          style={{
            flex: ".6",

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Name Details */}
          <div style={{ flex: ".5" }}>
            <p style={{ margin: 0 }}>
              {firstName.length >= 10 ? (
                <Tooltip title={firstName}>{firstName.slice(0, 10)}...</Tooltip>
              ) : (
                firstName
              )}
            </p>{" "}
            <h4 style={{ margin: 0 }}>
              {surName.length >= 10 ? (
                <Tooltip title={surName}>{surName.slice(0, 7)}...</Tooltip>
              ) : (
                surName
              )}
            </h4>
          </div>
          {/* Descriptive area (Age , Nationality , Postion) */}
          <div style={{ flex: ".5", display: "flex" }}>
            {/* Age */}
            <div style={{ flex: ".25" }}>
              <span style={{ fontWeight: "700" }}>Age</span> <br />
              {age}
            </div>
            {/* Nationality */}
            <div style={{ flex: ".5" }}>
              <span style={{ fontWeight: "700" }}>Country </span> <br />{" "}
              {nationality.length >= 20 ? (
                <Tooltip title={nationality}>
                  {nationality.slice(0, 18)}...
                </Tooltip>
              ) : (
                nationality
              )}
            </div>
            {/* Position */}
            <div style={{ flex: ".25" }}>
              {" "}
              <Tooltip title={positionToolTipInFull}>
                <span style={{ fontWeight: "700" }}>Pos </span> <br />{" "}
                {position}{" "}
              </Tooltip>
            </div>
          </div>
        </div>
        {/* Jersey Number */}
        <div
          style={{
            flex: ".1",
            display: "flex",
            // alignContent: "center",
            // justifyContent: "center",
          }}
        >
          {" "}
          {/* <FormControlLabel
            onChange={(event) => {
              if (event.target.checked) {
                handlePlayerAddToFavorite();
              } else {
                handlePlayerRemoveFromFavorite();
              }
            }}
            checked={isPlayerInArray(
              playerToViewObject.id,
              userLoginObject?.favoritePlayers
            )}
            control={
              <Checkbox
                icon={
                  <StarBorder
                    style={{ color: primaryTextColor, zIndex: "1000" }}
                  />
                }
                checkedIcon={<Star />}
              />
            }
            sx={{ fontSize: ".8em" }}
          /> */}
        </div>
      </Card>
    </div>
  );
};

export default FavoritePlayerViewCard;
