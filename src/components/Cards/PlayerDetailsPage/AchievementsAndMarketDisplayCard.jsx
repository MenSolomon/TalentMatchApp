import { Details, Favorite } from "@mui/icons-material";
import { Avatar, Card, Icon } from "@mui/material";
import BasicButton from "../../Buttons/BasicButton";

const AchievementAndMarketValueCard = ({ worldCup, BalonDor, uefa }) => {
  return (
    <div
      className="playerCard"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1vw",
        padding: "1.5vw",
        display: "flex",
        color: "black",
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
