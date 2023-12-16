import { Avatar, Card, Chip } from "@mui/material";
import RemindScoutSnackbar from "../Snackbar/RemindScoutSnackbar";

const ScoutsDisplayCard = ({
  backgroundUrl,
  avatarUrl,
  UserName,
  AgencyName,
}) => {
  return (
    <Card
      className="cardBackground primaryTextColor"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "20vw",
        height: "23vh",
        borderRadius: "1vw",
      }}
    >
      <div
        style={{
          flex: ".5",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          //   paddingLeft: ".5vw",
          //   paddingRight: ".5w",
        }}
      ></div>
      <div
        style={{
          flex: ".5",
          display: "flex",
          paddingLeft: ".5vw",
          paddingRight: ".5vw",
          paddingTop: "5%",
          gap: ".3vw",
        }}
      >
        {/* AVATAR */}
        <div style={{ flex: ".2" }}>
          <Avatar src={avatarUrl}></Avatar>
        </div>
        {/* NAME AND AGENCY OR CLUB NAME */}
        <div style={{ flex: ".5" }}>
          <h5 style={{ fontSize: "1.1em", marginBottom: ".7vh" }}>
            {UserName}
          </h5>
          <h6 style={{ fontSize: ".8em" }}>{AgencyName}</h6>
        </div>
        {/* SIGN UP CHIP */}
        <div style={{ flex: ".3" }}>
          <RemindScoutSnackbar />
        </div>
      </div>
    </Card>
  );
};

export default ScoutsDisplayCard;
