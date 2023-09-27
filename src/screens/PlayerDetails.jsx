import {
  Avatar,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import React from "react";
import ronaldo from "../assets/images/Ronaldo.png";
import manu from "../assets/images/manunited.png";
import ghana from "../assets/images/ghana.png";
import uefa from "../assets/images/uefa.png";
import BalonDor from "../assets/images/BalonDor.png";
import worldCup from "../assets/images/worldCup.png";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import instagram from "../assets/images/instagram.svg";
import x from "../assets/images/x.svg";

import {
  Details,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
} from "@mui/icons-material";
import PlayerDetailsMenuTab from "../components/Tabs/PlayerDetailsTab";

const PlayerDetails = () => {
  const hTagStyle = {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
  };

  const menuLabelArray = [
    "Bio",
    "Stats",
    "News",
    "MarketValue",
    "Achievements",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: "blue",
        display: "grid",
        gridTemplateRows: "35% 10% 55%",
        gridTemplateColumns: "1fr",
        gridTemplateAreas: `"CardDisplay""MenuStrip""ContentArea"`,
      }}
    >
      {/* // Card Display Area */}
      <div style={{ gridArea: "CardDisplay", display: "flex" }}>
        {/* // Image And Name Area */}
        <div style={{ flex: ".26", padding: "1vw" }}>
          {" "}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
              padding: "1.5vw",
              borderBottom: "3px solid #BECBCC",
              borderRight: "3px solid #BECBCC",
              borderRadius: "1vw",
              display: "flex",
              //   borderRadius: "1vw",
            }}
          >
            {/* // Image flex area */}
            <div style={{ flex: ".4" }}>
              {" "}
              <img
                src={ronaldo}
                style={{ width: "100%", borderRadius: "5%" }}
              />{" "}
            </div>
            {/* // names flex area */}
            <div
              style={{
                flex: ".6",
                color: "white",
                paddingLeft: ".4vw",
              }}
            >
              {/* // Names */}
              <h5 style={hTagStyle}> Cristiano </h5> <h5> Ronaldo </h5>{" "}
              {/* // Age And Postion */}
              <div style={{ width: "100%", height: "35%", display: "flex" }}>
                <div style={{ flex: ".4" }}>
                  {/* **** Reduce the size of Age label */}
                  <h6 style={hTagStyle}>Age</h6>
                  <h6>20</h6>
                </div>
                <div
                  style={{
                    flex: ".6",

                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: ".6vh",
                  }}
                >
                  <div style={{ flex: "0.5" }}></div>
                  {/* // POSTION PLACEMENT */}
                  <div style={{ flex: "0.5", display: "flex" }}>
                    <Avatar
                      src=""
                      alt=""
                      sx={{
                        width: 18,
                        height: 18,
                        background: "#384DCB",
                        marginRight: ".4vw",
                      }}
                    >
                      <img src="" alt="" />
                    </Avatar>
                    ST
                  </div>
                </div>
              </div>
            </div>
          </Card>{" "}
        </div>
        {/* Club and Value Area */}
        <div style={{ flex: ".27", padding: "1vw" }}>
          {" "}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
              padding: "1.5vw",
              display: "flex",
              flexDirection: "column",
              borderBottom: "3px solid #BECBCC",
              borderRight: "3px solid #BECBCC",
              borderRadius: "1vw",
              color: "white",
            }}
          >
            {/* Club name and Club Image Area , Nationality Area */}
            <div
              style={{
                // background: "white",
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: "0.5", display: "flex" }}>
                {/* Club name Nationality */}
                <div
                  style={{
                    flex: ".7",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: ".6" }}>
                    {" "}
                    <p
                      style={{
                        lineHeight: 1,
                        marginBottom: 0,
                        marginTop: 0,
                        paddingBottom: 0,
                        paddingTop: 0,
                        textAlign: "right",
                        fontSize: ".94em",
                      }}
                    >
                      Manchester United Football Club
                    </p>{" "}
                  </div>
                  <div style={{ flex: ".4" }}>
                    {" "}
                    <img
                      src={ghana}
                      style={{ width: "40px", float: "right" }}
                    />{" "}
                  </div>
                </div>

                {/* Club Image */}
                <div style={{ flex: ".3", paddingLeft: ".3vw" }}>
                  <img src={manu} style={{ width: "100%" }} />
                </div>
              </div>
              {/* // Height And Preffered Foot Area */}
              <div>
                {" "}
                <h6 style={{ ...hTagStyle, fontSize: ".95em" }}>
                  Preferred foot : Left
                </h6>{" "}
                <h6 style={{ ...hTagStyle, fontSize: ".95em" }}>
                  Height : 5'11''
                </h6>{" "}
              </div>
            </div>
          </Card>{" "}
        </div>
        {/* Achievements and Trophies Area */}
        <div style={{ flex: ".27", padding: "1vw" }}>
          {" "}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
              borderBottom: "3px solid #0d818e",
              borderRight: "3px solid #0d818e",
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
              <Card
                sx={{
                  width: "4vw",
                  height: "4vh",
                  marginLeft: "1vw",
                  background: "#9AB579",
                  color: "#20316F",
                  textAlign: "center",
                }}
              >
                {" "}
                $10m{" "}
              </Card>{" "}
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
          </Card>{" "}
        </div>
        {/* Socials And Contact Area */}
        <div style={{ flex: ".2", padding: "1vw" }}>
          {" "}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
              borderBottom: "3px solid #0d818e",
              borderRight: "3px solid #0d818e",
              borderRadius: "1vw",
              paddingTop: "1.5vw",
              paddingLeft: "1.5vw",

              color: "black",
            }}
          >
            {/* <Card
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                borderBottom: "3px solid #0d818e",
                borderRight: "3px solid #0d818e",
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
              <img src={facebook} style={{ width: "20%" }} />{" "}
              <img src={instagram} style={{ width: "20%" }} />{" "}
              {/* <img src={x} style={{ width: "25%", height: "100%" }} />{" "} */}
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarBorder sx={{ color: "white" }} />}
                  checkedIcon={<Star />}
                />
              }
              label={
                <span style={{ fontSize: "0.8em" }}>Mark as favourite</span>
              }
              sx={{ fontSize: ".8em" }}
            />
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                background:
                  "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",

                borderRadius: ".5vw",
                color: "white",
              }}
            >
              Show interest
            </Button>
          </Card>{" "}
        </div>
      </div>
      <div style={{ gridArea: "MenuStrip" }}>
        <PlayerDetailsMenuTab PlayerTabItemsArray={menuLabelArray} />
      </div>
      <div style={{ gridArea: "ContentArea" }}></div>
    </div>
  );
};

export default PlayerDetails;
