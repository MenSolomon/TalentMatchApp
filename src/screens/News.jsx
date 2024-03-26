import NewsCard from "../components/Cards/NewsCard/NewsCard";
import { useEffect, useState } from "react";
import MultipleSelect from "../components/Selects/MultipleSelect";
import Newselect from "../components/Selects/NewsSelect";
import goalNewsImage from "../assets/images/goalnews.jpg";
import NinetyminsImage from "../assets/images/NinetyMins.jpg";
import onefootballImage from "../assets/images/Onefootball.png";
import espnImage from "../assets/images/espn.svg";

const News = () => {
  const [getData, setGetData] = useState([]);
  console.log(getData);

  const [espn, setEspn] = useState([]);
  const [Ninetymins, setNinetymins] = useState([]);
  const [oneFootball, setoneFootball] = useState([]);
  const [goal, setGoal] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url =
  //       "https://football-news-aggregator-live.p.rapidapi.com/news/espn";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "bea5221632mshb257d90c38fc46ap1de3f1jsn4b3eec934310",
  //         "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.text();
  //       const array = result;
  //       console.log(array);
  //       setGetData(array);
  //       console.log(getData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url =
  //       "https://football-news-aggregator-live.p.rapidapi.com/news/goal";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "ab05e36d7cmsh2e30315d4df830fp15fa40jsn35c4f9206e1a",
  //         "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.text();
  //       console.log(result);
  //       setGoal(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url =
  //       "https://football-news-aggregator-live.p.rapidapi.com/news/onefootball";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "ab05e36d7cmsh2e30315d4df830fp15fa40jsn35c4f9206e1a",
  //         "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.text();
  //       console.log(result);
  //       setoneFootball(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url =
  //       "https://football-news-aggregator-live.p.rapidapi.com/news/90mins";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "ab05e36d7cmsh2e30315d4df830fp15fa40jsn35c4f9206e1a",
  //         "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.text();
  //       console.log(result);
  //       setNinetymins(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url =
  //       "https://football-news-aggregator-live.p.rapidapi.com/news/espn";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "ab05e36d7cmsh2e30315d4df830fp15fa40jsn35c4f9206e1a",
  //         "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.text();
  //       console.log(result);
  //       setEspn(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // API FOR NEWS

  const newData = [
    {
      title:
        "🦁 Premier League Player of the Week: There's a new starboy in town",
      url: "https://onefootball.com/en/news/premier-league-player-of-the-week-theres-a-new-starboy-in-town-38749332",
      img: "https://image-service.onefootball.com/transform?w=335&h=188&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2023%2F12%2FWest-Ham-United-v-Wolverhampton-Wanderers-Premier-League-1702979573-1000x667.jpg",
    },
    {
      title:
        "La Liga and RFEF will publish conversations between referees and VAR room",
      url: "https://onefootball.com/en/news/la-liga-and-rfef-will-publish-conversations-between-referees-and-var-room-38749511",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Ficdn.football-espana.net%2Fwp-content%2Fuploads%2F2023%2F08%2FXavi-walks-VAR.jpeg",
    },
    {
      title:
        "No Chelsea, Liverpool or Manchester United deals in the top ten Premier League signings of 2023",
      url: "https://onefootball.com/en/news/no-chelsea-liverpool-or-manchester-united-deals-in-the-top-ten-premier-league-signings-of-2023-38749170",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fimages.ps-aws.com%2Fc%3Furl%3Dhttps%253A%252F%252Fd2x51gyc4ptf2q.cloudfront.net%252Fcontent%252Fuploads%252F2023%252F12%252F19015512%252FAnthony-Gordon-Enzo-Fernandez-James-Maddison.jpg",
    },
    {
      title: "How Mary Earps seized a moment and ‘changed the world’ in 2023",
      url: "https://onefootball.com/en/news/how-mary-earps-seized-a-moment-and-changed-the-world-in-2023-38748862",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fstatic.independent.co.uk%2F2023%2F12%2F18%2F16%2FGettyImages-1627088933.jpg%3Fquality%3D75%26width%3D1200%26auto%3Dwebp",
    },
    {
      title: "Manchester United eye Sancho swap-deal with Barcelona",
      url: "https://onefootball.com/en/news/manchester-united-eye-sancho-swap-deal-with-barcelona-38749003",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fi0.wp.com%2Fthefootballfaithful.com%2Fwp-content%2Fuploads%2F2023%2F12%2FRaphinha.png%3Ffit%3D1000%252C500%26ssl%3D1",
    },
    {
      title:
        "Transfer gossip: Man Utd seek to sell four to Saudi, Liverpool out of midfielder race",
      url: "https://onefootball.com/en/news/transfer-gossip-man-utd-seek-to-sell-four-to-saudi-liverpool-out-of-midfielder-race-38749301",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fimages.ps-aws.com%2Fc%3Furl%3Dhttps%253A%252F%252Fd2x51gyc4ptf2q.cloudfront.net%252Fcontent%252Fuploads%252F2023%252F12%252F19085021%252FRaphael-Varane-Jadon-Sancho-Anthony-Martial-Casemiro-1.jpg",
    },
    {
      title: "5 Things - UCL Round of 16 Draw",
      url: "https://onefootball.com/en/video/5-things-ucl-round-of-16-draw-38748126",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%253A%252F%252Fcdn.jwplayer.com%252Fv2%252Fmedia%252FRi7nVo86%252Fposter.jpg%253Fwidth%253D720",
    },

    {
      url: "https://www.fourfourtwo.com/features/how-to-watch-sky-sports-live-streams-dont-miss-a-minute-of-the-action-on-the-broadcaster",
      title:
        "How to watch Sky Sports live streams: Don't miss a minute of the action on the broadcaster",
      img: "https://cdn.mos.cms.futurecdn.net/tEzeTYPgYPvEeLznZNwR9o-320-80.jpg",
      short_desc:
        "Learn how to watch Sky Sports live streams, so that you never miss a moment when a game is on",
    },
    {
      url: "https://www.fourfourtwo.com/news/wont-be-boring-bayern-munich-to-target-barcelona-stars-in-busy-transfer-window",
      title:
        "'Won't be boring' – Bayern Munich to target Barcelona stars in busy transfer window",
      img: "https://cdn.mos.cms.futurecdn.net/3ZxeZrQza27VN9Tp2vpDJQ-320-80.jpg",
      short_desc:
        "The Bundesliga giants, reeling from Saturday's 5-1 defeat against Eintracht Frankfurt, are targeting several new players in January",
    },
    {
      url: "https://www.fourfourtwo.com/news/manchester-united-in-talks-with-the-new-robert-lewandowski-to-solve-goalscoring-woes-report",
      title:
        "Manchester United in talks with 'the new Robert Lewandowski' to solve goalscoring woes: report",
      img: "https://cdn.mos.cms.futurecdn.net/aq68sCcRSJ9jPn2XFTnyaF-320-80.jpg",
      short_desc:
        "Manchester United are targeting an electric striker in a bid to improve fortunes in front of goal",
    },
    {
      url: "https://www.fourfourtwo.com/blogs/in-the-mag-awards-we-celebrate-the-players-managers-and-cyborgs-who-dominated-2023-plus-mctominay-winterburn-samways-and-more",
      title:
        "In the mag: Awards! We celebrate the players, managers and cyborgs who dominated 2023! PLUS McTominay! Winterburn! Samways and MORE!",
      img: "https://cdn.mos.cms.futurecdn.net/M6CRVpxzLQkNgeCkzFF7MH-320-80.png",
      short_desc:
        "Get your hands on the latest issue of FourFourTwo magazine – available in print or on your device – from Thursday 7 December",
    },
    {
      url: "https://www.fourfourtwo.com/news/it-intrigued-me-harry-kane-reveals-the-german-tradition-he-dived-into",
      title:
        '"It intrigued me": Harry Kane reveals the German tradition he dived into',
      img: "https://cdn.mos.cms.futurecdn.net/EQCzWS3w3Qop5ndYy6qx6b-320-80.jpg",
      short_desc:
        "The England captain has taken the Bundesliga by storm while settling in quickly away from the pitch too",
    },
    {
      url: "https://www.fourfourtwo.com/news/la-liga-star-rejects-manchester-united-transfer-amid-bayern-munich-interest-report",
      title:
        "La Liga star REJECTS Manchester United transfer amid Bayern Munich interest: report",
      img: "https://cdn.mos.cms.futurecdn.net/kSMRTCd4jE6zecmgaavJqY-320-80.jpg",
      short_desc:
        "Things aren't going well for Man United on the pitch at the moment – and they could find it's the same case in the transfer market",
    },
    {
      url: "https://www.fourfourtwo.com/news/exclusive-harry-kane-reveals-what-itll-be-like-to-face-germany-at-euro-2024",
      title:
        "EXCLUSIVE: Harry Kane reveals what it'll be like to face Germany at Euro 2024",
      img: "https://cdn.mos.cms.futurecdn.net/DgJwEur2ujeE2txdwehq94-320-80.jpg",
      short_desc:
        "The England skipper spoke to FourFourTwo about life at Bayern Munich and his hopes for next summer's Euros",
    },
    {
      url: "https://www.fourfourtwo.com/news/manchester-united-interest-welcomed-by-in-form-bundesliga-forward-ahead-of-possible-pound15-million-transfer",
      title:
        "Manchester United interest welcomed by in-form Bundesliga forward ahead of possible £15 million transfer",
      img: "https://cdn.mos.cms.futurecdn.net/ST4XNHfKgqKS9wWJFuZFcg-320-80.jpg",
      short_desc:
        "Stuttgart striker Serhou Guirassy is available for a cut-price fee and would reportedly be interested in a January move to Old Trafford",
    },
    {
      url: "https://www.fourfourtwo.com/news/watch-hamburgs-daniel-heuer-fernandes-scores-one-of-the-craziest-own-goals-ever-in-derby-clash-against-st-pauli",
      title:
        "WATCH: Hamburg's Daniel Heuer Fernandes scores one of the craziest own goals ever in derby clash against St. Pauli",
      img: "https://cdn.mos.cms.futurecdn.net/5iQwEKpQxf7eXGVpoPFZ93-320-80.jpg",
      short_desc:
        "The former Portugual Under-21 goalkeeper made a horrific howler in Friday night's Bundesliga 2 match away to his side's local rivals",
    },
    {
      url: "https://www.fourfourtwo.com/news/it-was-a-bit-of-a-mad-experience-to-be-honest-exclusive-harry-kane-reveals-what-really-happened-the-day-he-left-tottenham-hotspur-for-bayern-munich",
      title:
        '“It was a bit of a mad experience to be honest" EXCLUSIVE: Harry Kane reveals what REALLY happened the day he left Tottenham Hotspur for Bayern Munich',
      img: "https://cdn.mos.cms.futurecdn.net/r38qFiezaafG6TB2sZKvaV-320-80.jpg",
      short_desc:
        "Harry Kane has opened up about what really happened the day he packed his bags and left for Munich, during an exclusive interview with FourFourTwo",
    },
    {
      title:
        "India vs Kuwait: Chhetri and co. aim to regain form in tricky World Cup qualifier",
      url: "https://www.espn.in/football/story/_/id/38902184/india-vs-kuwait-preview-sunil-chhetri-igor-stimac-regain-form-tricky-fifa-world-cup-qualifier",
      img: "https://a.espncdn.com/photo/2023/1115/r1253445_1296x729_16-9.jpg",
    },
    {
      title:
        "Why football in Premier League and Europe is anything but a fair fight",
      url: "https://www.espn.in/football/story/_/id/38705038/why-premier-league-european-football-anything-fair",
      img: "https://a.espncdn.com/photo/2023/1114/r1253207_1296x729_16-9.jpg",
    },
    {
      title:
        "Identifying the Premier League's most impactful players this season",
      url: "https://www.espn.in/football/insider/story/_/id/38891976/premier-league-most-impactful-players-2023-24-season",
      img: "https://a.espncdn.com/photo/2023/1113/r1252943_1296x729_16-9.jpg",
    },
    {
      title:
        "Worst. Relegation Battle. Ever: New low for Premier League's promoted teams",
      url: "https://www.espn.in/football/story/_/id/38888799/worst-relegation-battle-ever-new-low-premier-league-promoted-teams-burnley-luton-town-sheffield-united",
      img: "https://a.espncdn.com/photo/2023/1113/r1252681_1296x729_16-9.jpg",
    },
    {
      title: "LIVE Transfer Talk: Man United interested in João Neves",
      url: "https://www.espn.in/football/story/_/id/38898266/transfer-talk-manchester-united-interested-joao-neves",
      img: "https://a.espncdn.com/photo/2023/1114/r1253329_4_1296x729_16-9.jpg",
    },
    {
      title:
        "Argentina's toughest test since winning the World Cup in Qatar? Qualifying for the next one",
      url: "https://www.espn.in/football/story/_/id/38892646/world-cup-qualifiers-argentina-toughest-test-qatar",
      img: "https://a.espncdn.com/photo/2023/1114/r1252976_1296x729_16-9.jpg",
    },
    {
      title: "Messi goes back to the '90s with new retro Argentina jersey",
      url: "https://www.espn.in/football/story/_/id/38895237/lionel-messi-goes-back-90s-new-retro-argentina-jersey",
      img: "https://a.espncdn.com/photo/2023/1114/r1253076_1080x608_16-9.jpg",
    },
    {
      title: "European Team of the Week: Mbappe, Vinicius, Lindelof star",
      url: "https://www.espn.in/football/story/_/id/38888834/european-team-week-mbappe-vinicius-lindelof-star",
      img: "https://a.espncdn.com/photo/2023/1111/r1251822_2_1296x729_16-9.jpg",
    },
    {
      title:
        "Don't rule out Raul as the next Real Madrid legend to become manager",
      url: "https://www.espn.in/football/story/_/id/38890319/could-raul-lead-real-madrid-next-golden-era-ancelotti",
      img: "https://a.espncdn.com/photo/2023/1113/r1252853_1296x729_16-9.jpg",
    },
    {
      title: "Is attack the best form of defence for Man City's title rivals?",
      url: "https://www.espn.in/football/story/_/id/38889155/is-attack-best-form-defence-playing-manchester-city",
      img: "https://a.espncdn.com/photo/2023/1113/r1252731_1296x729_16-9.jpg",
    },
    {
      title: "🚨 Man Utd announce CEO Richard Arnold to step down",
      url: "https://onefootball.com/en/news/man-utd-announce-ceo-richard-arnold-to-step-down-38566627",
      img: "https://image-service.onefootball.com/transform?w=335&h=188&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2023%2F11%2FFBL-ENG-PR-MAN-CITY-MAN-UTD-1700044730-1000x750.jpg",
    },
    {
      title:
        "Roman Abramovich deals to be probed as Chelsea face fresh FFP scrutiny",
      url: "https://onefootball.com/en/news/roman-abramovich-deals-to-be-probed-as-chelsea-face-fresh-ffp-scrutiny-38566647",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fstatic.standard.co.uk%2F2022%2F05%2F20%2F07%2F06c9155b38ae27e22f0a436b4488502aY29udGVudHNlYXJjaGFwaSwxNjUzMDU0MDc3-2.66106736.jpg%3Fwidth%3D1200%26width%3D1200%26auto%3Dwebp%26quality%3D75",
    },
    {
      title: "Union Berlin part with Urs Fischer after five years in charge",
      url: "https://onefootball.com/en/news/union-berlin-part-with-urs-fischer-after-five-years-in-charge-38565763",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2023%2F11%2FBayer-04-Leverkusen-v-1.-FC-Union-Berlin-Bundesliga-1700038391-1000x750.jpg",
    },
    {
      title:
        "Emma Hayes will be a loss to English football as Brian Clough comparisons emerge",
      url: "https://onefootball.com/en/news/emma-hayes-will-be-a-loss-to-english-football-as-brian-clough-comparisons-emerge-38565888",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fstatic.standard.co.uk%2F2023%2F11%2F08%2F9%2F54%2FSEI178801444.jpg%3Fwidth%3D1200%26width%3D1200%26auto%3Dwebp%26quality%3D75",
    },
    {
      title: "📸 Adidas unveil official Euro 2024 match ball",
      url: "https://onefootball.com/en/news/adidas-unveil-official-euro-2024-match-ball-38565852",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2023%2F11%2FTOPSHOT-FBL-EURO-2020-2021-TROPHY-1700039782-1000x647.jpg",
    },
    {
      title:
        "Manchester City acknowledge risk of charges after posting record £712m revenue",
      url: "https://onefootball.com/en/news/manchester-city-acknowledge-risk-of-charges-after-posting-record-712m-revenue-38565092",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Fstatic.independent.co.uk%2F2023%2F11%2F15%2F05%2Ff641b0b33239582cfb721d9053789164Y29udGVudHNlYXJjaGFwaSwxNzAwMDUyOTI2-2.71710227.jpg%3Fquality%3D75%26width%3D1200%26auto%3Dwebp",
    },
    {
      title:
        "Atletico Madrid President disappoints fans – ‘We left the Superleague to avoid punishment, the English won’",
      url: "https://onefootball.com/en/news/atletico-madrid-president-disappoints-fans-we-left-the-superleague-to-avoid-punishment-the-english-won-38565889",
      img: "https://image-service.onefootball.com/transform?w=64&h=64&dpr=2&image=https%3A%2F%2Ficdn.football-espana.net%2Fwp-content%2Fuploads%2F2023%2F04%2FENrique-Cerezo2.jpg",
    },
  ];

  // const newsSources = ["90mins", "One Football", "ESPN", "GOAL", "FourFourtwo"];

  const [selectedSources, setSelectedSources] = useState("GOAL");

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
          gap: "4vw",
        }}
      >
        <h4>Latest News</h4>
        {/* <Newselect
          selectArray={newsSources}
          selectedValues={(e) => {
            setSelectedSources(e);
          }}
        /> */}

        {/* {selectedSources} */}
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
          borderRadius: "20px",
        }}
      >
        {/* {selectedSources === "90mins"
          ? Ninetymins?.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  source={NinetyminsImage}
                />
              );
            })
          : selectedSources === "One Football"
          ? oneFootball?.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  source={onefootballImage}
                />
              );
            })
          : selectedSources === "ESPN"
          ? espn?.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  source={espnImage}
                />
              );
            })
          : selectedSources === "GOAL"
          ? goal?.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  source={goalNewsImage}
                />
              );
            })
          : newData?.map((data, index) => {
              const { title, img, url } = data;
              return (
                <NewsCard
                  key={index}
                  title={title}
                  image={img}
                  url={url}
                  source={espnImage}
                />
              );
            })} */}

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
