import { Avatar, Card } from "@mui/material";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import ghana from "../../assets/images/ghana.png";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import PlayerComparisonAccordion from "../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";
import { useEffect, useState } from "react";

const NewsCarousel = ({ NewsArray }) => {
  const MatchedPlayersArray = useSelector(selectPlayersInAgencyArray);

  // const [activeIndex, setActiveIndex] = useState(0);
  // const [prevIndex, setPrevIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setPrevIndex(activeIndex);
  //   setActiveIndex(selectedIndex);
  // };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Store the index of the previously active item
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);

  useEffect(() => {
    // Pause the video of the previously active item when a new item becomes active
    const videoElement = document.getElementById(`video-${prevActiveIndex}`);
    if (videoElement) {
      videoElement.pause();
    }
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  return (
    <Carousel
      className="MatchedPlayers md:h-[100%] md:w-[100%] sm:w-[100%] sm:h-[100%]"
      activeIndex={activeIndex}
      onSelect={handleSelect}
      //   controls={false}
      //   interval={1000}
      onSlide={() => {
        // Additional code to pause videos that are leaving the view
        const videoElement = document.getElementById(
          `video-${prevActiveIndex}`
        );
        if (videoElement) {
          videoElement.pause();
        }
      }}
      style={{
        // background: "black",
        // height: "100%",
        borderRadius: "1vw",
        // width: "93vw",
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
              className="matchedPlayersCarousel md:relative  md:h-[44.2vh]    sm:relative sm:h-[46vh]"
              style={{
                backgroundSize: "cover",
                //   background: "white",
                borderRadius: "1vw",
                // height: "44.2vh",
                // paddingLeft: "2vw",
                // position: "relative",
                padding: ".2vw",
                background:
                  "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
              }}
            >
              <div
                className="cardBackground md:flex md:h-[100%] md:w-[100%]   sm:flex sm:h-[100%] sm:w-[100%] "
                style={{
                  borderRadius: "1vw",
                  // display: "flex",
                  gap: ".5vw",
                  // width: "100%",
                  // height: "100%",
                  // background: "red",
                }}
              >
                {/* // Player information  style={{ flex: ".25", background: "red" }} */}

                <div className="md:basis-[30%] sm:basis-[50%]">
                  <div
                    className="md:h-[100%] md:w-[100%]   sm:h-[100%] sm:w-[100%]"
                    // style={{ width: "100%", height: "100%" }}
                  >
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
                <div
                  className="sm:flex sm:flex-col-reverse sm:basis-[70%] md:basis-[70%] md:flex md:flex-row"
                  style={
                    {
                      // display: "flex",
                      // flex: ".50",
                      // flexDirection:"row-reverse",
                      // background: "red",
                    }
                  }
                >
                  <div
                    className="md:basis-[50%] sm:basis-[50%]"
                    style={{ overflowY: "scroll" }}
                  >
                    <PlayerComparisonAccordion />
                  </div>

                  {/* Player video higlights */}
                  <div
                    className="md:basis-[50%] sm:basis-[50%]"
                    style={
                      {
                        // flex: ".50",
                        // display: "flex",
                        // flexDirection: "column",
                      }
                    }
                  >
                    <div
                      className="sm:w-[100%] sm:relative sm:h-[10%] md:w-[90%] md:h-[100%] md:relative"
                      style={{
                        // width: "90%",
                        // height: "100%",
                        borderRadius: "1vw",
                        // position: "relative",
                        paddingTop: "1vh",
                        // background: "green",
                      }}
                    >
                      <video
                        id={`video-${index}`}
                        src="/believerJuggling.mp4"
                        // width="100%"
                        style={{ position: "absolute" }}
                        // autoPlay={true}
                        controls
                        className="sm:w-[100%] sm:h-[20vh]  md:w-[100%] md:h-[40vh]"
                      ></video>
                    </div>
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
