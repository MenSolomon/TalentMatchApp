import { Button, Divider, Select, Switch, TextField } from "@mui/material";
import { Circle } from "@mui/icons-material";
import React from "react";

function SettingsSecurity() {
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
        <h5>Password & Security Settings</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Sub Header Column */}
      <div className="md:flex md:flex-row " style={{ flex: "0.89" }}>
        <div style={{ flex: ".3" }}>
          <h5>Set up security and login account</h5>
        </div>
        <div className="md:flex md:flex-row" style={{ flex: ".7" }}>
          {/* Account Editing */}
          <div style={{ flex: "0.45" }}>
            <div
              className="md:flex md:flex-col"
              style={{ flex: "1", overflowY: "scroll" }}
            >
              <div
                style={{
                  flex: "0.2",
                  display: "flex",
                  padding: "0px 20px",
                  justifyContent: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "start",
                  }}
                >
                  <TextField size="small" value={" first name"} />
                  <br style={{ fontWeight: "lighter" }} /> Enter full Name here*
                  (optional)
                </div>
              </div>
              <div
                style={{
                  flex: "0.2",
                  display: "flex",
                  padding: "0px 20px",
                  justifyContent: "start",
                }}
              >
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <TextField size="small" value={" surname"} />
                  <br style={{ fontWeight: "lighter" }} /> Change user surname
                  here*
                </div> */}
              </div>
              <div
                style={{
                  flex: "0.2",
                  display: "flex",
                  padding: "0px 20px",
                  justifyContent: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <TextField
                    size="small"
                    sx={{ width: "100%" }}
                    value={" number"}
                  />
                  <br style={{ fontWeight: "lighter" }} /> Change user Tel
                  number here* (optional)
                </div>
              </div>
              <div
                style={{
                  flex: "0.2",
                  display: "flex",
                  padding: "0px 20px",
                  justifyContent: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <TextField
                    size="small"
                    value={"Password"}
                    sx={{ width: "100%" }}
                  />
                  <br style={{ fontWeight: "lighter" }} /> Enter current
                  Password here*
                </div>
              </div>
              <div
                style={{
                  flex: "0.2",
                  display: "flex",
                  padding: "0px 20px",
                  justifyContent: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                    justifyContent: "start",
                    textAlign: "center",
                  }}
                >
                  <TextField
                    size="small"
                    sx={{ width: "100%" }}
                    value={"Password"}
                  />
                  <br style={{ fontWeight: "lighter" }} /> Enter New Password
                  here*
                </div>
              </div>
            </div>
          </div>

          {/* ============================ */}
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
          {/* ================================ */}
          {/* Privacy */}
          <div
            className="md:flex md:flex-col"
            style={{ flex: "0.4", gap: "1em" }}
          >
            <div style={{ flex: "0.01" }}>
              <h4>Privacy</h4>
            </div>
            <div style={{ flex: "0.01" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>Make my account public</div>
              </div>
            </div>
            <div style={{ flex: "0.01" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5em" }}
              >
                <div>Anyone can leave comment</div>
              </div>
            </div>
            <div style={{ flex: "0.01" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5em" }}
              >
                <div>Connect with facebook</div>
              </div>
            </div>
            <div style={{ flex: "0.01" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5em" }}
              >
                <div>Show my activity</div>
              </div>
            </div>
            <div style={{ flex: "0.95" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "45%",
                }}
              >
                <Button>Submit</Button>
              </div>
            </div>
          </div>
          {/* On & OFF Switch */}
          <div
            className="md:flex md:flex-col"
            style={{ flex: "0.1", gap: ".5em" }}
          >
            <div style={{ flex: "0.01" }}>
              <small>Switches</small>
            </div>
            <div style={{ flex: "0.01" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Switch />
                <small>off</small>
              </div>
            </div>
            <div style={{ flex: "0.01" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Switch />
                <small>off</small>
              </div>
            </div>
            <div style={{ flex: "0.01" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Switch />
                <small>off</small>
              </div>
            </div>
            <div style={{ flex: "0.01" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Switch />
                <small>off</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSecurity;
