import React from "react";

const PlayerAchievements = () => {
  const cardStyle = {
    padding: "1vw",
    borderRadius: "1vw",
  };

  return (
    <div style={{ width: "100%", height: "40vh", display: "flex", gap: "2vw" }}>
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
