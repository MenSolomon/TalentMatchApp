import React, { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const playVideo = (videoId) => {
    setCurrentVideo(videoId);
  };

  const pauseVideo = () => {
    setCurrentVideo(null);
  };

  return (
    <VideoContext.Provider value={{ currentVideo, playVideo, pauseVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
