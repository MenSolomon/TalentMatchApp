import React from "react";
import { Divider } from "@mui/material";

function SettingsTerms() {
  return (
    <div
      className="md:flex md:flex-col primaryTextColor"
      style={{
        width: "100%",
        height: "82vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ flex: ".01" }}
        className="lg:text-[2.5em] md:text-[2.7em] tb:text-[2.2em]"
      >
        Terms of Service
      </div>
      {/* Divider */}
      <div style={{ flex: ".01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>
      <div style={{ flex: ".98" }}></div>
    </div>
  );
}

export default SettingsTerms;
