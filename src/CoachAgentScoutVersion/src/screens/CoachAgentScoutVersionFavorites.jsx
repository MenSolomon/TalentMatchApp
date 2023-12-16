import kotokoImage from "../assets/images/kotokocrest.jpg";
import heartsImage from "../assets/images/hearts.png";

import userImage from "../assets/images/avatar.jpg";
import ScoutsDisplayCard from "../components/Cards/ScoutsDisplayCard";

const CoachAgentScoutVersionFavorites = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
      className="primaryTextColor"
    >
      {/* // Heading Area */}
      <div style={{ flex: ".1" }}>
        <h3 style={{ margin: 0, float: "left" }}>Interested scouts</h3>{" "}
      </div>
      {/* Video DISPLAY AREA */}
      <div
        style={{
          flex: ".9",
          display: "flex",
          gap: "5%",
          flexWrap: "wrap",
        }}
      >
        <ScoutsDisplayCard
          AgencyName="Kotoko FC"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={kotokoImage}
        />
        <ScoutsDisplayCard
          AgencyName="Hearts of oak"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={heartsImage}
        />
        <ScoutsDisplayCard
          AgencyName="Kotoko FC"
          UserName="Nana K"
          avatarUrl={userImage}
          backgroundUrl={kotokoImage}
        />
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionFavorites;
