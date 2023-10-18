import { AccountCircleOutlined, Close, Flag } from "@mui/icons-material";
import { Card, Divider } from "@mui/material";
import PlayerComparisonAccordion from "../../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";

function PlayerComparisonDetails() {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <div
        className="primaryTextColor cardBackground"
        style={{
          // background: "peru",
          width: "25vw",
          height: "80vh",
          // margin: "19px",
          display: "flex",
          flexDirection: "column",
          //   borderRadius: "10px",
        }}
      >
        {/* Player Profiles */}
        <div
          style={{
            flex: ".3",
            // background: "pink",
            display: "flex",
            padding: "10px",
          }}
        >
          <div
            style={{
              flex: ".7",
              // background: "peru",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: ".5",
                //   background: "green",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AccountCircleOutlined sx={{ fontSize: "65px" }} />
            </div>
            <div
              style={{
                flex: ".5",
                //   background: "cyan",
              }}
            >
              <div
                style={{
                  marginTop: "10px",
                }}
              ></div>
              <h6>Wakaso Muncho J.</h6>
              <h6>midfielder</h6>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Close />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Flag sx={{ fontSize: "50px" }} />
            </div>
          </div>
        </div>
        <div style={{ flex: ".1", padding: "10px" }}>
          <h5>Clubs</h5>
          <Divider style={{ background: "black" }} />
          <div>
            <h6>Club Name: Odabo</h6>
            <h6>Club Seasons: Odabo</h6>
          </div>
        </div>
        <div
          style={{
            flex: ".6",
            // background: "pink",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          <PlayerComparisonAccordion />
        </div>
      </div>
    </Card>
  );
}

export default PlayerComparisonDetails;
