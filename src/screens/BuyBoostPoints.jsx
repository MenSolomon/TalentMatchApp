import { Button, Card, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import imageBackground from "../assets/images/FootballLogo.jpg";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/images/AppLogoBlue.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentBrowserSize,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import ChoosePlanPageDrawer from "../components/Drawer/ChoosePlanPageDrawer";
import {
  FieldValue,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { productDetails } from "../utils/ProductDetails";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";
import { getFunctions, httpsCallable } from "firebase/functions";

// This code gets all the products then filters through to display the ones that march the role of the user
// Based on the selected package a stripe checkout is initated

const BuyBoostPoints = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // Settings for password input
  const [showPassword, setShowPassword] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  // state to store all products
  const [boostProducts, setBoostProducts] = useState([]);

  // product details array
  const productIds = productDetails;
  // state to render loading effect whiles products is being set
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  // state to display loading sign or button
  const [isButtonTriggered, setIsButtonTriggered] = useState(false);

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

      try {
        const q = query(
          collection(db, "products"),
          where("active", "==", true)
        );
        const allBoostProducts = [];
        const filteredProducts = [];
        const querySnapshot = await getDocs(q);

        // get all the products

        querySnapshot.forEach(async (doc) => {
          const product = {
            id: doc.id,
            data: doc.data(),
            name: doc.data().name,
          };
          allBoostProducts.push(product); // Save all products for potential use elsewhere
        });

        // Filter based on specific IDs (replace with your filtering logic)
        allBoostProducts
          .filter(({ name }) => name.includes("Boost Points"))
          .forEach((boostProduct) => filteredProducts.push(boostProduct));

        // Use filteredProducts for further processing or rendering
        console.log("filteredProducts", filteredProducts); // Example usage

        // check the allBoostProducts array and get the contents of the product/prices collection
        const promises = filteredProducts.map(async (prods) => {
          const priceSnap = await getDocs(
            collection(db, `products/${prods.id}/prices`)
          );

          const products = [];
          for (const priceDoc of priceSnap.docs) {
            products.push({
              name: prods.data.name,
              image: prods.data.images,
              price: priceDoc.data().unit_amount,
              id: prods.id,
              priceId: priceDoc.id,
              description: prods.data.description,
              details: prods.data.details,
            });
          }

          return products;
        });

        // Wait for all promises to resolve
        const resolvedProducts = await Promise.all(promises);

        // Flatten the array and update the state
        const flattenedProducts = resolvedProducts.flat();
        setBoostProducts(flattenedProducts);

        // disable loading
        setIsProductsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (fetchCounter === 0) {
      FetchProducts();
    }
  }, [fetchCounter]);

  // function to initiate stripe checkout
  const StripeBoostPointsCheckout = async (priceID) => {
    // console.log("priceId", priceID, "productID:", productID);
    // get user id
    const currentUser = await auth.currentUser;

    // STRIPE REF
    const usersDbRef = collection(db, "users_db");
    const currentUserDocRef = doc(usersDbRef, currentUser.uid);

    // stripe db actions
    const checkoutSessionsCollectionRef = collection(
      currentUserDocRef,
      "checkout_sessions"
    );

    const newCheckoutSessionDocRef = await addDoc(
      checkoutSessionsCollectionRef,
      {
        price: priceID,
        mode: "payment",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    const newCheckoutSessionPromise = new Promise((resolve) => {
      onSnapshot(newCheckoutSessionDocRef, async (snap) => {
        // trigger the callable here
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
        resolve(snap.data());
      });
    });

    // PAYMENTS SNAPSHOT
    const newCheckoutSessionPromiseResult = await newCheckoutSessionPromise;
    if (newCheckoutSessionPromiseResult) {
      const currentUser = auth.currentUser;
      // All Payments query with includes succeeded and failed transcactions
      const paymentsCollectionQuery = query(
        collection(db, `users_db/${currentUser.uid}/payments`),
        where("status", "==", "succeeded")
      );
      const paymentsCollectionSnaphot = await getDocs(paymentsCollectionQuery);

      //succeededPayments doc with includes id of only succeeded transcactions
      const succeededPaymentsDocRef = doc(
        db,
        `users_db/${currentUser.uid}/succeededPayments`,
        "paymentIds"
      );

      // add BoostPoints Fn
      const addBoostPoints = async (description) => {
        let purchasedBoostPoints;

        switch (description) {
          case "500 Boost Points":
            purchasedBoostPoints = 500;
            break;
          case "100 Boost Points":
            purchasedBoostPoints = 100;
            break;
          default:
            // Handle other cases if needed
            break;
        }
        try {
          const userRef = doc(db, `users_db/${currentUser.uid}`);
          await updateDoc(userRef, {
            boostPoints: increment(purchasedBoostPoints),
          });
        } catch (error) {
          console.log(error);
        }
      };

      try {
        const succeededPaymentsDocPromise = new Promise(
          async (resolve, reject) => {
            const succeededPaymentsDocSnap = await getDoc(
              succeededPaymentsDocRef
            );
            const succeededPaymentsDoc = succeededPaymentsDocSnap?.data().ids;
            // returns an array of ids
            resolve(succeededPaymentsDoc);
            // returns null if this is the first time the user makes a boostPoint purchase
            reject([]);
          }
        );

        const succeededPaymentsDocResult = await succeededPaymentsDocPromise;

        if (succeededPaymentsDocResult) {
          // Filter documents by status and price type
          const boostPointsPayments = [];
          for (const doc of paymentsCollectionSnaphot.docs) {
            const payment = doc.data();
            if (
              payment.items &&
              payment.items.length > 0 &&
              payment.items[0].price
            ) {
              const type = payment.items[0].price.type;
              if (payment.status === "succeeded" && type === "one_time") {
                boostPointsPayments.push(payment.items);
              }
            }
          }

          const boostPointsPaymentsDestructured = [];

          for (const itemsArray of boostPointsPayments) {
            // Assuming itemsArray is an array containing objects like the one you provided
            for (const item of itemsArray) {
              boostPointsPaymentsDestructured.push(item);
            }
          }

          // });
          // Check if any of the boostPointsPaymentsDestructured ids are in succeededPaymentsDocResult as a Promise
          const latestPaymentPromise = new Promise((resolve) => {
            const latestPayment = [];
            for (const item of boostPointsPaymentsDestructured) {
              if (!succeededPaymentsDocResult.includes(item.id)) {
                latestPayment.push(item);
              }
            }
            resolve(latestPayment);
          });

          const latestPaymentPromiseResult = await latestPaymentPromise;

          // console.log(latestPaymentPromiseResult[0].description);

          if (latestPaymentPromiseResult != []) {
            // Now you can use the purchasedBoostPoints variable accordingly
            addBoostPoints(latestPaymentPromiseResult[0].description);

            await updateDoc(succeededPaymentsDocRef, {
              ids: arrayUnion(latestPaymentPromiseResult[0].id),
            });
          } else if (latestPaymentPromiseResult == []) {
            return null;
          }
          // add boost points li_1P3bFSDkt4D42P0jenhKoxx2
          //add that id to succededPayments collection
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      }}>
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
        }}>
        {/* LOGO AREA */}

        {browserWidth >= 1024 ? (
          <div
            className="md:block sm:hidden"
            style={{ flex: ".15", display: "flex" }}>
            {" "}
            <img style={{ width: "120px" }} src={logoImage} />
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
            }}>
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
              }}>
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
          }>
          <div
            style={{
              flex: ".55",
              paddingTop: "0vh",
              // background: "blue",
            }}>
            <div
              className="md:h-[100%] md:w-[100%]"
              style={{
                // width: "100%",
                // height: "100%",
                padding: "4vw",
                paddingLeft: "12vw",
                //   textAlign: "center",
              }}>
              <h1 style={{ display: "flex" }}>
                {" "}
                <img
                  src={logoImage}
                  style={{ width: "160px", marginRight: "2vw" }}
                />{" "}
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
          }}>
          {/* CARD */}
          <h1 style={{ textAlign: "center" }}> Choose your Plan </h1>
          <h3 style={{ textAlign: "center" }}>
            {" "}
            Unlock powerful features as a
          </h3>

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
              }}>
              <div
                className="md:flex md:flex-row md:h-[150vh] md:gap-[30px]     
            sm:flex sm:flex-col sm:h-[130vh] sm:gap-[10px]
            ">
                {boostProducts.map((item) => (
                  <BoostPointCard
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    price={item.price / 100}
                    isButtonTriggered={isButtonTriggered}
                    featuresHighlightArray={item.details}
                    onClick={async () => {
                      StripeBoostPointsCheckout(item.priceId);
                    }}
                    // onClick={async () => {
                    //   // display loading sign
                    //   // setIsButtonTriggered(true);
                    //   // StripeBoostPointsCheckout(item.priceId);

                    //   const currentUser = auth.currentUser;
                    //   // All Payments query with includes succeeded and failed transcactions
                    //   const paymentsCollectionQuery = query(
                    //     collection(db, `users_db/${currentUser.uid}/payments`),
                    //     where("status", "==", "succeeded")
                    //   );
                    //   const paymentsCollectionSnaphot = await getDocs(
                    //     paymentsCollectionQuery
                    //   );

                    //   //succeededPayments doc with includes id of only succeeded transcactions
                    //   const succeededPaymentsDocRef = doc(
                    //     db,
                    //     `users_db/${currentUser.uid}/succeededPayments`,
                    //     "paymentIds"
                    //   );

                    //   // add BoostPoints Fn
                    //   const addBoostPoints = async (description) => {
                    //     let purchasedBoostPoints;

                    //     switch (description) {
                    //       case "500 Boost Points":
                    //         purchasedBoostPoints = 500;
                    //         break;
                    //       case "100 Boost Points":
                    //         purchasedBoostPoints = 100;
                    //         break;
                    //       default:
                    //         // Handle other cases if needed
                    //         break;
                    //     }
                    //     try {
                    //       const userRef = doc(
                    //         db,
                    //         `users_db/${currentUser.uid}`
                    //       );
                    //       await updateDoc(userRef, {
                    //         boostPoints: increment(purchasedBoostPoints),
                    //       });
                    //     } catch (error) {
                    //       console.log(error);
                    //     }
                    //   };

                    //   try {
                    //     const succeededPaymentsDocPromise = new Promise(
                    //       async (resolve, reject) => {
                    //         const succeededPaymentsDocSnap = await getDoc(
                    //           succeededPaymentsDocRef
                    //         );
                    //         const succeededPaymentsDoc =
                    //           succeededPaymentsDocSnap?.data().ids;
                    //         // returns an array of ids
                    //         resolve(succeededPaymentsDoc);
                    //         // returns null if this is the first time the user makes a boostPoint purchase
                    //         reject([]);
                    //       }
                    //     );

                    //     const succeededPaymentsDocResult =
                    //       await succeededPaymentsDocPromise;

                    //     if (succeededPaymentsDocResult) {
                    //       // Filter documents by status and price type
                    //       const boostPointsPayments = [];
                    //       for (const doc of paymentsCollectionSnaphot.docs) {
                    //         const payment = doc.data();
                    //         if (
                    //           payment.items &&
                    //           payment.items.length > 0 &&
                    //           payment.items[0].price
                    //         ) {
                    //           const type = payment.items[0].price.type;
                    //           if (
                    //             payment.status === "succeeded" &&
                    //             type === "one_time"
                    //           ) {
                    //             boostPointsPayments.push(payment.items);
                    //           }
                    //         }
                    //       }

                    //       const boostPointsPaymentsDestructured = [];

                    //       for (const itemsArray of boostPointsPayments) {
                    //         // Assuming itemsArray is an array containing objects like the one you provided
                    //         for (const item of itemsArray) {
                    //           boostPointsPaymentsDestructured.push(item);
                    //         }
                    //       }
                    //       // console.log(boostPointsPaymentsDestructured);
                    //       // });
                    //       // Check if any of the boostPointsPaymentsDestructured ids are in succeededPaymentsDocResult as a Promise
                    //       const latestPaymentPromise = new Promise(
                    //         (resolve) => {
                    //           const latestPayment = [];
                    //           for (const item of boostPointsPaymentsDestructured) {
                    //             if (
                    //               !succeededPaymentsDocResult.includes(item.id)
                    //             ) {
                    //               latestPayment.push(item);
                    //             }
                    //           }
                    //           resolve(latestPayment);
                    //         }
                    //       );

                    //       const latestPaymentPromiseResult =
                    //         await latestPaymentPromise;

                    //       console.log(latestPaymentPromiseResult[0].id);
                    //       await updateDoc(succeededPaymentsDocRef, {
                    //         ids: arrayUnion(latestPaymentPromiseResult[0].id),
                    //       });
                    //       // if (latestPaymentPromiseResult != []) {
                    //       //   // Now you can use the purchasedBoostPoints variable accordingly
                    //       //   addBoostPoints(
                    //       //     latestPaymentPromiseResult[0].description
                    //       //   );

                    //       //   await updateDoc(succeededPaymentsDocRef, {
                    //       //     ids: arrayUnion(latestPaymentPromiseResult[0].id),
                    //       //   });
                    //       // } else if (latestPaymentPromiseResult == []) {
                    //       //   return null;
                    //       // }
                    //       // add boost points li_1P3bFSDkt4D42P0jenhKoxx2
                    //       //add that id to succededPayments collection
                    //     }
                    //   } catch (error) {
                    //     console.log(error);
                    //   }
                    // }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyBoostPoints;

export const BoostPointCard = ({
  title,
  description,
  price,
  featuresHighlightArray,
  onClick,
  isButtonTriggered,
}) => {
  return (
    <Card
      sx={{
        width: "18vw",
        height: "55vh",
        borderRadius: "1vw",
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
      }}>
      {/* NAME DESCRIPTION AND PRICE AREA */}
      <div>
        <h4>{title}</h4>
        <p style={{ lineHeight: "1.2em" }}>{description}</p>
        <h1 style={{ marginTop: "1vh" }}>
          <span style={{ fontSize: ".7em", marginRight: "0.2em" }}>$</span>
          {price}
        </h1>
      </div>

      {/* Get Started Button */}
      <div>
        {isButtonTriggered ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <Button
            onClick={onClick}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: "1rem" }}>
            Get Started
          </Button>
        )}
      </div>

      {/* Features */}
      <div>
        {featuresHighlightArray &&
          featuresHighlightArray?.map((data, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: ".8vh",
              }}>
              <CheckCircleIcon
                sx={{ color: "#5585FE", marginRight: "0.5rem" }}
              />
              <span>{data}</span>
            </div>
          ))}
      </div>
    </Card>
  );
};
