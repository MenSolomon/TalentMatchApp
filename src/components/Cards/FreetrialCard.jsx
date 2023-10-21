import { Add } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

const FreetrialCard = ({ name, subName, btn }) => {
  return (
    <>
      <Card
        sx={{
          background: "pink",
          width: "20%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "0.4",
            // background: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Add />
        </div>
        <div style={{ flex: "0.3", display: "grid", placeContent: "center" }}>
          <h6>{name}</h6>
          <h6>{subName}</h6>
        </div>
        <div
          style={{
            flex: "0.3",
            // background: "peru",
            display: "grid",
            placeContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="outlined">{btn}</Button>
        </div>
      </Card>
    </>
  );
};

export default FreetrialCard;
