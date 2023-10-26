import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import SupportSettingsDetails from "../../SupportSettingsDetails/SupportSettingsDetails";

export default function SupportSettingsAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <SupportSettingsDetails supportDetails={"Active your Account"} />
            <SupportSettingsDetails supportDetails={"Invoices"} />
            <SupportSettingsDetails
              supportDetails={"Move from one team to another"}
            />
            <SupportSettingsDetails supportDetails={"Change your password"} />
            <SupportSettingsDetails supportDetails={"Reset your password"} />
            <SupportSettingsDetails supportDetails={"Stop your subscription"} />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            About Scouting Transfer
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <SupportSettingsDetails supportDetails={"Transfer Fees"} />
            <SupportSettingsDetails supportDetails={"Create a shadow Team"} />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel4a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Coaching</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <SupportSettingsDetails supportDetails={"Transfer Fees"} />
            <SupportSettingsDetails supportDetails={"Create a shadow Team"} />
            <SupportSettingsDetails supportDetails={"Player Agency"} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
