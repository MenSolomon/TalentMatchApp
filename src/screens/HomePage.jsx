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
