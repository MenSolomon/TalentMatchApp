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
      className="playerCard md:w-[100%] md:h-[100%] md:flex   sm:w-[80%] sm:h-[20vh] sm:flex"
      style={{
        // width: "100%",
        // height: "100%",
        padding: "1.5vw",
        borderRadius: "1vw",
        // display: "flex",
        //   borderRadius: "1vw",
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
        <Tooltip title="Verified">
          <Verified sx={{ color: "#5585FE", marginLeft: "1vw" }} />{" "}
        </Tooltip>
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
        <h5 style={hTagStyle}> {firstname} </h5> <h5> {surname} </h5>{" "}
        {/* // Age And Postion */}
        <div style={{ width: "100%", height: "35%", display: "flex" }}>
          <div style={{ flex: ".4" }}>
            {/* **** Reduce the size of Age label */}
            <h6 style={hTagStyle}>Age</h6>
            <h6>{age}</h6>
          </div>
          <div
            className="md:basis-[60%] md:flex md:flex-col sm:basis-[60%] sm:flex sm:flex-col"
            style={{
              // flex: ".6",

              // display: "flex",
              // flexDirection: "column",
              paddingBottom: ".6vh",
            }}
          >
            {/* <div style={{ flex: "0.5" }}></div> */}
            {/* // POSTION PLACEMENT */}
            <div className="md:basis-[5%] md:flex sm:basis-[5%] sm:flex">
              <Avatar
                src=""
                alt=""
                sx={{
                  width: 18,
                  height: 18,
                  background: "#384DCB",
                  marginRight: ".4vw",
                }}
              >
                <img src="" alt="" />
              </Avatar>
              {position}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameAndImageCard;
