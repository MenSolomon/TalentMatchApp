import { Details, Favorite } from "@mui/icons-material";
import { Avatar, Card, Icon } from "@mui/material";
import BasicButton from "../../Buttons/BasicButton";
import { selectThemeProviderObject } from "../../../statemanager/slices/ThemeProviderSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const AchievementAndMarketValueCard = ({ worldCup, BalonDor, uefa }) => {
  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { cardBackground } = themeProviderObject;

  // const [background,setBackground]= useState()

  const backgroundGradient = `linear-gradient(${cardBackground}, ${cardBackground})
padding-box,
linear-gradient(
  90deg,
  hsla(280, 81%, 58%, 1) 0%,
  hsla(279, 81%, 59%, 1) 3%,
  hsla(276, 79%, 60%, 1) 9%,
  hsla(274, 79%, 60%, 1) 15%,
  hsla(269, 76%, 61%, 1) 15%,
  hsla(271, 77%, 61%, 1) 23%,
  hsla(259, 72%, 62%, 1) 32%,
  hsla(246, 68%, 64%, 1) 49%,
  hsla(226, 67%, 60%, 1) 56%,
  hsla(194, 96%, 42%, 1) 74%,
  hsla(196, 80%, 79%, 1) 100%
)
border-box;`;

  {
    /* <style>

.playerCard {

  border: 1px solid transparent;

  background: linear-gradient(red, red) padding-box,
    linear-gradient(
        90deg,
        hsla(280, 81%, 58%, 1) 0%,
        hsla(279, 81%, 59%, 1) 3%,
        hsla(276, 79%, 60%, 1) 9%,
        hsla(274, 79%, 60%, 1) 15%,
        hsla(269, 76%, 61%, 1) 15%,
        hsla(271, 77%, 61%, 1) 23%,
        hsla(259, 72%, 62%, 1) 32%,
        hsla(246, 68%, 64%, 1) 49%,
        hsla(226, 67%, 60%, 1) 56%,
        hsla(194, 96%, 42%, 1) 74%,
        hsla(196, 80%, 79%, 1) 100%
      )
      border-box;
}

</style> */
  }

  return (
    <div
      className="playerCard"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1vw",
        padding: "1.5vw",
        display: "flex",
        // color: "#E4E8F9",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: ".3", display: "flex" }}>
        {" "}
        <span style={{ fontWeight: "bolder" }}> Market Value :</span>
        <BasicButton
          style={{
            width: "4vw",
            height: "4vh",
            textAlign: "center",
            color: "white",
            marginLeft: "1vw",
          }}
          innerText="$10M"
        />
      </div>
      <div style={{ flex: ".4", display: "flex", gap: "1.3vw" }}>
        <img
          style={{
            width: "18%",
            height: "50px",
            //   border: "2px solid red",
            //   backgroundImage: `url(${worldCup})`,
            //   backgroundSize: "contain",
          }}
          src={worldCup}
        ></img>
        <img
          style={{
            width: "20%",
            height: "50px",
            //   border: "2px solid red",
            //   backgroundImage: `url(${worldCup})`,
            //   backgroundSize: "contain",
          }}
          src={uefa}
        ></img>
        <img
          style={{
            width: "25%",
            height: "50px",
            //   border: "2px solid red",
            //   backgroundImage: `url(${worldCup})`,
            //   backgroundSize: "contain",
          }}
          src={BalonDor}
        ></img>

        {/* <img
        src={uefa}
        style={{ height: "50%", border: "1px solid red" }}
      /> */}
        {/* <img
        src={worldCup}
        style={{ height: "50%", border: "1px solid red" }}
      /> */}
      </div>
      <div
        style={{
          flex: ".4",
          // background: "white",
          paddingTop: ".4vh",
          display: "flex",
          fontSize: ".85em",
        }}
      >
        <div
          style={{
            paddingTop: "2vh",
            display: "flex",
          }}
        >
          condition <Favorite sx={{ fontSize: "1.2em" }} />{" "}
          <Avatar
            sx={{
              width: 30,
              height: 30,
              marginLeft: 0.6,
              marginRight: 0.6,
            }}
          >
            <Icon>vital_signs</Icon>
          </Avatar>{" "}
          <Details sx={{ fontSize: "1.2em" }} /> Sharpness{" "}
        </div>
      </div>
    </div>
  );
};

export default AchievementAndMarketValueCard;