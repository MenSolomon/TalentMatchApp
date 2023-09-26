import { Card } from "@mui/material";
import pitch from "../../assets/images/pitch.jpg";

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
      <div style={{ flex: ".18", padding: "0vw" }}>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${pitch})`,
            backgroundSize: "contain",
          }}
        ></Card>
      </div>
    </div>
  );
};

export default PlayerBio;
