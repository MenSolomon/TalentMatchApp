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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import BasicButton from "../components/Buttons/BasicButton";
import {
  selectUserSignUpData,
  setUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import { selectCurrentBrowserSize } from "../statemanager/slices/OtherComponentStatesSlice";

const SubscribeTrial = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

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

  // useEffect(() => {
  //   dispatch(
  //     setUserSignUpData({ ...userData, subscriptionPackage: packageValue })
  //   );
  // }, [packageValue]);

  const ulStyle = {
    fontSize: ".9em",
  };

  // Get all products
  const [products, setProducts] = useState([]);
  const productIds = [
    { id: "prod_PaUHk97wgtKo0H", name: "Club Premium Pack", role: "Club" },
    { id: "prod_PaUHRN5h6D6QKA", name: "Club Starter Pack", role: "Club" },
    { id: "prod_PaUF5OfYMdzFMf", name: "Player Starter Pack", role: "Player" },
    { id: "prod_PaUE0WeQlZ2Cbl", name: "Player Premium Pack", role: "Player" },
    { id: "prod_PaUDv3uRDwWYKc", name: "Scout Premium Pack", role: "Scout" },
    { id: "prod_PaUClniIfnFCUO", name: "Scout Starter Pack", role: "Scout" },
    { id: "prod_PaUCj9WT4b4zWI", name: "Coach Starter Pack", role: "Coach" },
    { id: "prod_PaUB3JqrDbTutg", name: "Coach Premium Pack", role: "Coach" },
    { id: "prod_PaUAvtceTmYGJV", name: "Agent Premium Pack", role: "Agent" },
    { id: "prod_PaU961QtG9oT80", name: "Agent Premium Pack", role: "Agent" },
  ];
  useEffect(() => {
    const FetchProducts = () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const allProducts = [];
          allProducts.push(...allProducts, { id: doc.id, data: doc.data() });
          // console.log(doc.id, " => ", doc.data());
          console.log(allProducts);
          setProducts(doc.data());

          // getDocs(collection(doc.ref, "prices")).then((priceSnap) => {
          //   priceSnap.forEach((priceDoc) => {
          //     console.log(priceDoc.id, " => ", priceDoc.data());
          //   });
          // });
        });
      });
    };
    // FetchProducts()
  }, []);

  return (
    <div
      className="md:w-[100%] md:flex-row md:h-[100%] md:flex   
      sm:w-[100%] sm:flex-col sm:h-[100%] sm:flex
      "
      style={{
        // background: "red",
        // width: "100%",
        // height: "100%",
        // display: "flex",
        // gap: "5vw",
        paddingLeft: "4%",
        // flexDirection: "column",
      }}>
      <div
        className="md:flex md:justify-end md:basis-[55%]   sm:flex sm:justify-center sm:basis-[0.5] "
        style={{
          // flex: "0.55",
          // background: "red",
          // display: "flex",
          // justifyContent: "flex-end",
          paddingRight: "10px",
        }}>
        {/* // LEFT PAPER  */}

        <div
          className="md:w-[70%] md:h-[75%] md:flex md:flex-col   
          sm:w-[90%] sm:h-[75%] sm:flex sm:flex-col
          "
          style={
            {
              // width: "70%",
              // height: "75%",
              // display: "flex",
              // flexDirection: "column",
            }
          }>
          <div
            style={{
              flex: "0.5",
              display: "flex",
            }}>
            <div
              style={{
                flex: "0.3",

                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              {/* 

 */}

              {roleSelected === "Player" ? (
                <img src="/PlayerBlue.png" width="70px" height="80px" />
              ) : roleSelected === "Agent" ? (
                <img src="/AgentBlue.png" width="100px" />
              ) : roleSelected === "Coach" ? (
                <img src="/CoachBlue.png" width="100px" />
              ) : roleSelected === "Scout" ? (
                <img src="/ScoutBlue.png" width="100px" />
              ) : roleSelected === "Club" ? (
                <img src="/ClubIconBlue.png" width="100px" />
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
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                <div>
                  <h5 style={{ fontWeight: "bold" }}>
                    Start your free trial for 30 <br /> days
                  </h5>
                  <h5 style={{ fontWeight: "bold" }}>{roleSelected}</h5>
                  <small>
                    Doesn't suit you ?{" "}
                    <span
                      style={{ color: "#5585FE", cursor: "pointer" }}
                      onClick={() => {
                        navigate("/create-account/freetrial");
                      }}>
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
            }}>
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
                }}>
                <FormControlLabel
                  value="Starter Pack"
                  control={<Radio />}
                  label={
                    <div style={{ width: "100%" }}>
                      Starter Pack{" "}
                      <span
                        style={{ marginLeft: "16vw", fontWeight: "bolder" }}>
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
                        style={{ marginLeft: "14vw", fontWeight: "bolder" }}>
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
        className="md:flex md:justify-start   md:basis-[0.5]  sm:flex sm:justify-center"
        style={{
          flex: "0.4",
          // display: "flex",
          // justifyContent: "flex-start",
          // background: "red",
          padding: "10px 10px",
        }}>
        <Card
          className="md:w-[25vw] md:h-[42vh]    sm:w-[100%] sm:h-[30vh] sm:pb-[1.5vh] sm:text-[.85em] "
          sx={{
            // width: "25vw",
            // height: "42vh",
            borderRadius: "5px",
            paddingBottom: "2vh",
            padding: ".5vw",
          }}>
          <h5
          // style={{ color: "#5585FE" }}
          >
            Package Summary
          </h5>
          <ul style={{ width: "90%", ...ulStyle }}>
            {" "}
            <li style={{ margin: 0 }}>
              {roleSelected} Membership{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li style={{ margin: 0 }}>
              {packageValue}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                ${packageValue === "Starter Pack" ? "40" : "100"}
              </span>{" "}
            </li>
          </ul>
          <h5
          //  style={{ color: "#5585FE" }}
          >
            Whats Included
          </h5>
          <ul style={{ listStyleType: "disc", ...ulStyle }}>
            <li style={{ margin: 0 }}>Get full database access</li>
            <li style={{ margin: 0 }}>Get upload one player proile</li>
            <li style={{ margin: 0 }}>Create up to 5 match profiles</li>
          </ul>

          <div
            onClick={() => {
              handleTrialNavigation();
              handleStepsCompleted();

              dispatch(
                setUserSignUpData({
                  ...userData,
                  subscriptionPackage: packageValue,
                })
              );
            }}>
            <BasicButton
              style={{
                width: "90%",
                height: browserWidth >= 1024 ? "" : "4.5vh",
                marginBottom: browserWidth >= 1024 ? "" : "1.5vh",

                marginLeft: "5%",
              }}
              innerText="Start Trial">
              {" "}
            </BasicButton>
          </div>
        </Card>
        <div className="md:hidden sm:h-[9vh] "></div>
      </div>
    </div>
  );
};

export default SubscribeTrial;
