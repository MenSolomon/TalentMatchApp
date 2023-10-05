import GalleryVideoComponent from "../../components/GalleryVideoComponent";

const PlayerGallery = () => {
  const videosArray = [
    {
      url: "https://www.youtube.com/watch?v=b2QFKIwQFpc",
      videoCategory: "Goals",
    },
    {
      url: "https://www.youtube.com/watch?v=Su9z-D6dwJ8",
      videoCategory: "Headers",
    },
    {
      url: "https://www.youtube.com/watch?v=aDc-o4ML2NM",
      videoCategory: "Passing",
    },
  ];

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
    >
      {videosArray.map((data, key) => {
        const { url, videoCategory } = data;

        return (
          <GalleryVideoComponent
            key={key}
            url={url}
            videoCategory={videoCategory}
          />
        );
      })}
    </div>
  );
};

export default PlayerGallery;
