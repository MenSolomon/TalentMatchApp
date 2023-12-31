import { Button, Card, Divider, Paper } from "@mui/material";
import React from "react";
import FilteredPlayersTable from "../../components/Tables/FilterPlayersTable";

function SettingsBilling() {
  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[82vh]   sm:flex sm:flex-col sm:w-[100%] sm:h-[82vh]  primaryTextColor"
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
      <div style={{ flex: "0.01" }}>
        <h5>Billing</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Page content*/}
      <div className="md:flex md:flex-col " style={{ flex: "0.89" }}>
        <div
          style={{
            flex: ".35",
            // background: "red",
            display: "flex",
            flexDirection: "row",
            marginBottom: "5vh",
            gap: "5em",
          }}
        >
          <Paper
            className="cardBackground primaryTextColor md:w-[30vw] md:h-[90%] md:flex md:flex-col sm:pt-[20px]   sm:w-[90vw] sm:h-[15vh] sm:flex sm:flex-col"
            style={{ padding: "10px 20px" }}
          >
            <div
              style={{
                flex: ".3",
                // background: "green",
                display: "flex",
                flexDirection: "row",
                // alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <div className="padding" style={{ flex: ".7" }}>
                {/* <ul
                  className="primaryTextColor"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                    paddingTop: "5px",
                  }}
                >
                  <li></li>
                  <li></li>
                  <li></li>
                </ul> */}
                Pro Plan Money Active
              </div>
              <div style={{ flex: ".3" }}>
                <div style={{ padding: "5px 0px" }}>
                  <Button variant="outlined">Upgrade</Button>
                </div>
              </div>
            </div>
            <div style={{ flex: ".7" }}>
              <div>
                It let you add 1 pro website. <br />
                Next Billing Date: <span>16 March, 201</span>
              </div>
            </div>
          </Paper>
        </div>
        <div
          style={{
            flex: ".3",
            // background: "red
            marginBottom: "3vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: ".7" }}>
            <div style={{ padding: "10px 20px" }}>
              <h4>Payment method</h4>
              <small>modify your payment method for future payments</small>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ padding: "10px 0px" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "start",
                  // padding: "10px",
                }}
                size="small"
                variant="outlined"
              >
                change payment method
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: ".4",
            // background: "brown",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: ".7" }}>
            <div style={{ padding: "10px 20px" }}>
              <h4>Pause or cancel subscription</h4>
              <small>
                By canceling your account you will lose all your data and
                currently active subscriptions as well.
              </small>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ padding: "10px 0px" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "start",
                  // padding: "10px",
                }}
                size="small"
                variant="outlined"
              >
                cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsBilling;
