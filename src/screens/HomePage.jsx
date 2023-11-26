import { ViewHeadline, ViewWeek } from "@mui/icons-material";
import ghana from "../assets/images/ghana.png";
import ronaldo from "../assets/images/Ronaldo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsCarousel from "../components/Carousel/NewsCarousel";
import MatchedPlayerCard from "../components/Cards/MatchedPlayerCard";
import Top10PlayerPicksOfTheWeek from "../components/Carousel/Top10PlayerPicksOfTheWeek";
import MatchedPlayersCarousel from "../components/Carousel/MatchedPlayersCarousel";
import { useNavigate } from "react-router-dom";
import {
  selectPlayerToCompareArray,
  selectPlayersInAgencyArray,
} from "../statemanager/slices/PlayersInAgencySlice";
import { useSelector } from "react-redux";
import WarningAlertModal from "../components/Modals/WarningAlertModal";
import CreateProfileModal from "../components/Modals/CreateProfileModal";
import WelcomeMessageModal from "../components/Modals/WelcomeMessageModal";
import { useEffect } from "react";

const HomePage = () => {
  // const NewsData = [
  //   {
  //     source: "espn",

  //     title: "Are Man United asking Hojlund to do too much?",
  //     url: "https://www.espn.in/football/story/_/id/38572972/rasmus-hojlund-manchester-united-stress-pressure-premier-league",
  //     img: "https://a.espncdn.com/photo/2023/1005/r1234194_1296x729_16-9.jpg",
  //   },
  //   {
  //     title:
  //       "What crisis? Man City look like their old selves at Leipzig as youngsters step up",
  //     url: "https://www.espn.in/football/story/_/id/38566713/man-city-back-normal-ucl-win-leipzig-phil-foden-rico-lewis",
  //     img: "https://a.espncdn.com/photo/2023/1004/r1233949_1296x729_16-9.jpg",
  //     source: "espn",
  //   },
  //   {
  //     source: "espn",
  //     title:
  //       "LIVE Transfer Talk: Messi to get Barcelona loan if Inter Miami miss playoffs",
  //     url: "https://www.espn.in/football/story/_/id/38577927/transfer-talk-barcelona-loan-lionel-messi-inter-miami-miss-playoffs",
  //     img: "https://a.espncdn.com/photo/2023/0929/r1231155_1296x729_16-9.jpg",
  //   },
  //   {
  //     title: "UCL talking points: Best player so far, how to save Man Utd?",
  //     url: "https://www.espn.in/football/story/_/id/38548855/ucl-talking-points-best-player-far-how-save-man-utd",
  //     img: "https://a.espncdn.com/photo/2023/1005/r1234067_1296x729_16-9.jpg",
  //     source: "onefootball.com",
  //   },
  // ];

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

  //
  const playersInAgencyArray = useSelector(selectPlayersInAgencyArray);

  console.log(playersInAgencyArray);

  const matchedPlayerArrayDummy = ["1", "2", "3", "1", "1", "1"];

  const navigate = useNavigate();

  const top10Carousel = [
    {
      firstName: "Benjamin",
      surName: "Bature",
      Age: "26",
      Nationality: "Ghana",
      position: "CF",
      jerseyNumber: "21",
      image: "/bature.jpg",
      clubName: "Medeama SC",
      clubLogo: "/Medeama_SC_logo.png",
    },
  ];

  return (
    <div
      style={{
        // width: "100%",
        // height: "100%",
        // display: "flex",
        // flexDirection: "column",
        // gap: "1vh",
        // background: "yellow",
        // display: "grid",
        // gridTemplateColumns: "1fr",
        // gridTemplateRows: "14vh 93vh 5vh",
        gridTemplateAreas: "'flicks''PlayerContent''empty' ",
      }}
      className="md:w-[100%] md:h-[100%] md:flex md:flex-col md:gap-[1vh]  sm:w-[100%] sm:h-[130%] sm:grid sm:grid-cols-1 sm:grid-rows-[14vh,93vh,5vh] sm:gap-[1vh] "
    >
      {/* // FIRST SECTION`` */}
      <div
        className="md:basis-[55%] md:flex md:flex-row md:gap-[1.1vw]  sm:basis-[90%] sm:flex sm:flex-col sm:gap-[1.1vw] md:w-[100%] sm:w-[100%]  "
        style={{
          flex: ".55",
          padding: "1vh .7vw",
          gridArea: "PlayerContent",
          // display: "flex",
          // gap: "1.1vw",
        }}
      >
        {/* // Transfer News carousel */}
        <div
          className="md:basis-[60%] md:relative  sm:basis-[60%] sm:relative"
          style={{
            flex: ".6",
            // background: "white",
            borderRadius: "1vw",
            position: "relative",
          }}
        >
          <NewsCarousel NewsArray={newData} />
        </div>
        {/* // Most Viewed Player /&& fantasy player of the week ,  free agent pick of the week */}
        <div
          className="md:basis-[40%] md:flex  sm:basis-[40%] sm:flex"
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
              {/* <CreateProfileModal /> */}
              <h4 style={{ fontWeight: "900" }}>
                Player Picks of the Week
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
              {top10Carousel.map((data, index) => {
                const { firstName, surName, position, image } = data;

                return (
                  <Top10PlayerPicksOfTheWeek
                    key={index}
                    PlayerCountry={ghana}
                    PlayerImage={image}
                    firstname={firstName}
                    surname={surName}
                    position={position}
                    rank={index + 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECOND SECTION */}
      <div
        className="md:basis-[45%] md:flex md:flex-col  sm:basis-[10%] sm:flex sm:flex-col "
        style={{
          gridArea: "flicks",
          // flex: ".45",
          padding: ".4vh .5vw",
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        {/* // Headers */}
        <div style={{ flex: ".1", background: "transparent" }}>
          <WelcomeMessageModal />

          <h6 style={{ float: "left", fontWeight: "800" }}>Flicks for you</h6>
          {/* <h6
            style={{
              float: "right",
              fontSize: ".95em",
              fontWeight: "800",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/profile");
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
          /> */}
        </div>

        {/* // Suggested Cards */}
        <div
          style={{
            flex: ".88",
            padding: "0vh .3vw",
          }}
        >
          <MatchedPlayersCarousel MatchedPlayersArray={playersInAgencyArray} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
