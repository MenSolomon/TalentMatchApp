import { Divider, Switch } from "@mui/material";
import React from "react";

function SettingsNotifications() {
  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[80vh]   sm:w-[100%] sm:h-[80vh] sm:flex sm:flex-col primaryTextColor "
      style={
        {
          // background: "red",
          // width: "100%",
          // height: "82vh",
        }
      }
    >
      {/* head columns */}
      <div
        className="lg:text-[1em] md:text-[1em] tb:text-[1em] md:flex md:flex-row md:basis-[1%] sm:basis-[1%]  sm:flex sm:flex-row"
        // style={{ flex: "0.01" }}
      >
        NOTIFICATIONS
      </div>
      {/* Divider */}
      <div className="md:basis-[1%] sm:basis-[1%]">
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>
      {/* main columns */}
      <div
        className="md:flex md:flex-row md:basis-[89%]  sm:basis-[89%] sm:flex sm:flex-row"
        // style={{ flex: "0.89" }}
      >
        {/* Left columns for Email & Push notifications */}
        {/* <div
          className="md:flex md:flex-col  sm:flex sm:flex-row"
          style={{ flex: "0.4", gap: "3em" }}
        >
          Email Notifications
          <div style={{ flex: "0.5" }}>
            <h5>Email Notifications</h5>
            <small>
              Get Emails to find out what's going <br /> on when you're are not
              online
            </small>
          </div>

          Push Notifications
          <div style={{ flex: "0.5" }} className="sm:hidden md:hidden">
            <h5>Push Notifications</h5>
            <small>
              Get Push Notifications to find out what's going <br /> on when
              you're are not online
            </small>
          </div>
        </div> */}

        {/* Right columns for Email & Push Options */}
        <div
          className="md:flex md:flex-col  sm:flex sm:flex-col "
          style={{ flex: "1" }}
        >
          <div
            className="md:flex md:flex-col   sm:flex sm:flex-col"
            style={{ flex: "0.5" }}
          >
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
              <div className="md:flex md:flex-col   sm:flex sm:flex-col">
                <div className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
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
              {/* className="lg:text-[1.2em] md:text-[1.4em] tb:text-[1.2em]" */}
              <Switch />
              <div className="md:flex md:flex-col   sm:flex sm:flex-col">
                <div className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
                  <b>Messages</b> <br />
                  <small style={{ fontWeight: "lighter" }}>
                    Get notifications when you receive a message
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
              <div className="md:flex md:flex-col   sm:flex sm:flex-col">
                <div className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
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
        </div>
      </div>
    </div>
  );
}

export default SettingsNotifications;
