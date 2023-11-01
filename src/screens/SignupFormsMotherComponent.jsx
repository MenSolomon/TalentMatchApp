import { Outlet, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/AppLogoBlue.png";
import FreetrialStepper from "../components/Stepper/FreetrialStepper";

const SignupFormsMotherComponent = () => {
  const styles = `.react-international-phone-input {
  height: 100%;
  background-color: transparent;
}

.react-international-phone-country-selector {
  background-color: transparent;
}


.react-international-phone-input-container .react-international-phone-input{
  background-color: transparent ;
height:100%
}

.react-international-phone-country-selector-dropdown{
  z-index:100
  }

.react-international-phone-country-selector-button {
  background-color: transparent ;
height:100%



}`;

  const navigate = useNavigate();

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
      <div style={{ flex: ".73", overflowY: "scroll" }}>
        {" "}
        <Outlet />{" "}
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />;
    </div>
  );
};

export default SignupFormsMotherComponent;
