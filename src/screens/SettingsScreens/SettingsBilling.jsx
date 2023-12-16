import { Button, Card, Divider, Paper } from "@mui/material";
import React from "react";
import FilteredPlayersTable from "../../components/Tables/FilterPlayersTable";

function SettingsBilling() {
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
        <h5>Billing</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Sub Header Column */}
      <div className="md:flex md:flex-col " style={{ flex: "0.89" }}>
        <div
          style={{
            flex: ".3",
            // background: "red",
            display: "flex",
            flexDirection: "row",
            gap: "5em",
          }}
        >
          <div style={{ flex: "1" }}>
            <Card style={{ width: "40%", height: "100%" }}>
              <Paper
                style={{
                  width: "100%",
                  display: "flex",
                  height: "90%",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  flexDirection: "column",
                  background: "peru",
                }}
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
                  <div style={{ flex: ".7" }}>
                    <ul
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5em",
                        paddingTop: "5px",
                      }}
                    >
                      <li>Pro Plan</li>
                      <li>Money</li>
                      <li>Active</li>
                    </ul>
                  </div>
                  <div style={{ flex: ".3" }}>
                    <div style={{ padding: "5px 0px" }}>
                      <Button variant="outlined">Upgrade</Button>
                    </div>
                  </div>
                </div>
                <div style={{ flex: ".7" }}>
                  <div style={{ padding: "0px 20px" }}>
                    It let you add 1 pro website. <br />
                    Next Billing Date: <span>16 March, 201</span>
                  </div>
                </div>
              </Paper>
            </Card>
          </div>
          {/* <div style={{ flex: "0.5" }}>
            <Card style={{ width: "100%", height: "100%" }}>
              <Paper
                style={{
                  width: "100%",
                  display: "flex",
                  height: "90%",
                  flexDirection: "column",
                  background: "peru",
                }}
              >
                <div
                  style={{
                    flex: ".3",
                 
                    display: "flex",
                    flexDirection: "row",
                   
                  }}
                >
                  <div style={{ flex: ".7" }}>
                    <ul
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5em",
                        paddingTop: "5px",
                      }}
                    >
                      <li>Pro Plan</li>
                      <li>Money</li>
                      <li>Active</li>
                    </ul>
                  </div>
                  <div style={{ flex: ".3" }}>
                    <div style={{ padding: "5px 0px" }}>
                      <Button variant="outlined">Upgrade</Button>
                    </div>
                  </div>
                </div>
                <div style={{ flex: ".7" }}>
                  <div style={{ padding: "0px 20px" }}>
                    It let you add 1 pro website. <br />
                    Next Billing Date: <span>16 March, 201</span>
                  </div>
                </div>
              </Paper>
            </Card>
          </div> */}
        </div>
        <div
          style={{
            flex: ".3",
            // background: "red",
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
