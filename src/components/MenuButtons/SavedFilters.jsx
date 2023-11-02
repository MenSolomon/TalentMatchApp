import React from "react";
import SideBarAccordion from "../Accordions/SideBarAccordion";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";

const SavedFilters = () => {
  const loginUserDetails = useSelector(selectUserDetailsObject);

  const { savedProfile } = loginUserDetails;
  return (
    <SideBarAccordion
      categoryLabel="Saved Profiles"
      categoryIcon={"star"}
      categoryOptionsList={savedProfile}
    />
  );
};

export default SavedFilters;
