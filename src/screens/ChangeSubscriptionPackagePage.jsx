import {
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  CheckCircle,
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import imageBackground from "../assets/images/FootballLogo.jpg";
import facebookLogo from "../assets/images/facebookImage.svg";
import GoogleLogo from "../assets/images/google.svg";
import { useNavigate } from "react-router-dom";
import WorldMaps from "../components/WorldMap";
import logoImage from "../assets/images/AppLogoBlue.png";
import BasicMenu from "../components/Menu/BasicMenu";
import BasicButton from "../components/Buttons/BasicButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCircularLoadBackdropTriggerState,
  selectCurrentBrowserSize,
  setOpenCircularLoadBackdrop,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import ChoosePlanPageDrawer from "../components/Drawer/ChoosePlanPageDrawer";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { productDetails } from "../utils/ProductDetails";
import {
  setPriceID,
  setProductID,
} from "../statemanager/slices/SignupStepperSlice";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";

// This code gets all the products then filters through to display the ones that march the role of the user
// Based on the selected package a stripe checkout is initated

const ChangeSubscriptionPackagePage = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  // state to display loading sign or button
  // const isButtonTriggered = useSelector(selectCircularLoadBackdropTriggerState);
  let browserWidth = parseInt(browserSize?.width, 10);
  // Settings for password input
  const [showPassword, setShowPassword] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  // state to store all products
  const [monthlyPackage, setMonthlyPackage] = useState([]);
  const [yearlyPackage, setYearlyPackage] = useState([]);
  const [basic, setBasic] = useState([]);

  // product details array
  const productIds = productDetails;
  // state to render loading effect whiles products is being set
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  // state to hold the roleSelected
  const [role, setRole] = useState();
  // account id
  const { accountId } = useSelector(selectUserDetailsObject);

  // function to trigger warining modal
  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };
  // UseEffect to get available packages for the role selected
  useEffect(() => {
    const FetchProducts = async () => {
      // get user id
      const currentUser = auth.currentUser;
      const roleRef = await doc(db, `users_db`, accountId);
      const roleSnap = await getDoc(roleRef);
      // get user's role
      const roleSelected = await roleSnap.data().role;
      await setRole(roleSelected);
      console.log(roleSelected);
      try {
        const q = query(
          collection(db, "products"),
          where("active", "==", true)
        );
        const allProducts = [];
        const basicProduct = [];
        const productRoles = [];
        const querySnapshot = await getDocs(q);

        // get all the products
        querySnapshot.forEach(async (doc) => {
          // save them to allProducts array
          allProducts.push({ id: doc.id, data: doc.data() });
          // get all the procut names and save into the product roles array
          productRoles.push({ id: doc.id, name: doc.data().name });

          // get and store basic
          if (doc.data().name == "Basic") {
            await basicProduct.push({ id: doc.id, data: doc.data() });
          }
        });

        // get the products that correspond to the role
        const selectedIds = [];

        productRoles
          .filter(({ name }) => name.includes(roleSelected))
          .forEach(({ id }) => selectedIds.push(id));

        // check the user's role with the roles in productsDetails file and get the products for that role
        selectedIds
          .filter((prodId) => prodId.role === roleSelected)
          .map((prodId) => prodId.id);
        // check the allProducts array and get the contents of the product/prices collection
        allProducts.map(async (prods) => {
          if (selectedIds.includes(prods.id)) {
            const priceSnap = await getDocs(
              collection(db, `products/${prods.id}/prices`)
            );

            priceSnap.forEach((priceDoc) => {
              // set counter to +1
              setFetchCounter((prevFetchCounter) => prevFetchCounter + 1);
              if (priceDoc.data().interval == "month") {
                setMonthlyPackage((prevProducts) => [
                  ...prevProducts,
                  {
                    name: prods.data.name,
                    image: prods.data.images,
                    price: priceDoc.data().unit_amount,
                    id: prods.id,
                    priceId: priceDoc.id,
                    description: prods.data.description,
                    details: prods.data.details,
                  },
                ]);
              } else if (priceDoc.data().interval == "year") {
                setYearlyPackage((prevProducts) => [
                  ...prevProducts,
                  {
                    name: prods.data.name,
                    image: prods.data.images,
                    price: priceDoc.data().unit_amount,
                    id: prods.id,
                    priceId: priceDoc.id,
                    description: prods.data.description,
                    details: prods.data.details,
                  },
                ]);
              }

              // disable loading
              setIsProductsLoading(false);
              // console.log({
              //   name: prods.data.name,
              //   image: prods.data.images,
              //   price: priceDoc.data().unit_amount,
              //   id: prods.id,
              //   priceId: priceDoc.id,
              //   description: prods.data.description,
              //   details: prods.data.details,
              // });
            });
          }
        });

        // set basic state
        await basicProduct?.map(async (prods) => {
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (fetchCounter == 0) {
      FetchProducts();
    }
  }, []);

  // function to initiate stripe checkout
  const StripeCheckout = async (productID, priceID) => {
    // console.log("priceId", priceID, "productID:", productID);
    // get user id
    const currentUser = await auth.currentUser;
    // save price id
    dispatch(setPriceID(priceID));
    // save product id
    dispatch(setProductID(productID));
    const usersDbRef = collection(db, "users_db");
    const currentUserDocRef = doc(usersDbRef, accountId);

    // stripe db actions
    const checkoutSessionsCollectionRef = collection(
      currentUserDocRef,
      "checkout_sessions"
    );

    const newCheckoutSessionDocRef = await addDoc(
      checkoutSessionsCollectionRef,
      {
        price: priceID,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // update the product and price ids in the user db
    await updateDoc(currentUserDocRef, {
      subscriptionPackage: productID,
      subscriptionPrice: priceID,
    });

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(newCheckoutSessionDocRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occurred: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  };

  const [duration, setDuration] = useState("monthly");
  return (
    <div
      className="md:w-[100%] md:h-[100vh] md:flex md:flex-col  
      sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col 
      "
      style={{
        // width: "100%",
        // height: "100vh",
        // backgroundImage: linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(255,255,255,1) 100%),url("${imageBackground}"),
        backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: "blue",
        backgroundRepeat: "no-repeat",
        // display: "flex",
        // flexDirection: "column",
        // padding: "2vw",
        // paddingLeft: "3vw",
        // padding: "3vw",
        color: "white",
        overflow: "scroll",
        paddingBottom: "3vh",
      }}
    >
      {/* className="md:block sm:hidden" */}
      {/* NAVIGATION AREA */}
      <div
        className="md:block md:w-[12.5vh] sm:hidden md:w-[5.5vh] "
        style={{
          position: "fixed",
          paddingTop: "2.5vh",
          zIndex: "1000",
          width: "98%",

          display: "flex",
          // backgroundImage: linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}"),
          background:
            "linear-gradient(90deg, rgba(32,32,32,0.995210066936931) 0%, rgba(55,54,54,0.9980111873851103) 34%, rgba(23,21,21,1) 100%)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          paddingLeft: "3vw",
          paddingRight: "3vw",
          // background: "red",
        }}
      >
        {/* LOGO AREA */}

        {browserWidth >= 1024 ? (
          <div
            className="md:block sm:hidden"
            style={{ flex: ".15", display: "flex" }}
          >
            {" "}
            <img style={{ width: "120px" }} src={logoImage} />
            {/* <Avatar
    src="/static/images/avatar/1.jpg"
    style={{ background: "blue", color: "blue" }}
  >
    r
  </Avatar>{" "}
  <h4 style={{ marginLeft: ".7vw", marginTop: "1vh" }}>Talent Match</h4> */}
          </div>
        ) : (
          ""
        )}

        {/* MENU ITEMS */}

        {browserWidth >= 1024 ? (
          <div style={{ flex: ".55", display: "flex" }}></div>
        ) : (
          <div style={{ flex: ".55", display: "flex" }}>
            {" "}
            <ChoosePlanPageDrawer />{" "}
          </div>
        )}

        {/* FREE TRIAL BUTTON */}
        {browserWidth >= 1024 ? (
          <div
            className="md:block sm:hidden"
            style={{
              flex: ".3",

              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "1vh",
            }}
          >
            <Button
              onClick={() => {
                Navigate(-1);
              }}
              sx={{
                background: "#5585FE",
                width: "10vw",
                height: "7vh",
                color: "white",
                textTransform: "none",
                borderRadius: "1.2vw",
              }}
            >
              Go Back
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* BODY AREA */}
      <div className="sm:mt-[5vh] md:mt-[10vh]" style={{ flex: ".9" }}>
        {/* CREATE ACCOUNT SECTION */}

        {/* // Container housiong the header information  */}
        <div
          className="md:h-[30vh] md:flex-row md:w-[100%] md:flex    
          sm:h-[50vh] sm:w-[100%] sm:flex sm:flex-col
          "
          style={
            {
              // height: "60vh",
              // width: "100%",
              // display: "flex",
              // background: "green",
            }
          }
        >
          <div
            style={{
              flex: ".55",
              paddingTop: "0vh",
              // background: "blue",
            }}
          >
            <div
              className="md:h-[100%] md:w-[100%]"
              style={{
                // width: "100%",
                // height: "100%",
                padding: "4vw",
                paddingLeft: "12vw",
                //   textAlign: "center",
              }}
            >
              <h1 style={{ display: "flex" }}>
                {" "}
                <img
                  src={logoImage}
                  style={{ width: "160px", marginRight: "2vw" }}
                />{" "}
                |{role}
              </h1>

              <h1 className="sm:text-[2.2em]  md:text-[3em]">
                Choose the plan that <br /> best suits your needs.
              </h1>
              <h4
                className="sm:font-lighter sm:text-[1em]  md:text-[1.2em] md:font-lighter"
                // style={{ fontWeight: "lighter" }}
              >
                {" "}
                Our pricing is designed to help you get the most of your talent
                meet experience.
              </h4>
            </div>
          </div>
          {/* SOCIAL MEDIA SECTIONS / EMPTY SECTIOn */}
        </div>

        {/* SUBSCRIPTION CARDS */}

        <div
          className="md:w-[100%] md:h-[120vh]    sm:w-[100%] sm:h-[120vh]"
          style={{
            // width: "100%",
            // height: "120vh",
            // background: "red",
            paddingTop: "20vh",
          }}
        >
          {/* CARD */}
          <h1 style={{ textAlign: "center" }}> Choose your Plan </h1>
          <h3 style={{ textAlign: "center" }}>
            {" "}
            Unlock powerful features as a {role}
          </h3>
          <div className="flex justify-center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="h4"
                sx={{ color: duration == "yearly" ? "#5585FE" : null }}
              >
                Yearly
              </Typography>
              <Switch
                defaultChecked
                inputProps={{ "aria-label": "ant design" }}
                size="large"
                onChange={(event) => {
                  if (event.target.checked == true) {
                    setDuration("monthly");
                  } else if (event.target.checked == false) {
                    setDuration("yearly");
                  }
                }}
              />
              <Typography
                variant="h4"
                sx={{ color: duration == "monthly" ? "#5585FE" : null }}
              >
                Monthly
              </Typography>
            </Stack>
          </div>
          {/* Subcscription Cards */}
          {isProductsLoading == true ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            >
              <div
                className="md:flex md:flex-row md:h-[150vh] md:gap-[30px]     
            sm:flex sm:flex-col sm:h-[130vh] sm:gap-[10px]
            "
              >
                {duration == "monthly"
                  ? monthlyPackage.map((item) => (
                      <SubscriptionCard
                        key={item.id}
                        title={item.name}
                        description={item.description}
                        price={item.price / 100}
                        // isButtonTriggered={isButtonTriggered}
                        featuresHighlightArray={item.details}
                        onClick={async () => {
                          // get current uid
                          const currentUser = await auth.currentUser;
                          // alert(accountId);
                          // Check if an active subscription exists
                          const userRef = collection(
                            db,
                            `users_db/${accountId}/subscriptions`
                          );
                          const q = query(
                            userRef,
                            where("status", "==", "active")
                          );
                          const docSnap = await getDocs(q);

                          if (docSnap.size !== 0) {
                            // disable loading sign
                            // dispatch(setOpenCircularLoadBackdrop(false));
                            triggerWarningAlertModal(
                              "An active subscription already exists. \n Cancel the existing one first"
                            );
                          } else {
                            // display loading sign
                            dispatch(setOpenCircularLoadBackdrop(true));
                            StripeCheckout(item.id, item.priceId);
                          }
                        }}
                        // onClick={() => {
                        //   console.log(
                        //     "id:",
                        //     item.id,
                        //     "name:",
                        //     item.name,
                        //     "descr:",
                        //     item.description,
                        //     "price:",
                        //     item.price / 100
                        //   );
                        // }}
                      />
                    ))
                  : yearlyPackage.map((item) => (
                      <SubscriptionCard
                        key={item.id}
                        title={item.name}
                        description={item.description}
                        price={item.price / 100}
                        // isButtonTriggered={isButtonTriggered}
                        featuresHighlightArray={item.details}
                        onClick={async () => {
                          // get current uid
                          const currentUser = await auth.currentUser;
                          // alert(accountId);
                          // Check if an active subscription exists
                          const userRef = collection(
                            db,
                            `users_db/${accountId}/subscriptions`
                          );
                          const q = query(
                            userRef,
                            where("status", "==", "active")
                          );
                          const docSnap = await getDocs(q);

                          if (docSnap.size !== 0) {
                            // disable loading sign
                            // dispatch(setOpenCircularLoadBackdrop(false));
                            triggerWarningAlertModal(
                              "An active subscription already exists. \n Cancel the existing one first"
                            );
                          } else {
                            // display loading sign
                            dispatch(setOpenCircularLoadBackdrop(true));
                            StripeCheckout(item.id, item.priceId);
                          }
                        }}
                        // onClick={() => {
                        //   console.log(
                        //     "id:",
                        //     item.id,
                        //     "name:",
                        //     item.name,
                        //     "descr:",
                        //     item.description,
                        //     "price:",
                        //     item.price / 100
                        //   );
                        // }}
                      />
                    ))}
                {/* Basic */}
                {/* {basic?.map((item) => (
                  <SubscriptionCard
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    price={item.price / 100}
                    // isButtonTriggered={isButtonTriggered}
                    featuresHighlightArray={item.details}
                    onClick={async () => {
                      // get current uid
                      const currentUser = await auth.currentUser;
                      // alert(accountId);
                      // Check if an active subscription exists
                      const userRef = collection(
                        db,
                        `users_db/${accountId}/subscriptions`
                      );
                      const q = query(userRef, where("status", "==", "active"));
                      const docSnap = await getDocs(q);

                      if (docSnap.size !== 0) {
                        triggerWarningAlertModal(
                          "An active subscription already exists. \n Cancel the existing one or wait till the end of billing period"
                        );
                        // disable loading sign
                        // dispatch(setOpenCircularLoadBackdrop(false));
                      } else {
                        // display loading sign
                        dispatch(setOpenCircularLoadBackdrop(true));
                        StripeCheckout(item.id, item.priceId);
                      }
                    }}
                  />
                ))} */}
              </div>
            </div>
          )}
        </div>

        {/* // Footer  */}

        <div
          style={{
            width: "100%",
            height: "55vh",
            // background: "red",
            paddingTop: "30vh",
          }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default ChangeSubscriptionPackagePage;

export const SubscriptionCard = ({
  title,
  description,
  price,
  featuresHighlightArray,
  onClick,
}) => {
  return (
    <Card
      className="uploadPlayerModalCard  md:w-[23vw] md:h-[68vh]   
      sm:w-[70vw] sm:h-[200vh]
      "
      style={{
        // width: "18vw",
        // background: "red",
        fontSize: ".8em",
        // height: "55vh",
        borderRadius: "1vw",
        color: "black",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: ".65vw",
          display: "flex",
          flexDirection: "column",
          gap: ".5vh",
          paddingBottom: "2vh",
        }}
      >
        {/* // NAME DESCRIPTION AND PRICE AREA */}

        <div
          style={{
            flex: ".4",
            // background: "green",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>{title}</h4>
          <span style={{ lineHeight: "1em" }}>
            {/* For personal use and elaboration of the technology */}
            {description}
          </span>
          <h1 style={{ marginTop: "1vh" }}>
            {" "}
            <span style={{ fontSize: ".7em" }}>$</span>
            {price}
          </h1>

          <BasicButton
            onClick={onClick}
            style={{
              width: "100%",
              // marginTop: "2vh",
              marginBottom: "2vh",
            }}
            innerText="Get Started"
          />
        </div>
        {/* // Get Started button and outlined features  */}

        <div style={{ flex: ".6" }}>
          {/* ///features ROw */}

          {featuresHighlightArray &&
            featuresHighlightArray?.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    minHeight: "10%",
                    // background: "blue",
                    marginBottom: ".8vh",
                    display: "flex",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {/* CHECK CIRCLE AREA */}
                  <div style={{ flex: ".15" }}>
                    {" "}
                    <CheckCircle style={{ color: "#5585FE" }} />
                  </div>
                  {/* Message Area */}
                  <div style={{ flex: ".85" }}>{data}</div>
                </div>
              );
            })}
        </div>
      </div>
    </Card>
  );
};
