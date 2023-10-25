import { Settings } from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import React from "react";
import imageBackground from "../../../assets/images/FootballLogo.jpg";

const SupportCard = ({ btn, g1, g2, g3, cardHeader, icon }) => {
  return (
    <>
      <Card
        style={{
          width: "25%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          padding: "5px",
          // textAlign: "center",
          backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            flex: "0.1",
            // textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            flex: "0.1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h6
            style={{
              fontWeight: "bold",
              display: "flex",
              textAlign: "center",
              // background: "red",
              color: "red",
            }}
          >
            {cardHeader} {/* General settings */}
          </h6>
        </div>
        <div
          style={{
            flex: "0.6",
            // background: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
            fontSize: "small",
            color: "white",
          }}
        >
          <div>{g1} </div> {/* Activate your Account */}
          <div>{g2}</div> {/* Download your Invoice */}
          <div>{g3}</div> {/* Move from One Team to Another */}
        </div>

        <div
          style={{
            flex: "0.2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained">{btn}</Button> {/* Go to settings */}
        </div>
      </Card>
    </>
  );
};

export default SupportCard;
