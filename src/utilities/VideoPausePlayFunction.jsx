const handleVideoGloballyClick = async (event) => {
  const clickedVideoId = await event.target.id;
  // alert(clickedVideoId);

  // Pause all video elements except the one being clicked
  document.querySelectorAll("video").forEach((video) => {
    if (video.id !== clickedVideoId && !video.paused) {
      video.pause();
    }
  });
};

export default handleVideoGloballyClick;
