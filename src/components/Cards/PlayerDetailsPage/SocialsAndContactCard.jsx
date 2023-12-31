import { Star, StarBorder } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import BasicButton from "../../Buttons/BasicButton";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../../statemanager/slices/ThemeProviderSlice";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { selectPlayerSelectedToView } from "../../../statemanager/slices/PlayersInAgencySlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";

const SocialAndContactAreaCard = ({
  instagram,
  facebook,
  instaImg,
  facebookImg,
}) => {
  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { primaryTextColor } = themeProviderObject;
  const userLoginObject = useSelector(selectUserDetailsObject);
  const playerToViewObject = useSelector(selectPlayerSelectedToView);

  const handleFacebookCLick = () => {
    if (facebook !== "https://web.facebook.com/") {
      window.open(facebook, "_blank");
    }
  };

  const handleInstagramCLick = () => {
    if (instagram !== "https://www.instagram.com//") {
      window.open(instagram, "_blank");
    }
  };

  const handlePlayerAddToFavorite = async () => {
    try {
      // this is to make sure an owner of account's view doesnt get counted as player view
      if (userLoginObject.accountId !== playerToViewObject?.id) {
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
      className="playerCard md:w-[100%] md:h-[100%]   sm:w-[50%] sm:h-[100%]"
      style={{
        // width: "100%",
        // height: "100%",
        borderRadius: "1vw",
        paddingTop: "1.5vw",
        paddingLeft: "1.5vw",
      }}
    >
      {/* <Card
      sx={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
        borderBottom: "1px solid #0d818e",
        borderRight: "1px solid #0d818e",
        // borderTop: "2px solid #0d818e",
        padding: "1vw",
        // fontWeight: "800",
        borderRadius: "1vw",
      }}
    > */}

      <div
        style={{
          display: "flex",
          gap: ".3vw",
          // background: "white",
          width: "100%",
          height: "20%",
        }}
      >
        {" "}
        <img
          onClick={handleFacebookCLick}
          src={facebookImg}
          style={{ width: "20%" }}
        />{" "}
        <img
          onClick={handleInstagramCLick}
          src={instaImg}
          style={{ width: "20%" }}
        />{" "}
        {/* <img src={x} style={{ width: "25%", height: "100%" }} />{" "} */}
      </div>

      <FormControlLabel
        onChange={(event) => {
          if (event.target.checked) {
            handlePlayerAddToFavorite();
          } else {
            handlePlayerRemoveFromFavorite();
          }
        }}
        checked={isPlayerInArray(
          playerToViewObject?.id,
          userLoginObject?.favoritePlayers
        )}
        control={
          <Checkbox
            icon={<StarBorder style={{ color: primaryTextColor }} />}
            checkedIcon={<Star />}
          />
        }
        label={
          <span style={{ fontSize: "0.8em", color: primaryTextColor }}>
            Mark as favourite
          </span>
        }
        sx={{ fontSize: ".8em" }}
      />

      <BasicButton
        style={{
          textTransform: "none",
          color: "white",
          fontWeight: "bold",
        }}
        innerText={"Show interest"}
      />
    </div>
  );
};

export default SocialAndContactAreaCard;
