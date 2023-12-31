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

const PlayerVersionInbox = () => {
  return (
    <div
      className="primaryTextColor md:gap-[1em] md:flex-row md:flex md:w-[100%] md:h-[100%]    sm:flex sm:w-[100%] sm:gap-[3.5em] sm:flex-col sm:h-[100%]"
      // style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {/* MESSAGE OVERVIEW SECTION */}
      <div
        className="md:flex md:flex-col md:basis-[35%]    sm:basis-[35%] sm:flex sm:flex-col"
        // style={{
        //   flex: ".35",
        //   display: "flex",
        //   flexDirection: "column",
        // }}
      >
        {/* // INBOX HEADER */}
        <div className="md:basis-[20%]  sm:basis-[20%]">
          <h5 style={{ fontWeight: "bolder", margin: "0" }}>Inbox</h5>
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
          className="md:basis-[80%] sm:flex-col  sm:flex sm:flex-shrink-0  sm:basis-[80%]"
          style={{ overflowY: "scroll" }}
        >
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
        className="cardBackground md:flex md:flex-col md:pl-[1.5vw] md:basis-[65%]  sm:basis-[65%]      sm:flex sm:flex-shrink-0 sm:flex-col sm:pl-[0vw]"
        style={{
          borderRadius: "1vw",
        }}
      >
        {/* // Pagination and delete message area */}
        <div className="md:basis-[8%] md:flex  sm:flex sm:basis-[8%]">
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
        <div className="md:basis-[12%] md:flex sm:flex  sm:basis-[12%]">
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
          className="md:basis-[8%]  sm:basis-[8%]"
          style={{
            // flex: ".8",
            // // background: "yellow",
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

export default PlayerVersionInbox;
