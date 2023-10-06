import { ViewHeadline, ViewWeek } from "@mui/icons-material";
import ghana from "../assets/images/ghana.png";
import ronaldo from "../assets/images/Ronaldo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsCarousel from "../components/Carousel/NewsCarousel";
import MatchedPlayerCard from "../components/Cards/MatchedPlayerCard";
import Top10PlayerPicksOfTheWeek from "../components/Carousel/Top10PlayerPicksOfTheWeek";
import MatchedPlayersCarousel from "../components/Carousel/MatchedPlayersCarousel";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const NewsData = [
    {
      source: "espn",

      title: "Are Man United asking Hojlund to do too much?",
      url: "https://www.espn.in/football/story/_/id/38572972/rasmus-hojlund-manchester-united-stress-pressure-premier-league",
      img: "https://a.espncdn.com/photo/2023/1005/r1234194_1296x729_16-9.jpg",
    },
    {
      title:
        "What crisis? Man City look like their old selves at Leipzig as youngsters step up",
      url: "https://www.espn.in/football/story/_/id/38566713/man-city-back-normal-ucl-win-leipzig-phil-foden-rico-lewis",
      img: "https://a.espncdn.com/photo/2023/1004/r1233949_1296x729_16-9.jpg",
      source: "espn",
    },
    {
      source: "espn",
      title:
        "LIVE Transfer Talk: Messi to get Barcelona loan if Inter Miami miss playoffs",
      url: "https://www.espn.in/football/story/_/id/38577927/transfer-talk-barcelona-loan-lionel-messi-inter-miami-miss-playoffs",
      img: "https://a.espncdn.com/photo/2023/0929/r1231155_1296x729_16-9.jpg",
    },
    {
      title: "UCL talking points: Best player so far, how to save Man Utd?",
      url: "https://www.espn.in/football/story/_/id/38548855/ucl-talking-points-best-player-far-how-save-man-utd",
      img: "https://a.espncdn.com/photo/2023/1005/r1234067_1296x729_16-9.jpg",
      source: "onefootball.com",
    },
  ];

  //
  const matchedPlayerArrayDummy = ["1", "2", "3", "1", "1", "1"];

  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1vh",
      }}
    >
      {/* // FIRST SECTION`` */}
      <div
        style={{
          flex: ".55",
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
            display: "flex",
          }}
        >
          {/* // Players of the Week Pick */}
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: ".2", background: "transparent" }}>
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
          padding: ".4vh .5vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* // Headers */}
        <div style={{ flex: ".12", background: "transparent" }}>
          <h6 style={{ float: "left", fontWeight: "800" }}>Matched Players</h6>
          <h6
            style={{
              float: "right",
              fontSize: ".95em",
              fontWeight: "800",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/view-all");
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
            padding: ".5vh .3vw",
          }}
        >
          <MatchedPlayersCarousel
            MatchedPlayersArray={matchedPlayerArrayDummy}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
