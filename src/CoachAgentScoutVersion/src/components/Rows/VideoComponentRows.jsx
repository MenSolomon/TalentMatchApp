import { Checkbox, Tooltip } from "@mui/material";

const VideoComponentRows = ({ url, description, category, date, views }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(48, 48, 48, 0.952)",
        flex: ".1",
        paddingTop: ".5vh",
        display: "flex",
        width: "100%",
        height: "10vh",
      }}
      className="VideoComponent"
    >
      {/* // CHeck box */}
      <div style={{ flex: ".05" }}>
        <Checkbox />
      </div>
      {/* Videos */}
      <div
        style={{
          flex: ".15",
          //   background: "white",
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        <video
          style={{
            width: "80%",
            height: "95%",
            // background: "black",
            position: "absolute",
          }}
          src={url}
          controls
        />
      </div>

      {/* Description */}
      <div style={{ flex: ".25" }}>
        {" "}
        {description.length >= 50 ? (
          <Tooltip title={description}>
            {" "}
            {description.substring(0, 50)}...{" "}
          </Tooltip>
        ) : (
          description
        )}{" "}
      </div>

      {/* Date uploaded */}
      <div style={{ flex: ".25" }}>{date}</div>
      {/* Category */}
      <div style={{ flex: ".2" }}>{category}</div>

      {/* Views */}
      <div style={{ flex: ".1" }}>{views}</div>
    </div>
  );
};

export default VideoComponentRows;
