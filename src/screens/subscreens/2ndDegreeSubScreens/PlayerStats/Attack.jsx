import PlayerGoalDetailsGraph from "../../../../components/Charts/Bars/PlayerGoalDetailsGraph";
import leftShot from "../../../../assets/images/leftplayer.png";
import otherGoals from "../../../../assets/images/otherGoals.png";
import rightShot from "../../../../assets/images/rightfoot.png";
import header from "../../../../assets/images/header.png";
import { selectPlayerSelectedToView } from "../../../../statemanager/slices/PlayersInAgencySlice";
import { useSelector } from "react-redux";

const Attack = ({ Period }) => {
  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  // Write a snapshot function that receives data updated in realtime

  const { Statistics } = PlayerSelectedToViewObject;

  const filteredSeasonStats = Statistics.find((data) => {
    return data.Season === Period;
  });

  console.log(filteredSeasonStats);

  const { Attack } = filteredSeasonStats;
  console.log(Attack);

  return (
    <div className="primaryColor" style={{ display: "flex" }}>
      <div style={{ flex: ".4" }}>
        <PlayerGoalDetailsGraph
          TotalShots={Attack.Total_shots}
          ShotsOnTarget={Attack.Shots_on_target}
          GoalsScored={Attack?.Goals_Scored}
        />
      </div>
      <div style={{ flex: ".6", display: "flex" }}>
        {/* conversion Rate and minutes per goal area */}
        <div
          style={{
            flex: ".2",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: ".5", textAlign: "center" }}>
            <span style={{ fontSize: ".75em" }}>Conversion Rate </span> <br />{" "}
            {Attack.Conversion_rate}%
          </div>
          <div style={{ flex: ".5", textAlign: "center" }}>
            <span style={{ fontSize: ".75em" }}>Minutes per goal </span> <br />{" "}
            {Attack.Minutes_per_goal}
          </div>
        </div>

        {/* Types of goals left, right, header, others */}
        <div
          style={{
            flex: ".4",
            display: "grid",
            gridTemplateRows: "50% 50%",
            gridTemplateColumns: "50% 50%",
            gridTemplateAreas: `"first second""third fourth"`,
          }}
        >
          <DisplayGoalTypeCard
            NumberOfGoals={Attack.Left_goals}
            goalTypeImage={leftShot}
            GoalType={"Left goals"}
            gridArea="first"
          />

          <DisplayGoalTypeCard
            NumberOfGoals={Attack.Right_goals}
            goalTypeImage={rightShot}
            GoalType={"Right goals"}
            gridArea="second"
          />

          <DisplayGoalTypeCard
            NumberOfGoals={Attack.Header_goals}
            goalTypeImage={header}
            GoalType={"Header goals"}
            gridArea="third"
          />

          <DisplayGoalTypeCard
            NumberOfGoals={Attack.Other_goals}
            goalTypeImage={otherGoals}
            GoalType={"Other goals"}
            gridArea="fourth"
          />
        </div>

        {/* Distance from goal */}
        <div style={{ flex: ".4", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: ".5", textAlign: "center" }}>
            <div
              style={{
                width: "80%",
                border: "1px solid #5585FE",
                height: "90%",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: "55%",
                  border: "1px solid #5585FE",
                  borderTop: "0px",
                  display: "inline-block",
                }}
              >
                <br />{" "}
                <h4 style={{ margin: "0" }}> {Attack.Goals_inside_the_box}</h4>{" "}
                <span style={{ fontSize: ".7em" }}>Goals inside the box</span>
              </div>
            </div>
          </div>
          <div style={{ flex: ".5", display: "flex" }}>
            {/* Goals Scored Outside the box */}

            <div
              style={{
                flex: ".5",
                display: "grid",
                placeContent: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <h4 style={{ margin: "0" }}>
                {" "}
                {Attack.Goals_outside_the_box}
              </h4>{" "}
              <span style={{ fontSize: ".7em" }}>Goals outside the box</span>{" "}
            </div>
            {/* Goals Scored from Free kicks */}
            <div
              style={{
                flex: ".5",
                display: "grid",
                placeContent: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <h4 style={{ margin: "0" }}>
                {" "}
                {Attack.Goals_from_freekicks}
              </h4>{" "}
              <span style={{ fontSize: ".7em" }}>Goals from freekicks</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attack;

export const DisplayGoalTypeCard = ({
  gridArea,
  goalTypeImage,
  NumberOfGoals,
  GoalType,
}) => {
  return (
    <div
      className="primaryColor"
      style={{
        gridArea: gridArea,
        display: "flex",
        gap: ".4vw",
        padding: "1vw",
      }}
    >
      <div style={{ flex: ".4" }}>
        {" "}
        <img src={goalTypeImage} style={{ width: "100%" }} />
      </div>

      <div style={{ textAlign: "center", flex: ".6", fontSize: ".7em" }}>
        {" "}
        {NumberOfGoals} <br /> {GoalType}
      </div>
    </div>
  );
};
