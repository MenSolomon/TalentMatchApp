import React from "react";
import SupportSettingsAccordion from "../components/Accordions/SupportSettingsAccordion/SupportSettingsAccordion";

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
      <div style={{ flex: "0.2", background: "red", overflow: "scroll" }}>
        <SupportSettingsAccordion />
      </div>

      {/* second flex middle */}
      <div style={{ flex: "0.6", background: "peru" }}></div>

      {/* third flex right */}
      <div style={{ flex: "0.2", background: "red" }}></div>
    </div>
  );
};

export default SupportSettings;
