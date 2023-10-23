import { Outlet } from "react-router-dom";
import logoImage from "../assets/images/AppLogoBlue.png";
import FreetrialStepper from "../components/Stepper/FreetrialStepper";

const SignupFormsMotherComponent = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f7f7f9",
      }}
    >
      <div style={{ flex: ".12", paddingTop: "1.5vh", paddingLeft: "1vw" }}>
        <img style={{ width: "120px" }} src={logoImage} />
      </div>
      <div
        style={{
          flex: "0.15",
          // background: "yellow",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // padding: "20px",
        }}
      >
        <FreetrialStepper />
      </div>

      <div style={{ flex: ".7" }}>
        {" "}
        <Outlet />{" "}
      </div>
    </div>
  );
};

export default SignupFormsMotherComponent;
