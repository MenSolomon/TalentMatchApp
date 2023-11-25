import { Checkbox } from "@mui/material";

const VideoComponentRows = ({ url, description, category, date, views }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(48, 48, 48, 0.952)",
        // flex: ".1",
        // paddingTop: "1vh",
        // display: "flex",
        // width: "100%",
        // height: "25%",
      }}
      className="VideoComponent md:basis-[10%] md:flex md:w-[100%] md:h-[25%] md:pt-[1vh]  sm:basis-[10%] sm:flex sm:w-[100%] sm:h-[25%] sm:pt-[1vh]"
    >
      {/* // CHeck box */}
      <div
        className="md:basis-[05%]"
        style={{
          flex: ".05",
        }}
      >
        <Checkbox />
      </div>
      {/* Videos */}
      <div
        className="md:basis-[15%] md:grid md:place-items-center md:relative  sm:basis-[15%] sm:grid sm:place-items-center sm:relative"
        style={{
          flex: ".15",
          // background: "white",
          // display: "grid",
          // placeItems: "center",
          // position: "relative",
        }}
      >
        <div
          className="md:w-[80%] md:h-[90%] md:absolute  sm:w-[80%] sm:h-[90%]  sm:absolute"
          style={{
            // width: "80%",
            // height: "90%",
            background: "black",
            // position: "absolute",
          }}
        ></div>
      </div>

      {/* Description */}
      <div className="sm:text-[15px] md:text-[16px]" style={{ flex: ".33" }}>
        {description}{" "}
      </div>

      {/* Date uploaded */}
      <div
        className="sm:text-[12px] sm:flex sm:justify-center  md:text-[16px]  md:flex md:justify-start"
        style={{ flex: ".17" }}
      >
        {date}
      </div>
      {/* Category */}
      <div
        className="sm:text-[13px] sm:flex sm:justify-center  md:text-[16px] md:flex md:justify-start"
        style={{ flex: ".2" }}
      >
        {category}
      </div>

      {/* Views */}
      <div
        className="sm:text-[13px] sm:flex sm:justify-center  md:text-[16px] md:flex md:justify-start"
        style={{ flex: ".1" }}
      >
        {views}
      </div>
    </div>
  );
};

export default VideoComponentRows;
