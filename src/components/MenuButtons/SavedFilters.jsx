import React from "react";
import SideBarAccordion from "../Accordions/SideBarAccordion";

const SavedFilters = () => {
  const dataSet = [
    { label: "Left-Back", path: "/view-all" },
    {
      label: "Strikers",

      path: "/view-all",
    },
    { label: "Center-Back", path: "/view-all" },
    {
      label: "Right Winger",
      path: "/view-all",
    },
    { label: "Goal Kepper", path: "/view-all" },
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
