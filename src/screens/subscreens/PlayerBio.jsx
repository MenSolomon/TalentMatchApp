import { Card, Paper } from "@mui/material";
import pitch from "../../assets/images/pitch.jpg";
import FootBallPitch from "../../components/Cards/FootBallPitch";
import PlayerPositionStatsBarGraphSummary from "../../components/Charts/Bars/PlayerPositionStatsBarGraphSummary";
import PlayerOverallAttributes from "../../components/Charts/Bars/PlayerOverallAttributes";
// import PlayerPositionStatsBarGraphSummary from "../../components/Charts/Bars/PlayerPositionStatsBarGraphSummary";

const PlayerBio = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "40vh",
        // background: "teal",
        display: "flex",
      }}
    >
      <div style={{ flex: ".23", padding: ".3vw" }}>
        <FootBallPitch />
      </div>

      <div
        style={{
          flex: ".77",
          padding: ".3vw",
          // background: "red",
          paddingLeft: "1vw",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: ".5vw",
            background: "transparent",
          }}
        >
          <div className="div" style={{ flex: ".32" }}>
            {" "}
            <Card
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                borderBottom: "3px solid #0d818e",
                borderRight: "3px solid #0d818e",
                // borderTop: "2px solid #0d818e",
                padding: "1vw",
                // fontWeight: "800",
                borderRadius: "1vw",
              }}
            >
              <h6 style={{ fontWeight: "bolder" }}>Personal Information</h6>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Citizenship : Ghanaian{" "}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Place of birth : Ghanaian{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Date of birth : 12 february 2003{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Currnet Team : Ghanaian{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Joined : Ghanaian{" "}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Position : Ghanaian{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
              >
                {" "}
                Contract Expires : Ghanaian{" "}
              </div>
            </Card>{" "}
          </div>
          <div className="div" style={{ flex: ".33" }}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                borderBottom: "3px solid #0d818e",
                borderRight: "3px solid #0d818e",
                // borderTop: "2px solid #0d818e",
                paddingTop: "1vh",
                borderRadius: "1vw",
              }}
            >
              <PlayerPositionStatsBarGraphSummary />
            </Card>{" "}
          </div>
          <div className="div" style={{ flex: ".35" }}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                borderBottom: "3px solid #0d818e",
                borderRight: "3px solid #0d818e",
                // borderTop: "2px solid #0d818e",

                borderRadius: "1vw",
              }}
            >
              <PlayerOverallAttributes />
            </Card>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBio;
