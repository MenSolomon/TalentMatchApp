import { Button } from "@mui/material";
import logoImage from "../assets/images/AppLogoBlue.png";
import { ConfirmDetailTextField } from "../components/TextFields/ConfirmDetailTextField";
import ComfirmDetailFormComponent from "../components/ConfirmDetailCoachForm/ComfirmDetailFormComponent";

const ConfirmDetails = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: "red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* CREATE NEW ACCOUNT */}
      <div
        style={{
          flex: "0.3",
          // background: "red",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "0.5",
            // background: "red",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img src={logoImage} style={{ width: "100px" }} />
          <h2>Create new account</h2>
        </div>
        <div style={{ flex: "0.5", textAlign: "center" }}>
          <small style={{ fontWeight: "bold" }}>
            Please begin by providing your personal information in the User
            Credentials <br /> form below. These details should correspond to
            the account administrator.
          </small>
        </div>
      </div>

      {/* gAP BETWEEN MAIN DIV */}

      {/* FORM START HERE */}

      <div
        style={{
          flex: "0.7",
          display: "flex",
          flexDirection: "column",
          // background: "red",
        }}
      >
        <ComfirmDetailFormComponent
          credential={"Agent Credential"}
          subCredential={"Company"}
          companyName={"Company"}
          confirmPassword={"confirm Password"}
          contact={"contact"}
          gmail={"@gmail.com"}
          password={"password"}
          address={"address"}
          zipCode={"zip/code"}
          firstName={"first name"}
          subName={"last name"}
          conmpanySubName={""}
          conmpanySubNameDetails={"Areas of Expertise"}
          placeholder={"Agent Experience (years)"}
        />
      </div>
    </div>
  );
};

export default ConfirmDetails;
