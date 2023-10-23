import { Button, Card } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
// import playerImage from "../../assets/playerImage.png"

const FreetrialCard = ({ name, roleImage, imageStyle }) => {
  const navigate = useNavigate();

  const handleTrialNavigation = () => {
    navigate("/subscribeTrial");
  };

  return (
    <>
      <Card
        className="chooseARoleCard"
        sx={{
          // background: "pink",
          width: "20%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          paddingTop: "2vh",
        }}
      >
        <div
          style={{
            flex: "0.4",
            // background: "yellow",
            display: "grid",
            placeContent: "center",
          }}
        >
          <img src={roleImage} style={{ ...imageStyle, width: "120px" }} />
        </div>
        <div style={{ flex: "0.3", display: "grid", placeContent: "center" }}>
          <h4>{name}</h4>
          {/* <h6>{subName}</h6> */}
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
          <Button onClick={handleTrialNavigation} variant="outlined">
            Start Trial
          </Button>
        </div>
      </Card>
    </>
  );
};

export default FreetrialCard;