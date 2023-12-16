import FreetrialCard from "../components/Cards/FreetrialCard";

const FreeTrial = () => {
  return (
    <div
      className="md:w-[100%] md:h-[100%] md:flex md:flex-col 
        sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col
        "
      style={{
        // width: "100%",
        // height: "100%",
        // display: "flex",
        // flexDirection: "column",
        color: "black",
        overflowY: "scroll",
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
        // className="md:flex md:items-center md:gap-[10px] md:justify-center md:flex-wrap    sm:flex sm:items-center sm:gap-[5px] sm:justify-center sm:flex-wrap"

        style={{
          flex: "0.7",
          // background: "red",
          // justifyContent: "center",
          // display: "flex",
          // gap: "10px",
          // alignItems: "center",
          // flexWrap: "wrap",
          // overflowY: "scroll",
        }}
      >
        <div
          className="sm:flex sm:items-center sm:gap-[10px] sm:justify-center  sm:flex-wrap        
        md:flex md:items-center md:gap-[10px] md:justify-center  md:flex-wrap md:h-[100%]  sm:h-[100%]
        "
        >
          <FreetrialCard name="Coach" roleImage="/CoachBlue.png" />

          <FreetrialCard
            name="Player"
            roleImage="/PlayerBlue.png"
            imageStyle={{ maxWidth: "60px", height: "89px" }}
          />

          <FreetrialCard
            name="Agent"
            roleImage="/AgentBlue.png"
            imageStyle={{ maxWidth: "95px", height: "89px" }}
          />
          <FreetrialCard
            name="Scout"
            roleImage="/ScoutBlue.png"
            imageStyle={{ maxWidth: "75px", height: "89px" }}
          />
          <FreetrialCard
            name="Club"
            roleImage="/ClubIconBlue.png"
            imageStyle={{ maxWidth: "95px", height: "89px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
