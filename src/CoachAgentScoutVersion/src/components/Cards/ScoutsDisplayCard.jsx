import { Avatar, Card, Chip, Stack } from "@mui/material";

const ScoutsDisplayCard = ({
  backgroundUrl,
  playerImageUrl,
  UserName,
  AgencyName,
  // style,
  handleConnect,
  handleDelete,
  deleteBtnVisible,
}) => {
  return (
    <Card
      className="playerCard primaryTextColor md:mb-[3vh] md:flex md:flex-col md:w-[25vw] md:h-[18vh]  sm:flex sm:flex-col sm:w-[100%] sm:h-[18vh] sm:mb-[3vh]"
      style={{
        // ...style,
        // display: "flex",
        // flexDirection: "column",
        // width: "20vw",
        // height: "23vh",
        borderRadius: "1vw",
        // marginBottom: "3vh",
      }}
    >
      {/* <div
        style={{
          flex: ".5",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          //   paddingLeft: ".5vw",
          //   paddingRight: ".5w",
        }}></div> */}
      <div
        className="md:flex md:basis-[100%] md:justify-center md:items-center md:gap-[.3vw]     sm:flex sm:basis-[100%] sm:justify-center sm:items-center sm:gap-[.3vw]"
        style={{
          // flex: "1",
          // justifyContent: "center",
          // alignItems: "center",
          paddingLeft: ".5vw",
          paddingRight: ".5vw",
          // gap: ".3vw",
        }}
      >
        {/* AVATAR */}
        <div style={{ flex: ".2" }}>
          <Avatar src={playerImageUrl}></Avatar>
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
