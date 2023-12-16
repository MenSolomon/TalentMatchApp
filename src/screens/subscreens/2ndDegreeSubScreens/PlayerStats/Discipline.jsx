import { useSelector } from "react-redux";
import { selectPlayerSelectedToView } from "../../../../statemanager/slices/PlayersInAgencySlice";

const Discipline = ({ Period }) => {
  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  // Write a snapshot function that receives data updated in realtime

  const { Statistics } = PlayerSelectedToViewObject;

  const filteredSeasonStats = Statistics.find((data) => {
    return data.Season === Period;
  });

  console.log(filteredSeasonStats);

  const { Discipline } = filteredSeasonStats;
  console.log(Discipline);

  return (
    <div
      className="primaryColor"
      style={{ width: "100%", height: "100%", display: "flex", gap: "5vw" }}
    >
      <CardDisplay
        CardName="Yellow Cards"
        number={Discipline.Yellow_cards}
        borderColor="yellow"
        backgroundColor="#FFFAC2"
      />
      <CardDisplay
        CardName="Red Cards"
        number={Discipline.Red_cards}
        borderColor="red"
        backgroundColor="#FCD3C1"
      />

      <AttributesToFormat
        name="Fouls conceeded"
        number={Discipline.Fouls_conceeded}
      />
      <AttributesToFormat name="Fouls won" number={Discipline.Fouls_won} />
    </div>
  );
};

export default Discipline;

export const AttributesToFormat = ({ number, name }) => {
  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <span style={{ textAlign: "center" }}>
        {" "}
        <span
          style={{
            margin: "0",
            color: "#5585fe",
            fontWeight: "bolder",
            fontSize: "1.6em",
          }}
        >
          {number}
        </span>{" "}
        <br />
        <span style={{ fontSize: "1em" }}> {name} </span>{" "}
      </span>
    </div>
  );
};

export const CardDisplay = ({
  CardName,
  backgroundColor,
  borderColor,
  number,
}) => {
  return (
    <div
      style={{ textAlign: "center", display: "grid", placeContent: "center" }}
    >
      <div
        style={{
          width: "6vw",
          height: "18vh",
          border: `1px solid ${borderColor}`,
          background: backgroundColor,
          display: "grid",
          placeContent: "center",
          borderRadius: ".4vw",
          marginBottom: "1.5vh",
          color: "black",
        }}
      >
        {number}
      </div>
      {CardName}
    </div>
  );
};
