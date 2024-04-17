import { Avatar, CircularProgress, Fade, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { Carousel } from "react-bootstrap";

import { useSelector } from "react-redux";
import {
  selectCarouselVideoIndex,
  selectCurrentBrowserSize,
  selectCurrentScreenSize,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import {
  selectAllPlayersVideos,
  selectRandomizedVideosArray,
} from "../../statemanager/slices/VideosSlice";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import moment from "moment";

import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import handleVideoGloballyClick from "../../utilities/VideoPausePlayFunction";

// import welcomMessageImage from "../../assets/images/animatedFootbal.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100vh",
  bgcolor: "black",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  // padding: "4vw",
  // paddingLeft: "4.5vw",
  display: "flex",
  flexDirection: "column",
  // paddingTop: "3vh",
};

export default function MobileVideoDisplayCarousel({ publisherImg }) {
  const [open, setOpen] = useState(false);

  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  //
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [AllVideos, setAllVideos] = useState([]);

  const [onOpen, setOnOpen] = useState(false);
  const [randomizedVideos, setRandomizedVideos] = useState([]);

  const AllPlayers = useSelector(selectPlayersDatabase);

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
  useEffect(() => {
    // if (AllVideos.length > 0 && onOpen === false) {
    //   setOnOpen(true);
    const shuffledVideos = shuffleArray([...AllVideos]);
    setRandomizedVideos(shuffledVideos);
    // }
  }, [AllVideos, onOpen]);

  // Shuffle the array on page load

  useEffect(() => {
    const fetchPlayerVideos = async () => {
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

      // Now 'allVideos' contains an array of all videos for all players
      console.log("All Videos: now", allVideos);
      setAllVideos(allVideos);
      // Use 'allVideos' as needed (e.g., dispatch to Redux store)
    };

    // Call the function to fetch player videos
    fetchPlayerVideos();
  }, [AllPlayers, db]);

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

  const selectVideoIndex = useSelector(selectCarouselVideoIndex);

  const randomizedVideosArrayFromOtherCarousel = useSelector(
    selectRandomizedVideosArray
  );

  const carouselRef = useRef(null);

  // useEffect(() => {
  //   if (
  //     carouselRef &&
  //     selectVideoIndex !== undefined &&
  //     selectVideoIndex !== null
  //   ) {
  //     // Check if the selected index is different from the current one
  //     if (carouselRef.current.getCurrentSlide() !== selectVideoIndex) {
  //       // Go to the specified slide index and skip callbacks
  //       carouselRef.current.goTo(selectVideoIndex, {
  //         skipBeforeChange: true,
  //         skipAfterChange: true,
  //       });
  //     }
  //   }
  // }, [selectVideoIndex]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(selectVideoIndex);
  // const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // if (
    //   carouselRef &&
    //   carouselRef.current &&
    //   selectVideoIndex !== undefined &&
    //   selectVideoIndex !== null
    // ) {
    // Check if the selected index is different from the current one
    if (currentSlideIndex !== selectVideoIndex) {
      // Update the current slide index
      setCurrentSlideIndex(selectVideoIndex);
      // Go to the specified slide index and skip callbacks
      // carouselRef.current.goTo(selectVideoIndex, {
      //   skipBeforeChange: true,
      //   skipAfterChange: true,
      // });
    }
    // }
  }, [selectVideoIndex]);

  const handleSelect = (selectedIndex) => {
    setCurrentSlideIndex(selectedIndex);
  };

  const handleModalEntered = () => {
    // Set the active index when the modal is fully entered
    setCurrentSlideIndex(selectVideoIndex);
  };
  return (
    <div onClick={handleOpen}>
      <Avatar
        className="cardBackground"
        src={publisherImg}
        sx={{
          width: 80,
          height: 80,
          border: "4px solid #5585FE",
          cursor: "pointer",
          // right: "1vw",
        }}
      />
      <BlackBackgroundModal
        open={open}
        onClose={handleClose}
        onEntered={handleModalEntered}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          {randomizedVideosArrayFromOtherCarousel &&
          randomizedVideosArrayFromOtherCarousel.length === 0 ? (
            <div
              style={{
                position: "relative",
                height: "100%",
                width: screenWidth >= 1024 ? "77vw" : "90vw",
                background: "black",
                display: "grid",
                placeContent: "center",
              }}
            >
              <CircularProgress sx={{ color: "white" }} />{" "}
            </div>
          ) : (
            <div
              style={{
                ...style,
                position: "relative",
                // height: "100vh",
                width: "100%",
                // background: "red",
              }}
            >
              <Carousel
                // ref={carouselRef}
                // responsive={responsive}
                // arrows={screenWidth >= 1024 ? true : false}
                // swipeable={screenWidth >= 1024 ? true : true}
                // draggable={screenWidth >= 1024 ? true : true}
                // afterChange={(index) => setCurrentSlideIndex(index)}
                activeIndex={
                  // currentSlideIndex === 0 ? selectVideoIndex : currentSlideIndex
                  currentSlideIndex
                }
                interval={null}
                onSelect={handleSelect}

                //   controls={false}
                //   interval={1000}
                // onSlide={() => {

                //   const videoElement = document.getElementById(
                //     `video-${prevActiveIndex}`
                //   );
                //   if (videoElement) {
                //     videoElement.pause();
                //   }
                // }}
              >
                {randomizedVideosArrayFromOtherCarousel &&
                  randomizedVideosArrayFromOtherCarousel.map((data, index) => {
                    const {
                      url,
                      playerProfileImage,
                      playerId,
                      id,
                      dateUploaded,
                    } = data;

                    return (
                      <Carousel.Item
                        // onClick={() => {
                        //   handleVideoClick(index);
                        // }}
                        key={index}
                      >
                        <VideoCard
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                          }}
                          publisherImg={playerProfileImage}
                          video={url}
                          vidIndex={id}
                          playerId={playerId}
                          dateUploaded={dateUploaded}
                        />{" "}
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>
          )}
        </Fade>
      </BlackBackgroundModal>
    </div>
  );
}

const VideoCard = ({
  publisherImg,
  video,
  vidIndex,
  playerId,
  dateUploaded,
  onClick,
}) => {
  const screenSize = useSelector(selectCurrentScreenSize);
  const browserSize = useSelector(selectCurrentBrowserSize);
  const playersDatabase = useSelector(selectPlayersDatabase);

  const currnetPlayer = playersDatabase.find((data) => {
    return data.id === playerId;
  });

  let screenWidth = parseInt(screenSize?.width, 10);
  let browserWidth = parseInt(browserSize?.width, 10);

  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          borderRadius: "1vw",
          position: "relative",
          // paddingTop: "1vh",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "3",
            top: "4%",

            left: ".5vw",
            display: "flex",
            background: "rgba(27, 27, 27, 0.205)",
            width: "100vw",
          }}
          // onClick={() => {
          //   navigate(`/player-details/${playerId}`);
          // }}
        >
          <span
            style={{ flex: ".25" }}
            onClick={() => {
              navigate(`/player-details/${playerId}`);
            }}
          >
            <Avatar
              className="cardBackground"
              src={publisherImg}
              sx={{
                width: 85,
                height: 85,
                border: "1px solid #5585FE",
                cursor: "pointer",
                // right: "1vw",
              }}
            />
          </span>
          {/* <span style={{ flex: ".15" }}> <IconButton onClick={handleC} > <Close /> </IconButton> </span> */}

          <span
            onClick={() => {
              navigate(`/player-details/${playerId}`);
            }}
            style={{ flex: ".75" }}
          >
            <h4
              style={{
                color: "white",

                position: "relative",
                top: "1vh",
                // fontSize: "1em",
                fontWeight: "bolder",
                margin: 0,
              }}
            >
              {" "}
              {currnetPlayer.firstName}
            </h4>

            <h2
              style={{
                color: "white",
                position: "relative",
                top: "1vh",
                // fontSize: ".75em",
                fontWeight: "bolder",
              }}
              // onClick={onClick}
            >
              {" "}
              {currnetPlayer.surName.length < 15
                ? currnetPlayer.surName
                : `${currnetPlayer.surName.slice(0, 15)}...`}{" "}
              <span style={{ fontSize: ".65em" }}>
                {moment(dateUploaded).fromNow()}
              </span>
            </h2>
          </span>
        </div>
        {/* <div onClick={() => handleVideoClick(index)}> */}
        {/* onClick={handleClose} */}
        <IconButton
          onClick={onClick}
          style={{
            position: "absolute",
            right: 0,
            top: "4%",
            color: "white",
            zIndex: 10000,
          }}
        >
          {" "}
          <Close sx={{ color: "white" }} />{" "}
        </IconButton>
        <video
          onClick={handleVideoGloballyClick}
          id={`carouselVideo-${vidIndex}`}
          width="160vw"
          style={{ width: "100vw", height: "100vh" }}
          controls
        >
          {" "}
          <source src={video} type="video/mp4" />
        </video>{" "}
        {/* </div> */}
      </div>
    </>
  );
};

const BlackBackgroundModal = ({ open, onClose, children, onEntered }) => {
  const modalStyle = {
    backgroundColor: "black",
    // Adjust padding as needed
    // Add other styles as needed

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100vh",
    // bgcolor: "black",
    border: "transparent",
    boxShadow: 24,
    borderRadius: "1vw",
    // padding: "4vw",
    // paddingLeft: "4.5vw",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onEntered={onEntered}
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
    >
      <div style={modalStyle}>{children}</div>
    </Modal>
  );
};
