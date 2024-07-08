import { Verified } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";

const NameAndImageCard = ({
  hTagStyle,
  firstname,
  surname,
  image,
  age,
  position,
}) => {
  return (
    <div
      // className="playerCard md:w-[100%] md:h-[100%] md:flex   sm:w-[80%] sm:h-[20vh] sm:flex"
      className="playerCard lg:w-[20vw] md:w-[35vw] md:h-[100%] md:flex   sm:w-[80vw] sm:h-[20vh] sm:flex"
      style={{
        // width: "100%",
        // height: "100%",
        padding: "1.5vw",
        borderRadius: "1vw",
        // display: "flex",
        //   borderRadius: "1vw",
        // background: "red",
      }}
    >
      {/* // Image flex area */}
      <div className="md:basis-[40%] sm:basis-[30%]">
        {" "}
        <img
          src={image}
          className="sm:w-[80%] md:w-[100%]"
          style={{ borderRadius: "5%" }}
        />{" "}
      </div>
      {/* // names flex area */}
      <div
        className="md:basis-[60%] sm:basis-[70%]"
        style={{
          // flex: ".6",

          paddingLeft: ".4vw",
        }}
      >
        {/* // Names */}
        <h5
          className="lg:text-[1em] md:text-[1em]  sm:text-[1em] tb:text-[2em]"
          style={hTagStyle}
        >
          {" "}
          {firstname?.length >= 10 ? (
            <Tooltip title={firstname}>{firstname?.slice(0, 10)}...</Tooltip>
          ) : (
            firstname
          )}
        </h5>{" "}
        <h5 className="lg:text-[1em] md:text-[1em]  sm:text-[1em] tb:text-[2em]">
          {" "}
          {surname?.length >= 10 ? (
            <Tooltip title={surname}>{surname?.slice(0, 12)}...</Tooltip>
          ) : (
            surname
          )}
        </h5>{" "}
        {/* // Age And Postion */}
        <div
          style={{
            width: "100%",
            height: "20%",
            display: "flex",
            // background: "blue",
          }}
        >
          {/* <div style={{ flex: ".4" }}>
            **** Reduce the size of Age label
            <h6
              className="lg:text-[1em] md:text-[1em]  sm:text-[1em] tb:text-[1em]"
              style={hTagStyle}
            >
              Age
            </h6>
            <h6 className="lg:text-[1em] md:text-[1em]  sm:text-[1em] tb:text-[1em]">
              {age}
            </h6>
          </div> */}
          <div
            className="md:basis-[60%] md:flex md:flex-col sm:basis-[60%] sm:flex sm:flex-col"
            style={{
              // flex: ".6",

              // display: "flex",
              // flexDirection: "column",
              paddingBottom: ".6vh",
              // background: "red",
              fonstSize: ".8em",
            }}
          >
            {/* <div style={{ flex: "0.5" }}></div> */}
            {/* // POSTION PLACEMENT */}
            <div
              style={{ position: "relative" }}
              className="md:basis-[5%] md:flex sm:basis-[5%] sm:flex"
            >
              <Avatar
                src=""
                alt=""
                sx={{
                  width: 13,
                  height: 13,
                  background: "#384DCB",
                  marginLeft: ".4vw",
                  position: "absolute",
                  top: "0.5vh",
                  right: 0,
                }}
              >
                <img src="" alt="" />
              </Avatar>
              {position}
            </div>
          </div>
        </div>
        <h6
          className="lg:text-[.9em] md:text-[.9em]  sm:text-[.9em] tb:text-[.9em]"
          style={hTagStyle}
        >
          Age: {age}
        </h6>
        <h5>
          <Tooltip title="Verified">
            <Verified sx={{ color: "#5585FE" }} />{" "}
          </Tooltip>
        </h5>
      </div>
    </div>
  );
};

export default NameAndImageCard;
