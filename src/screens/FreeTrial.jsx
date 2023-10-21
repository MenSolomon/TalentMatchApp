import { Button, Card } from "@mui/material";
import FreeTrialMenu from "../components/Menu/FreeTrialMenu";
import FreetrialStepper from "../components/Stepper/FreetrialStepper";
import { Add } from "@mui/icons-material";
import FreetrialCard from "../components/Cards/FreetrialCard";

const FreeTrial = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        // background: "red",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          //   background: "red",
          // width: "100vw",
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
            flex: "0.2",
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
            flex: "0.2",
            // background: "red",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <h1>Choose your membership</h1>
          <h5 style={{ fontWeight: "bold" }}>
            membership is your access point to TalentMatch
          </h5>
          <small>Just tell us who you are</small>
        </div>
        {/* Subscribe free trial cards */}
        <div
          style={{
            flex: "0.5",
            // background: "red",
            justifyContent: "center",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FreetrialCard btn={"Get a qoute"} name={"Coach"} />
          <FreetrialCard btn={"Get a qoute"} name={"Player"} />
          <FreetrialCard btn={"Get a qoute"} name={"Agent"} />
          <FreetrialCard btn={"Get a qoute"} name={"Club"} />
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
