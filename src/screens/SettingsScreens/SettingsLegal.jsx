import React from "react";
import { Divider } from "@mui/material";
import TermsAndConditionsModal from "../../components/Modals/TermsAndConditionsModal";
import PrivacyModal from "../../components/Modals/PrivacyModal";

function SettingsLegal() {
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
        className="lg:text-[1em] md:text-[1em] tb:text-[1em]"
      >
        Legal Terms of Service
      </div>
      {/* Divider */}
      <div style={{ flex: ".01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>
      <div style={{ flex: ".98", paddingTop: "3vh" }}>
        <TermsAndConditionsModal />
        <Divider
          sx={{
            background: "white",
            width: "100%",
            marginTop: "3vh",
            marginBottom: "1vh",
          }}
        />

        <PrivacyModal />
      </div>
    </div>
  );
}

export default SettingsLegal;
