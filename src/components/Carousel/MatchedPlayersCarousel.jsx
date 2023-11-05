import { Carousel } from "react-bootstrap";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import manutd from "../../assets/images/manutd.png";
import ghana from "../../assets/images/ghana.png";
import nigeria from "../../assets/images/nigeria.jpg";
import senegal from "../../assets/images/senegal.png";
import { Avatar } from "@mui/material";
import { useState } from "react";

const MatchedPlayersCarousel = ({ ReelsArray }) => {
  // using the

  const reelArray = [
    {
      publisherImg: "../../../public/Solomon safo-taylor.jpg",
      video: "../../../public/shaibuJuggling.mp4",
    },
    {
      publisherImg: "../../../public/opare.jpg",
      video: "../../../public/believerJuggling.mp4",
    },
    {
      publisherImg: "../../../public/solomon agbasi.jpeg",
      video: "../../../shaibuJuggling.mp4",
    },
    {
      publisherImg: "../../../public/Pa_Ebou_Dampha.jpeg",
      video: "../../../public/believerJuggling.mp4",
    },
    {
      publisherImg: "../../../public/richard attah.jpeg",
      video: "../../../public/believerJuggling.mp4",
    },
    {
      publisherImg: "../../../public/sowah.jpeg",
      video: "../../../public/believerJuggling.mp4",
    },
    {
      publisherImg: "../../../public/Solomon safo-taylor.jpg",
      video: "../../../public/shaibuJuggling.mp4",
    },
    {
      publisherImg: "../../../public/richard attah.jpeg",
      video: "../../../public/believerJuggling.mp4",
    },
    {
      publisherImg: "../../../public/solomon agbasi.jpeg",
      video: "../../../public/shaibuJuggling.mp4",
    },
    {
      publisherImg: "../../../public/stephen owusu.webp",
      video: "../../../public/believerJuggling.mp4",
    },
  ];

  return (
    <Carousel
      interval={100000}
      //   controls={false}
      touch={true}
      style={{
        // background: "black",
        height: "100%",
        width: "100%",
        borderRadius: "1vw",
        // paddingLeft: "5.5vw",

        gap: "1vw",
      }}
    >
      <Carousel.Item style={{ display: "flex" }}>
        {reelArray.slice(0, 6).map((data, index) => {
          const { publisherImg, video } = data;

          return (
            <div
              key={index}
              style={{
                borderRadius: "1vw",
                position: "relative",
                paddingTop: "1vh",
                width: "13vw",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: "3",
                  top: "2vh",
                  left: ".5vw",
                  display: "flex",
                }}
              >
                <Avatar
                  className="cardBackground"
                  src={publisherImg}
                  sx={{
                    width: 30,
                    height: 30,
                    border: "1px solid #5585FE",

                    // right: "1vw",
                  }}
                />

                <h6
                  style={{
                    color: "black",
                    position: "relative",
                    top: "1vh",
                    fontSize: ".75em",
                    fontWeight: "bolder",
                  }}
                >
                  {" "}
                  {/* &nbsp; Okachi */}
                </h6>
              </div>
              <video
                src={video}
                width="160vw"
                style={{ height: "33vh" }}
                controls
              ></video>{" "}
            </div>
          );
        })}{" "}
      </Carousel.Item>

      {/* <Carousel.Item style={{ display: "flex", gap: ".5vw" }}>
        {reelArray.slice(6, 12).map((data, index) => {
          const { publisherImg, video } = data;

          return (
            <div
              key={index}
              style={{
                borderRadius: "1vw",
                position: "relative",
                paddingTop: "1vh",
                width: "13vw",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: "10000",
                  top: "2vh",
                  left: ".5vw",
                  display: "flex",
                }}
              >
                <Avatar
                  className="cardBackground"
                  src={publisherImg}
                  sx={{
                    width: 30,
                    height: 30,
                    // right: "1vw",
                  }}
                />

                <h6
                  style={{
                    color: "black",
                    position: "relative",
                    top: "1vh",
                    fontSize: ".75em",
                    fontWeight: "bolder",
                  }}
                >
                  {" "}
                  &nbsp; Okachi{" "}
                </h6>
              </div>
              <video
                src={video}
                width="160vw"
                style={{ height: "33vh" }}
                controls
              ></video>{" "}
            </div>
          );
        })}{" "}
      </Carousel.Item> */}
    </Carousel>
  );
};

export default MatchedPlayersCarousel;
