import kotokoImage from "../../assets/images/kotokocrest.jpg";
import heartsImage from "../../assets/images/hearts.png";

import userImage from "../../assets/images/avatar.jpg";
import ScoutsDisplayCard from "../../components/Cards/ScoutsDisplayCard";
import { Pagination } from "@mui/material";

const PlayerManagementInterestedScouts = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "48vh",
        width: "100%",
      }}
      // className="primaryTextColor md:flex md:flex-col md:w-[100%] md:h-[48vh]    sm:flex sm:flex-col sm:w-[100%] sm:h-[48vh]"
    >
      {/* Video DISPLAY AREA */}
      <div
        className="md:flex md:flex-wrap md:gap-[2%] md:flex-row    sm:flex-wrap  sm:flex sm:flex-col sm:gap-[3%]"
        style={{
          flex: ".85",
          // display: "flex",
          // gap: "2%",
          // flexWrap: "wrap",
          //   background: "red",
        }}
      >
        <ScoutsDisplayCard
          AgencyName="Kotoko FC"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={kotokoImage}
          style={{ maxHeight: "9vw", maxWidth: "18vw" }}
        />
        <ScoutsDisplayCard
          AgencyName="Hearts of oak"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={heartsImage}
          style={{ maxHeight: "9vw", maxWidth: "18vw" }}
        />
        <ScoutsDisplayCard
          AgencyName="Kotoko FC"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={kotokoImage}
          style={{ maxHeight: "9vw", maxWidth: "18vw" }}
        />

        <ScoutsDisplayCard
          AgencyName="Kotoko FC"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={kotokoImage}
          style={{ maxHeight: "9vw", maxWidth: "18vw" }}
        />
      </div>

      <div style={{ flex: ".15", display: "flex", justifyContent: "center" }}>
        <Pagination count={1}></Pagination>
      </div>
    </div>
  );
};

export default PlayerManagementInterestedScouts;
