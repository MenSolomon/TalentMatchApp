import { Button, Divider, Select, Switch, TextField } from "@mui/material";
import { Circle } from "@mui/icons-material";
import React from "react";

function SettingsSecurity() {
  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[82vh]   sm:w-[100%] sm:h-[82vh] sm:flex sm:flex-col primaryTextColor "
      style={
        {
          // width: "100%",
          // height: "82vh",
          // display: "flex",
          // flexDirection: "column",
          // overflowY: "scroll",
        }
      }
    >
      {/* Header Column */}
      <div
        className="md:flex md:flex-row  sm:flex sm:flex-row"
        style={{ flex: "0.01" }}
      >
        <h5>Password & Security Settings</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Sub Header Column */}
      <div
        // className="md:flex md:flex-row md:gap-[0em] sm:flex sm:flex-col sm:gap-[1em]"
        style={{ flex: "0.89", display: "flex", flexDirection: "column" }}
      >
        <h5>Set up security and login account</h5> <br />
        <div
          className="sm:flex sm:flex-col md:flex md:flex-row"
          style={{ flex: ".9" }}
        >
          {/* // LEFT FORM */}

          <div style={{ flex: ".3", display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "4vh" }}>
              Enter full Name here* (optional)
              <br />
              <TextField size="small" value={" first name"} />
            </div>
            {/* Change user surname
      here* */}
            <div style={{ marginBottom: "4vh" }}>
              Change user surname here*
              <br />
              <TextField size="small" value={" surname"} />
            </div>
            {/* Comopome */}
            <div style={{ marginBottom: "4vh" }}>
              Change user Tel number here*
              <br />
              <TextField
                size="small"
                // sx={{ width: "100%" }}
                value={" number"}
              />
            </div>
          </div>

          {/* // RIGHT FORM */}

          <div style={{ flex: ".5", display: "flex", flexDirection: "column" }}>
            {/* OLD PASSWORD */}
            <div style={{ marginBottom: "4vh" }}>
              Enter current Password here*
              <br />
              <TextField
                size="small"
                value={"Password"}
                // sx={{ width: "100%" }}
              />
            </div>
            {/* NEW PASSWORD */}

            <div style={{ marginBottom: "4vh" }}>
              Enter New Password here*
              <br />
              <TextField
                size="small"
                // sx={{ width: "100%" }}
                value={"Password"}
              />
            </div>

            <div style={{ marginBottom: "4vh" }}>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSecurity;
