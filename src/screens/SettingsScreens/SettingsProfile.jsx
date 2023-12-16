import { Circle } from "@mui/icons-material";
import { Avatar, Button, Divider, Select, TextField } from "@mui/material";
import BasicSelect from "../../components/Selects/BasicSelect";
// import React from "react";

function SettingsProfile() {
  const carouselFilter = ["Berekum Chelsea", "Kotoko", "AUE"];
  return (
    <div
      className="md:flex md:flex-col "
      style={{
        width: "100%",
        height: "82vh",
        display: "flex",
        flexDirection: "column",
        // overflowY: "scroll",
      }}
    >
      {/* Header Column */}
      <div style={{ flex: "0.01" }}>
        <h5>My Profile Settings</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Sub Header Column */}
      <div
        className="md:flex md:flex-row "
        style={{ flex: "0.89", overflowY: "scroll" }}
      >
        <div className="md:flex md:flex-col" style={{ flex: "0.2" }}>
          <div style={{ flex: "0.5", padding: "0px 20px" }}>
            <h5>Edit Profile</h5>
          </div>
          <div style={{ flex: "0.5", padding: "0px 20px" }}>
            {/* <h5>Personal details</h5> */}
          </div>
        </div>
        <div className="md:flex md:flex-col" style={{ flex: "0.44" }}>
          <div
            style={{
              flex: "0.8",
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "2em",
                padding: "0px 20px",
                alignItems: "center",
                flex: "0.6",
                justifyContent: "center",
                // background: "Peru",
              }}
            >
              <Avatar style={{ width: "20%", height: "50%" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>UserName</b> <br />{" "}
                  <Button style={{ fontWeight: "lighter" }}>
                    change profile photo
                  </Button>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                flex: "0.2",
                // background: "yellow",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <TextField size="small" value={" first name"} />
                <br style={{ fontWeight: "lighter" }} /> Change user first Name
                here* (optional)
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                flex: "0.3",
                // background: "yellow",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <TextField size="small" value={" first name"} />
                <br style={{ fontWeight: "lighter" }} /> Change user surname
                here* (optional)
              </div>
            </div>
          </div>
          {/* Divider */}
        </div>
        {/* divider */}
        <div className="md:flex md:flex-col" style={{ flex: "0.05" }}>
          <Divider
            sx={{
              background: "wheat",
              width: "5%",
              // rotate: "1deg",
              height: "80%",
            }}
          />
        </div>
        {/* End of divider */}
        <div className="md:flex md:flex-col" style={{ flex: "0.3" }}>
          {/* <BasicSelect itemsArray={carouselFilter} label={"saved profile"} /> */}
          <div style={{ flex: "0.1" }}>
            <small> change home carousel filter here* (optional)</small>
            <BasicSelect itemsArray={carouselFilter} label={"saved profiles"} />
          </div>
          <div
            style={{ flex: "0.5", justifySelf: "baseline", display: "flex" }}
          >
            <div style={{ paddingTop: "30%" }}>
              <Button>Submit</Button>
            </div>
          </div>
          <div style={{ flex: "0.4" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>
                Delete your account and all of your source data. <br /> This is
                irreversible.
              </small>
              <Button size="small" style={{ float: "left", width: "20vw" }}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsProfile;
