import NewsCard from "../components/Cards/NewsCard/NewsCard";
import { useEffect, useState } from "react";

const News = () => {
  const [getData, setGetData] = useState([]);
  console.log(getData);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://football-news-aggregator-live.p.rapidapi.com/news/espn";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "bea5221632mshb257d90c38fc46ap1de3f1jsn4b3eec934310",
          "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const array = result;
        console.log(array);
        setGetData(array);
        console.log(getData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // API FOR NEWS
  const newData = [
    {
      title: "Why Newcastle United still seem hard to root against",
      url: "https://www.espn.in/football/story/_/id/38681139/newcastle-united-rebirth-saudi-arabia-pif-premier-league",
      img: "https://a.espncdn.com/photo/2023/1017/r1239698_1296x729_16-9.jpg",
    },
    {
      title:
        "European soccer panic index: Lyon, Man United, Ajax top most disappointing teams",
      url: "https://www.espn.in/football/insider/story/_/id/38688345/european-soccer-2023-24-panic-index-ajax-manchester-united-lyon",
      img: "https://a.espncdn.com/photo/2023/1003/r1233460_1296x729_16-9.jpg",
    },
    {
      title:
        "Why England need Kalvin Phillips to get a transfer out of Man City",
      url: "https://www.espn.in/football/story/_/id/38685337/england-need-kalvin-phillips-get-transfer-man-city",
      img: "https://a.espncdn.com/photo/2023/1019/r1240429_1296x729_16-9.jpg",
    },
    {
      title: "Xabi Alonso among 7 top young coaches to watch in Europe",
      url: "https://www.espn.in/football/story/_/id/38686628/seven-top-young-coaches-watch-european-football",
      img: "https://a.espncdn.com/photo/2023/1018/r1240284_1296x729_16-9.jpg",
    },
    {
      title: "Four truths (and one verdict) from England's win over Italy",
      url: "https://www.espn.in/football/story/_/id/38685753/four-truths-one-verdict-england-win-italy",
      img: "https://a.espncdn.com/photo/2023/1018/r1239997_1296x729_16-9.jpg",
    },
    {
      title: "How VAR could have changed football's most controversial moments",
      url: "https://www.espn.in/football/story/_/id/38290857/how-var-changed-soccer-most-controversial-moments",
      img: "https://a.espncdn.com/photo/2023/0810/lede-art_16x9.jpg",
    },
    {
      title: "LIVE Transfer Talk: Liverpool join race to sign Osimhen",
      url: "https://www.espn.in/football/story/_/id/38690315/transfer-talk-liverpool-join-chelsea-arsenal-osimhen-race",
      img: "https://a.espncdn.com/photo/2023/1019/r1240326_1296x729_16-9.jpg",
    },
    {
      title:
        "Marching on: The 10 teams through to the next round of Asian qualifiers for the World Cup",
      url: "https://www.espn.in/football/story/_/id/38684859/10-teams-next-round-asian-qualifiers-2026-fifa-world-cup",
      img: "https://a.espncdn.com/photo/2023/1018/r1239958_1080x608_16-9.jpg",
    },
    {
      title: "Xabi Alonso among 7 top young coaches to watch in Europe",
      url: "https://www.espn.in/football/story/_/id/38686628/seven-top-young-coaches-watch-european-football",
      img: "https://a.espncdn.com/photo/2023/1018/r1240284_1296x729_16-9.jpg",
    },
    {
      title: "Why Newcastle United still seem hard to root against",
      url: "https://www.espn.in/football/story/_/id/38681139/newcastle-united-rebirth-saudi-arabia-pif-premier-league",
      img: "https://a.espncdn.com/photo/2023/1017/r1239698_1296x729_16-9.jpg",
    },
    {
      title:
        "European soccer panic index: Lyon, Man United, Ajax top most disappointing teams",
      url: "https://www.espn.in/football/insider/story/_/id/38688345/european-soccer-2023-24-panic-index-ajax-manchester-united-lyon",
      img: "https://a.espncdn.com/photo/2023/1003/r1233460_1296x729_16-9.jpg",
    },
    {
      title:
        "Why England need Kalvin Phillips to get a transfer out of Man City",
      url: "https://www.espn.in/football/story/_/id/38685337/england-need-kalvin-phillips-get-transfer-man-city",
      img: "https://a.espncdn.com/photo/2023/1019/r1240429_1296x729_16-9.jpg",
    },
    {
      title: "Xabi Alonso among 7 top young coaches to watch in Europe",
      url: "https://www.espn.in/football/story/_/id/38686628/seven-top-young-coaches-watch-european-football",
      img: "https://a.espncdn.com/photo/2023/1018/r1240284_1296x729_16-9.jpg",
    },
    {
      title: "Four truths (and one verdict) from England's win over Italy",
      url: "https://www.espn.in/football/story/_/id/38685753/four-truths-one-verdict-england-win-italy",
      img: "https://a.espncdn.com/photo/2023/1018/r1239997_1296x729_16-9.jpg",
    },
    {
      title: "How VAR could have changed football's most controversial moments",
      url: "https://www.espn.in/football/story/_/id/38290857/how-var-changed-soccer-most-controversial-moments",
      img: "https://a.espncdn.com/photo/2023/0810/lede-art_16x9.jpg",
    },
    {
      title: "LIVE Transfer Talk: Liverpool join race to sign Osimhen",
      url: "https://www.espn.in/football/story/_/id/38690315/transfer-talk-liverpool-join-chelsea-arsenal-osimhen-race",
      img: "https://a.espncdn.com/photo/2023/1019/r1240326_1296x729_16-9.jpg",
    },
    {
      title:
        "Marching on: The 10 teams through to the next round of Asian qualifiers for the World Cup",
      url: "https://www.espn.in/football/story/_/id/38684859/10-teams-next-round-asian-qualifiers-2026-fifa-world-cup",
      img: "https://a.espncdn.com/photo/2023/1018/r1239958_1080x608_16-9.jpg",
    },
    {
      title: "Xabi Alonso among 7 top young coaches to watch in Europe",
      url: "https://www.espn.in/football/story/_/id/38686628/seven-top-young-coaches-watch-european-football",
      img: "https://a.espncdn.com/photo/2023/1018/r1240284_1296x729_16-9.jpg",
    },
  ];

  return (
    <div
      className="md:w-[100%] md:h-[100%] md:flex md:flex-col  sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
      style={
        {
          // display: "flex",
          // width: "100%",
          // height: "100%",
          // background: "peru",
          // flexDirection: "column",
        }
      }
    >
      <div
        className="md:basis-[10%] md:flex md:justify-start md:items-center   sm:basis-[10%] sm:flex sm:justify-start sm:items-center"
        style={
          {
            // flex: ".1",
            //   background: "red",
            // display: "flex",
            // justifyContent: "flex-start",
            // alignItems: "center",
          }
        }
      >
        <h4>Latest News</h4>
      </div>
      <div
        className="md:basis-[90%] md:flex md:flex-wrap md:gap-[10px] md:p-[20px] md:justify-start md:items-center md:overflow-y-scroll   sm:basis-[90%] sm:flex sm:flex-wrap sm:gap-[15px] sm:p-[20px] sm:justify-center sm:items-center sm:overflow-y-scroll"
        style={{
          // flex: ".9",
          //   background: "yellow",
          // flexWrap: "wrap",
          // display: "flex",
          // overflowY: "scroll",
          // gap: "10px",
          // padding: "20px",
          // justifyContent: "flex-start",
          // alignItems: "center",
          borderRadius: "20px",
        }}
      >
        {newData &&
          newData?.map((data, index) => {
            const { title, img, url } = data;
            return <NewsCard key={index} title={title} image={img} url={url} />;
          })}
      </div>
    </div>
  );
};

export default News;
