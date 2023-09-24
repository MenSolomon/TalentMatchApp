import React from "react";
import SideBarAccordion from "../Accordions/SideBarAccordion";

const SavedFilters = () => {
  const dataSet = [
    { label: "Left-Back", path: "accounting" },
    {
      label: "Strikers",

      path: "accounting",
    },
    { label: "Center-Back", path: "accounting" },
    {
      label: "Right Winger",
      path: "accounting",
    },
    { label: "Goal Kepper", path: "accounting" },
  ];

  return (
    <SideBarAccordion
      categoryLabel="Saved Filters"
      categoryIcon={"star"}
      categoryOptionsList={dataSet}
    />
  );
};

export default SavedFilters;
