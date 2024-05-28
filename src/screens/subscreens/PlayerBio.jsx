import { Card, Paper } from "@mui/material";
import pitch from "../../assets/images/pitch.jpg";
import FootBallPitch from "../../components/Cards/FootBallPitch";
import PlayerPositionStatsBarGraphSummary from "../../components/Charts/Bars/PlayerPositionStatsBarGraphSummary";
import PlayerOverallAttributes from "../../components/Charts/Bars/PlayerOverallAttributes";
import BasicButton from "../../components/Buttons/BasicButton";
import { selectIsSubscriptionActive } from "../../statemanager/slices/LoginUserDataSlice";
import { useSelector } from "react-redux";
// import PlayerPositionStatsBarGraphSummary from "../../components/Charts/Bars/PlayerPositionStatsBarGraphSummary";

const PlayerBio = ({
  Nationality,
  PlaceOfBirth,
  DateOfBirth,
  clubName,
  contractStartDate,
  contactEndDate,
  Position,
}) => {
  const dateObject = new Date(DateOfBirth);
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);

  // Get the date portion without the time and "GMT"
  const formattedDate = dateObject.toDateString();

  return (
    <div
      // className="lg:flex lg:flex-row  md:flex md:flex-col md:w-[100%] md:h-[40vh]  sm:flex sm:w-[100%] sm:h-[100%] sm:flex-col"
      className="md:flex md:flex-row md:w-[100%] md:h-[40vh]  sm:flex sm:w-[100%] sm:h-[100%] sm:flex-col"
      style={
        {
          // width: "100%",
          // height: "40vh",
          // background: "teal",
          // display: "flex",
          // background: "red",
        }
      }
    >
      <div
        className="sm:hidden md:hidden lg:block"
        style={{ flex: ".23", padding: ".3vw" }}
      >
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
          className="md:flex md:w-[100%] md:h-[100%] md:flex-row     sm:flex-col md:gap-[.5vw]  sm:gap-[10vw] sm:flex sm:w-[100%] sm:h-[100%]"
          style={{
            // width: "100%",
            // height: "100%",
            // display: "flex",
            // gap: ".5vw",
            background: "transparent",
          }}
        >
          <div className="div" style={{ flex: ".32" }}>
            {" "}
            <Card
              className="primaryColor"
              sx={{
                width: "100%",
                height: "100%",
                // background:
                //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                // borderBottom: "1px solid #0d818e",
                // borderRight: "1px solid #0d818e",
                // borderTop: "2px solid #0d818e",
                padding: "1vw",
                // fontWeight: "800",
                borderRadius: "1vw",
                background: "transparent",
              }}
            >
              <h6
                className="lg:text-[1em] tb:text-[1.4em]"
                style={{ fontWeight: "bolder" }}
              >
                Personal Information
              </h6>
              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Citizenship : {Nationality}{" "}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Place of birth : {PlaceOfBirth}{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Date of birth : {formattedDate}{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Currnet Team : {clubName}{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Joined : {contractStartDate}{" "}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Position : {Position}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Contract Expires : {contactEndDate}{" "}
              </div>
            </Card>{" "}
          </div>
          <div className="div" style={{ flex: ".33" }}>
            <Card
              className="primaryColor"
              sx={{
                width: "100%",
                height: "100%",
                // background:
                //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                // borderBottom: "1px solid #0d818e",
                // borderRight: "1px solid #0d818e",
                // borderTop: "2px solid #0d818e",
                paddingTop: "1vh",
                borderRadius: "1vw",
                background: "transparent",
              }}
            >
              {/* <PlayerPositionStatsBarGraphSummary /> */}
              <PlayerOverallAttributes />
            </Card>{" "}
          </div>
          <div
            className="div"
            style={{
              flex: ".35",
            }}
          >
            <Card
              className="primaryColor"
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                gap: "2vh",
                flexDirection: "column",
                padding: "2vh 1vw 0vh 1vw",
                // background:
                //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                // borderBottom: "1px solid #0d818e",
                // borderRight: "1px solid #0d818e",
                // borderTop: "2px solid #0d818e",

                borderRadius: "1vw",
                background: "transparent",
              }}
            >
              <BasicButton
                disabled={!subscriptionStatus}
                innerText="Request last 5 games detailed stats"
              />

              <BasicButton
                disabled={!subscriptionStatus}
                innerText="Request last 15 games detailed stats"
              />

              <BasicButton
                disabled={!subscriptionStatus}
                innerText="Request last 30 games detailed stats"
              />
            </Card>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBio;
