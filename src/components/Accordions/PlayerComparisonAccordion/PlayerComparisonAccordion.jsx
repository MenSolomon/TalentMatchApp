import { Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useSelector } from "react-redux";
import { selectCurrentBrowserSize } from "../../../statemanager/slices/OtherComponentStatesSlice";

export default function PlayerComparisonAccordion({
  GeneralObject,
  DefenseObject,
  AttackingObject,
  DistributionObject,
  Discipline,
}) {
  // width: browserWidth >= 1024 ? "9vw" : "40vw",

  return (
    <div>
      <PlayerComparisonAccordionDetails
        title={"General"}
        FirstRowName={"Games Played"}
        FirstRowNumber={GeneralObject.Games_Played}
        SecondRowNumber={GeneralObject.Minutes_Played}
        SecondRowName={"Minutes Played"}
        ThirdRowNumber={GeneralObject.Subbed_off}
        ThirdRowName={"Subbed Off"}
        FourthRowName={"Starts"}
        FourthRowNumber={GeneralObject.Starts}
      />
      <PlayerComparisonAccordionDetails
        title={"Defense"}
        FirstRowName={"Clearance"}
        FirstRowNumber={DefenseObject.Clearance}
        SecondRowNumber={DefenseObject.Aeriel_duels}
        SecondRowName={"Aeriel Duels"}
        ThirdRowNumber={DefenseObject.Duels}
        ThirdRowName={"Duels "}
        FourthRowName={"Tackles Success"}
        FourthRowNumber={DefenseObject.Tackles}
      />
      <PlayerComparisonAccordionDetails
        title={"Attacking"}
        FirstRowName={"Total Shots"}
        FirstRowNumber={AttackingObject.Total_shots}
        SecondRowNumber={AttackingObject.Shots_on_target}
        SecondRowName={"Shots on target"}
        ThirdRowNumber={AttackingObject.Goals_Scored}
        ThirdRowName={"Goals scored"}
        FourthRowName={"Conversion rate"}
        FourthRowNumber={AttackingObject.Conversion_rate}
      />
      <PlayerComparisonAccordionDetails
        title={"Distribution"}
        FirstRowName={"Assist"}
        FirstRowNumber={DistributionObject.Assists}
        SecondRowNumber={DistributionObject.Total_passes}
        SecondRowName={"Total passes"}
        ThirdRowNumber={DistributionObject.Successful_passes}
        ThirdRowName={"Successful passes"}
        FourthRowName={"Key passes"}
        FourthRowNumber={DistributionObject.Key_passes}
      />
      <PlayerComparisonAccordionDetails
        title={"Discipline"}
        FirstRowName={"Red_cards"}
        FirstRowNumber={Discipline.Red_cards}
        SecondRowNumber={Discipline.Yellow_cards}
        SecondRowName={"Yellow cards"}
        ThirdRowNumber={Discipline.Fouls_conceeded}
        ThirdRowName={"Fouls conceeded"}
        FourthRowName={"Fouls won"}
        FourthRowNumber={Discipline.Fouls_won}
      />
    </div>
  );
}

function PlayerComparisonAccordionDetails({
  title,
  SecondRowName,
  FirstRowNumber,
  FirstRowName,
  SecondRowNumber,
  ThirdRowNumber,
  FourthRowNumber,
  ThirdRowName,
  FourthRowName,
}) {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  return (
    <>
      <Accordion
        sx={
          {
            // height: browserWidth >= 1024 ? "1" : "4.4vh",
          }
        }
        className="cardBackground primaryTextColor"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="sm:text-[.5em] lg:text-[.8em] mdsm:text-[.8em] tb:text-[.8em]" style={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <PlayerComparisonOverviewList
              numbers={FirstRowNumber}
              names={FirstRowName}
            />
          </Typography>
          <Typography>
            <PlayerComparisonOverviewList
              numbers={SecondRowNumber}
              names={SecondRowName}
            />
          </Typography>
          <Typography>
            <PlayerComparisonOverviewList
              numbers={ThirdRowNumber}
              names={ThirdRowName}
            />
          </Typography>
          <Typography>
            <PlayerComparisonOverviewList
              numbers={FourthRowNumber}
              names={FourthRowName}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function PlayerComparisonOverviewList({ names, numbers }) {
  return (
    <div
      className="primaryTextColor cardBackground"
      style={{
        fontSize: ".8em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="tb:text-[1em] md:text-[1em] sm:text-[.8em] lg:text-[1em]">{names}</div>
      <div className="tb:text-[1em] md:text-[1em] sm:text-[.8em] lg:text-[1em]">{numbers}</div>
    </div>
  );
}
