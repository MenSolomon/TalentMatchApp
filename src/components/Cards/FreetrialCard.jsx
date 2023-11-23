import { Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  selectCompleteSteps,
  setCompletedSteps,
  setRoleSelected,
} from "../../statemanager/slices/SignupStepperSlice";
import imageBackground from "../../assets/images/FootballLogo.jpg";

const FreetrialCard = ({ name, roleImage, imageStyle }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTrialNavigation = () => {
    navigate("/create-account/subscribeTrial");
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
        className="chooseARoleCard"
        sx={{
          // background: "pink",
          width: "17%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          paddingTop: "2vh",
          color: "black",
          // backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
          borderRadius: "10px",
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
            // sx={{ color: "white" }}
          >
            Start Trial
          </Button>
        </div>
      </Card>
    </>
  );
};

export default FreetrialCard;
