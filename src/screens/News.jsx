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
