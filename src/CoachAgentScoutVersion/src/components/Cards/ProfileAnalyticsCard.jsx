import { Circle } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

const ProfileAnalyticsCard = () => {
  return (
    <Card
      className="cardBackground primaryTextColor md:w-[90%] md:h-[95%] md:flex md:flex-col    sm:w-[100%] sm:h-[50vh] sm:flex sm:flex-col 
      tb:w-[100%] tb:h-[60vh]  tb:flex tb:flex-col
      "
      style={{
        // width: "90%",
        // height: "79%",
        // display: "flex",
        // flexDirection: "column",
        padding: ".8vw",
      }}
    >
      {/* REAL TIME HEARDER  */}
      <div style={{ flex: ".2", borderBottom: "1px solid grey" }}>
        <h5
          style={{ margin: 0 }}
          className="tb:text-[1.9em] md:text-[1.4em] lg:text-[1.6em] sm:text-[1.3em]"
        >
          {" "}
          Realtime{" "}
        </h5>
        <span className="tb:text-[1.4em] md:text-[1.4em] lg:text-[1.3em] sm:text-[1.1em]">
          {" "}
          <Circle sx={{ width: 10 }} /> Live update{" "}
        </span>
      </div>

      {/* Contact in the last 48 hows */}
      <div
        style={{
          flex: ".34",
          borderBottom: "1px solid grey",
          paddingTop: "1vh",
        }}
      >
        <h4 className="tb:text-[1.4em] md:text-[1.4em] lg:text-[1.3em] sm:text-[1.1em]">
          {" "}
          0{" "}
        </h4>
        <h6 className="tb:text-[1.4em] md:text-[1.4em] lg:text-[1.3em] sm:text-[1.1em]">
          Total contacts matched
        </h6>
        <Button style={{ fontSize: 16 }}> View all contacts </Button>
      </div>

      {/* Profile views in the last 48 hours  */}
      <div
        style={{
          flex: ".34",
          borderBottom: "1px solid white",
          paddingTop: "1vh",
        }}
      >
        <h4 className="tb:text-[1.4em] md:text-[1.4em] lg:text-[1.3em] sm:text-[1.1em]">
          {" "}
          0{" "}
        </h4>
        <h6 className="tb:text-[1.4em] md:text-[1.4em] lg:text-[1.1em] sm:text-[1.1em]">
          Profile view <Circle sx={{ width: 3 }} /> Last 48 hours{" "}
        </h6>
      </div>
      {/* See more Button (60 minutes) and other time frames */}
      <div style={{ flex: ".12" }}>
        <Button style={{ fontSize: 16 }}> See More </Button>
      </div>
    </Card>
  );
};

export default ProfileAnalyticsCard;
