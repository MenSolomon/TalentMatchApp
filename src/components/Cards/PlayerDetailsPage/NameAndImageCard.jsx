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
      className="playerCard"
      style={{
        width: "100%",
        height: "100%",
        padding: "1.5vw",
        borderRadius: "1vw",
        display: "flex",
        //   borderRadius: "1vw",
      }}
    >
      {/* // Image flex area */}
      <div style={{ flex: ".4" }}>
        {" "}
        <img src={image} style={{ width: "100%", borderRadius: "5%" }} />{" "}
      </div>
      {/* // names flex area */}
      <div
        style={{
          flex: ".6",

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
            style={{
              flex: ".6",

              display: "flex",
              flexDirection: "column",
              paddingBottom: ".6vh",
            }}
          >
            <div style={{ flex: "0.5" }}></div>
            {/* // POSTION PLACEMENT */}
            <div style={{ flex: "0.5", display: "flex" }}>
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
