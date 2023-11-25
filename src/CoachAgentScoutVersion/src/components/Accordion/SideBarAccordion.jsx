import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Home } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { SideBarNavButtons } from "../Buttons/SideBarNavButtons";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { useTheme } from "@emotion/react";
import { MainAccordionNavButton } from "../../../../components/Buttons/MainAccordionButton";
// import { MainAccordionNavButton } from "../Buttons/MainAccordionButton";

export default function SideBarAccordion({
  categoryIcon,
  categoryOptionsList,
  categoryLabel,
  mainAccordionBtnStyles,
}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const theme = useTheme();

  return (
    <div>
      <MuiAccordion
        sx={{ background: "transparent" }}
        disableGutters
        elevation={0}
        square
      >
        <MuiAccordionSummary
          sx={{ height: "5px" }}
          expandIcon={
            <ArrowForwardIosSharpIcon
              className="primaryTextColor"
              sx={{ fontSize: "1.1rem" }}
            />
          }
        >
          <MainAccordionNavButton
            styles={mainAccordionBtnStyles}
            label={categoryLabel}
            // path={"/view-all"}
            startIcon={
              <Icon style={{ fontSize: "1.8em" }}>{categoryIcon}</Icon>
            }
            // disabled={true}
            sx={{ color: "black" }}
          />
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          {categoryOptionsList.map((data, key) => {
            const { label, startIcon, path } = data;
            return (
              <SideBarNavButtons
                key={key}
                label={label}
                startIcon={<Icon>{startIcon}</Icon>}
                path={path}
                // disabled={false}
              />
            );
          })}
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
}
