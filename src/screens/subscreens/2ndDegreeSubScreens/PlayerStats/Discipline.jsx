const Discipline = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", gap: "5vw" }}>
      <CardDisplay
        CardName="Yellow Cards"
        number="4"
        borderColor="yellow"
        backgroundColor="#FFFAC2"
      />
      <CardDisplay
        CardName="Red Cards"
        number="7"
        borderColor="red"
        backgroundColor="#FCD3C1"
      />

      <AttributesToFormat name="Fouls conceeded" number="20" />
      <AttributesToFormat name="Fouls won" number="5" />
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
        }}
      >
        {number}
      </div>
      {CardName}
    </div>
  );
};
