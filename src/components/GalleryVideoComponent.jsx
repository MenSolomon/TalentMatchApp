import ReactPlayer from "react-player";

const GalleryVideoComponent = ({ url, videoCategory }) => {
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
