import { Checkbox, Pagination } from "@mui/material";
import VideoComponentRows from "../../components/Rows/VideoComponentRows";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../../statemanager/slices/PlayersInAgencySlice";
import { selectPlayersDatabase } from "../../../../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../Firebase/Firebase";

const PlayerManagementVideos = () => {
  const dispatch = useDispatch();

  const CurrentPlayerSelectedForClubScoutCoachAndAgentManagement = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );
  const allPlayerDatabase = useSelector(selectPlayersDatabase);
  const userDetailsObject = useSelector(selectUserDetailsObject);

  const { id, firstName, surName } =
    CurrentPlayerSelectedForClubScoutCoachAndAgentManagement;

  const [videos, setVideos] = useState([]);
  const [circularLoader, setCircularLoader] = useState(false);

  useEffect(() => {
    try {
      setCircularLoader(true);

      const fetchData = async () => {
        const qPlayer = query(
          collection(db, "players_videos"),
          where("playerId", "==", id)
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
  }, []);

  // function objectToArray(inputObject) {
  //   return Object.values(inputObject);
  // }

  // const videosArray = objectToArray(videos);

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
      className="md:flex md:flex-col md:w-[100%] md:h-[48vh]  sm:flex sm:flex-col sm:w-[100%] sm:h-[48vh]"
      style={{
        // display: "flex",
        // flexDirection: "column",
        fontSize: ".8em",
        // width: "100%",
        // height: "48vh",
      }}
    >
      {/* Video DISPLAY AREA */}
      <div
        style={{
          flex: ".9",
          // background: "red",
          display: "flex",
          flexDirection: "column",
          marginBottom: "1vh",
        }}
      >
        {videos.length === 0 ? (
          "No videos uploaded yet"
        ) : (
          <>
            {/* // FILTER ROW */}
            <div
              style={{
                // border: "1px solid black",
                borderBottom: "none",
                flex: ".1",
              }}
            >
              Filter
            </div>
            {/* HEADER ROW */}
            <div
              style={{
                // border: "1px solid black",
                flex: ".1",
                // borderBottom: "1px solid black",
                display: "flex",
                fontWeight: "bolder",
              }}
            >
              {/* // CHeck box */}
              {/* <div style={{ flex: ".05" }}>
                <Checkbox />
              </div> */}
              {/* Videos */}
              <div style={{ flex: ".2" }}>Video</div>

              {/* Description */}
              <div style={{ flex: ".25" }}>Description</div>

              {/* Date uploaded */}
              <div style={{ flex: ".25" }}>Date uploaded</div>
              {/* Category */}
              <div style={{ flex: ".2" }}>Category</div>

              {/* Views */}
              <div style={{ flex: ".1" }}>Views</div>
            </div>
            {/* VIDEOS CONTENT ROWS */}
            <div
              style={{
                // border: "1px solid black",
                flex: ".7",
                borderBottom: "none",
              }}
            >
              {getVideosForPage().map((data, index) => {
                const {
                  filename,
                  description,
                  category,
                  dateUploaded,
                  url,
                  views,
                  uploadedById,
                  id,
                } = data;

                return (
                  <VideoComponentRows
                    key={index}
                    url={url}
                    id={id}
                    description={description}
                    category={category}
                    views={views}
                    date={dateUploaded}
                    uploaderId={data?.uploadedById}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* VIDEOS PAGINATION ROW */}
      <div
        style={{
          flex: ".1",
          display: "grid",
          placeItems: "center",
          paddingTop: "1vh",
          // background: "blue",
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
  );
};

export default PlayerManagementVideos;
