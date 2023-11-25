import React from "react";
import SideBarAccordion from "../../../../components/Accordions/SideBarAccordion";
// import SideBarAccordion from "../Accordions/SideBarAccordion";

const SavedFilters = ({ mainAccordionBtnStyles }) => {
  const dataSet = [
    { label: "Left-Back" },
    {
      label: "Strikers",

      // path: "/view-all",
    },
    { label: "Center-Back" },
    {
      label: "Right Winger",
      // path: "/view-all",
    },
    { label: "Goal Kepper" },
  ];

  return (
    <SideBarAccordion
      categoryLabel="Saved Filters"
      categoryIcon={"star"}
      categoryOptionsList={dataSet}
      mainAccordionBtnStyles={mainAccordionBtnStyles}
    />
  );
};

export default SavedFilters;
