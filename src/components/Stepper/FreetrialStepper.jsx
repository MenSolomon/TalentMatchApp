import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { selectCompleteSteps } from "../../statemanager/slices/SignupStepperSlice";
import { useDispatch, useSelector } from "react-redux";

const steps = [
  "Select your role",
  "Choose a package",
  "Create your account",
  "Confirm details",
];

// export default function FreetrialStepper({stepperValue}) {
//   const navigate = useNavigate();

//   const [activeStep, setActiveStep] = React.useState(stepperValue);
//   const [completed, setCompleted] = React.useState({});

//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? // It's the last step, but not all steps have been completed,
//           // find the first step that has been completed
//           steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

// const handleStep = (step, label) => () => {
//   setActiveStep(step);

//   switch (label) {
//     case "Select your role":
//       navigate("/freetrial");
//       break;
//     case "Choose a package":
//       navigate("/subscribeTrial");
//       break;
//     case "Create your account":
//       // alert("You clicked on 'Create your account'");
//       break;
//     case "Confirm details":
//       alert("You clicked on 'Confirm details'");
//       break;
//     default:
//       // Handle any other cases here
//       break;
//   }
// };

//   const handleComplete = () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   return (
//     <Box sx={{ width: "70%" }}>
//       <Stepper nonLinear activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label} completed={completed[index]}>
//             <StepButton color="inherit" onClick={handleStep(index, label)}>
//               {label}
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {allStepsCompleted() ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Box sx={{ flex: "1 1 auto" }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
//               Step {activeStep + 1}
//             </Typography>
//             {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: '1 1 auto' }} />
//               <Button onClick={handleNext} sx={{ mr: 1 }}>
//                 Next
//               </Button>
//               {activeStep !== steps.length &&
//                 (completed[activeStep] ? (
//                   <Typography variant="caption" sx={{ display: 'inline-block' }}>
//                     Step {activeStep + 1} already completed
//                   </Typography>
//                 ) : (
//                   <Button onClick={handleComplete}>
//                     {completedSteps() === totalSteps() - 1
//                       ? 'Finish'
//                       : 'Complete Step'}
//                   </Button>
//                 ))}
//             </Box> */}
//           </React.Fragment>
//         )}
//       </div>
//     </Box>
//   );
// }

export default function FreetrialStepper({ stepperValue }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  const completedSlice = useSelector(selectCompleteSteps);
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  /// THIS use effect is to change the number of active step when the url changes

  React.useEffect(() => {
    switch (currentUrl) {
      case "/create-account/freetrial":
        setActiveStep(0);
        break;
      case "/create-account/subscribeTrial":
        setActiveStep(1);
        break;
      case "/create-account/user-form":
        setActiveStep(2);
        break;
      case "/create-account/confirm-details":
        setActiveStep(3);
        break;
    }
  }, [currentUrl]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step, label) => () => {
    setActiveStep(step);

    switch (label) {
      case "Select your role":
        navigate("/create-account/freetrial");
        break;
      case "Choose a package":
        navigate("/create-account/subscribeTrial");
        break;
      case "Create your account":
        navigate("/create-account/user-form");

        // alert("You clicked on 'Create your account'");
        break;
      case "Confirm details":
        navigate("/create-account/confirm-details");

        break;
      default:
        // Handle any other cases here
        break;
    }
  };

  const handleComplete = () => {
    const newCompleted = completed;
    console.log(newCompleted, "stepper");
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    console.log(completed, "completed");
    // handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box className="md:w-[70%] sm:w-[50%]" sx={{ color: "black" }}>
      <Stepper sx={{ color: "black" }} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{ color: "black" }}
            completed={completedSlice[index]}
          >
            <StepButton
              style={{ color: "black" }}
              // onClick={handleStep(index, label)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1, fontWeight: "bolder" }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
              <Box sx={{ flex: "1 1 auto" }} />
              {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}
              {activeStep !== steps.length &&
                (completedSlice[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      color: "#5585FE",
                      fontWeight: "bolder",
                    }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  // <Button onClick={handleComplete}>
                  //   {completedSteps() === totalSteps() - 1
                  //     ? "Finish"
                  //     : "Complete Step"}
                  // </Button>

                  ""
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
