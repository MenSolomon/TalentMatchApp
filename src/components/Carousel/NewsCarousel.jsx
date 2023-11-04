import { Avatar, Card } from "@mui/material";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import ghana from "../../assets/images/ghana.png";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import PlayerComparisonAccordion from "../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";

const NewsCarousel = ({ NewsArray }) => {
  const MatchedPlayersArray = useSelector(selectPlayersInAgencyArray);

  return (
    <Carousel
      //   controls={false}
      //   interval={1000}
      style={{
        // background: "black",
        height: "100%",
        borderRadius: "1vw",
      }}
    >
      {MatchedPlayersArray &&
        MatchedPlayersArray.map((data, index) => {
          const {
            firstName,
            surName,
            Age,
            position,
            Nationality,
            jerseyNumber,
            image,
            clubLogo,
          } = data;

          return (
            <Carousel.Item
              key={index}
              // className="newsGradient"
              style={{
                backgroundSize: "cover",
                //   background: "white",
                borderRadius: "1vw",
                height: "44.2vh",
                // paddingLeft: "2vw",
                position: "relative",
                padding: ".2vw",
                background:
                  "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
              }}
            >
              <div
                className="cardBackground"
                style={{
                  borderRadius: "1vw",
                  display: "flex",
                  gap: ".5vw",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* // Player information */}
                <div style={{ flex: ".25" }}>
                  <div style={{ width: "100%", height: "100%" }}>
                    <MatchedPlayerCard
                      key={index}
                      PlayerClub={clubLogo}
                      PlayerCountry={
                        Nationality === "Ghana"
                          ? ghana
                          : Nationality === "Nigeria"
                          ? "nigeria"
                          : Nationality === "Senegal"
                          ? "senegal"
                          : ""
                      }
                      PlayerImage={`${image}`}
                      PlayerFirstName={firstName}
                      PlayerSurName={surName}
                      PlayerPosition={position}
                    />
                  </div>
                </div>
                {/* Plyer statistics */}
                <div style={{ flex: ".35", overflowY: "scroll" }}>
                  <PlayerComparisonAccordion />
                </div>

                {/* Player video higlights */}
                <div style={{ flex: ".4" }}>
                  <div
                    style={{
                      width: "90%",
                      height: "100%",
                      borderRadius: "1vw",
                      position: "relative",
                      paddingTop: "1vh",
                    }}
                  >
                    <video
                      src="../../../public/believerJuggling.mp4"
                      width="100%"
                      style={{ position: "absolute" }}
                      // autoPlay={true}
                      controls
                    ></video>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}

      {/* Add more Carousel.Item components as needed */}
    </Carousel>
  );
};

export default NewsCarousel;

// import { Carousel } from "antd";
// const contentStyle = {
//   height: "44.5vh",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
// const NewsCarousel = () => (
//   <Carousel
//     autoplay
//     style={{ width: "100%", height: "10vh", position: "absolute" }}
//   >
//     <div>
//       <h3 style={contentStyle}>1</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>2</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>3</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>4</h3>
//     </div>
//   </Carousel>
// );
// export default NewsCarousel;
