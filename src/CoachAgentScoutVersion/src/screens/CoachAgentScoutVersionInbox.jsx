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
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import moment from "moment/moment";
import { selectuserMessages } from "../../../statemanager/slices/MessagesSlice";
import { selectContactSelectedForMessaging } from "../../../statemanager/slices/OtherComponentStatesSlice";
import { formatDistanceToNow } from "date-fns";

const CoachAgentScoutVersionInbox = () => {
  const [messageArray, setMessageArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [messageText, setMessageText] = useState("");

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const selectedUserDetailsObject = useSelector(
    selectContactSelectedForMessaging
  );

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

  const AaallUsersAndMessages =
    userLoginDetailsObject?.Connections === undefined
      ? []
      : userLoginDetailsObject?.Connections;
  const allScoutsandAgentsConnections =
    userLoginDetailsObject?.AgentandScoutConnections === undefined
      ? []
      : userLoginDetailsObject?.AgentandScoutConnections;

  console.log("Letter from overseas", AaallUsersAndMessages);
  console.log("Letter from overseas2", allScoutsandAgentsConnections);

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
          `Chats/${userLoginDetailsObject.accountId}/Contacts/Messages/${contactId}`,
          uuid
        );
        await setDoc(userToSelfMessageRef, {
          messageId: uuid,
          senderId: userLoginDetailsObject?.accountId,
          recepientId: contactId,
          senderName: `${userLoginDetailsObject?.firstName} ${userLoginDetailsObject?.surname} `,
          recepientName: contactId,
          message: messageText,
          dateSent: dateSend,
        });

        // Message to other
        const userToOthersMessageRef = doc(
          db,
          `Chats/${contactId}/Contacts/Messages/${userLoginDetailsObject.accountId}`,
          uuid
        );
        await setDoc(userToOthersMessageRef, {
          messageId: uuid,
          senderId: userLoginDetailsObject?.accountId,
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
      // alert("error");
      console.error(error);
    }
  };

  // profileImage;
  // profileName;
  // time;
  // message;

  //   const citiesRef = db.collection("users_db");
  const [connections, setConnections] = useState([]);
  let isDocumentsRetrieved = false; // Flag to track if documents are retrieved

  // Function to retrieve documents
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

  // Use Effect to retrive all messages

  const compareDates = (a, b) => {
    const dateA = new Date(a.dateSent);
    const dateB = new Date(b.dateSent);
    return dateA - dateB;
  };

  // Sorting the array

  useEffect(() => {
    // selectedUserDetailsObject?.contactId.length === 0 ?

    const userToSelfMessageRef = collection(
      db,
      `Chats/${
        selectedUserDetailsObject?.contactId === ""
          ? "empty"
          : selectedUserDetailsObject?.contactId
      }/Contacts/Messages/${userLoginDetailsObject?.accountId}`
    );

    const q = query(userToSelfMessageRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());

        // alert(doc.id());
      });
      // alert("messages");

      console.log(items, "allmessages");
      setMessageArray(items.sort(compareDates));
    });
    return () => {
      alldata();
    };
  }, [selectedUserDetailsObject]);

  // Call the function to retrieve documents
  // retrieveDocuments();

  useEffect(() => {
    console.log(selectedUser?.contactId);
  }, [selectedUser]);

  return (
    <div
      className="primaryTextColor md:gap-[1em] md:flex-row md:flex md:w-[100%] md:h-[100%]     
      tb:gap-[1em] tb:flex-row tb:flex tb:w-[100%] tb:h-[100%]
         sm:flex sm:w-[100%] sm:gap-[3.5em] sm:flex-col sm:h-[100%]"
      // style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {/* MESSAGE OVERVIEW SECTION */}
      <div
        className="md:flex md:flex-col md:basis-[35%] 
        tb:flex tb:flex-col tb:basis-[35%]
        
           sm:basis-[35%] sm:flex sm:flex-col"
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
        <div className="md:basis-[20%]  sm:basis-[20%]">
          <h5
            className="tb:text-[1.6em] md:text-[1.3em]"
            style={{ fontWeight: "bolder", margin: "0" }}
          >
            Messages
          </h5>
          {/* <span style={{ fontSize: ".8em" }}>
            102Messages <Circle sx={{ width: 7 }} /> 40 unread
          </span> */}
          {/* // SEARCH INBOX */}
          <TextField
            id="input-with-icon-textfield"
            className="sm:w-[100%] md:w-[90%]"
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
        <div
          className="md:basis-[80%] sm:flex-col  sm:flex sm:flex-shrink-0 sm:basis-[80%]"
          style={{ overflowY: "scroll" }}
        >
          {connections === undefined || connections?.length === 0 ? (
            <h4
              className="primaryTextColor  tb:text-[1.7em] md:text-[1.3em]"
              style={{ textAlign: "center" }}
            >
              No contacts yet
            </h4>
          ) : (
            // AllUsersAndMessages?.map((data, index) => {
            //   const { contactId, name, image, messages } = data;

            //   return (
            //     <span
            //       onClick={() => {
            //         setSelectedUser({ contactId: contactId, name, messages });
            //         setMessageText("");
            //         // alert(contactId);
            //       }}
            //       key={index}
            //     >
            //       <MessageContactCard
            //         profileImage={image}
            //         profileName={name}
            //         time={messages[messages.length - 1].time}
            //         message={messages[messages.length - 1].message}
            //       />
            //     </span>
            //   );
            // })
            connections?.map((data, key) => {
              return (
                <span
                  style={{ marginBottom: "1vh", marginTop: "1vh" }}
                  key={key}
                >
                  <MessageContactCard
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

      {/* INBOX CONTENT SECTION */}
      <div
        className="cardBackground md:flex md:flex-col md:pl-[1.5vw] md:basis-[65%] 
        tb:flex tb:flex-col tb:pl-[1.5vw] tb:basis-[65%]
         sm:basis-[65%]      sm:flex sm:flex-shrink-0 sm:flex-col sm:pl-[0vw]"
        style={{
          // flex: ".65",
          // background: "red",
          // display: "flex",
          // flexDirection: "column",
          // paddingLeft: "1.5vw",
          borderRadius: "1vw",
        }}
      >
        {/* // Pagination and delete message area */}
        {/* style={{ flex: "1", display: "grid", placeContent: "center" }} */}
        {selectedUserDetailsObject?.contactId.length === 0 ? (
          <div className="md:basis-[100%] md:grid md:place-content-center    sm:basis-[100%] sm:grid sm:place-content-center">
            {" "}
            <h5
              className="tb:text-[1.6em] md:text-[1.3em]"
              style={{ textAlign: "center" }}
            >
              Send and reveive messages without keeping your phone online
            </h5>{" "}
          </div>
        ) : (
          <>
            <div
              style={{
                flex: ".12",
                // background: "yellow",
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
                  <Avatar
                    src={selectedUserDetailsObject?.profileImage}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <div style={{ flex: ".74" }}>
                  <div>{selectedUserDetailsObject?.name}</div>

                  <div
                    style={{
                      display: "flex",
                      gap: ".3vw",
                      alignItems: "center",
                      // justifyContent: "center",
                    }}
                  >
                    {/* <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "green",
                      }}
                    ></div>{" "}
                    <div style={{ fontSize: ".7em" }}>Online</div> */}
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
                {messageArray.length === 0 ? (
                  <h4
                    className="primaryTextColor"
                    style={{ textAlign: "center" }}
                  >
                    No messages yet
                  </h4>
                ) : (
                  messageArray &&
                  messageArray.map((data, index) => {
                    const {
                      senderId,
                      recepientId,
                      senderName,
                      recepientName,
                      message,
                      dateSent,
                    } = data;

                    // Assuming userLoginDetailsObject contains the accountId of the logged-in user

                    if (senderId === userLoginDetailsObject?.accountId) {
                      return (
                        <LoginUserMessage
                          key={index}
                          message={message}
                          dateSent={dateSent}
                          profileImage={userLoginDetailsObject?.profileImage}
                        />
                      );
                    } else if (
                      senderId === selectedUserDetailsObject?.contactId
                    ) {
                      return (
                        <OtherUserMessage
                          key={index}
                          message={message}
                          dateSent={dateSent}
                          profileImage={selectedUserDetailsObject?.profileImage}
                        />
                      );
                    }
                  })
                )}
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
                    label="Type here"
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
                      handleMessageSend(selectedUserDetailsObject?.contactId);
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
  const parsedTimestamp = new Date(dateSent);
  const formattedRelativeTime = formatDistanceToNow(parsedTimestamp, {
    addSuffix: true,
  });

  return (
    <li
      className="md:flex md:flex-col  sm:flex sm:flex-col"
      style={{
        padding: "0vh 1vw",
        // display: "flex",
        // flexDirection: "column",
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
  const parsedTimestamp = new Date(dateSent);
  const formattedRelativeTime = formatDistanceToNow(parsedTimestamp, {
    addSuffix: true,
  });
  return (
    <li
      className="md:flex md:flex-col  sm:flex sm:flex-col"
      style={{
        padding: "0vh 1vw",
        // display: "flex",
        // flexDirection: "column",
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
