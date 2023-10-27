import React from "react";
import SupportSettingsAccordion from "../components/Accordions/SupportSettingsAccordion/SupportSettingsAccordion";
import { Divider } from "@mui/material";
import { Email } from "@mui/icons-material";

const SupportSettings = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "green",
        display: "flex",
      }}
    >
      {/* first flex left */}
      <div style={{ flex: "0.2", background: "white", overflow: "scroll" }}>
        <SupportSettingsAccordion />
      </div>

      {/* second flex middle */}
      <div style={{ flex: "0.6", background: "peru" }}></div>

      {/* third flex right */}
      <div
        style={{
          flex: "0.2",
          background: "white",
          display: "flex",
          gap: "25px",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h5 style={{ textAlign: "center" }}>Available languages</h5>
        <ul
          style={{ display: "grid", placeContent: "center", fontSize: "15px" }}
        >
          <li className="lang">English</li>
          <li className="lang">Français</li>
          <li className="lang">Italiano</li>
          <li className="lang">Español </li>
        </ul>

        <div
          style={{
            textAlign: "center",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          className="lang"
        >
          <Email />
          <h6 style={{ marginTop: "10px" }}>Contact Support</h6>
        </div>
      </div>
    </div>
  );
};

export default SupportSettings;
