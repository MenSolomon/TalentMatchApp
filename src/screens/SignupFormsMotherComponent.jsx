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
      className="md:w-[100%] md:h-[100vh] md:flex md:flex-col        
    sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col
    "
      style={{
        // width: "100vw",
        // height: "100vh",
        // display: "flex",
        // flexDirection: "column",
        background: "#f7f7f9",
      }}
    >
      <div
        className="md:basis-[12%] sm:basis-[12%] md:pt-[1.5vh] md:pl-[1vw]  sm:pt-[1.5vh] sm:pl-[1vw]"

        // style={{ flex: ".12", paddingTop: "1.5vh", paddingLeft: "1vw" }}
      >
        <img
          onClick={() => {
            navigate("/login");
          }}
          style={{ width: "120px" }}
          src={logoImage}
        />
      </div>
      <div
        className=" md:basis-[15%] sm:basis-[18%]  md:flex md:justify-center 
        sm:flex sm:justify-start sm:flex-shrink-0  md:flex-shrink-0
        "
        style={
          {
            // flex: "0.15",
            // background: "yellow",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // padding: "20px",
          }
        }
      >
        <FreetrialStepper />
      </div>
      <div
        className="md:basis-[73%]  sm:basis-[70%] "
        style={{ overflowY: "scroll", marginBottom: "3vh" }}
      >
        {" "}
        <Outlet />{" "}
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />;
    </div>
  );
};

export default SignupFormsMotherComponent;
