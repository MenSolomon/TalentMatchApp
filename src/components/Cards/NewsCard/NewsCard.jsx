import { Flag, MoreHoriz, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ title, image, url, source, style }) => {
  const handNavigateUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <Card
        className="newsCard  lg:w-[30%] lg:h-[45%] md:w-[100%] md:h-[45%] md:relative md:flex md:flex-col   sm:w-[100%] sm:h-[45%] sm:relative sm:flex sm:flex-col"
        sx={{
          ...style,
          // width: "30%",
          // height: "45%",
          background: `url(${image})`,
          backgroundSize: "cover",
          // display: "flex",
          // flexDirection: "column",
          // position: "relative",
          color: "white",
          borderRadius: "10px",
        }}
      >
        {/* // SHADOW GRADIENT */}

        <div
          className="newsGradient"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "55%",
            background: "rgba(0,0,0,.8)",
            opacity: 1,
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            // padding: "0px 2px",
          }}
        >
          {/* // NEWS SOURCE AREA */}
          <div
            style={{
              flex: "0.2",
              // background: "blue",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img src={source} style={{ width: "45px" }} />
            Espn
          </div>
          {/* // NEWS TITLE */}
          <div
            style={{
              flex: "0.6",
              textOverflow: "ellipsis",
              textAlign: "justify",
              padding: "0px 5px",
              //   wordSpacing: ".1px",
            }}
          >
            <small
              onClick={() => {
                handNavigateUrl(url);
              }}
              className="newsText  tb:text-[1.2em] md:text-[1em]"
              style={{ cursor: "pointer" }}
            >
              {title && title?.length > 100
                ? `${title?.substring(0, 100)} ...`
                : title}
            </small>
          </div>

          {/* //LIKE AND UNLIKE AND MORE OPTIONS AREA */}
          <div
            style={{
              flex: "0.2",
              // background: "pink",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {/* <div>
                  <IconButton>
                    <ThumbUp sx={{ fontSize: "15px", color: "white" }} />
                  </IconButton>

                  <small>0</small>
                </div>
                <div>
                  <IconButton>
                    <ThumbDown sx={{ fontSize: "15px", color: "white" }} />
                  </IconButton>

                  <small>0</small>
                </div> */}
              </div>
            </div>

            <IconButton>
              {" "}
              <MoreHoriz />
            </IconButton>
          </div>
        </div>

        {/* ====================== */}
      </Card>
    </>
  );
};

export default NewsCard;
