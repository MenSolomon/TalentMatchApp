import { Checkbox, Pagination } from "@mui/material";
import VideoComponentRows from "../../components/Rows/VideoComponentRows";
const PlayerManagementVideos = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        width: "100%",
      }}
    >
      {/* Video DISPLAY AREA */}

      <div
        style={{
          flex: ".8",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          <div style={{ flex: ".05" }}>
            <Checkbox />
          </div>
          {/* Videos */}
          <div style={{ flex: ".15" }}>Video</div>

          {/* Description */}
          <div style={{ flex: ".33" }}>Description</div>

          {/* Date uploaded */}
          <div style={{ flex: ".17" }}>Date uploaded</div>
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
          <VideoComponentRows
            description="Text oveflow or give a string cap"
            category="Goals"
            views="22"
            date="Oct 19,2023"
          />
          <VideoComponentRows
            description="Text oveflow or give a string cap"
            category="Goals"
            views="22"
            date="Oct 19,2023"
          />{" "}
          <VideoComponentRows
            description="Text oveflow or give a string cap"
            category="Goals"
            views="22"
            date="Oct 19,2023"
          />{" "}
          <VideoComponentRows
            description="Text oveflow or give a string cap"
            category="Goals"
            views="22"
            date="Oct 19,2023"
          />
        </div>

        {/* VIDEOS PAGINATION ROW */}
        <div style={{ flex: ".1", display: "grid", placeItems: "center" }}>
          <Pagination
            className="primaryTextColor"
            sx={{ color: "white" }}
            count={1}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerManagementVideos;
