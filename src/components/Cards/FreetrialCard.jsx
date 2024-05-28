import { Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  selectCompleteSteps,
  setCompletedSteps,
  setRoleSelected,
} from "../../statemanager/slices/SignupStepperSlice";
import imageBackground from "../../assets/images/FootballLogo.jpg";
import { selectCurrentBrowserSize } from "../../statemanager/slices/OtherComponentStatesSlice";

const FreetrialCard = ({ name, roleImage, imageStyle, className }) => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // width: browserWidth >= 1024 ? "9vw" : "40vw",
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTrialNavigation = () => {
    // navigate("/create-account/subscribeTrial");
    navigate("/create-account/user-form");
  };

  const completedStepsObject = useSelector(selectCompleteSteps);

  const handleStepOneCompleted = () => {
    dispatch(setCompletedSteps({ ...completedStepsObject, 0: true }));
  };

  const handleDispatchRoleSelectedToSlice = () => {
    dispatch(setRoleSelected(name));
  };

  return (
    <>
      <Card
        className={`" lg:w-[17%] lg:h-[80%]   md:w-[37%] md:h-[80%] 
        sm:w-[40%] sm:h-[21.5vh] 
          ${className} "`}
        sx={{
          color: "black",
          borderRadius: "10px",
        }}
      >
        <div
          className="chooseARoleCard md:flex md:flex-col sm:flex sm:flex-col "
          onClick={() => {
            handleStepOneCompleted();
            handleTrialNavigation();
            handleDispatchRoleSelectedToSlice();
          }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          <div
            style={{
              flex: "0.4",
              // background: "yellow",
              display: "grid",
              placeContent: "center",
            }}
          >
            <img src={roleImage} style={{ ...imageStyle, width: "120px" }} />
          </div>
          <div
            style={{
              flex: "0.3",
              display: "grid",
              placeContent: "center",
              // color: "white",
            }}
          >
            <h4>{name}</h4>
          </div>
          <div
            style={{
              flex: "0.3",
              // background: "peru",
              display: "grid",
              placeContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                handleStepOneCompleted();
                handleTrialNavigation();
                handleDispatchRoleSelectedToSlice();
              }}
              variant="outlined"
              className="sm:h-[3.5vh] sm:mb-[2.4vh] "
              sx={{
                height: browserWidth >= 1024 ? "6vh" : "3.5vh",
                marginBottom: browserWidth >= 1024 ? "" : "3vh",
              }}
            >
              Start Trial
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FreetrialCard;
