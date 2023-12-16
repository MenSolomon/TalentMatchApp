import { useSelector } from "react-redux";
import GalleryVideoComponent from "../../components/GalleryVideoComponent";
import { selectPlayerSelectedToView } from "../../statemanager/slices/PlayersInAgencySlice";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

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

  const [videos, setVideos] = useState([]);
  const [circularLoader, setCircularLoader] = useState(true);

  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  // Write a snapshot function that receives data updated in realtime

  useEffect(() => {
    const playerObjectRef = collection(
      db,
      `players_database/${PlayerSelectedToViewObject.id}/videos`
    );

    const q2 = query(playerObjectRef);
    const allVideos = onSnapshot(q2, (querySnapshot) => {
      const videosArray = [];
      querySnapshot.forEach((doc) => {
        videosArray.push(doc.data());
      });

      setCircularLoader(false);
      setVideos(videosArray);
    });
    return () => {
      allVideos();
    };
  }, [PlayerSelectedToViewObject.id]);

  const VideosPerPage = 3;

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
      style={{
        width: "100%",
        height: "40vh",
        display: "flex",
        gap: "2vw",
        flexWrap: "wrap",
        overflowY: "scroll",
      }}
      className="primaryTextColor"
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
          <div style={{ flex: ".7", display: "flex", gap: "2.5vw" }}>
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
          <div style={{ flex: ".3", display: "grid", placeContent: "center" }}>
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
