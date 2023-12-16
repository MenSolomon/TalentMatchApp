import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Home, Star } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { SideBarNavButtons } from "../Buttons/SideBarNavButtons";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { useTheme } from "@emotion/react";
import { MainAccordionNavButton } from "../Buttons/MainAccordionButton";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import { useSelector } from "react-redux";

export default function SideBarAccordion({
  categoryIcon,
  categoryOptionsList,
  categoryLabel,
}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { buttonColor } = themeProviderObject;

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
            label={categoryLabel}
            // path={"/view-all"}
            startIcon={
              // <Icon >{categoryIcon}</Icon>

              <Star sx={{ fontSize: "1.8em", color: buttonColor }} />
            }
            // disabled={true}
            sx={{ color: "black", textTransform: "none", fontWeight: "600" }}
          />
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          {categoryOptionsList.map((data, key) => {
            const { label, dateCreated, startIcon, path } = data;

            console.log(dateCreated, "dae");
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
