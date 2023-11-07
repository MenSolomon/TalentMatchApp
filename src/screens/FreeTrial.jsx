import FreetrialCard from "../components/Cards/FreetrialCard";

const FreeTrial = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* free trial membership */}
      <div
        style={{
          flex: "0.3",
          // background: "red",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h1>Choose your membership</h1>
        <h5 style={{ fontWeight: "bold" }}>
          membership is your access point to TalentMatch
        </h5>
        <small>Just tell us who you are</small>
      </div>
      {/* Subscribe free trial cards */}
      <div
        style={{
          flex: "0.7",
          // background: "red",
          justifyContent: "center",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FreetrialCard name="Coach" roleImage="/public/CoachBlue.png" />
        <FreetrialCard
          name="Player"
          roleImage="/public/PlayerBlue.png"
          imageStyle={{ maxWidth: "60px", height: "89px" }}
        />
        <FreetrialCard
          name="Agent"
          roleImage="/public/AgentBlue.png"
          imageStyle={{ maxWidth: "95px", height: "89px" }}
        />
        <FreetrialCard
          name="Scout"
          roleImage="/public/ScoutBlue.png"
          imageStyle={{ maxWidth: "75px", height: "89px" }}
        />
      </div>
    </div>
  );
};

export default FreeTrial;
