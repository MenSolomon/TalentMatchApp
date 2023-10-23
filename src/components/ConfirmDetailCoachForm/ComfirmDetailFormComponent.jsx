import { Button } from "@mui/material";
import { ConfirmDetailTextField } from "../TextFields/ConfirmDetailTextField";

const ComfirmDetailFormComponent = ({
  credential,
  subCredential,
  firstName,
  subName,
  conmpanySubNameDetails,
  conmpanySubName,
  gmail,
  contact,
  zipCode,
  address,
  placeholder,
  confirmPassword,
  password,
  companyName,
}) => {
  const sxStyle = {
    width: "35vw",
  };
  return (
    <>
      <div
        style={{
          flex: "0.7",
          display: "flex",
          flexDirection: "column",
          // background: "red",
        }}
      >
        <div
          style={{
            flex: "0.05",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // background: "red",
          }}
        >
          <div style={{ flex: "0.5", display: "flex", alignItems: "center" }}>
            <h5 style={{ marginLeft: "10%" }}>{credential}</h5>{" "}
            {/* Agent Credentials */}
          </div>
          <div
            style={{
              flex: "0.5",
              // background: "yellow",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <h5 style={{ marginLeft: "10%" }}>{subCredential}</h5>{" "}
            {/*Company */}
          </div>
        </div>
        <div
          style={{
            flex: "0.85",
            display: "flex",
            // background: "red",
            padding: "10px",
            gap: "20px",
          }}
        >
          {/* LEFT INPUT */}
          <div
            style={{
              flex: "0.5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              // border: "1px solid rgb(104, 90, 90)",
              borderRadius: "20px",
              justifyContent: "center",
            }}
          >
            {/* FIRST INPUT */}
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <ConfirmDetailTextField
                variant={"outlined"}
                type={"name"}
                placeholder={firstName}
                style={"20vw"}
              />
              <ConfirmDetailTextField
                variant={"outlined"}
                placeholder={subName}
                style={"20vw"}
              />
            </div>
            {/* SECOND INPUT */}
            <div style={{ marginLeft: "-8%" }}>
              <ConfirmDetailTextField
                variant={"outlined"}
                placeholder={gmail}
                sxStyle={sxStyle}
              />
            </div>

            {/* THIRD INPUT */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <ConfirmDetailTextField
                variant={"outlined"}
                style={"20vw"}
                placeholder={password}
              />
              <ConfirmDetailTextField
                variant={"outlined"}
                style={"20vw"}
                placeholder={confirmPassword}
              />
            </div>
          </div>
          {/*  */}
          {/* RIGHT INPUT */}
          <div
            style={{
              flex: "0.5",
              // background: "red",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              // border: "1px solid rgb(104, 90, 90)",
              borderRadius: "20px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <ConfirmDetailTextField
                variant={"outlined"}
                type={"name"}
                placeholder={companyName}
                style={"20vw"}
              />
              <ConfirmDetailTextField
                variant={"outlined"}
                placeholder={placeholder}
                style={"20vw"}
              />
            </div>
            {/* second row input */}
            <div style={{ display: "flex", gap: "30px", marginLeft: "-8%" }}>
              <ConfirmDetailTextField
                variant={"outlined"}
                style={"10vw"}
                placeholder={contact}
              />
              <ConfirmDetailTextField
                variant={"outlined"}
                placeholder={address}
                style={"10vw"}
              />
              <ConfirmDetailTextField
                variant={"outlined"}
                style={"10vw"}
                placeholder={zipCode}
              />
            </div>
            {/* third row input */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <ConfirmDetailTextField
                variant={"outlined"}
                style={"20vw"}
                placeholder={conmpanySubName}
              />
              <ConfirmDetailTextField
                variant={"outlined"}
                style={"20vw"}
                placeholder={conmpanySubNameDetails}
              />
            </div>
          </div>
        </div>
        <div style={{ flex: "0.1" }}>
          <div style={{ marginLeft: "40.3%", marginTop: "15px" }}>
            <Button variant="contained">signup for free today</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComfirmDetailFormComponent;
