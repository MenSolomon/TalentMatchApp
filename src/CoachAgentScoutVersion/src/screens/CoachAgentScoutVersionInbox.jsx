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
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";

import avatarImage from "../assets/images/avatar.jpg";
import MessageContactCard from "../components/Cards/MessageContactCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import moment from "moment/moment";
import { selectuserMessages } from "../../../statemanager/slices/MessagesSlice";

const CoachAgentScoutVersionInbox = () => {
  const [messageArray, setMessage] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [messageText, setMessageText] = useState("");

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

  const dummyUserArray = [
    {
      contactId: "70dc7675-af46-44cb-beb4-4104e55db9f8",
      name: "Gory g",
      image: "",
      messages: [
        {
          senderId: "1234",
          recepientId: "2134",
          senderName: "Michael Solomon",
          recepientName: "Jeff Asamoah",
          message: "Play styleas",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Seen it",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Seen it",
          dateSent: "11/12/22",
        },
      ],
    },
    {
      contactId: "231",
      name: "Esther Addae",
      image: "",
      messages: [
        {
          senderId: "1234",
          recepientId: "2134",
          senderName: "Michael Solomon",
          recepientName: "Jeff Asamoah",
          message: "Play styleas",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Seconds",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Real Estate",
          dateSent: "11/12/22",
        },
      ],
    },
  ];

  const [AllUsersAndMessages, setAllUsersAndMessages] = useState([]);

  const allMessages = useSelector(selectuserMessages);

  useEffect(() => {
    const groupedMessages = {};
    console.log(allMessages);

    // Iterate through each message object
    allMessages &&
      allMessages?.forEach((message) => {
        // Check if the message has a valid recepientId and senderId
        if (message.recepientId && message.senderId) {
          // Group by recepientId
          if (!groupedMessages[message.recepientId]) {
            groupedMessages[message.recepientId] = {
              contactId: message.recepientId,
              name: message.recepientName,
              image: "",
              messages: [],
            };
          }
          groupedMessages[message.recepientId].messages.push(message);

          // Group by senderId
          if (!groupedMessages[message.senderId]) {
            groupedMessages[message.senderId] = {
              contactId: message.senderId,
              name: message.senderName,
              image: "",
              messages: [],
            };
          }
          groupedMessages[message.senderId].messages.push(message);
        }
      });

    // Convert the groupedMessages object to an array
    const resultArray = Object.values(groupedMessages);
    setAllUsersAndMessages(resultArray);

    if (selectedUser.contactId) {
      const updatedSelectedUser = resultArray.find(
        (user) => user.contactId === selectedUser.contactId
      );

      // Sort messages based on dateSent
      if (updatedSelectedUser && updatedSelectedUser.messages) {
        updatedSelectedUser.messages.sort(
          (a, b) => new Date(a.dateSent) - new Date(b.dateSent)
        );
      }

      setSelectedUser(updatedSelectedUser || []);
    }

    console.log(resultArray, "filtered MEssages");
  }, [allMessages]);

  const handleMessageSend = async (contactId) => {
    try {
      // alert(contactId);
      const uuid = v4();
      const dateSend = moment().format("YYYY-MM-DD HH:mm:ss");

      if (messageText !== "") {
        const userToSelfMessageRef = doc(
          db,
          `Chats/${userLoginDetailsObject.accountId}/Messages`,
          uuid
        );
        await setDoc(userToSelfMessageRef, {
          messageId: uuid,
          senderId: userLoginDetailsObject.accountId,
          recepientId: contactId,
          senderName: `${userLoginDetailsObject?.firstName} ${userLoginDetailsObject?.surname} `,
          recepientName: contactId,
          message: messageText,
          dateSent: dateSend,
        });

        // Message to other
        const userToOthersMessageRef = doc(
          db,
          `Chats/${contactId}/Messages/`,
          uuid
        );
        await setDoc(userToOthersMessageRef, {
          messageId: uuid,
          senderId: userLoginDetailsObject.accountId,
          recepientId: contactId,
          senderName: `${userLoginDetailsObject?.firstName} ${userLoginDetailsObject?.surname} `,
          recepientName: contactId,
          message: messageText,
          dateSent: dateSend,
        });

        // alert("Message sent");
        setMessageText("");
      }
    } catch (error) {
      alert("error");
      console.error(error);
    }
  };

  // profileImage;
  // profileName;
  // time;
  // message;

  useEffect(() => {
    console.log(selectedUser?.contactId);
  }, [selectedUser]);

  return (
    <div
      className="primaryTextColor"
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {/* MESSAGE OVERVIEW SECTION */}
      <div
        style={{
          flex: ".35",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* // INBOX HEADER */}
        <div style={{ flex: ".2" }}>
          <h5 style={{ fontWeight: "bolder", margin: "0" }}>Messages</h5>
          <span style={{ fontSize: ".8em" }}>
            102Messages <Circle sx={{ width: 7 }} /> 40 unread
          </span>
          {/* // SEARCH INBOX */}
          <TextField
            id="input-with-icon-textfield"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
            sx={{ marginTop: "1vh" }}
          />
        </div>

        {/* // MESSAGE SUMMARY */}
        <div style={{ flex: ".8", overflowY: "scroll" }}>
          {AllUsersAndMessages?.length === 0 ? (
            <h4 className="primaryTextColor" style={{ textAlign: "center" }}>
              No contacts yet
            </h4>
          ) : (
            AllUsersAndMessages?.map((data, index) => {
              const { contactId, name, image, messages } = data;

              return (
                <span
                  onClick={() => {
                    setSelectedUser({ contactId: contactId, name, messages });
                    setMessageText("");
                    // alert(contactId);
                  }}
                  key={index}
                >
                  <MessageContactCard
                    profileImage={image}
                    profileName={name}
                    time={messages[messages.length - 1].time}
                    message={messages[messages.length - 1].message}
                  />
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* INBOX CONTENT SECTION */}
      <div
        className="cardBackground"
        style={{
          flex: ".65",
          // background: "red",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "1.5vw",
          borderRadius: "1vw",
        }}
      >
        {/* // Pagination and delete message area */}

        {selectedUser.length === 0 ? (
          <div style={{ flex: "1", display: "grid", placeContent: "center" }}>
            {" "}
            <h5>
              Send and reveive messages withouf keepong your phone online
            </h5>{" "}
          </div>
        ) : (
          <>
            <div
              style={{
                flex: ".12",
                // background: "white",
                borderBottom: "1px solid #f2f2f2",
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: ".35",
                  // background: "red",
                  display: "flex",
                  padding: ".2vw",
                  gap: ".4vw",
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
              >
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
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "green",
                      }}
                    ></div>{" "}
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
              }}
            >
              <div style={{ flex: ".85", overflowY: "scroll" }}>
                {selectedUser.messages.length === 0 ? (
                  <h4
                    className="primaryTextColor"
                    style={{ textAlign: "center" }}
                  >
                    No messages yet
                  </h4>
                ) : (
                  selectedUser.messages &&
                  selectedUser.messages.map((data, index) => {
                    const {
                      senderId,
                      recepientId,
                      senderName,
                      recepientName,
                      message,
                      dateSent,
                    } = data;

                    // Assuming userLoginDetailsObject contains the accountId of the logged-in user
                    const loggedInUserAccountId =
                      userLoginDetailsObject?.accountId;

                    if (senderId === loggedInUserAccountId) {
                      return (
                        <LoginUserMessage
                          key={index}
                          message={message}
                          dateSent={dateSent}
                          profileImage={""}
                        />
                      );
                    } else {
                      return (
                        <OtherUserMessage
                          key={index}
                          message={message}
                          dateSent={dateSent}
                          profileImage={""}
                        />
                      );
                    }
                  })
                )}
                ;
              </div>

              {/* // TEXT FIELD AND SEND BUTTON AREA */}
              <div style={{ flex: ".15", display: "flex" }}>
                <div
                  style={{
                    flex: ".1",
                    // background: "red",
                  }}
                >
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
                  }}
                >
                  <IconButton
                    onClick={() => {
                      handleMessageSend(selectedUser?.contactId);
                    }}
                    sx={{ marginLeft: ".5vw" }}
                  >
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

export default CoachAgentScoutVersionInbox;

const OtherUserMessage = ({ message, dateSent, profileImage }) => {
  return (
    <li
      style={{
        padding: "0vh 1vw",
        display: "flex",
        flexDirection: "column",
        // background: "red",
      }}
    >
      <div
        style={{
          flex: ".95",
          display: "flex",
          // flexDirection: "row-reverse",
          gap: ".1vw",
        }}
      >
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
            }}
          >
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
          }}
        >
          {dateSent}
        </span>
      </div>
    </li>
  );
};

const LoginUserMessage = ({ message, dateSent, profileImage }) => {
  return (
    <li
      style={{
        padding: "0vh 1vw",
        display: "flex",
        flexDirection: "column",
        // background: "red",
      }}
    >
      <div
        style={{
          flex: ".95",
          display: "flex",
          flexDirection: "row-reverse",
          gap: ".1vw",
        }}
      >
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
            }}
          >
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
          }}
        >
          {dateSent}
        </span>
      </div>
    </li>
  );
};
