import {
  CircularProgress,
  Card,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
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
  setProductPackage,
  setSelectedBasicProductArray,
  setSelectedProductArray,
  setUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import {
  selectCurrentBrowserSize,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { productDetails } from "../utils/ProductDetails";

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
  const [basic, setBasic] = useState([]);
  const productIds = productDetails;

  const [fetchCounter, setFetchCounter] = useState(0);
  // state to render loading effect whiles products is being set
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  useEffect(() => {
    const FetchProducts = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const allProducts = [];
      const basicProduct = [];

      try {
        const querySnapshot = await getDocs(q);

        // get all the products
        querySnapshot.forEach(async (doc) => {
          // save them to allProducts array
          allProducts.push({ id: doc.id, data: doc.data() });
          // get and store basic
          if (doc.data().name == "Basic") {
            await basicProduct.push({ id: doc.id, data: doc.data() });
          }
        });

        // set basic state
        await basicProduct.map(async (prods) => {
          const priceSnap = await getDocs(
            collection(db, `products/prod_Ps1JzpXiJ69kzn/prices`)
          );

          priceSnap.forEach((priceDoc) => {
            // setFetchCounter((prevFetchCounter) => prevFetchCounter + 1);
            setBasic((prevProducts) => [
              ...prevProducts,
              {
                name: prods.data.name,
                details: prods.data.details,
                image: prods.data.images,
                price: priceDoc.data().unit_amount,
                interval: priceDoc.data().interval,
                id: prods.id,
                priceId: priceDoc.id,
              },
            ]);

            // disable loading
            setIsProductsLoading(false);
          });
        });

        // set appropriate product
        // set appropriate product
        const selectedIds = allProducts
          .filter((prodId) => prodId?.data.name.includes(roleSelected))
          .map((prodId) => prodId.id);

        // const selectedIds = productIds
        //   .filter((prodId) => prodId.role === roleSelected)
        //   .map((prodId) => prodId.id);

        await allProducts.map(async (prods) => {
          if (selectedIds.includes(prods.id)) {
            const priceSnap = await getDocs(
              collection(db, `products/${prods.id}/prices`)
            );

            priceSnap.forEach((priceDoc) => {
              // console.log({
              //   name: prods.data.name,
              //   image: prods.data.images,
              //   price: priceDoc.data().unit_amount,
              //   interval: priceDoc.data().interval,
              //   id: prods.id,
              //   priceId: priceDoc.id,
              // });
              // set counter to +1
              setFetchCounter((prevFetchCounter) => prevFetchCounter + 1);
              setProducts((prevProducts) => [
                ...prevProducts,
                {
                  name: prods.data.name,
                  details: prods.data.details,
                  image: prods.data.images,
                  price: priceDoc.data().unit_amount,
                  interval: priceDoc.data().interval,
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

  //dispatch products
  useEffect(() => {
    dispatch(setSelectedProductArray(products));
    dispatch(setSelectedBasicProductArray(basic));
  }, [products, basic]);

  const [duration, setDuration] = useState("month");
  const filteredProducts = products?.filter((item) => {
    switch (duration) {
      case "month":
        return item.interval === "month";
      case "year":
        return item.interval === "year";
      default:
        console.warn("Unexpected duration value:", duration);
        return false; // Handle unexpected values gracefully
    }
  });
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
            {/* Duration Switch */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="h4"
                sx={{ color: duration == "year" ? "#5585FE" : null }}>
                Yearly
              </Typography>
              <Switch
                defaultChecked
                inputProps={{ "aria-label": "ant design" }}
                size="large"
                onChange={(event) => {
                  if (event.target.checked == true) {
                    setDuration("month");
                  } else if (event.target.checked == false) {
                    setDuration("year");
                  }
                }}
              />
              <Typography
                variant="h4"
                sx={{ color: duration == "month" ? "#5585FE" : null }}>
                Monthly
              </Typography>
            </Stack>
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
                  dispatch(setProductPackage(selectedProduct.id));

                  // console.log("priceId", priceId, "id:", id);
                  // save price id
                  dispatch(setPriceID(priceId));
                  // save product id
                  dispatch(setProductID(id));
                }}>
                {isProductsLoading == true ? (
                  <div>
                    <CircularProgress />
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <FormControlLabel
                      key={item.price}
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
                            $ {item.price / 100}{" "}
                            {item.interval == "month"
                              ? "Monthly"
                              : item.interval == "year"
                              ? "Yearly"
                              : null}
                          </span>{" "}
                        </div>
                      }
                    />
                  ))
                ) : (
                  <p>No products found for the selected duration.</p>
                )}
                {/* Basic Package */}
                {basic.map((item) => (
                  <FormControlLabel
                    key={item.price}
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
                          $ {item.price / 100}{" "}
                        </span>
                      </div>
                    }
                  />
                ))}
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
            <li style={{ margin: 0 }}>{roleSelected} Membership </li>
            <li style={{ margin: 0 }}>
              {
                products.find((data) => {
                  return data.id === packageValue;
                })?.name
              }
              <span style={{ float: "right", fontWeight: "bolder" }}>
                <Typography variant="h5">
                  {" "}
                  $
                  {packageValue === ""
                    ? 0
                    : (products.find((data) => data.id === packageValue)
                        ?.price ??
                        basic.find((data) => data.id === packageValue)?.price) /
                      100}
                </Typography>
              </span>{" "}
            </li>
          </ul>
          <h5
          //  style={{ color: "#5585FE" }}
          >
            Whats Included
          </h5>
          {packageValue === ""
            ? null
            : (products.find((data) => data.id === packageValue)?.details ??
                basic.find((data) => data.id === packageValue)?.details) && (
                <ul style={{ listStyleType: "disc", ...ulStyle }}>
                  {(
                    (products.find((data) => data.id === packageValue)
                      ?.details ??
                      basic.find((data) => data.id === packageValue)
                        ?.details) ||
                    []
                  ).map((detail) => (
                    <li style={{ margin: 0 }} key={detail}>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

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
