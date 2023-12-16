import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectPlayerSelectedToView } from "../statemanager/slices/PlayersInAgencySlice";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { doc, increment, updateDoc } from "firebase/firestore";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";

const GalleryVideoComponent = ({ url, videoCategory, videoId }) => {
  const [vidPlayCounter, setVidPlayCounter] = useState(1);
  const playerInViewObject = useSelector(selectPlayerSelectedToView);

  const { id } = playerInViewObject;
  const loginUserDetails = useSelector(selectUserDetailsObject);
  const { accountId } = loginUserDetails;

  // retriveing the current player in view's id
  const handleVideoView = async () => {
    // vidPlayCOunter is to make sure view is counted once and it doesnt keep updating the view when user keeps playing and pausing the video
    if (vidPlayCounter <= 1) {
      // this is to make sure an owner of account's view doesnt get counted as video view
      if (accountId !== id) {
        const playerVideoToUpdateRef = doc(
          db,
          `players_database/${id}/videos`,
          videoId
        );

        // Atomically increment the views of the video by 1.
        await updateDoc(playerVideoToUpdateRef, {
          views: increment(1),
        });
      }
    }
  };

  return (
    <div
      style={{
        width: "260px",
        height: "150px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          border: "1px solid transparent",
          flex: ".8",
          borderRadius: ".6vw",
          overflow: "hidden",
          postion: "relative",
          // background: "white",
        }}
      >
        <ReactPlayer
          controls={true}
          light={true}
          url={url}
          height="100%"
          width="100%"
          show
          onPlay={() => {
            handleVideoView();
            setVidPlayCounter(vidPlayCounter + 1);
          }}
          style={{ position: "relative" }}
        />{" "}
      </div>

      <div
        className="primaryTextColor cardBackground"
        style={{
          flex: ".2",
          display: "grid",
          placeContent: "center",

          borderRadius: ".5vw",
        }}
      >
        {videoCategory}
      </div>
    </div>
  );
};

export default GalleryVideoComponent;
