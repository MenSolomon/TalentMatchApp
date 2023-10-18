import PlayerComparisonAccordionDetails from "./PlayerComparisonAccordionDetails";

export default function PlayerComparisonAccordion() {
  return (
    <div>
      <PlayerComparisonAccordionDetails
        tittle={"Overview"}
        names={"Appearances "}
        firstNum={54}
        secondNum={8}
        subName={"Goals"}
        thirdNum={2}
        assist={"Clean sheets "}
        save={"saves"}
        lastNum={0}
      />
      <PlayerComparisonAccordionDetails
        tittle={"Defense"}
        names={"Clean sheets  "}
        firstNum={4}
        secondNum={9}
        subName={"Blocks "}
        thirdNum={2}
        assist={"Goals Conceded "}
        save={"Tackles "}
        lastNum={1}
      />
      <PlayerComparisonAccordionDetails
        tittle={"Attacking"}
        names={"Goals per match "}
        firstNum={4}
        secondNum={9}
        subName={"Minutes per goal"}
        thirdNum={2}
        assist={"Shots"}
        save={"Shots on target "}
        lastNum={1}
      />
      <PlayerComparisonAccordionDetails
        tittle={"Distribution"}
        names={"Assists"}
        firstNum={4}
        secondNum={9}
        subName={"Pass Completion % "}
        thirdNum={2}
        assist={"Touches "}
        save={"Passes forward "}
        lastNum={1}
      />
      <PlayerComparisonAccordionDetails
        tittle={"Discipline"}
        names={"Yellow cards "}
        firstNum={4}
        secondNum={9}
        subName={"Penalties conceded"}
        thirdNum={2}
        assist={"Offsides"}
        save={"Penalties conceded "}
        lastNum={1}
      />
    </div>
  );
}
