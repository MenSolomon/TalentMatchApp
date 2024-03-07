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
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";

import avatarImage from "../assets/images/avatar.jpg";
import MessageContactCard from "../components/Cards/MessageContactCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { v4 } from "uuid";
import {
  collection,
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

const CoachAgentScoutVersionConnetions = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [countryCode, setCountryCode] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

  const {
    status,
    data: agentAndScoutsList,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getVisibleAgents"],
    queryFn: async () => {
      try {
        const subscriptionsRef = collection(db, "users_db");
        const queryAgentsAndScouts = query(
          subscriptionsRef,
          where("role", "in", ["Agent", "Scout"])
        );

        // Get the documents from Firestore
        const snapshot = await getDocs(queryAgentsAndScouts);

        // Extract the data from the documents
        const agentAndScouts = snapshot.docs.map((doc) => doc.data());
        console.log(agentAndScouts);
        // Return the data (no need for unnecessary parenthesis)
        return agentAndScouts;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Access initial data and loading/error states from useQuery

  useEffect(() => {
    const currentUser = auth.currentUser;
    const accountId = currentUser.uid;
    const getVisibleAgents = async () => {};
    getVisibleAgents();
  }, []);

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
            {" "}
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
            <Button
              onClick={() => {
                setCountryName("");
              }}>
              Reset
            </Button>
          </div>
        </div>

        {/* // MESSAGE SUMMARY */}
        <div
          className="md:basis-[80%] sm:flex-col  sm:flex sm:flex-shrink-0 sm:basis-[80%]"
          style={{ overflowY: "scroll" }}>
          {countryName === ""
            ? agentAndScoutsList?.map((person) => {
                return (
                  <div>
                    {person.firstName} {person.surname}
                  </div>
                );
              })
            : agentAndScoutsList
                ?.filter((person) => person.Nationality === countryName)
                .map((filtered) => {
                  return (
                    <div>
                      {filtered.firstName} {filtered.surname}
                    </div>
                  );
                })}
        </div>
      </div>

      {/* INBOX CONTENT SECTION */}
      <div
        className="cardBackground md:flex md:flex-col md:pl-[1.5vw] md:basis-[40%]  sm:basis-[40%]      sm:flex sm:flex-shrink-0 sm:flex-col sm:pl-[0vw]"
        style={{
          // flex: ".65",
          // background: "red",
          // display: "flex",
          // flexDirection: "column",
          // paddingLeft: "1.5vw",
          borderRadius: "1vw",
        }}>
        {/* // Pagination and delete message area */}
        {/* style={{ flex: "1", display: "grid", placeContent: "center" }} */}
        {selectedUser.length === 0 ? (
          <div className="md:basis-[100%] md:grid md:place-content-center    sm:basis-[100%] sm:grid sm:place-content-center">
            {" "}
            <h5 style={{ textAlign: "center" }}>
              Send and reveive messages without keeping your phone online
            </h5>{" "}
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

const OtherUserMessage = ({ message, dateSent, profileImage }) => {
  return (
    <li
      className="md:flex md:flex-col  sm:flex sm:flex-col"
      style={{
        padding: "0vh 1vw",
        // display: "flex",
        // flexDirection: "column",
        background: "red",
      }}>
      <div
        style={{
          flex: ".95",
          display: "flex",
          // flexDirection: "row-reverse",
          gap: ".1vw",
        }}>
        <div style={{ flex: ".05" }}>
          <Avatar src={profileImage} sx={{ width: 30, height: 30 }} />
        </div>
        <div style={{ flex: "95", padding: ".5vw" }}>
          <span
            style={{
              background: "#f2f2f2",
              padding: ".5vw",
              borderRadius: ".4vw",
              // float: "right",
            }}>
            {message}
          </span>
        </div>
      </div>

      <div style={{ flex: ".05" }}>
        <span
          className="primaryTextColor"
          style={{
            // float: "right",
            fontSize: ".7em",
            marginTop: "0vh",
          }}>
          {dateSent}
        </span>
      </div>
    </li>
  );
};

const LoginUserMessage = ({ message, dateSent, profileImage }) => {
  return (
    <li
      className="md:flex md:flex-col  sm:flex sm:flex-col"
      style={{
        padding: "0vh 1vw",
        // display: "flex",
        // flexDirection: "column",
        // background: "red",
      }}>
      <div
        style={{
          flex: ".95",
          display: "flex",
          flexDirection: "row-reverse",
          gap: ".1vw",
        }}>
        <div style={{ flex: ".05" }}>
          <Avatar src={profileImage} sx={{ width: 30, height: 30 }} />
        </div>
        <div style={{ flex: "95", padding: ".5vw" }}>
          <span
            style={{
              background: "#5585FE",
              padding: ".5vw",
              borderRadius: ".4vw",
              float: "right",
            }}>
            {message}
          </span>
        </div>
      </div>

      <div style={{ flex: ".05" }}>
        <span
          className="primaryTextColor"
          style={{
            float: "right",
            fontSize: ".7em",
            marginTop: "0vh",
          }}>
          {dateSent}
        </span>
      </div>
    </li>
  );
};
