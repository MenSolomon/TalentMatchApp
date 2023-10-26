import { Circle, Delete, Reply, Search } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import InboxMessageCard from "../components/Cards/InboxMessageCard";
import avatarImage from "../assets/images/avatar.jpg";

const CoachAgentScoutVersionInbox = () => {
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
          <h5 style={{ fontWeight: "bolder", margin: "0" }}>Inbox</h5>
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
          <InboxMessageCard />
          <InboxMessageCard />
          <InboxMessageCard />

          <InboxMessageCard />

          <InboxMessageCard />
          <InboxMessageCard />
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
        <div
          style={{
            flex: ".08",
            // background: "white",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              className="primaryTextColor"
              sx={{
                color: "white",
              }}
              count={1}
              color="primary"
              size="small"
            />
          </div>

          <IconButton>
            <Delete className="primaryTextColor" />
          </IconButton>
        </div>

        {/* // Sender details Area area */}
        <div style={{ flex: ".12", display: "flex" }}>
          {/* AVATAR AREA      */}
          <div
            style={{
              flex: ".13",
              // background: "red",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Avatar src={avatarImage} sx={{ width: "50px", height: "50px" }} />
          </div>
          {/* SCOUT NAME AND AGENCY AREA       */}
          <div
            style={{
              flex: ".57",
              // background: "green",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h5 style={{ margin: 0 }}>Scout Name </h5>
            <h6 style={{ margin: 0 }}>Agency </h6>
          </div>

          {/* DATE AND REPLY BUTTON AREA      */}
          <div
            style={{
              flex: ".3",
              // background: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: ".8em" }}>
              {" "}
              2023, October 10, 10:40pm{" "}
            </span>

            <span>
              <IconButton>
                {" "}
                <Reply className="primaryTextColor" />{" "}
              </IconButton>
            </span>
          </div>
        </div>
        {/* // Message Content area */}
        <div
          style={{
            flex: ".8",
            // background: "yellow",
            paddingTop: "2vh",
          }}
        >
          <h4> Requesting for a trial session with my academy </h4>

          <span>
            Hi playerCard, <br />
            Contacted you to ask if you are interested and willing to take a
            justig=fy session with us SAMPLE Agency . Let me know if we can chat
            for a bit to know when you will be available
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionInbox;
