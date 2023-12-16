import { Avatar, Checkbox, Tooltip } from "@mui/material";

const MessageContactCard = ({ profileImage, message, time, profileName }) => {
  return (
    <div
      className="messageCard cardBackground"
      style={{
        width: "100%",
        height: "20%",
        marginBottom: "1%",
        // background: "blue",
        display: "flex",
        padding: ".2vw",
        borderRadius: ".5vw",
        paddingTop: "1vh",
        paddingRight: ".5vw",
        // borderLeft: "3px solid white",
        // border: "1px solid black",
      }}
    >
      {/* // CHECKBOX AREA */}
      <div style={{ flex: ".2", display: "flex", justifyContent: "center" }}>
        {/* <Checkbox /> */}
        <Avatar src={profileImage} sx={{ width: 50, height: 50 }} />
      </div>
      {/* // MESSAGE CONTENT AREA */}
      <div
        style={{
          flex: ".8",
          display: "flex",
          flexDirection: "column",
          fontSize: ".9em",
        }}
      >
        {/* // FROM AND DATE */}
        <div style={{ flex: ".3", display: "flex" }}>
          {/* // MESSAGE FROM */}
          <span style={{ flex: ".7" }}>
            {" "}
            <Tooltip title={profileName?.length > 20 ? profileName : ""}>
              {" "}
              <b>
                {" "}
                {profileName?.length > 20
                  ? `${profileName.substring(0, 17)}...`
                  : profileName}{" "}
              </b>
            </Tooltip>{" "}
          </span>
          {/* // DATE RECEIVED */}
          <span
            style={{
              flex: ".3",
              textAlign: "right",
              fontSize: ".8em",
            }}
          >
            {time}
          </span>
        </div>

        {/* // SUBJECT AND MESSAGE */}
        <div
          style={{
            flex: ".7",

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* MESSAGE */}

          <div style={{ flex: "1" }}>
            {message?.length > 81 ? `${message.substring(0, 78)}...` : message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContactCard;
