import { Avatar } from "@mui/material";

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
      className="playerCard md:w-[100%] md:h-[100%] md:flex  sm:w-[44vw] sm:h-[100%] sm:flex"
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
      <div className="md:basis-[40%]  sm:basis-[40%]">
        {" "}
        <img
          src={image}
          className="md:w-[100%] sm:w-[100%]"
          style={{ borderRadius: "5%" }}
        />{" "}
      </div>
      {/* // names flex area */}
      <div
        className="md:basis-[60%]  sm:basis-[60%]"
        style={{
          // flex: ".6",

          paddingLeft: ".4vw",
        }}
      >
        {/* // Names */}
        <h5 style={hTagStyle} className="sm:text-[15px] md:text-[1.2em]">
          {" "}
          {firstname}{" "}
        </h5>{" "}
        <h5 className="sm:text-[12px] md:text-[1.2em]"> {surname} </h5>{" "}
        {/* // Age And Postion */}
        <div style={{ width: "100%", height: "35%", display: "flex" }}>
          <div style={{ flex: ".4" }}>
            {/* **** Reduce the size of Age label */}
            <h6 className="sm:text-[12px] md:text-[1.2em]" style={hTagStyle}>
              Age
            </h6>
            <h6 className="sm:text-[12px] md:text-[1.2em]">{age}</h6>
          </div>
          <div
            style={{
              flex: ".6",

              display: "flex",
              flexDirection: "column",
              paddingBottom: ".6vh",
            }}
          >
            <div style={{ flex: "0.5" }}></div>
            {/* // POSTION PLACEMENT */}
            <div
              className="sm:text-[12px] md:text-[.94em]"
              style={{ flex: "0.5", display: "flex" }}
            >
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
