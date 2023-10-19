import { Card } from "@mui/material";
import { Carousel } from "react-bootstrap";

const NewsCarousel = ({ NewsArray }) => {
  return (
    <Carousel
      //   controls={false}
      //   interval={1000}
      style={{
        // background: "black",
        height: "100%",
        borderRadius: "1vw",
      }}
    >
      {NewsArray &&
        NewsArray.map((data, index) => {
          const { img, url, source, title } = data;

          return (
            <Carousel.Item
              key={index}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                //   background: "white",
                borderRadius: "1vw",
                height: "44.2vh",
                paddingLeft: "2vw",
                position: "relative",
              }}
            >
              <Card sx={{ borderRadius: "1vw" }}>
                <div
                  className="newsGradient"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    borderRadius: "1vw",
                    // background: "rgba(0, 0, 0, 0.2)",
                  }}
                ></div>

                <span
                  style={{
                    //   zIndex: "1000",
                    // borderRadius: "1vw",
                    position: "absolute",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <h6 style={{ marginTop: "30%" }}> source : {source} </h6>
                  <h4 style={{}}>{title}</h4>
                </span>
                {/* </div> */}
              </Card>
            </Carousel.Item>
          );
        })}

      {/* Add more Carousel.Item components as needed */}
    </Carousel>
  );
};

export default NewsCarousel;

// import { Carousel } from "antd";
// const contentStyle = {
//   height: "44.5vh",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
// const NewsCarousel = () => (
//   <Carousel
//     autoplay
//     style={{ width: "100%", height: "10vh", position: "absolute" }}
//   >
//     <div>
//       <h3 style={contentStyle}>1</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>2</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>3</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>4</h3>
//     </div>
//   </Carousel>
// );
// export default NewsCarousel;
