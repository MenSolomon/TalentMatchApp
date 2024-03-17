import {
  Circle,
  Delete,
  EmojiEmotions,
  Reply,
  Search,
  Send,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";

import avatarImage from "../assets/images/avatar.jpg";
import MessageContactCard from "../components/Cards/MessageContactCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { v4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase/Firebase";
import moment from "moment/moment";
import { selectuserMessages } from "../../../statemanager/slices/MessagesSlice";
import CountrySelect from "../components/AutoComplete/CountrySelect";
import { useQuery } from "@tanstack/react-query";
import ScoutsDisplayCard from "../components/Cards/ScoutsDisplayCard";
import BasicSelect from "../../../components/Selects/BasicSelect";
import {
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../statemanager/slices/OtherComponentStatesSlice";

const CoachAgentScoutVersionConnetions = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const [countryCode, setCountryCode] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const rolesArray = ["Agent", "Scout"];
  const [role, setRole] = useState("Agent");
  const { accountId } = userLoginDetailsObject;

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  // function to add scounts and agents to connections
  const handleConnection = async (filtered) => {
    // 2. Check if filtered.accountId exists in any connection
    const hasExistingConnection = agentAndScoutsInConnectionsList.some(
      (person) => person.accountId === filtered.accountId
    );

    if (hasExistingConnection) {
      console.log("You already have this person in your connections");
      triggerWarningAlertModal(
        "You already have this person in your connections"
      );
      return; // Exit if connection already exists
    }

    // 3. Add connection to Firestore (if filtered.accountId is not found)
    try {
      const connectionsRef = collection(
        db,
        `users_db/${accountId}/connections`
      );
      await addDoc(connectionsRef, {
        ...filtered, // Spread filtered object for individual fields
      });
      fetchAgentAndScoutsInConnectionsList();
    } catch (error) {
      console.error("Error adding connection:", error);
      // Handle specific errors as needed (e.g., display error message)
    }
  };

  // useQuery to get all agents and scouts
  const { data: agentAndScoutsList, error: getVisibleAgentsError } = useQuery({
    queryKey: ["getVisibleAgentsAndScouts"],
    queryFn: async () => {
      try {
        const agentsAndScoutsRef = collection(db, "users_db");
        const queryAgentsAndScouts = query(
          agentsAndScoutsRef,
          where("role", "in", ["Agent", "Scout"]),
          where("isVisible", "==", true)
        );

        // Get the documents from Firestore
        const snapshot = await getDocs(queryAgentsAndScouts);

        // Extract the data from the documents
        const agentAndScouts = snapshot.docs.map((doc) => doc.data());

        // Concatenate current user's first and last name for comparison
        const currentUserName = `${userLoginDetailsObject.firstName} ${userLoginDetailsObject.surname}`;

        // Filter to exclude the current user
        const currentUserFilteredOut = agentAndScouts.filter((agentOrScout) => {
          const agentOrScoutFullName = `${agentOrScout.firstName} ${agentOrScout.surname}`;
          return agentOrScoutFullName !== currentUserName; // Strict equality check
        });

        // console.log("currentUserFilteredOut", currentUserFilteredOut);
        return currentUserFilteredOut;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // function to delete connection
  const handleDelete = async (fieldValue) => {
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
    const connectionsRef = collection(db, `users_db/${userId}/connections`);

    try {
      // Create a query to find documents where accountId matches fieldValue
      const q = query(connectionsRef, where("accountId", "==", fieldValue));

      // Get a snapshot of the matching documents
      const querySnapshot = await getDocs(q);

      // Loop through the documents and delete them
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await deleteDoc(docRef);
      });

      fetchAgentAndScoutsInConnectionsList();
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  // useQuery to get all agents and scouts in users connections
  const {
    status,
    data: agentAndScoutsInConnectionsList,
    error,
    refetch: fetchAgentAndScoutsInConnectionsList,
    isFetching: isfetchingAgentAndScoutsInConnectionsList,
  } = useQuery({
    queryKey: ["fetchAgentAndScoutsInConnectionsList"],
    queryFn: async () => {
      try {
        const connectionsRef = collection(
          db,
          `users_db/${accountId}/connections`
        );
        const queryConnections = query(
          connectionsRef,
          where("role", "in", ["Agent", "Scout"])
        );

        // Get the documents from Firestore
        const snapshot = await getDocs(queryConnections);

        // Extract the data from the documents
        const queryConnectionsSnap = snapshot.docs.map((doc) => doc.data());
        // console.log(
        //   "agentAndScoutsInConnectionsList",
        //   agentAndScoutsInConnectionsList
        // );
        // Return the data (no need for unnecessary parenthesis)
        return queryConnectionsSnap;
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div
      className="primaryTextColor md:gap-[1em] md:flex-row md:flex md:w-[100%] md:h-[100%]    sm:flex sm:w-[100%] sm:gap-[3.5em] sm:flex-col sm:h-[100%]"
      // style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {/* MESSAGE OVERVIEW SECTION */}
      <div
        className="md:flex md:flex-col md:basis-[60%]    sm:basis-[60%] sm:flex sm:flex-col"
        style={
          {
            // flex: ".35",
            // display: "flex",
            // flexDirection: "column",background
            // background: "peru",
          }
        }>
        {/* // INBOX HEADER */}
        <div className="md:basis-[20%]  sm:basis-[20%]">
          <h5 style={{ fontWeight: "bolder", margin: "0" }}>Connections</h5>
          <h6 className="">Filter</h6>
          {/* <span style={{ fontSize: ".8em" }}>
            102Messages <Circle sx={{ width: 7 }} /> 40 unread
          </span> */}
          {/* // SEARCH INBOX */}
          <div className="md:inline-flex">
            {/* Country Select */}
            <CountrySelect
              className="sm:w-[80%] md:w-[90%]"
              countryCode={(e) => {
                setCountryCode(e);
              }}
              countryName={(e) => {
                setCountryName(e);
              }}
              selectLabel="Nationality *"
            />
            {/* Role Select */}
            <BasicSelect
              label={"Role"}
              itemsArray={rolesArray}
              selectedValue={(e) => {
                // alert(e);
                setRole(e);
                console.log(e);
              }}
              // defaultSelect={"Agent"}
            />
            <Button
              onClick={() => {
                setCountryName("");
                setRole();
              }}>
              Reset
            </Button>
          </div>
        </div>

        {/* //  CONNECTIONS */}
        <div
          className="md:basis-[70%] sm:flex-col sm:flex sm:flex-shrink-0 sm:basis-[70%] content-center"
          style={{ overflowY: "scroll" }}>
          {countryName === ""
            ? agentAndScoutsList?.map((person) => {
                return (
                  <div
                    className="sm:min-h-1vh md:min-h-0.5vh"
                    key={person.accountId}>
                    <ScoutsDisplayCard
                      AgencyName={person.organization}
                      UserName={`${person.firstName} ${person.surname}`}
                      handleConnect={() => {
                        handleConnection(person);
                      }}
                    />
                  </div>
                );
              })
            : agentAndScoutsList
                ?.filter(
                  (person) =>
                    person.Nationality === countryName && person.role === role
                )
                .map((filtered) => {
                  return (
                    <div className="sm:min-h-1vh md:min-h-0.5vh">
                      <ScoutsDisplayCard
                        AgencyName={filtered.organization}
                        UserName={`${filtered.firstName} ${filtered.surname}`}
                        handleConnect={() => handleConnection(filtered)}
                      />
                    </div>
                  );
                })}
        </div>
      </div>

      {/* USER ADDED CONNECTIONS */}
      <div
        className="cardBackground md:flex md:flex-col md:pl-[1.5vw] md:basis-[40%]  sm:basis-[40%]      sm:flex sm:flex-shrink-0 sm:flex-col sm:pl-[0vw]"
        style={{
          // flex: ".65",
          // background: "red",
          // display: "flex",
          // flexDirection: "column",
          // paddingLeft: "1.5vw",
          borderRadius: "1vw",
          overflowY: "scroll",
        }}>
        {/* // Pagination and delete message area */}
        {/* style={{ flex: "1", display: "grid", placeContent: "center" }} */}
        {selectedUser.length === 0 ? (
          <div className="md:basis-[100%] md:grid md:place-content-center    sm:basis-[100%] sm:grid sm:place-content-center">
            {agentAndScoutsInConnectionsList === null ? (
              <h5 style={{ textAlign: "center" }}>See connections here</h5>
            ) : isfetchingAgentAndScoutsInConnectionsList ? (
              <CircularProgress />
            ) : (
              agentAndScoutsInConnectionsList?.map((connections) => {
                return (
                  <div
                    className="sm:min-h-1vh md:min-h-0.5vh"
                    key={connections.id}>
                    <ScoutsDisplayCard
                      AgencyName={connections.organization}
                      UserName={`${connections.firstName} ${connections.surname}`}
                      handleDelete={() => handleDelete(connections.accountId)}
                      deleteBtnVisible={true}
                    />
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <>
            <div
              style={{
                flex: ".12",
                background: "yellow",
                borderBottom: "1px solid #f2f2f2",
                display: "flex",
              }}>
              <div
                style={{
                  flex: ".35",
                  // background: "red",
                  display: "flex",
                  padding: ".2vw",
                  gap: ".4vw",
                  // alignItems: "center",
                  // justifyContent: "center",
                }}>
                <div style={{ flex: ".26" }}>
                  <Avatar src={""} sx={{ width: 50, height: 50 }} />
                </div>
                <div style={{ flex: ".74" }}>
                  <div>{selectedUser.name}</div>

                  <div
                    style={{
                      display: "flex",
                      gap: ".3vw",
                      alignItems: "center",
                      // justifyContent: "center",
                    }}>
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "green",
                      }}></div>{" "}
                    <div style={{ fontSize: ".7em" }}>Online</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                flex: ".88",
                // background: "white",
                paddingTop: ".5vh",
                color: "black",
                display: "flex",
                flexDirection: "column",
                maxHeight: "75vh",
              }}>
              <div style={{ flex: ".85", overflowY: "scroll" }}></div>

              {/* // TEXT FIELD AND SEND BUTTON AREA */}
              <div style={{ flex: ".15", display: "flex" }}>
                <div
                  style={{
                    flex: ".1",
                    // background: "red",
                  }}>
                  <IconButton sx={{ marginLeft: ".5vw" }}>
                    <EmojiEmotions sx={{ color: "#5585FE" }} />
                  </IconButton>
                </div>

                <div style={{ flex: ".8" }}>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    multiline
                    fullWidth
                    maxRows={4}
                    minRows={1}
                    value={messageText}
                    onChange={(e) => [setMessageText(e.target.value)]}
                  />
                </div>
                <div
                  style={{
                    flex: ".1",
                    // background: "red",
                  }}>
                  <IconButton
                    onClick={() => {
                      handleMessageSend(selectedUser?.contactId);
                    }}
                    sx={{ marginLeft: ".5vw" }}>
                    <Send sx={{ color: "#5585FE" }} />
                  </IconButton>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionConnetions;
