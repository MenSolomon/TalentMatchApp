import { Divider, Switch } from "@mui/material";
import React from "react";

function SettingsNotifications() {
  return (
    <div
      className="md:flex md:flex-col "
      style={{
        // background: "red",
        width: "100%",
        height: "82vh",
      }}
    >
      {/* head columns */}
      <div className="md:flex md:flex-row " style={{ flex: "0.01" }}>
        NOTIFICATIONS
      </div>
      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>
      {/* main columns */}
      <div className="md:flex md:flex-row " style={{ flex: "0.89" }}>
        {/* Left columns for Email & Push notifications */}
        <div
          className="md:flex md:flex-col "
          style={{ flex: "0.4", gap: "3em" }}
        >
          {/* Email Notifications */}
          <div style={{ flex: "0.5", padding: "0px 30px" }}>
            <h5>Email Notifications</h5>
            <small>
              Get Emails to find out what's going <br /> on when you're are not
              online
            </small>
          </div>

          {/* Push Notifications */}
          <div style={{ flex: "0.5", padding: "0px 30px" }}>
            <h5>Push Notifications</h5>
            <small>
              Get Push Notifications to find out what's going <br /> on when
              you're are not online
            </small>
          </div>
        </div>

        {/* Right columns for Email & Push Options */}
        <div className="md:flex md:flex-col" style={{ flex: "0.6" }}>
          <div className="md:flex md:flex-col" style={{ flex: "0.5" }}>
            <div
              style={{
                flex: "0.3",
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                alignItems: "center",
              }}
            >
              <Switch />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>News and update</b> <br />
                  <small style={{ fontWeight: "lighter" }}>
                    {" "}
                    News about product and features updates
                  </small>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "0.3",
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                alignItems: "center",
              }}
            >
              <Switch />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>Comments</b> <br />
                  <small style={{ fontWeight: "lighter" }}>
                    comment on your project
                  </small>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "0.4",
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                alignItems: "center",
              }}
            >
              <Switch />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>Reminders</b> <br />
                  <small style={{ fontWeight: "lighter" }}>
                    {" "}
                    This are notifications to remind you of updates <br /> you
                    might have missed
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div style={{ flex: "0.01" }}>
            <Divider sx={{ background: "wheat", width: "100%" }} />
          </div>
          <div className="md:flex md:flex-col" style={{ flex: "0.3" }}>
            <div
              style={{
                flex: "0.5",
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                alignItems: "center",
              }}
            >
              <Switch />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>Comments</b> <br />
                  <small style={{ fontWeight: "lighter" }}>
                    comment on your project
                  </small>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "0.5",
                display: "flex",
                gap: "1em",
                padding: "0px 20px",
                alignItems: "center",
              }}
            >
              <Switch />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>Reminders</b> <br />
                  <small style={{ fontWeight: "lighter" }}>
                    {" "}
                    This are notifications to remind you of updates <br /> you
                    might have missed
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsNotifications;
