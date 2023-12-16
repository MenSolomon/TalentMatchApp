import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useState } from "react";
import DeleteVideoModal from "../Modals/DeleteVideoModal";
import EditVideoModal from "../Modals/EditVideoModal";

const VideoComponentRows = ({
  url,
  description,
  category,
  date,
  views,
  id,
  uploaderId,
}) => {
  const userLoginObject = useSelector(selectUserDetailsObject);

  const { role } = userLoginObject;

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Additional logic you want to perform on mouse enter
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Additional logic you want to perform on mouse leave
  };
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(48, 48, 48, 0.952)",
        flex: ".1",
        paddingTop: ".5vh",
        display: "flex",
        width: "100%",
        height: role === "Player" ? "15vh" : "10vh",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <div
        style={{
          flex: ".25",

          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <div style={{ flex: ".5" }}>
          {description.length >= 50 ? (
            <Tooltip title={description}>
              {" "}
              {description.substring(0, 50)}...{" "}
            </Tooltip>
          ) : (
            description
          )}{" "}
        </div>
        <div
          style={{
            flex: ".5",

            display: isHovered === true ? "flex" : "none",
            gap: ".6vw",
            paddingLeft: "1vw",
          }}
        >
          <DeleteVideoModal
            title={category}
            uploadedDate={date}
            views={views}
            url={url}
            id={id}
            uploaderId={uploaderId}
          />

          <EditVideoModal
            title={category}
            uploadedDate={date}
            views={views}
            url={url}
            id={id}
            uploaderId={uploaderId}
            description={description}
          />
        </div>
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
