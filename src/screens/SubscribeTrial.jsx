import {
  Button,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import FreeTrialMenu from "../components/Menu/FreeTrialMenu";
import FreetrialStepper from "../components/Stepper/FreetrialStepper";
import { Add, AddAPhoto } from "@mui/icons-material";
import FreetrialCard from "../components/Cards/FreetrialCard";
import { Avatar } from "antd";
import Item from "antd/es/list/Item";
import SubscribeTrialCardHeader from "../components/Cards/SubscribeTrialCardHeader";
import iconImage from "../assets/images/kudus.webp";
import SubscribeTrialLeftPaper from "../components/Paper/SubscribeTrialLeftPaper";
import SubscribeTrialRightPaper from "../components/Paper/SubscribeTrialRightPaper";

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
