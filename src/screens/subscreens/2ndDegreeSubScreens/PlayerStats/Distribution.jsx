import { useSelector } from "react-redux";
import PlayerStatsDoughnut from "../../../../components/Charts/Doughnut/PlayerStatsDoughnut";
import { selectPlayerSelectedToView } from "../../../../statemanager/slices/PlayersInAgencySlice";

const Distribution = ({ Period }) => {
  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  // Write a snapshot function that receives data updated in realtime

  const { Statistics } = PlayerSelectedToViewObject;

  const filteredSeasonStats = Statistics.find((data) => {
    return data.Season === Period;
  });

  const { Distribution } = filteredSeasonStats || {};

  //   Assists

  // Received_passes

  // Succesful_cross_rate

  // Successful_key_passes

  // Successful_long_passes_rate *

  // Successful_pass_rate *

  // Successful_passes

  // Total_passes

  return (
    <div
      // className=""
      className="primaryColor md:flex md:flex-row sm:flex sm:flex-col sm:gap-[5vh]"
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {filteredSeasonStats === undefined ? (
        <div> we do not have records for this season </div>
      ) : (
        <>
          {/* PASS SUCCESS GRAPHS */}
          <div style={{ flex: ".4", display: "flex" }}>
            {/* Successful passes */}
            <div
              style={{
                flex: ".5",
                display: "grid",
                placeContent: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <PlayerStatsDoughnut
                PercentageSuccess={Distribution.Successful_pass_rate}
                Label={"Passes Success"}
              />
            </div>
            <div
              style={{
                flex: ".5",
                display: "grid",
                placeContent: "center",
                textAlign: "center",
              }}
            >
              <PlayerStatsDoughnut
                PercentageSuccess={Distribution.Successful_long_passes_rate}
                Label={"Long Passes Success"}
              />
            </div>
          </div>
          {/* Pass Direction , Passing Area and Other Ball Distribution info */}
          <div style={{ flex: ".6", display: "flex", gap: "2vw" }}>
            {/* // Crosses Success */}
            <PlayerStatsDoughnut
              PercentageSuccess={Distribution.Succesful_cross_rate}
              Label={"Crosses Success"}
            />

            <AttributesToFormat
              name="Total passes"
              number={Distribution.Total_passes}
            />
            <AttributesToFormat name="Assists" number={Distribution.Assists} />

            <AttributesToFormat
              name="Received Passes"
              number={Distribution.Received_passes}
            />
            <AttributesToFormat
              name="Key passes"
              number={Distribution.Successful_key_passes}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Distribution;

export const AttributesToFormat = ({ number, name, styles }) => {
  return (
    <span className="primaryColor" style={{ textAlign: "center", ...styles }}>
      {" "}
      <span
        style={{
          margin: "0",
          color: "#5585fe",
          fontWeight: "bolder",
          fontSize: "1.2em",
        }}
      >
        {number}
      </span>{" "}
      <br />
      <span style={{ fontSize: ".8em" }}> {name} </span>{" "}
    </span>
  );
};
