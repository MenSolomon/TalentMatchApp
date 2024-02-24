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
  setPriceID,
  setProductID,
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
import {
  selectCurrentBrowserSize,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { productDetails } from "../CoachAgentScoutVersion/src/utils/ProductIds";

const SubscribeTrial = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  // RIGHT PAPER FUNCTIONS

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const handleTrialNavigation = () => {
    navigate("/create-account/user-form");
  };

  const completedStepsObject = useSelector(selectCompleteSteps);

  const handleStepsCompleted = () => {
    dispatch(setCompletedSteps({ ...completedStepsObject, 1: true }));
  };

  const [packageValue, setPackage] = useState("");
  const [packageValuePrice, setPackageValuePrice] = useState("");

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
  const productIds = productDetails;

  const [fetchCounter, setFetchCounter] = useState(0);
  // state to render loading effect whiles products is being set
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  // useEffect(() => {
  //   const FetchProducts = async () => {
  //     const q = query(collection(db, "products"), where("active", "==", true));
  //     const allProducts = [];

  //     try {
  //       const querySnapshot = await getDocs(q);

  //       // get all the products
  //       querySnapshot.forEach((doc) => {
  //         // save them to allProducts array
  //         allProducts.push({ id: doc.id, data: doc.data() });
  //       });

  //       const selectedIds = productIds
  //         .filter((prodId) => prodId.role === roleSelected)
  //         .map((prodId) => prodId.id);

  //       const productPromises = allProducts.map(async (prods) => {
  //         if (selectedIds.includes(prods.id)) {
  //           const priceSnap = await getDocs(
  //             collection(db, `products/${prods.id}/prices`)
  //           );

  //           priceSnap.forEach((priceDoc) => {
  //             console.log({
  //               name: prods.data.name,
  //               image: prods.data.images,
  //               price: priceDoc.data().unit_amount,
  //               id: prods.id,
  //             });
  //             // set counter to +1
  //             setFetchCounter(fetchCounter + 1);
  //             setProducts((prevProducts) => [
  //               ...prevProducts,
  //               {
  //                 name: prods.data.name,
  //                 image: prods.data.images,
  //                 price: priceDoc.data().unit_amount,
  //                 id: prods.id,
  //               },
  //             ]);
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   FetchProducts();
  // }, []);

  useEffect(() => {
    const FetchProducts = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const allProducts = [];

      try {
        const querySnapshot = await getDocs(q);

        // get all the products
        querySnapshot.forEach((doc) => {
          // save them to allProducts array
          allProducts.push({ id: doc.id, data: doc.data() });
        });

        const selectedIds = productIds
          .filter((prodId) => prodId.role === roleSelected)
          .map((prodId) => prodId.id);

        const productPromises = allProducts.map(async (prods) => {
          if (selectedIds.includes(prods.id)) {
            const priceSnap = await getDocs(
              collection(db, `products/${prods.id}/prices`)
            );

            priceSnap.forEach((priceDoc) => {
              console.log({
                name: prods.data.name,
                image: prods.data.images,
                price: priceDoc.data().unit_amount,
                id: prods.id,
                priceId: priceDoc.id,
              });
              // set counter to +1
              setFetchCounter((prevFetchCounter) => prevFetchCounter + 1);
              setProducts((prevProducts) => [
                ...prevProducts,
                {
                  name: prods.data.name,
                  image: prods.data.images,
                  price: priceDoc.data().unit_amount,
                  id: prods.id,
                  priceId: priceDoc.id,
                },
              ]);
              // disable loading
              setIsProductsLoading(false);
            });
          }
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (fetchCounter == 0) {
      FetchProducts();
    }
    // Wrap the function in runWithPriority to disable strict mode
    // runWithPriority(NormalPriority, () => {
    //   if (fetchCounter === 0) {
    //     FetchProducts();
    //   }
    // });
  }, []); // Empty dependency array to trigger only on mount

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
                <h6 style={{ fontWeight: "bold" }}>Packages</h6>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Starter Pack"
                name="radio-buttons-group"
                onChange={(e) => {
                  const selectedProduct = JSON.parse(e.target.value);
                  // Access item.id and item.priceid from selectedProduct
                  const { id, priceId } = selectedProduct;

                  setPackage(selectedProduct.id);
                  setPackageValuePrice(selectedProduct.priceId);

                  console.log("priceId", priceId, "id:", id);
                  // save price id
                  dispatch(setPriceID(priceId));
                  // save product id
                  dispatch(setProductID(id));
                }}>
                {isProductsLoading == true ? (
                  <div>Loading...</div>
                ) : (
                  products.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={JSON.stringify({
                        id: item.id,
                        priceId: item.priceId,
                      })}
                      control={<Radio />}
                      label={
                        <div style={{ width: "100%" }}>
                          {item.name}
                          <span
                            style={{
                              marginLeft: "16vw",
                              fontWeight: "bolder",
                            }}>
                            $ {item.price / 100} per Month
                          </span>{" "}
                        </div>
                      }
                    />
                  ))
                )}
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
              {
                products.find((data) => {
                  return data.id === packageValue;
                })?.name
              }
              <span style={{ float: "right", fontWeight: "bolder" }}>
                $
                {packageValue === ""
                  ? 0
                  : products.find((data) => {
                      return data.id === packageValue;
                    })?.price / 100}
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
              console.log("packageValuePrice", packageValuePrice);
              if (packageValue === "") {
                triggerWarningAlertModal("Please select a package");
              } else {
                handleTrialNavigation();
                handleStepsCompleted();

                dispatch(
                  setUserSignUpData({
                    ...userData,
                    subscriptionPackage: packageValue,
                    subscriptionPrice: packageValuePrice,
                  })
                );
              }
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
