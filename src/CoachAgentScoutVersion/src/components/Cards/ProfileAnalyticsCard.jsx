import { Circle } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

const ProfileAnalyticsCard = () => {
  return (
    <Card
      className="cardBackground primaryTextColor md:h-[79%] md:w-[90%] md:flex md:flex-col  sm:h-[100%] sm:w-[100%] sm:flex sm:flex-col"
      style={{
        padding: ".8vw",
      }}
    >
      {/* REAL TIME HEARDER  */}
      <div style={{ flex: ".2", borderBottom: "1px solid grey" }}>
        <h5 style={{ margin: 0 }}> Realtime </h5>
        <span>
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
        <h4> 0 </h4>
        <h6>Total contacts matched</h6>
        <Button> View all contacts </Button>
      </div>

      {/* Profile views in the last 48 hours  */}
      <div
        style={{
          flex: ".34",
          borderBottom: "1px solid white",
          paddingTop: "1vh",
        }}
      >
        <h4> 0 </h4>
        <h6>
          Profile view <Circle sx={{ width: 3 }} /> Last 48 hours{" "}
        </h6>
      </div>
      {/* See more Button (60 minutes) and other time frames */}
      <div style={{ flex: ".12" }}>
        <Button> See More </Button>
      </div>
    </Card>
  );
};

export default ProfileAnalyticsCard;
