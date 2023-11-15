import errorImage from "../assets/images/Error404Animation.svg";
const Error404 = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: "blue",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: ".2",
          textAlign: "center",
          color: "#5585FE",
          //   background: "red",
        }}
      >
        <h1>Error 503 </h1>
        <h5>Page under construction</h5>
      </div>

      <div style={{ flex: ".8", display: "flex", justifyContent: "center" }}>
        <img width="450px" src={errorImage} />
      </div>
    </div>
  );
};

export default Error404;
