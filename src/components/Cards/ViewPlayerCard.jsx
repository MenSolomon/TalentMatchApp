import { Card } from "@mui/material";
import ROnaldo from "../../assets/images/RonaldoImage.png";

const ViewPlayerCard = ({
  image,
  firstName,
  surName,
  age,
  nationality,
  position,
  jerseyNumber,
}) => {
  return (
    <Card
      className="cardBackground primaryTextColor"
      style={{
        display: "flex",
        width: "24.7vw",
        height: "20vh",
        borderRadius: "1vw",
        padding: ".7vw",
        gap: ".4vw",
        marginRight: "1.2vw",
      }}
    >
      {/* Image Area */}
      <div style={{ flex: ".25" }}>
        <img
          src={image}
          style={{ width: "100%", height: "100%", borderRadius: ".8vw" }}
        />

        {}
      </div>
      {/* NAme Details  and Descriptive Data*/}
      <div
        style={{
          flex: ".6",

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Name Details */}
        <div style={{ flex: ".5" }}>
          <p style={{ margin: 0 }}>{firstName}</p>{" "}
          <h4 style={{ margin: 0 }}>{surName}</h4>
        </div>
        {/* Descriptive area (Age , Nationality , Postion) */}
        <div style={{ flex: ".5", display: "flex" }}>
          {/* Age */}
          <div style={{ flex: ".25" }}>
            <span style={{ fontWeight: "700" }}>Age</span> <br />
            {age}
          </div>
          {/* Nationality */}
          <div style={{ flex: ".5" }}>
            <span style={{ fontWeight: "700" }}>Country </span> <br />{" "}
            {nationality}
          </div>
          {/* Position */}
          <div style={{ flex: ".25" }}>
            {" "}
            <span style={{ fontWeight: "700" }}>Pos </span> <br /> {position}
          </div>
        </div>
      </div>
      {/* Jersey Number */}
      <div
        style={{
          flex: ".15",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <h2>{jerseyNumber}</h2>{" "}
      </div>
    </Card>
  );
};

export default ViewPlayerCard;
