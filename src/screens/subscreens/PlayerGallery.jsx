import { useSelector } from "react-redux";
import GalleryVideoComponent from "../../components/GalleryVideoComponent";
import { selectPlayerSelectedToView } from "../../statemanager/slices/PlayersInAgencySlice";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { selectCurrentBrowserSize } from "../../statemanager/slices/OtherComponentStatesSlice";

const PlayerGallery = () => {
  // const videosArray = [
  //   {
  //     url: "https://www.youtube.com/watch?v=b2QFKIwQFpc",
  //     videoCategory: "Goals",
  //   },
  //   {
  //     url: "https://www.youtube.com/watch?v=Su9z-D6dwJ8",
  //     videoCategory: "Headers",
  //   },
  //   {
  //     url: "https://www.youtube.com/watch?v=aDc-o4ML2NM",
  //     videoCategory: "Passing",
  //   },
  //   {
  //     url: "/shaibuJuggling.mp4",
  //     videoCategory: "Passing",
  //   },
  // ];

  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // const PlayersPerPage = browserWidth <= 1024 ? 4 : 9;

  const [videos, setVideos] = useState([]);
  const [circularLoader, setCircularLoader] = useState(true);

  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  // Write a snapshot function that receives data updated in realtime

  // useEffect(() => {
  //   const playerObjectRef = collection(
  //     db,
  //     `players_database/${PlayerSelectedToViewObject.id}/videos`
  //   );

  //   const q2 = query(playerObjectRef);
  //   const allVideos = onSnapshot(q2, (querySnapshot) => {
  //     const videosArray = [];
  //     querySnapshot.forEach((doc) => {
  //       videosArray.push(doc.data());
  //     });

  //     setCircularLoader(false);
  //     setVideos(videosArray);
  //   });
  //   return () => {
  //     allVideos();
  //   };
  // }, [PlayerSelectedToViewObject.id]);

  useEffect(() => {
    try {
      setCircularLoader(true);

      const fetchData = async () => {
        const qPlayer = query(
          collection(db, "players_videos"),
          where("playerId", "==", PlayerSelectedToViewObject.id)
        );

        const allVideos = onSnapshot(qPlayer, (querySnapshot) => {
          const videosArray = [];
          querySnapshot.forEach((doc) => {
            videosArray.push(doc.data());
          });

          console.log(videosArray, "vidae");
          setCircularLoader(false);
          setVideos(videosArray);
        });
      };

      fetchData();
    } catch (error) {
      setCircularLoader(false);
      console.error("errorCA", error);
      console.log("vidae");
    }
  }, [PlayerSelectedToViewObject.id]);

  const VideosPerPage = browserWidth >= 1024 ? 3 : 2;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () => Math.ceil(videos.length / VideosPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getVideosForPage = () => {
    const startIndex = (currentPage - 1) * VideosPerPage;
    const endIndex = startIndex + VideosPerPage;
    return videos.slice(startIndex, endIndex);
  };

  return (
    <div
      className="primaryTextColor md:w-[100%] md:h-[40vh] md:flex md:gap-[2vw] md:overflow-y-scroll md:justify-start   sm:overflow-y-scroll  sm:w-[100%] sm:h-[50vh] sm:flex  sm:justify-center sm:gap-[2vw]"
      // style={{
      //   width: "100%",
      //   height: "40vh",
      //   display: "flex",
      //   gap: "2vw",
      //   flexWrap: "wrap",
      //   overflowY: "scroll",
      // }}
      // className=""
    >
      {circularLoader === true ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {" "}
          <CircularProgress />{" "}
        </div>
      ) : videos.length === 0 ? (
        "No videos uploaded yet"
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            // background: "red",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* // Videos area */}
          <div
            className="md:flex md:flex-row md:gap-[2.5vw] md:basis-[90%]    sm:gap-[2.5vw] sm:flex sm:flex-col sm:basis-[80%] sm:items-center "
            // style={{ flex: ".9" }}
          >
            {getVideosForPage().map((data, key) => {
              const { url, category, id } = data;

              return (
                <GalleryVideoComponent
                  key={key}
                  url={url}
                  videoId={id}
                  videoCategory={category}
                />
              );
            })}
          </div>
          {/* // Pagination Area */}
          <div
            className="md:basis-[10%]
          sm:basis-[20%]"
            style={{
              // flex: ".1",
              display: "grid",
              placeContent: "center",
              alignContent: "center",
            }}
          >
            <Pagination
              className="primaryTextColor"
              sx={{ color: "white" }}
              count={getTotalPages()}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerGallery;
