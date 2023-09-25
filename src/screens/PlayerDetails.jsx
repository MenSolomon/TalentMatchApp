import { Avatar, Card } from "@mui/material";
import React from "react";
import ronaldo from "../assets/images/Ronaldo.png";

const PlayerDetails = () => {
  const hTagStyle = {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
  };

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
              background: "#20316F",
              padding: "1.5vw",
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
                color: "#C7E980",
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
            sx={{ width: "100%", height: "100%", background: "#12193F" }}
          ></Card>{" "}
        </div>
        {/* Achievements and Trophies Area */}
        <div style={{ flex: ".27", padding: "1vw" }}>
          {" "}
          <Card
            sx={{ width: "100%", height: "100%", background: "#20316F" }}
          ></Card>{" "}
        </div>
        {/* Socials And Contact Area */}
        <div style={{ flex: ".2", padding: "1vw" }}>
          {" "}
          <Card
            sx={{ width: "100%", height: "100%", background: "#12193F" }}
          ></Card>{" "}
        </div>
      </div>
      <div style={{ gridArea: "MenuStrip", background: "red" }}></div>
      <div style={{ gridArea: "ContentArea" }}></div>
    </div>
  );
};

export default PlayerDetails;
