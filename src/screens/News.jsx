import { Flag, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import NewsCard from "../components/Cards/NewsCard/NewsCard";
import NewsFeatureMatchCard from "../components/Cards/NewsCard/NewsFeatureMatchCard";

const News = () => {
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

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        // background: "peru",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: ".1",
          //   background: "red",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h4>Latest News</h4>
      </div>
      <div
        style={{
          flex: ".9",
          //   background: "yellow",
          flexWrap: "wrap",
          display: "flex",
          overflowY: "scroll",
          gap: "10px",
          padding: "20px",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        {NewsData.map((data, index) => {
          const { title, img } = data;
          return <NewsCard key={index} image={img} title={title} />;
        })}
      </div>
    </div>
  );
};

export default News;
