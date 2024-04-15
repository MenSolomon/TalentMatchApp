// import { useSelector } from "react-redux";
// import { selectThemeProviderObject } from "../statemanager/slices/ThemeProviderSlice";

import { Checkbox, CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import { selectPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../statemanager/slices/PlayersInAgencySlice";
import VideoComponentRows from "../../../CoachAgentScoutVersion/src/components/Rows/VideoComponentRows";
import { db } from "../../../Firebase/Firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { selectCurrentBrowserSize } from "../../../statemanager/slices/OtherComponentStatesSlice";

const PlayerVersionVideos = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  const userDetailsObject = useSelector(selectUserDetailsObject);

  const [videos, setVideos] = useState([]);
  const [circularLoader, setCircularLoader] = useState(false);

  useEffect(() => {
    try {
      setCircularLoader(true);

      const fetchData = async () => {
        const qPlayer = query(
          collection(db, "players_database"),
          where("Current_Account_Owner", "==", userDetailsObject?.accountId)
        );
        const querySnapshot = await getDocs(qPlayer);
        const playerObjectRef = collection(
          db,
          `players_database/${querySnapshot?.docs[0]?.data()?.id}/videos`
        );

        const q2 = query(playerObjectRef);
        const allVideos = onSnapshot(q2, (querySnapshot) => {
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

  // useEffect(() => {
  //   try {

  //     fetchData();
  //   } catch (error) {
  //     console.error(error);
  //     setCircularLoader(false);
  //   }

  //   // const playerObjectRef = collection(
  //   //   db,
  //   //   `players_database/${userDetailsObject.accountId}/videos`
  //   // );
  // }, []);

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
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
      className="sm:text-[.8em]"
    >
      {/* // Heading Area */}
      <div style={{ flex: ".1" }}>
        <h3 style={{ margin: 0, float: "left" }}>Profile Videos</h3>{" "}
      </div>

      {/* Video DISPLAY AREA */}

      {circularLoader === true ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : videos.length === 0 ? (
        "No videos uploaded yet"
      ) : (
        <div
          style={{
            flex: ".7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {videos.length === 0 ? (
            "No videos uploaded yet"
          ) : (
            <>
              <div
                style={{
                  flex: ".1",
                  borderBottom: "none",
                }}
              >
                Filter
              </div>

              <div
                style={{
                  flex: ".1",
                  display: "flex",
                  fontWeight: "bolder",
                }}
              >
                {/* <div style={{ flex: ".05" }}>
                  <Checkbox />
                </div> */}
                <div style={{ flex: ".2" }}>Video</div>
                <div style={{ flex: ".25" }}>Description</div>
                <div style={{ flex: ".25" }}>Date uploaded</div>
                <div style={{ flex: ".2" }}>Category</div>
                <div style={{ flex: ".1" }}>Views</div>
              </div>

              <div
                style={{
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
                      description={description}
                      category={category}
                      views={views}
                      date={dateUploaded}
                      id={id}
                      uploaderId={data?.uploadedById}
                    />
                  );
                })}
              </div>
            </>
          )}
          <div
            style={{
              flex: ".1",
              display: "grid",
              placeItems: "center",
              paddingTop: "1vh",
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

export default PlayerVersionVideos;
