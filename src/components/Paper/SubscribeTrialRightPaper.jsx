import { Button, Card, Divider, Paper } from "@mui/material";
import SubscribeTrialCardHeader from "../Cards/SubscribeTrialCardHeader";

const SubscribeTrialRightPaper = () => {
  return (
    <>
      <Card
        sx={{
          width: "60%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          //   background: "red",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            flex: "0.7",
            display: "flex",
            flexDirection: "column",
            // background: "peru",
          }}
        >
          {/* Header */}
          <div style={{ flex: "0.2", fontWeight: "bold", padding: "5px" }}>
            <h3>Summary</h3>
          </div>
          {/* list*/}

          <div style={{ flex: "0.8", padding: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ borderRadius: "50px", border: "1px solid blue" }}
                  >
                    icon
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>
                    {" "}
                    Independent Coach Membership{" "}
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    200.0 E
                  </div>
                  <div
                    style={{
                      marginLeft: "7px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    every
                  </div>
                </div>
              </div>
            </div>
            <Divider style={{ background: "blue" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ borderRadius: "50px", border: "1px solid blue" }}
                  >
                    1 x
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>
                    {" "}
                    Copper Video Pack
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    200.0 E
                  </div>
                  <div
                    style={{
                      marginLeft: "7px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    every
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================== */}
        </div>
        {/* SubHeader */}
        <div style={{ flex: "0.1", fontWeight: "bold", padding: "5px" }}>
          <h3>what's include</h3>
        </div>
        {/* BTN and list */}
        <div
          style={{
            flex: "0.2",
            display: "grid",
            placeContent: "center",
            padding: "10px",
            // background: "green",
          }}
        >
          <Button variant="outlined"> start a free trail </Button>
          <small>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            perferendis beatae officiis dolorem error sint. Sit quidem dolor
            doloribus. Consectetur fugit ad illum! Consequatur ex impedit at
            quasi. Ipsam, ut.
          </small>
        </div>
      </Card>
    </>
  );
};

export default SubscribeTrialRightPaper;
