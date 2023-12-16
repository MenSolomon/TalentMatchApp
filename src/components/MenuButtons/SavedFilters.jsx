import SideBarAccordion from "../Accordions/SideBarAccordion";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import moment from "moment";
import { useState, useEffect } from "react";
import { selectUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";

const SavedFilters = () => {
  // const loginUserDetails = useSelector(selectUserDetailsObject);

  const userSavedProfiles = useSelector(selectUserSavedProfiles);

  // Create a deep copy of savedProfile into the data array to fix problem of not being able to sort the data
  // const [data, setData] = useState([...savedProfile]);
  // const [sortedData, setSortedData] = useState([]);

  // useEffect(() => {
  //   setData([...savedProfile]);
  // }, [savedProfile]);

  // useEffect(() => {
  //   console.log("data sorted", data);

  //   const sortedProfiles = data.slice().sort((a, b) => {
  //     // Convert date strings to Moment.js objects
  //     const dateA = moment(a.dateCreated, "YYYY-MM-DD HH:mm:ss");
  //     const dateB = moment(b.dateCreated, "YYYY-MM-DD HH:mm:ss");

  //     // Compare the Moment.js objects in descending order
  //     // return dateB.diff(dateA);
  //     return dateA.diff(dateB);
  //   });

  //   setSortedData(sortedProfiles);
  //   console.log(sortedProfiles);
  // }, [data]);

  return (
    <SideBarAccordion
      categoryLabel="Saved Profiles"
      categoryIcon={"star"}
      categoryOptionsList={userSavedProfiles}
    />
  );
};

export default SavedFilters;
