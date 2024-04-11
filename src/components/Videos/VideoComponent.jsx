import React, { useRef } from "react";
import { useVideo } from "../../utilities/VideoProvider";

const VideoComponent = ({ src, videoId, width, height }) => {
  const videoRef = useRef(null);
  const { currentVideo, playVideo, pauseVideo } = useVideo();

  const isPlaying = currentVideo === videoId;

  const handleClick = () => {
    if (isPlaying) {
      pauseVideo();
      videoRef.current.pause();
    } else {
      playVideo(videoId);
      videoRef.current.play();
    }
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      //   style={{ width: width, height: height }}
    >
      <video
        style={{ width: width, height: height }}
        ref={videoRef}
        controls={isPlaying}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default VideoComponent;
