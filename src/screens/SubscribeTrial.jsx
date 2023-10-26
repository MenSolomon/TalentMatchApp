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
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompleteSteps,
  selectRoleSelected,
  setCompletedSteps,
} from "../statemanager/slices/SignupStepperSlice";

const SubscribeTrial = () => {
  // RIGHT PAPER FUNCTIONS

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTrialNavigation = () => {
    navigate("/create-account/user-form");
  };

  const completedStepsObject = useSelector(selectCompleteSteps);

  const handleStepsCompleted = () => {
    dispatch(setCompletedSteps({ ...completedStepsObject, 1: true }));
  };

  const [packageValue, setPackage] = useState("Starter Pack");

  const roleSelected = useSelector(selectRoleSelected);

  // SETTING SUBSCRIPTION FOR USER ACCOUNT
  const userData = useSelector(selectUserSignUpData);

  useEffect(() => {
    dispatch(
      setUserSignUpData({ ...userData, subscriptionPackage: packageValue })
    );
  }, [packageValue]);

  const ulStyle = {
    fontSize: ".8em",
  };

  return (
    <div
      style={{
        // background: "red",
        width: "100%",
        height: "100%",
        display: "flex",
        // gap: "5vw",
        paddingLeft: "4%",
        // flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: "0.55",
          // background: "red",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "10px",
        }}
      >
        {/* // LEFT PAPER  */}

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
              {/* 

 */}

              {roleSelected === "Player" ? (
                <img src="/public/playerImage.png" width="70px" height="80px" />
              ) : roleSelected === "Agent" ? (
                <img src="/public/agentImage.png" width="100px" />
              ) : roleSelected === "Coach" ? (
                <img src="/public/coachImage.png" width="100px" />
              ) : roleSelected === "Scout" ? (
                <img src="/public/scoutImage.png" width="100px" />
              ) : (
                <img alt="No Role selected" width="100px" />
              )}
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
                    Start your free trial for 90 <br /> days
                  </h5>
                  <h5 style={{ fontWeight: "bold" }}>{roleSelected}</h5>
                  <small>
                    Doesn't suit you ?{" "}
                    <span
                      style={{ color: "#5585FE", cursor: "pointer" }}
                      onClick={() => {
                        navigate("/create-account/freetrial");
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
              flex: "0.4",
              // padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              // background: "red",
            }}
          >
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {" "}
                <h6 style={{ fontWeight: "bold" }}> Packages</h6>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Starter Pack"
                name="radio-buttons-group"
                onChange={(e) => {
                  setPackage(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Starter Pack"
                  control={<Radio />}
                  label={
                    <div style={{ width: "100%" }}>
                      Starter Pack{" "}
                      <span
                        style={{ marginLeft: "16vw", fontWeight: "bolder" }}
                      >
                        {" "}
                        $40 per year{" "}
                      </span>{" "}
                    </div>
                  }
                />
                <FormControlLabel
                  value="Premium Pack"
                  control={<Radio />}
                  label={
                    <div style={{ width: "100%" }}>
                      Premium Pack{" "}
                      <span
                        style={{ marginLeft: "14vw", fontWeight: "bolder" }}
                      >
                        {" "}
                        $100 per year{" "}
                      </span>{" "}
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
      {/* //  RIGHT PAPER */}
      <div
        style={{
          flex: "0.4",
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
          <Button
            onClick={() => {
              handleTrialNavigation();
              handleStepsCompleted();
            }}
            variant="outlined"
          >
            {" "}
            start a free trail{" "}
          </Button>
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

export default SubscribeTrial;
