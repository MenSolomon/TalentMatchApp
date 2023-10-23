import { Button } from "@mui/material";
import FreeTrialMenu from "../../components/Menu/FreeTrialMenu";
import FreetrialStepper from "../../components/Stepper/FreetrialStepper";
import { CreateAccountTextField } from "../../components/TextFields/CreateAccountTextField";
import iconImage from "../../assets/images/kudus.webp";

const Coaches = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
        background: "peru",
      }}
    >
      <div
        style={{
          //   background: "red",
          // width: "100vw",
          height: "160vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header for free trial page */}
        <div
          style={{
            flex: "0.05",
            // background: "red",
            display: "flex",
            padding: "10px",
          }}
        >
          <div
            style={{
              flex: "0.5",
              // background: "yellow",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <h5>TalentMatch</h5>
          </div>
          <div
            style={{
              flex: "0.5",
              // background: "pink",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <FreeTrialMenu />
          </div>
        </div>
        {/* Stepper for free trial */}
        <div
          style={{
            flex: "0.05",
            // background: "yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // padding: "20px",
          }}
        >
          <FreetrialStepper />
        </div>
        {/* free trial membership */}
        <div
          style={{
            flex: "0.9",
            // background: "red",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Create Account */}
          <div
            style={{
              flex: "0.15",
              //   background: "red",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img src={iconImage} width="100px" />
            <h2>Create new account</h2>
          </div>

          <div style={{ flex: "0.1", textAlign: "center" }}>
            <small style={{ fontWeight: "bold" }}>
              Please begin by providing your personal information in the User
              Credentials <br /> form below. These details should correspond to
              the account administrator.
            </small>
          </div>

          <div
            style={{ flex: "0.75", display: "flex", flexDirection: "column" }}
          >
            {/* FIRST TEXTFIELD */}
            <div
              style={{ flex: "0.4", display: "flex", flexDirection: "column" }}
            >
              {/* credentials */}
              <div
                style={{
                  flex: "0.1",
                  //   background: "yellow",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h5
                  style={{
                    marginLeft: "-30%",
                  }}
                >
                  User Credentials
                </h5>
              </div>
              <div
                style={{
                  flex: "0.9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* ======= */}
                {/* first row input */}
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  <CreateAccountTextField
                    variant={"outlined"}
                    type={"name"}
                    placeholder={"first name"}
                    style={"20vw"}
                  />
                  <CreateAccountTextField
                    variant={"outlined"}
                    placeholder={"last name"}
                    style={"20vw"}
                  />
                </div>
                {/* second row input */}
                <div style={{ marginLeft: "-21%" }}>
                  <CreateAccountTextField
                    variant={"outlined"}
                    placeholder={"email"}
                    style={"20vw"}
                  />
                </div>
                {/* third row input */}
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <CreateAccountTextField
                    variant={"outlined"}
                    style={"20vw"}
                    placeholder={"password"}
                  />
                  <CreateAccountTextField
                    variant={"outlined"}
                    style={"20vw"}
                    placeholder={"confirm password"}
                  />
                </div>
                {/* ====== */}
              </div>
            </div>

            {/* SECOND TEXTFIELD */}
            <div
              style={{
                flex: "0.6",
                // background: "yellow",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: "0.2",
                  //   background: "yellow",
                  textAlign: "center",
                }}
              >
                <small style={{ fontWeight: "bold" }}>
                  You have the option to link multiple organizations to your
                  Talent Match <br /> account. Let's get started by entering the
                  details for your first organization.
                </small>
              </div>
              <div style={{ flex: "0.8" }}>
                {/* ========= */}
                <div
                  style={{
                    flex: "0.1",
                    // background: "yellow",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h5
                    style={{
                      marginLeft: "-37%",
                    }}
                  >
                    Group
                  </h5>
                </div>
                <div
                  style={{
                    flex: "0.9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {/* first row input */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <CreateAccountTextField
                      variant={"outlined"}
                      type={"name"}
                      placeholder={"organization"}
                      style={"20vw"}
                    />
                    <CreateAccountTextField
                      variant={"outlined"}
                      placeholder={"address"}
                      style={"20vw"}
                    />
                  </div>
                  {/* second row input */}
                  <div style={{ display: "flex", gap: "50px" }}>
                    <CreateAccountTextField
                      variant={"outlined"}
                      style={"10vw"}
                      placeholder={"city"}
                    />
                    <CreateAccountTextField
                      variant={"outlined"}
                      placeholder={"state"}
                      style={"10vw"}
                    />
                    <CreateAccountTextField
                      variant={"outlined"}
                      style={"10vw"}
                      placeholder={"zip/code"}
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
                    <CreateAccountTextField
                      variant={"outlined"}
                      style={"20vw"}
                      placeholder={"Specific sports"}
                    />
                    <CreateAccountTextField
                      variant={"outlined"}
                      style={"20vw"}
                      placeholder={"VAT number"}
                    />
                  </div>

                  <div style={{ paddingTop: "25px", marginLeft: "26%" }}>
                    <Button variant="contained">signup for free today</Button>
                  </div>

                  {/* ====== */}
                </div>

                {/* =========== */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coaches;
