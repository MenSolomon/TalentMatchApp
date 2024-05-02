import { Avatar, CircularProgress, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentBrowserSize,
  selectCurrentScreenSize,
  setCarouselVideoIndex,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import {
  selectAllPlayersVideos,
  setRandomizedVideosArray,
} from "../../statemanager/slices/VideosSlice";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import MobileVideoDisplayCarousel from "./MobileVideoDisplayCarousel";
import BasicButton from "../Buttons/BasicButton";
import handleVideoGloballyClick from "../../utilities/VideoPausePlayFunction";
import { useQuery } from "@tanstack/react-query";

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

  const dispatch = useDispatch();

  // const [AllVideos, setAllVideos] = useState([]);

  const [onOpen, setOnOpen] = useState(false);
  const [randomizedVideos, setRandomizedVideos] = useState([]);

  const AllPlayers = useSelector(selectPlayersDatabase);

  const [videoLength, setVideoLength] = useState(7);

  const handleArrayAdd = () => {
    setVideoLength(videoLength + 7);
  };

  // Fisher-Yates shuffle function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
  }
  // useEffect(() => {
  //   if (AllVideos.length > 0 && onOpen === false) {
  //     setOnOpen(true);
  //     const shuffledVideos = shuffleArray(AllVideos);
  //     setRandomizedVideos(shuffledVideos);
  //   }
  // }, [AllVideos, onOpen]);

  // Shuffle the array on page load

  const {
    status,
    data: fetchedVideos,
    error,
    refetch,
    isFetching: isVideoLoading,
  } = useQuery({
    queryKey: ["fetchAllVideos", AllPlayers], // Include AllPlayers in the queryKey
    queryFn: async () => {
      const allVideos = [];

      await Promise.all(
        AllPlayers.map(async (data) => {
          const { id: playerId, player_profile_image } = data;

          const videosQuery = query(
            collection(db, `players_database/${playerId}/videos`)
          );

          try {
            const videosSnapshot = await getDocs(videosQuery);
            const playerVideos = videosSnapshot.docs.map((videoDoc) => ({
              ...videoDoc.data(),
              playerId: playerId,
              playerProfileImage: player_profile_image,
            }));

            allVideos.push(...playerVideos);
          } catch (error) {
            console.error(
              `Error fetching videos for player ${playerId}:`,
              error
            );
          }
        })
      );

      // return allVideos;
      // Use 'allVideos' as needed (e.g., dispatch to Redux store)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Use logical OR operator to set AllVideos to an empty array if fetchedVideos is undefined
  const AllVideos = fetchedVideos || [];

  useEffect(() => {
    // if (AllVideos.length > 0 && onOpen === false) {
    //   setOnOpen(true);
    console.log(AllVideos, "allvid");
    const shuffledVideos = shuffleArray([...AllVideos]);
    setRandomizedVideos(shuffledVideos);
    dispatch(setRandomizedVideosArray(shuffledVideos));
    // }
  }, [AllVideos, onOpen]);

  // Use the randomized array as needed
  // console.log(AllVideos);

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

  //

  const handleClick = (event) => {
    // alert("Joey");
    if (
      event.target.classList.contains("react-multiple-carousel__arrow--right")
    ) {
      handleArrayAdd();
    }
  };
  // Set up a ref to the Carousel component

  const skeletonArray = ["", "", "", "", "", ""];
  return (
    <div onClick={handleClick}>
      {/* <BasicButton
        onClick={() => {
          handleArrayAdd();
        }}
        innerText={"Click"}
      /> */}
      {isVideoLoading && screenWidth >= 790 ? (
        <div
          style={{
            // background: "red",
            height: "100%",
            width: screenWidth >= 1024 ? "77vw" : "90vw",
            display: "flex",
            gap: "1vw",
          }}
        >
          {skeletonArray.map((data, key) => (
            <Skeleton
              key={key}
              animation="wave"
              variant="rounded"
              sx={{ bgcolor: "black.200", width: "13vw", height: "33vh" }}
            />
          ))}
        </div>
      ) : randomizedVideos.length === 0 ? (
        <div> No videos to display </div>
      ) : (
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
            {randomizedVideos.slice(0, videoLength).map((data, index) => {
              const { url, playerProfileImage, playerId, id } = data;

              return (
                <div
                  // onClick={() => {
                  //   handleVideoClick(index);
                  // }}
                  key={index}
                >
                  <span
                    onClick={() => {
                      // alert(index);

                      dispatch(setCarouselVideoIndex(index));
                    }}
                  >
                    <VideoCard
                      publisherImg={playerProfileImage}
                      video={url}
                      vidIndex={id}
                      playerId={playerId}
                    />{" "}
                  </span>
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default MatchedPlayersCarousel;

const VideoCard = ({ publisherImg, video, vidIndex, playerId }) => {
  const screenSize = useSelector(selectCurrentScreenSize);
  const browserSize = useSelector(selectCurrentBrowserSize);

  let screenWidth = parseInt(screenSize?.width, 10);
  let browserWidth = parseInt(browserSize?.width, 10);

  const navigate = useNavigate();

  return (
    <>
      {browserWidth >= 1024 ? (
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
            <span
              onClick={() => {
                navigate(`/player-details/${playerId}`);
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
            </span>

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
            onClick={handleVideoGloballyClick}
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
            paddingLeft: "1.3vw",
            height: "20vh",
            width: "6vw",
          }}
        >
          {/* <Avatar
            className="cardBackground"
            src={publisherImg}
            sx={{
              width: 80,
              height: 80,
              border: "4px solid #5585FE",
              cursor: "pointer",
              // right: "1vw",
            }}
          /> */}
          <MobileVideoDisplayCarousel publisherImg={publisherImg} />
        </div>
      )}
    </>
  );
};
