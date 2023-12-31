import { Checkbox } from "@mui/material";

const VideoComponentRows = ({ url, description, category, date, views }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(48, 48, 48, 0.952)",
        flex: ".1",
        paddingTop: "1vh",
        display: "flex",
        width: "100%",
        height: "25%",
      }}
      className="VideoComponent sm:text-[.5em] "
    >
      {/* // CHeck box */}
      {/* <div style={{ flex: ".05" }}>
        <Checkbox />
      </div> */}
      {/* Videos */}
      <div
        style={{
          flex: ".2",
          //   background: "white",
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "90%",
            background: "black",
            position: "absolute",
          }}
        ></div>
      </div>

      {/* Description */}
      <div style={{ flex: ".33", background: "blue" }}>{description} sa </div>

      {/* Date uploaded */}
      <div style={{ flex: ".17" }}>{date}</div>
      {/* Category */}
      <div style={{ flex: ".2" }}>{category}</div>

      {/* Views */}
      <div style={{ flex: ".1" }}>{views}</div>
    </div>
  );
};

export default VideoComponentRows;
