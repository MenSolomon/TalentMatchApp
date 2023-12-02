import { Avatar } from "@mui/material";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { selectCurrentScreenSize } from "../../statemanager/slices/OtherComponentStatesSlice";

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
      items: 4,
      slidesToSlide: 1,
    },
  };

  const reelArray = [
    {
      publisherImg: "/Solomon safo-taylor.jpg",
      video: "/shaibuJuggling.mp4",
    },
    {
      publisherImg: "/opare.jpg",
      video: "/believerJuggling.mp4",
    },
    {
      publisherImg: "/solomon agbasi.jpeg",
      video: "./shaibuJuggling.mp4",
    },
    {
      publisherImg: "/Pa_Ebou_Dampha.jpeg",
      video: "/believerJuggling.mp4",
    },
    {
      publisherImg: "/richard attah.jpeg",
      video: "/believerJuggling.mp4",
    },
    {
      publisherImg: "/sowah.jpeg",
      video: "/believerJuggling.mp4",
    },
    {
      publisherImg: "/Solomon safo-taylor.jpg",
      video: "/shaibuJuggling.mp4",
    },
    {
      publisherImg: "/richard attah.jpeg",
      video: "/believerJuggling.mp4",
    },
    {
      publisherImg: "/solomon agbasi.jpeg",
      video: "/shaibuJuggling.mp4",
    },
    {
      publisherImg: "/stephen owusu.webp",
      video: "/believerJuggling.mp4",
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

  const screenSize = useSelector(selectCurrentScreenSize);

  let screenWidth = parseInt(screenSize?.width, 10);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: screenWidth >= 1024 ? "77vw" : "90vw",
        // background: "red",
      }}
    >
      <Carousel
        responsive={responsive}
        arrows={screenWidth >= 1024 ? true : false}
        swipeable={screenWidth >= 1024 ? true : true}
        draggable={screenWidth >= 1024 ? true : true}
      >
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
  const screenSize = useSelector(selectCurrentScreenSize);

  let screenWidth = parseInt(screenSize?.width, 10);

  return (
    <>
      {screenWidth >= 1024 ? (
        <div
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
            id={`carouselVideo-${vidIndex}`}
            width="160vw"
            style={{ height: "33vh" }}
            controls
          >
            {" "}
            <source src={video} type="video/mp4" />
          </video>{" "}
          {/* </div> */}
        </div>
      ) : (
        <div
          style={{
            borderRadius: "1vw",
            position: "relative",
            paddingTop: "1vh",
            height: "20vh",
            width: "6vw",
          }}
        >
          <Avatar
            className="cardBackground"
            src={publisherImg}
            sx={{
              width: 80,
              height: 80,
              border: "7px solid #5585FE",
              cursor: "pointer",
              // right: "1vw",
            }}
          />
        </div>
      )}
    </>
  );
};
