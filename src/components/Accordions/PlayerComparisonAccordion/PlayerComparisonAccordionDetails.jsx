import { Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlayerComparisonOverviewList from "./PlayerComparisonOverviewList";

function PlayerComparisonAccordionDetails({
  tittle,
  subName,
  firstNum,
  names,
  secondNum,
  thirdNum,
  lastNum,
  assist,
  save,
}) {
  return (
    <>
      <Accordion className="cardBackground primaryTextColor">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ fontWeight: "bold" }}>{tittle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <PlayerComparisonOverviewList numbers={firstNum} names={names} />
          </Typography>
          <Typography>
            <PlayerComparisonOverviewList numbers={secondNum} names={subName} />
          </Typography>
          <Typography>
            <PlayerComparisonOverviewList numbers={thirdNum} names={assist} />
          </Typography>
          <Typography>
            <PlayerComparisonOverviewList numbers={lastNum} names={save} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default PlayerComparisonAccordionDetails;
