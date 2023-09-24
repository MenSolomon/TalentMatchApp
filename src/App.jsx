import {
  Add,
  Comment,
  DoorBack,
  Favorite,
  Help,
  Home,
  Menu,
  NotificationAdd,
  People,
  Search,
  Settings,
  Star,
  ViewHeadline,
  ViewWeek,
} from "@mui/icons-material";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import SeachBarTextField from "./components/SeachBarTextField";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";
import ProfileMenu from "./components/Menu/ProfileMenu";
import SavedFilters from "./components/MenuButtons/SavedFilters";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import manutd from "./assets/images/manutd.png";
import ghana from "./assets/images/ghana.png";
import ronaldo from "./assets/images/Ronaldo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsCarousel from "./components/Carousel/NewsCarousel";
import MatchedPlayerCard from "./components/Cards/MatchedPlayerCard";
import Top10PlayerPicksOfTheWeek from "./components/Carousel/Top10PlayerPicksOfTheWeek";

const App = () => {
  const currencies = [
    {
      value: "USD",
      label: "Yaw Sarpong",
    },
    {
      value: "EUR",
      label: "Yaw Sarpong",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const NewsData = [
    {
      source: "espn",
      title: "Spurs' Maddison, Son form dangerous duo in post-Harry Kane era",
      url: "https://www.espn.in/football/story/_/id/38476998/heung-min-son-james-maddison-form-dangerous-duo-tottenham-hotspur-frustrate-arsenal",
      img: "https://a.espncdn.com/photo/2023/0924/r1229084_1296x729_16-9.jpg",
    },
    {
      title:
        "10-man Man City still unstoppable, Man United end winless streak, more",
      url: "https://www.espn.in/football/story/_/id/38471068/european-soccer-league-weekend-news-results-highlights-storylines-stats",
      img: "https://a.espncdn.com/photo/2023/0923/r1228712_1296x729_16-9.jpg",
      source: "espn",
    },
    {
      source: "espn",
      title:
        "Sorry, Harry: Why Kane's hat trick for Bayern doesn't count in Germany",
      url: "https://www.espn.in/football/story/_/id/38477403/why-harry-kane-hat-trick-bayern-munich-doesnt-count-germany",
      img: "https://a.espncdn.com/photo/2023/0924/r1228979_1296x729_16-9.jpg",
    },
    {
      title: "Kylian Mbappé comes off injured during Le Classique",
      url: "https://onefootball.com/en/news/kylian-mbappe-comes-off-injured-during-le-classique-38275425",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fwww.getfootballnewsfrance.com%2Fassets%2Ffbl-fra-ligue1-psg-marseille-19-scaled.webp",
      source: "onefootball.com",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* //=====  NAVBAR ======= \\ */}
      <div style={{ flex: ".11", display: "flex" }}>
        {/* // Logo Area */}

        <div
          style={{
            flex: ".18",
            // background: "yellow",
            paddingTop: "1%",
            display: "flex",
          }}
        >
          <Avatar
            sx={{
              // marginLeft: "2vw",
              width: 62,
              height: 62,
              border: "4px solid blue",
              marginLeft: ".4vw",
              marginRight: ".4vw",
            }}
            src={avatarImage}
          ></Avatar>
          <h4 style={{ marginTop: "2vh" }}>Talent Match</h4>
        </div>
        {/* // Search Area? */}
        <div style={{ flex: ".45", paddingTop: "1%", paddingLeft: "4vw" }}>
          {/* "#3D2A2F */}
          <SeachBarTextField label={"Search Player"} marginLeft="3vw" />{" "}
        </div>
        {/* // profile details Area */}
        <div
          style={{
            // Should be 37
            flex: ".34",
            // background: "yellow",
            paddingTop: "1%",
            paddingRight: "1.5%",
            // display: "flex",
          }}
        >
          {/* sx={{ float: "right", marginLeft: "1vw", borderBottom: "none" }} */}

          <ProfileMenu
            style={{ float: "right", marginLeft: "1vw", borderBottom: "none" }}
            name="Michael Solomon"
          />

          <IconButton sx={{ float: "right", marginLeft: ".5vw" }}>
            <NotificationAdd />
          </IconButton>
          <Avatar
            sx={{
              // marginLeft: "2vw",
              width: 55,
              height: 55,
              border: "4px solid blue",
              marginLeft: ".4vw",
              marginRight: ".4vw",
              float: "right",
            }}
            src={avatarImage}
          ></Avatar>

          <LightAndDarkModeSwitch style={{ float: "right" }} />
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div style={{ flex: ".89", display: "flex" }}>
        {/* // NAV ARAEA */}
        <div
          style={{
            flex: ".18",
            // background: "red",
            display: "flex",
            flexDirection: "column",
            paddingTop: "5vh",
          }}
        >
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div style={{ flex: ".65", overflowY: "scroll", maxHeight: "45vh" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              <li style={{ display: "flex" }}>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                    textTransform: "none",
                  }}
                  startIcon={<Home style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  Home{" "}
                </Button>{" "}
                <IconButton sx={{ marginLeft: "9vw" }}>
                  {" "}
                  <Menu />{" "}
                </IconButton>
              </li>
              <li>
                {/* <Button
                style={{ fontSize: ".8em", fontWeight: "600" , textTransform:"none" }}
                startIcon={<Star style={{ width: 20, height: 20  }} />}
              >
                {" "}
                Saved Filters{" "}
              </Button> */}
                <SavedFilters />
              </li>

              <li>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                  }}
                  startIcon={<Favorite style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  Favourites{" "}
                </Button>
              </li>
              <li>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                  }}
                  startIcon={<People style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  Community{" "}
                </Button>
              </li>
              <li>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                  }}
                  startIcon={<Comment style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  News{" "}
                </Button>
              </li>
            </ul>
          </div>

          {/* // Navbar Second HALF */}

          <div style={{ flex: ".35" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              <li style={{ display: "flex" }}>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                  }}
                  startIcon={<Help style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  Help{" "}
                </Button>{" "}
              </li>

              <li style={{ display: "flex" }}>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                  }}
                  startIcon={<Settings style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  Settings{" "}
                </Button>{" "}
              </li>

              <li style={{ display: "flex" }}>
                <Button
                  style={{
                    fontSize: ".8em",
                    fontWeight: "600",
                    textTransform: "none",
                  }}
                  startIcon={<DoorBack style={{ width: 20, height: 20 }} />}
                >
                  {" "}
                  Logout{" "}
                </Button>{" "}
              </li>
            </ul>

            <Card
              sx={{
                width: 145,
                height: 90,
                marginLeft: "2vw",
                paddingTop: "1vh",
                paddingLeft: ".6vw",
                paddingRight: ".6vw",
                display: "flex",
                // background: "#1B1E2B",
              }}
            >
              <div
                style={{
                  flex: ".93",
                  fontSize: ".85em",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {" "}
                Friend Chat or Group Chat{" "}
              </div>
              <div
                style={{
                  flex: ".07",
                  display: "flex",
                }}
              >
                {" "}
                <Add sx={{ marginTop: "4.4vh", color: "gold" }} />{" "}
              </div>
            </Card>
          </div>
        </div>

        {/* // ROUTES SECTION */}
        <div
          style={{
            flex: ".82",
            // background: "blue",
            display: "flex",
            flexDirection: "column",
            padding: "2vh 1.5vw",
            gap: "1vh",
          }}
        >
          {/* // FIRST SECTION`` */}
          <div
            style={{
              flex: ".55",
              // background: "yellow",
              padding: "1vh .7vw",
              display: "flex",
              gap: "1.1vw",
            }}
          >
            {/* // Transfer News carousel */}
            <div
              style={{
                flex: ".6",
                // background: "white",
                borderRadius: "1vw",
                position: "relative",
              }}
            >
              <NewsCarousel NewsArray={NewsData} />
            </div>
            {/* // Most Viewed Player /&& fantasy player of the week ,  free agent pick of the week */}
            <div
              style={{
                flex: ".4",
                // background: "whitesmoke",
                display: "flex",
              }}
            >
              {/* // Players of the Week Pick */}
              <div
                style={{
                  flex: "1",
                  // background: "green",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: ".2", background: "white" }}>
                  {" "}
                  <h4 style={{ fontWeight: "900" }}>
                    {" "}
                    Player Picks of the Week{" "}
                  </h4>{" "}
                </div>
                {/* // Player Pick Card */}
                <div
                  style={{
                    flex: ".8",
                    // background: "blue",
                    borderRadius: "1vw",
                    paddingLeft: ".5vw",
                    paddingRight: ".5vw",
                    paddingTop: ".5vh",
                    paddingBottom: ".5vh",
                  }}
                >
                  <Top10PlayerPicksOfTheWeek
                    PlayerCountry={ghana}
                    PlayerImage={ronaldo}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECOND SECTION */}
          <div
            style={{
              flex: ".45",
              // background: "green",
              padding: ".4vh .5vw",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* // Headers */}
            <div style={{ flex: ".12", background: "white" }}>
              <h6 style={{ float: "left", fontWeight: "800" }}>
                Matched Players
              </h6>
              <h6
                style={{
                  float: "right",
                  fontSize: ".95em",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                {" "}
                View All{" "}
              </h6>{" "}
              <ViewWeek
                sx={{
                  float: "right",
                  width: 20,
                  height: 20,
                  marginRight: ".7vw",
                }}
              />{" "}
              <ViewHeadline
                sx={{
                  float: "right",
                  width: 20,
                  height: 20,
                  marginRight: "1vw",
                }}
              />
            </div>

            {/* // Suggested Cards */}
            <div
              style={{
                flex: ".88",
                padding: ".5vh 1.5vw",
                display: "flex",
                gap: "1.2vw",
              }}
            >
              <MatchedPlayerCard
                PlayerClub={manutd}
                PlayerCountry={ghana}
                PlayerImage={ronaldo}
                PlayerName={"Ronaldo"}
                PlayerPosition={"ST"}
              />
              <MatchedPlayerCard
                PlayerClub={manutd}
                PlayerCountry={ghana}
                PlayerImage={ronaldo}
                PlayerName={"Ronaldo"}
                PlayerPosition={"ST"}
              />
              <MatchedPlayerCard
                PlayerClub={manutd}
                PlayerCountry={ghana}
                PlayerImage={ronaldo}
                PlayerName={"Ronaldo"}
                PlayerPosition={"ST"}
              />
              <MatchedPlayerCard
                PlayerClub={manutd}
                PlayerCountry={ghana}
                PlayerImage={ronaldo}
                PlayerName={"Ronaldo"}
                PlayerPosition={"ST"}
              />
              <MatchedPlayerCard
                PlayerClub={manutd}
                PlayerCountry={ghana}
                PlayerImage={ronaldo}
                PlayerName={"Ronaldo"}
                PlayerPosition={"ST"}
              />
              <MatchedPlayerCard
                PlayerClub={manutd}
                PlayerCountry={ghana}
                PlayerImage={ronaldo}
                PlayerName={"Ronaldo"}
                PlayerPosition={"ST"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

{
  /* <div style={{ flex: ".88", padding: ".5vh 1.5vw" }}>
<MatchedPlayerCard
  PlayerClub={manutd}
  PlayerCountry={ghana}
  PlayerImage={ronaldo}
  PlayerName={"Ronaldo"}
  PlayerPosition={"ST"}
/>
</div> */
}

//   {/* // Player Picks of the  weel card area */}

//   <div
//   style={{
//     // flex: "1",
//     display: "flex",
//     // background: "white",
//   }}
// >
//   {" "}
//   {/* // Image Of player */}
//   <div
//     style={{
//       flex: ".25",
//       borderRadius: ".7vw",
//       backgroundImage: `url(${ronaldo})`,
//       backgroundSize: "cover",
//     }}
//   ></div>
//   {/* Player information */}
//   <div
//     style={{
//       flex: ".55",
//       background: "blue",
//       display: "flex",
//       flexDirection: "column",
//       paddingLeft: ".5vw",
//     }}
//   >
//     <div
//       style={{
//         flex: ".15",
//         display: "flex",
//         fontWeight: "900",
//       }}
//     >
//       {" "}
//       Cristiano Ronaldo{" "}
//     </div>
//     <div style={{ flex: ".4" }}>
//       {" "}
//       <span style={{ fontWeight: "900" }}>
//         {" "}
//         market value:{" "}
//       </span>{" "}
//       $15.00m
//       <br />{" "}
//       <span style={{ fontWeight: "900" }}>
//         {" "}
//         Position :{" "}
//       </span>{" "}
//       Striker{" "}
//     </div>
//   </div>
//   {/* // Rank Number */}
//   <div
//     style={{
//       flex: ".2",
//       fontWeight: "900",
//       fontSize: "2em",
//     }}
//   >
//     {" "}
//     #1{" "}
//     <img
//       src={ghana}
//       style={{ width: "60px", height: "45px" }}
//     />
//   </div>
// </div>
// {/* // View Profile Button Area */}
// <div
//   style={{
//     // flex: ".35",
//     paddingTop: "3vh",

//     // background: "white",
//   }}
// >
//   <Button
//     sx={{
//       textTransform: "none",
//       background: "black",
//       fontWeight: "900",
//       marginRight: "1vw",
//     }}
//   >
//     {" "}
//     Show Interest{" "}
//   </Button>
//   <Button
//     sx={{
//       textTransform: "none",
//       background: "black",
//       fontWeight: "900",
//     }}
//   >
//     {" "}
//     View Profile{" "}
//   </Button>
// </div>
