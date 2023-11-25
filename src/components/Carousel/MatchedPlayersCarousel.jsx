import { Avatar } from "@mui/material";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MatchedPlayersCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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

  const [currentPlayingVideoIndex, setCurrentPlayingVideoIndex] = useState("");

  const handleVideoClick = (index) => {
    // alert(`vida ${index}`);
    // `video-${vidIndex}`

    const alreadyPlayingvideoElement = document.getElementById(
      `carouselVideo-${currentPlayingVideoIndex}`
    );
    const currentVideoToPlay = document.getElementById(
      `carouselVideo-${index}`
    );

    if (currentPlayingVideoIndex === "") {
      setCurrentPlayingVideoIndex(index);
    } else {
      if (alreadyPlayingvideoElement && !alreadyPlayingvideoElement.paused) {
        // alert("old video pause new ply");
        currentVideoToPlay.play();

        if (currentVideoToPlay && !currentVideoToPlay.paused) {
          alreadyPlayingvideoElement.pause();
        }
      }
    }
  };

  return (
    <div
      className="md:relative md:h-[100%] md:w-[77vw]  sm:relative sm:h-[100%] sm:w-[100%]"
      style={
        {
          // position: "relative",
          // height: "100%",
          // width: "77vw",
          // background: "red",
        }
      }
    >
      <Carousel responsive={responsive}>
        {reelArray.map((data, index) => {
          const { publisherImg, video } = data;

          return (
            <div
              // onClick={() => {
              //   handleVideoClick(index);
              // }}
              key={index}
            >
              <VideoCard
                publisherImg={publisherImg}
                video={video}
                vidIndex={index}
              />{" "}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MatchedPlayersCarousel;

const VideoCard = ({ publisherImg, video, vidIndex }) => {
  return (
    <div
      className="md:w-[13vw] md:relative md:pt-[1vh]  sm:w-[100%]  sm:relative sm:pt-[1vh]"
      style={{
        borderRadius: "1vw",
        // position: "relative",
        // paddingTop: "1vh",
        // width: "13vw",
        // background: "blue",
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
            cursor: "pointer",
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
      {/* <div onClick={() => handleVideoClick(index)}> */}
      <video
        className="md:h-[33vh] md:w-[90%]  sm:h-[33vh] sm:w-[100%]"
        id={`carouselVideo-${vidIndex}`}
        // width="160vw"
        // style={{ height: "33vh" }}
        controls
      >
        {" "}
        <source src={video} type="video/mp4" />
      </video>{" "}
      {/* </div> */}
    </div>
  );
};
