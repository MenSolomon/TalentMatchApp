import { Avatar, Card, Chip, Stack } from "@mui/material";

const ScoutsDisplayCard = ({
  backgroundUrl,
  avatarUrl,
  UserName,
  AgencyName,
  style,
  handleConnect,
  handleDelete,
  deleteBtnVisible,
}) => {
  return (
    <Card
      className="playerCard primaryTextColor md:flex md:flex-col md:w-[30vw] md:h-[23vh]  sm:flex sm:flex-col sm:w-[100%] sm:h-[23vh]"
      style={{
        ...style,
        // display: "flex",
        // flexDirection: "column",
        // width: "20vw",
        // height: "23vh",
        borderRadius: "1vw",
        marginBottom: "3vh",
      }}>
      <div
        style={{
          flex: ".5",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          //   paddingLeft: ".5vw",
          //   paddingRight: ".5w",
        }}></div>
      <div
        className="md:flex sm:flex"
        style={{
          flex: ".5",
          // display: "flex",
          paddingLeft: ".5vw",
          paddingRight: ".5vw",
          paddingTop: "5%",
          gap: ".3vw",
        }}>
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
          <Stack direction="row" spacing={1}>
            <Chip
              sx={{ cursor: "pointer" }}
              label="Connect"
              color="primary"
              onClick={handleConnect}
            />
            {deleteBtnVisible && (
              <Chip
                sx={{ cursor: "pointer" }}
                color="error"
                label="Delete"
                onClick={handleDelete}
              />
            )}
          </Stack>
        </div>
      </div>
    </Card>
  );
};

export default ScoutsDisplayCard;
