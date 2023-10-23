import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FreeTrialMenu from "../components/Menu/FreeTrialMenu";
import FreetrialStepper from "../components/Stepper/FreetrialStepper";
import { Add, AddAPhoto } from "@mui/icons-material";
import FreetrialCard from "../components/Cards/FreetrialCard";
import { Avatar } from "antd";
import Item from "antd/es/list/Item";
// import SubscribeTrialCardHeader from "../components/Cards/SubscribeTrialCardHeader";
import iconImage from "../assets/images/kudus.webp";
// import SubscribeTrialLeftPaper from "../components/Paper/SubscribeTrialLeftPaper";
// import SubscribeTrialRightPaper from "../components/Paper/SubscribeTrialRightPaper";
import logoImage from "../assets/images/AppLogoBlue.png";
import { useNavigate } from "react-router-dom";

const SubscribeTrial = () => {
  return (
    <div
      style={{
        // background: "red",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header for free trial page */}
      <div
        style={{
          flex: "0.1",
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
          <img style={{ width: "120px" }} src={logoImage} />
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
          {/* <FreeTrialMenu /> */}
        </div>
      </div>
      {/* Stepper for free trial */}
      <div
        style={{
          flex: "0.2",
          // background: "yellow",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // padding: "20px",
        }}
      >
        <FreetrialStepper stepperValue={1} />
      </div>
      {/* free trial membership */}
      <div
        style={{
          flex: "0.7",
          // background: "red",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: "0.5",
            //   background: "red",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          <SubscribeTrialLeftPaper iconImage={iconImage} />
        </div>
        <div
          style={{
            flex: "0.5",
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
        >
          <SubscribeTrialRightPaper />
        </div>
      </div>
    </div>
  );
};

export default SubscribeTrial;

const SubscribeTrialLeftPaper = ({ iconImage }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          width: "70%",
          height: "75%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "0.5",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: "0.3",

              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <img src={iconImage} width="100px" />
          </div>

          <div
            style={{
              flex: "0.7",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <h5 style={{ fontWeight: "bold" }}>
                  Start your free trial for 15 <br /> days
                </h5>
                <h5 style={{ fontWeight: "bold" }}>Independent Coach</h5>
                <small>
                  Doesn't suit you ?{" "}
                  <span
                    style={{ color: "#5585FE", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/freetrial");
                    }}
                  >
                    change your membership
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: "0.1",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <h6 style={{ fontWeight: "bold" }}>Video Packs</h6>
        </div>
        <div
          style={{
            flex: "0.4",
            // padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            // background: "red",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <SubscribeTrialCardHeader
              tittle={"Talent Video"}
              amount={"200.00"}
              text={"every"}
            />
            <SubscribeTrialCardHeader
              tittle={"Talent Video"}
              amount={"200.00"}
              text={"every"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SubscribeTrialRightPaper = () => {
  return (
    <>
      <Card
        sx={{
          width: "60%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          //   background: "red",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            flex: "0.7",
            display: "flex",
            flexDirection: "column",
            // background: "peru",
          }}
        >
          {/* Header */}
          <div style={{ flex: "0.2", fontWeight: "bold", padding: "5px" }}>
            <h3>Summary</h3>
          </div>
          {/* list*/}

          <div style={{ flex: "0.8", padding: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ borderRadius: "50px", border: "1px solid blue" }}
                  >
                    icon
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>
                    {" "}
                    Independent Coach Membership{" "}
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    200.0 E
                  </div>
                  <div
                    style={{
                      marginLeft: "7px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    every
                  </div>
                </div>
              </div>
            </div>
            <Divider style={{ background: "blue" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ borderRadius: "50px", border: "1px solid blue" }}
                  >
                    1 x
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>
                    {" "}
                    Copper Video Pack
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    200.0 E
                  </div>
                  <div
                    style={{
                      marginLeft: "7px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    every
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================== */}
        </div>
        {/* SubHeader */}
        <div style={{ flex: "0.1", fontWeight: "bold", padding: "5px" }}>
          <h3>what's include</h3>
        </div>
        {/* BTN and list */}
        <div
          style={{
            flex: "0.2",
            display: "grid",
            placeContent: "center",
            padding: "10px",
            // background: "green",
          }}
        >
          <Button variant="outlined"> start a free trail </Button>
          <small>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            perferendis beatae officiis dolorem error sint. Sit quidem dolor
            doloribus. Consectetur fugit ad illum! Consequatur ex impedit at
            quasi. Ipsam, ut.
          </small>
        </div>
      </Card>
    </>
  );
};

const SubscribeTrialCardHeader = ({ amount, text, tittle, style }) => {
  return (
    <>
      <CardHeader
        sx={{ borderRadius: "10px", height: "7vh" }}
        avatar={<Checkbox />}
        action={
          <Typography>
            {amount}
            <p>
              <small>{text}</small>
            </p>
          </Typography>
        }
        title={tittle}
      />
    </>
  );
};
