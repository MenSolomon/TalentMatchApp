import React from "react";

const PlayerAchievements = () => {
  const cardStyle = {
    padding: "1vw",
    borderRadius: "1vw",
  };

  return (
    <div
      className="md:w-[100%] md:h-[40vh] md:flex md:gap-[2vw] md:flex-row       sm:w-[90%] sm:h-[60vh] sm:flex sm:gap-[2vw] sm:flex-col"
      style={
        {
          // width: "100%",
          // height: "40vh",
          // display: "flex",
          // gap: "2vw",
          // background: "red",
        }
      }
    >
      <div className="playerCard" style={{ flex: ".33", ...cardStyle }}>
        <h5>National Trophies</h5>
      </div>
      <div className="playerCard" style={{ flex: ".33", ...cardStyle }}>
        <h5>Club Trophies</h5>
      </div>
      <div className="playerCard" style={{ flex: ".33", ...cardStyle }}>
        <h5>Personal Awards</h5>
      </div>
    </div>
  );
};

export default PlayerAchievements;
