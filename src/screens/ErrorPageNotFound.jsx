import errorImg from "../assets/images/NotFound.svg";
import logoImage from "../assets/images/AppLogoBlue.png";
import { useNavigate } from "react-router-dom";

const ErrorPageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        placeContent: "center",
        flexDirection: "column",
        background: "#f7f7f9",
      }}
    >
      <div
        style={{
          flex: ".15",
          display: "flex",
          paddingTop: "2.5vh",
          paddingLeft: "3vw",
        }}
      >
        {" "}
        <img
          onClick={() => {
            navigate("/login");
          }}
          style={{ width: "120px" }}
          src={logoImage}
        />
      </div>

      <div
        style={{
          flex: ".85",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img width="600px" src={errorImg} />
      </div>
    </div>
  );
};

export default ErrorPageNotFound;
