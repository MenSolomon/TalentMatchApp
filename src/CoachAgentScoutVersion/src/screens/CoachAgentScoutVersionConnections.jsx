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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSubscriptionActive,
  selectSubscriptionFeatures,
  selectUserDetailsObject,
} from "../../../statemanager/slices/LoginUserDataSlice";
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
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../statemanager/slices/OtherComponentStatesSlice";
import MessageContactCardForConnectionsScreen from "../components/Cards/MessageContactCardForConnectionsScreen";
import { selectInterestedConnections } from "../../../statemanager/slices/InterestedConnectionSlice";
import { selectInterestedPlayers } from "../../../statemanager/slices/InterestedPlayersSlice";

const CoachAgentScoutVersionConnetions = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const [countryCode, setCountryCode] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const rolesArray = ["Agent", "Scout"];
  const [role, setRole] = useState("Agent");
  const { accountId } = userLoginDetailsObject;
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);
  const connection = userLoginDetailsObject?.AgentandScoutConnections;
  // interestedConnections
  const interestedNonPlayerConnectionsArray = useSelector(
    selectInterestedConnections
  );
  const interestedPlayerConnectionsArray = useSelector(selectInterestedPlayers);
  //  state to store all pending and approved connections
  const [
    pendingOrApprovedConnectionRequests,
    setPendingOrApprovedConnectionRequests,
  ] = useState([]);
  // subscription features
  const subscriptionFeaturesObject = useSelector(selectSubscriptionFeatures);
  const { maxConnections } = subscriptionFeaturesObject;

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const submitConnectionRequest = async (
    targetedAccountID,
    targetedAccountName,
    targetedAccountRole
  ) => {
    const uuid = v4();

    // alert(targetedAccountID);
    console.log(
      "interestedNonPlayerConnectionsArray",
      interestedNonPlayerConnectionsArray,
      "pendingOrApprovedConnectionRequests",
      pendingOrApprovedConnectionRequests
    );
    // check if maxConnections has been reached
    if (pendingOrApprovedConnectionRequests.length >= maxConnections) {
      triggerWarningAlertModal(
        `You have exceeded your connections limit of ${maxConnections}. Please wait for a response or withdraw a request.`
      );
    } else {
      // FOR PLAYER ACC HOLDER
      const userNotificationRef = doc(
        db,
        `users_db/${userLoginDetailsObject.accountId}/Notifications`,
        uuid
      );

      /// FOR SELF
      const scoutNotificationRef = doc(
        db,
        `users_db/${targetedAccountID}/Notifications`,
        uuid
      );

      //Notification sent
      await setDoc(userNotificationRef, {
        NotificationId: uuid,
        requestAccepted: "Pending",
        dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
        senderAddress: userLoginDetailsObject.email,
        senderId: userLoginDetailsObject.accountId,
        type: "Connection request",
        message: `Your interest with ${targetedAccountName} has been established`,
        readStatus: false,
        targetAccountRole: targetedAccountRole,
      });

      await setDoc(scoutNotificationRef, {
        NotificationId: uuid,
        requestAccepted: "Pending",
        dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
        senderAddress: userLoginDetailsObject.email,
        senderId: userLoginDetailsObject.accountId,
        type: "Connection request",
        message: `${userLoginDetailsObject.firstName} has shown interest in your profile. Accept to view message sent`,
        readStatus: false,
        targetAccountRole: targetedAccountRole,
      });

      const connectionInterestRef = doc(
        db,
        `users_db/${userLoginDetailsObject?.accountId}/NonPlayerConnectionInterests`,
        uuid
      );

      //Notification sent

      await setDoc(connectionInterestRef, {
        interestedConnectionAccountId: targetedAccountID,
        dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
        interestStatus: "Pending",
      });

      dispatch(
        setSnackbarMessage(
          `You have succesfully requested a connection with ${targetedAccountName}`
        )
      );
      dispatch(setSnackbarTriggerCounter());
    }
  };

  // UseEffect to set the pendingOrAcceptedConnections State
  useEffect(() => {
    // 1. Filter Pending and Accepted NonPlayer Connections
    const filteredNonPlayerConnections =
      interestedNonPlayerConnectionsArray?.filter(
        (connection) =>
          connection.interestStatus === "Pending" ||
          connection.interestStatus === "Accepted"
      );

    // 2. Filter Pending and Accepted Player Connections
    const filteredPlayerConnections = interestedPlayerConnectionsArray?.filter(
      (connection) =>
        connection.interestStatus === "Pending" ||
        connection.interestStatus === "Accepted"
    );

    // Combine both filtered arrays
    const combinedFilteredConnections = [
      ...(filteredNonPlayerConnections || []),
      ...(filteredPlayerConnections || []),
    ];

    // Update state once with the combined array
    setPendingOrApprovedConnectionRequests(combinedFilteredConnections);
  }, [interestedNonPlayerConnectionsArray, interestedPlayerConnectionsArray]);

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
          // where("isBasic", "==", false)
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

  // Retreive all connections

  // const AaallUsersAndMessages = userLoginDetailsObject?.Connections;
  // const allScoutsandAgentsConnections =
  //   userLoginDetailsObject?.AgentandScoutConnections;

  const AaallUsersAndMessages =
    userLoginDetailsObject?.Connections === undefined
      ? []
      : userLoginDetailsObject?.Connections;
  const allScoutsandAgentsConnections =
    userLoginDetailsObject?.AgentandScoutConnections === undefined
      ? []
      : userLoginDetailsObject?.AgentandScoutConnections;

  const [connections, setConnections] = useState([]);
  let isDocumentsRetrieved = false; // Flag to track if documents are retrieved
  async function retrieveDocuments() {
    if (!isDocumentsRetrieved) {
      // Check if documents are already retrieved
      isDocumentsRetrieved = true; // Update flag to indicate retrieval

      const items = []; // Array to store documents

      try {
        const videosQuery = query(
          collection(db, `users_db`),
          where("accountId", "in", [
            ...AaallUsersAndMessages,
            ...allScoutsandAgentsConnections,
          ])
        );

        const videosSnapshot = await getDocs(videosQuery);

        videosSnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        // Now items array contains all the documents
        console.log(items);
        setConnections(items);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    }
  }

  useEffect(() => {
    retrieveDocuments();
  }, []);

  return (
    <div
      className="primaryTextColor  md:flex-row md:flex md:w-[100%] md:h-[100%]    sm:flex sm:w-[100%]  sm:flex-col sm:h-[100%]"
      // style={{ display: "flex", width: "100%", height: "100%" }}
      // style={{ background: "red" }}
    >
      {/* MESSAGE OVERVIEW SECTION */}
      <div
        className="md:flex md:flex-col md:basis-[60%] md:flex-shrink-0   sm:basis-[20%] sm:flex sm:flex-col sm:flex-shrink-0"
        style={
          {
            // flex: ".35",
            // display: "flex",
            // flexDirection: "column",background
            // background: "peru",
          }
        }
      >
        {/* // INBOX HEADER */}
        <div
          className="md:basis-[20%]  sm:basis-[20%]"
          // style={{ background: "yellow" }}
        >
          <h5
            className="tb:text-[1em] md:text-[1em] lg:text-[1em] sm:text-[1em]"
            style={{ fontWeight: "bolder", margin: "0" }}
          >
            Connections
          </h5>
          <h6 className="tb:text-[1em] md:text-[1em]">Filter</h6>
          {/* <span style={{ fontSize: ".8em" }}>
            102Messages <Circle sx={{ width: 7 }} /> 40 unread
          </span> */}
          {/* // SEARCH INBOX */}
          <div className="md:inline-flex md:gap-[1.5vw] ">
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
              }}
              style={{ fontSize: 20 }}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* //  CONNECTIONS */}
        <div
          className="md:basis-[70%] md:mt-[2vh] sm:flex-col sm:flex sm:flex-shrink-0 sm:basis-[70%] content-center"
          style={{ overflowY: "scroll", padding: 10 }}
        >
          {countryName === ""
            ? agentAndScoutsList
                ?.filter((agent) => !connections.includes(agent.accountId))
                .map((person) => {
                  return (
                    <div
                      className="sm:min-h-1vh md:min-h-0.5vh "
                      key={person.accountId}
                    >
                      <ScoutsDisplayCard
                        // style={{ width: "25vw", height: "15vh" }}
                        AgencyName={person.organization}
                        AccountId={person?.accountId}
                        UserName={`${person.firstName} ${person.surname}`}
                        playerImageUrl={person.profileImage}
                        handleConnect={() => {
                          if (subscriptionStatus == true) {
                            submitConnectionRequest(
                              person.accountId,
                              `${person.firstName} ${person.surname}`,
                              person.role
                            );
                          } else {
                            triggerWarningAlertModal(
                              "You need an active subscription"
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })
            : agentAndScoutsList
                ?.filter((agent) => !connection?.includes(agent.accountId))
                .filter(
                  (person) =>
                    person.Nationality === countryName && person.role === role
                )
                .map((filtered, index) => {
                  return (
                    <div
                      key={index}
                      className="sm:min-h-1vh md:min-h-0.5vh md:w-[5vw]"
                      // style={{ }}
                    >
                      <ScoutsDisplayCard
                        style={{ width: "25vw", height: "15vh" }}
                        AgencyName={filtered.organization}
                        UserName={`${filtered.firstName} ${filtered.surname}`}
                        handleConnect={() => {
                          if (subscriptionStatus == true) {
                            submitConnectionRequest(
                              person.accountId,
                              `${person.firstName} ${person.surname}`,
                              person.role
                            );
                          } else {
                            triggerWarningAlertModal(
                              "You need an active subscription"
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })}
        </div>
      </div>

      {/* USER ADDED CONNECTIONS */}
      <div
        // cardBackground
        className=" md:flex md:flex-col md:pl-[1.5vw] md:basis-[40%] md:flex-shrink-0  sm:basis-[80%]      sm:flex sm:flex-shrink-0 sm:flex-col sm:pl-[0vw] lg:text-[1em]  tb:text-[1em] md:text-[1em]"
        style={{
          // flex: ".65",
          // background: "green",
          display: "flex",
          flexDirection: "column",
          // paddingLeft: "1.5vw",
          borderRadius: "1vw",
          overflowY: "scroll",
        }}
      >
        {/* // Pagination and delete message area */}
        {/* style={{ flex: "1", display: "grid", placeContent: "center" }} */}
        Filter for player connections and agent/scout connections
        {connections === undefined || connections?.length === 0 ? (
          <h4 className="primaryTextColor" style={{ textAlign: "center" }}>
            No contacts yet
          </h4>
        ) : (
          connections.map((data, key) => {
            return (
              <span style={{ marginBottom: "1vh", marginTop: "1vh" }} key={key}>
                <MessageContactCardForConnectionsScreen
                  profileImage={data?.profileImage}
                  profileName={`${data?.firstName} ${data?.surname}`}
                  time={""}
                  message={""}
                  accountId={data?.accountId}
                />{" "}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionConnetions;
