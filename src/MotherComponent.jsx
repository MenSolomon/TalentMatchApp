import { Check, NotificationAdd, Notifications } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";

import logoImage from "./assets/images/AppLogoBlue.png";
import ProfileMenu from "./components/Menu/ProfileMenu";
import SavedFilters from "./components/MenuButtons/SavedFilters";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarButton from "./components/NavBarButtons/NavBarButton";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";
import CreateProfileModal from "./components/Modals/CreateProfileModal";
import UploadPlayer from "./components/Tooltips/UploadPlayer";
import WelcomeMessageModal from "./components/Modals/WelcomeMessageModal";
import {
  selectUserDetailsObject,
  setIsSubscriptionActive,
  setLoginStatus,
  setNextBillingDate,
  setSubscriptionFeatures,
  setUserDetailsObject,
} from "./statemanager/slices/LoginUserDataSlice";
import BasicSnackBar from "./components/Snackbars/BasicSnackbar";
import WarningAlertModal from "./components/Modals/WarningAlertModal";
import Marquee from "react-fast-marquee";
import { selectClubsInDatabase } from "./statemanager/slices/ClubsInDatabaseSlice";
import SmallScreenMenuDrawer from "./components/Drawer/SmallScreenMenuDrawer";
import { selectCurrentScreenSize } from "./statemanager/slices/OtherComponentStatesSlice";
import NotificationsMenu from "./components/Menu/NotificationsMenu";
import {
  selectUserSavedProfiles,
  setUserSavedProfiles,
} from "./statemanager/slices/SavedProfileSlice";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { setPriceID } from "./statemanager/slices/SignupStepperSlice";
import { auth, db } from "./Firebase/Firebase";
import { signOut } from "@firebase/auth";
import AlertSnackBar from "./components/Snackbars/AlertSnackBar";

const MotherComponent = () => {
  const userLoginObject = useSelector(selectUserDetailsObject);
  const usersSavedProfile = useSelector(selectUserSavedProfiles);
  const Navigate = useNavigate();
  // const { savedProfile } = LoginUserDetails;

  const menuButtonsArray = [
    { name: "Home", icon: "home", path: "/" },
    // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
    { name: "none", icon: "none" },
    { name: "Favourite", icon: "favorite", path: "/favorite" },
    // { name: "Community", icon: "people", path: "/community" },
    { name: "News", icon: "comment", path: "/news" },
    {
      name: "Comparison",
      icon: "compare_arrows",
      path: "/player-compare",
    },
  ];

  const menuButtonsArrayTWO2 = [
    { name: "Help", icon: "help", path: "/help" },
    { name: "Settings", icon: "settings", path: "/settings" },
    { name: "Logout", icon: "door_back", path: "/login" },
  ];

  const dispatch = useDispatch();
  const clubsInDatabase = useSelector(selectClubsInDatabase);

  const screenSize = useSelector(selectCurrentScreenSize);

  let screenWidth = parseInt(screenSize?.width, 10);

  // const [themePallette, setThemePallette] = useState({us});

  // const [isSwitched, setIsSwitched] = useState(false);

  const themeProviderObject = useSelector(selectThemeProviderObject);

  const {
    background,
    cardBackground,
    primaryTextColor,
    buttonColor,
    secondaryTextColor,
  } = themeProviderObject;

  const styles = `.playerCard , .field {

    border: 1px solid transparent;
  
    background: linear-gradient(${cardBackground}, ${cardBackground}) padding-box,
      linear-gradient(
          90deg,
          hsla(280, 81%, 58%, 1) 0%,
          hsla(279, 81%, 59%, 1) 3%,
          hsla(276, 79%, 60%, 1) 9%,
          hsla(274, 79%, 60%, 1) 15%,
          hsla(269, 76%, 61%, 1) 15%,
          hsla(271, 77%, 61%, 1) 23%,
          hsla(259, 72%, 62%, 1) 32%,
          hsla(246, 68%, 64%, 1) 49%,
          hsla(226, 67%, 60%, 1) 56%,
          hsla(194, 96%, 42%, 1) 74%,
          hsla(196, 80%, 79%, 1) 100%
        )
        border-box;
  }

  .playerCard{
    color: ${primaryTextColor}
  }
  
  .primaryColor{
    color: ${primaryTextColor}
  }

  .primaryTextColor{
    color: ${primaryTextColor}

  }
  .secondaryTextColor{
    color: ${secondaryTextColor}

  }
  .styleTextColor{
    color: ${buttonColor}

  }

  
  .background{
    background-color: ${background}
  }

  .cardBackground{
    background-color: ${cardBackground}
  }

  .cardBorder{
    border-right:  .2px solid ${
      primaryTextColor !== "black"
        ? "rgba(19, 19, 19, 0.849)"
        : "rgba(54, 54, 54, 0.671)"
    }  ;
    border-bottom: .2px solid ${
      primaryTextColor !== "black"
        ? "rgba(19, 19, 19, 0.849)"
        : "rgba(54, 54, 54, 0.671)"
    }  ;
   
  }

.newsGradient{
  background: linear-gradient(
    270deg,
    hsla(280, 81%, 58%, 1) 0%,
    hsla(279, 81%, 59%, 1) 3%,
    hsla(276, 79%, 60%, 1) 9%,
    hsla(274, 79%, 60%, 1) 15%,
    hsla(269, 76%, 61%, 1) 15%,
    hsla(271, 77%, 61%, 1) 23%,
    hsla(259, 72%, 62%, 1) 32%,
    hsla(246, 68%, 64%, 1) 49%,
    hsla(226, 67%, 60%, 1) 56%,
    hsla(194, 96%, 42%, 1) 74%,
    hsla(196, 80%, 79%, 1) 100%
  );

  opacity:.5
}
  
.css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root {

  color: ${primaryTextColor} !important
}

.nav-link.active {
  color: red;
  font-weight: bold; 
}


.NavBarBtns{
  color: ${buttonColor}
}



.active .NavBarBtns{
  color: white ;
  border-radius: .5vw ;
  background: #5585fe
}

.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root{
  color:${primaryTextColor} !important ;
  background: ${cardBackground} !important
}



.css-7cyndw-MuiFormControl-root-MuiTextField-root {
  border: 1px solid ${primaryTextColor} !important ;
  border-radius: .3vw !important
}


.css-i4bv87-MuiSvgIcon-root{
  color:${primaryTextColor} !important
}
.css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input{
  color:${primaryTextColor} !important
}

.css-1hxdtko-MuiFormLabel-root-MuiInputLabel-root{
  color:${primaryTextColor} !important
}


.css-1wuilmg-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input{
  color:${primaryTextColor} !important
}

.css-1xrtpas-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input{
  color:${primaryTextColor} !important

}


.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
  color:${primaryTextColor} !important

}

.css-1jfokfp-MuiFormLabel-root{
  color:${primaryTextColor} !important

}

.css-114y07-MuiFormLabel-root-MuiInputLabel-root,.css-1hxdtko-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
  color:${primaryTextColor} !important

}

.css-13bx8ye-MuiTableCell-root{
  borderBottom:none  !important
}

.css-18mmw2g-MuiTableCell-root{
  border-bottom:none !important
}

.css-13bx8ye-MuiTableCell-root{
  border-bottom:none !important
}

.css-trft4d-MuiTableCell-root{
  color:${primaryTextColor} !important
}

.css-18mmw2g-MuiTableCell-root{
  color:${primaryTextColor} !important

}
.css-15cg2ol-MuiTableCell-root{
  color:${primaryTextColor} !important

}
.css-1cjzt9h-MuiTableCell-root{
  color:${primaryTextColor} !important
}

.css-1hsflyn-MuiTableCell-root,
.css-1arwt0a-MuiTableCell-root ,.css-1v0znwy-MuiTableCell-root  {
  color:${primaryTextColor} !important
}


.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input{
  color:${primaryTextColor} !important
}

.css-17at8t4-MuiFormLabel-root-MuiInputLabel-root{
  color:${primaryTextColor} !important
}

  `;

  useEffect(() => {
    // Update CSS variables when themeProviderObject changes
    const root = document.documentElement;

    if (themeProviderObject) {
      root.style.setProperty("--background", themeProviderObject.background);
      root.style.setProperty(
        "--cardBackground",
        themeProviderObject.cardBackground
      );
      root.style.setProperty(
        "--primaryTextColor",
        themeProviderObject.primaryTextColor
      );
      root.style.setProperty("--buttonColor", themeProviderObject.buttonColor);
      root.style.setProperty(
        "--secondaryTextColor",
        themeProviderObject.secondaryTextColor
      );
    }
  }, [themeProviderObject]);

  useEffect(() => {
    const { background } = themeProviderObject;

    const body = document.querySelector("body");

    if (body) {
      body.style.background = background;
    }
  }, [themeProviderObject]);

  useEffect(() => {
    // alert("Mother Rendered");
    const currentUser = auth.currentUser;

    if (currentUser) {
      const SubscriptionValidationChecker = async () => {
        const accountId = await currentUser.uid;

        try {
          // get subscription
          const subscriptionsRef = collection(
            db,
            "users_db",
            accountId,
            "subscriptions"
          );

          const queryActiveOrTrialing = query(
            subscriptionsRef,
            where("status", "in", ["trialing", "active"])
          );

          const subscriptionDocPromise = new Promise((resolve, reject) => {
            onSnapshot(queryActiveOrTrialing, async (snapshot) => {
              const doc = snapshot.docs[0];
              const length = snapshot.docs.length;
              if (doc?.data().status === "active") {
                dispatch(setIsSubscriptionActive(true));
                // get end next billing date
                const timestamp = doc.data().current_period_end.seconds;
                const date = await new Date(timestamp * 1000);
                dispatch(setNextBillingDate(date.toDateString()));
                resolve(doc);
              } else if (length == 0) {
                dispatch(setIsSubscriptionActive(false));
                dispatch(setNextBillingDate("N/A"));
                dispatch(
                  setUserDetailsObject({
                    ...userLoginObject,
                    subscriptionPackage: null,
                    subscriptionPrice: null,
                  })
                );
                dispatch(
                  setSubscriptionFeatures({
                    canHideVisibility: false,
                    maxPlayersInAgency: 1,
                    maxProfiles: 1,
                    maxVideosPerPlayer: 1,
                  })
                );
                resolve(null);
              }
            });
          });

          const docData = await subscriptionDocPromise;
          // if an active subscription exist get the product id and store it
          if (docData) {
            // get product id from database if an active
            const productID = await docData.data().items[0].plan.product;
            const priceID = await docData.data().items[0].plan.id;
            // alert(await docData.data().items[0].plan.product);
            //get and store maxProfiles
            const featuresRef = await doc(db, `products/${productID}`);
            const featuresSnap = await getDoc(featuresRef);
            const features = await featuresSnap.data().features;
            const userInfoRef = doc(db, `users_db/${accountId}`);
            // save features to redux
            dispatch(setSubscriptionFeatures(features));
            await updateDoc(userInfoRef, {
              subscriptionPackage: productID,
              subscriptionPrice: priceID,
            });
            // save priceID to redux
            dispatch(setPriceID(priceID));
          } else if (docData == null) {
            // alert("docData null");
            dispatch(
              setSubscriptionFeatures({
                canHideVisibility: false,
                maxPlayersInAgency: 1,
                maxProfiles: 1,
                maxVideosPerPlayer: 1,
              })
            );
            dispatch(setPriceID(null));
          }
        } catch (error) {
          console.log(error);
        }
      };
      SubscriptionValidationChecker();
    } else {
      dispatch(setIsSubscriptionActive(true));
    }
  }, []);

  // Function that listens for any new boost points purchase and applies
  const [boostPointsAlert, setBoostPointsAlert] = useState(false);
  const handleboostPointsAlertClose = () => {
    setBoostPointsAlert(false);
  };
  useEffect(() => {
    const ApplyNewBoostPoints = async () => {
      try {
        // alert("Applying Boost");
        const currentUser = auth.currentUser;
        // alert(currentUser.uid);

        // All Payments query with includes succeeded and failed transcactions
        const paymentsCollectionQuery = query(
          collection(db, `users_db/${currentUser.uid}/payments`),
          where("status", "==", "succeeded")
        );
        const paymentsCollectionSnaphot = await getDocs(
          paymentsCollectionQuery
        );

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
              const succeededPaymentsDoc =
                succeededPaymentsDocSnap?.data()?.ids;
              if (succeededPaymentsDoc) {
                // returns an array of ids
                resolve(succeededPaymentsDoc);
              } else if (
                succeededPaymentsDoc == null ||
                succeededPaymentsDoc == undefined
              ) {
                // returns empty array if this is the first time the user makes a boostPoint purchase
                resolve([]);
              }
            }
          );

          const succeededPaymentsDocResult = await succeededPaymentsDocPromise;
          console.log("succeededPaymentsDocResult", succeededPaymentsDocResult);
          if (
            succeededPaymentsDocResult ||
            succeededPaymentsDocResult == [] ||
            succeededPaymentsDocResult == undefined ||
            succeededPaymentsDocResult == null
          ) {
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

            console.log(
              "latestPaymentPromiseResult",
              latestPaymentPromiseResult
            );

            if (latestPaymentPromiseResult?.length > 0) {
              // Now you can use the purchasedBoostPoints variable accordingly
              addBoostPoints(latestPaymentPromiseResult[0].description);
              setBoostPointsAlert(true);

              // this part sets a new doc if its the users first boost purchase and updates if it's not
              if (succeededPaymentsDocResult?.length == 0) {
                await setDoc(succeededPaymentsDocRef, {
                  ids: arrayUnion(latestPaymentPromiseResult[0].id),
                });
              } else if (succeededPaymentsDocResult?.length > 0) {
                await updateDoc(succeededPaymentsDocRef, {
                  ids: arrayUnion(latestPaymentPromiseResult[0].id),
                });
              }
            } else if (latestPaymentPromiseResult?.length == 0) {
              return null;
            }
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log("ApplyNewBosstPoints", error);
      }
    };
    ApplyNewBoostPoints();
  }, []);
  return (
    <div
      className="md:flex md:flex-col md:h-[112vh] md:w-[100vw] md:pb-[0vh] sm:flex sm:flex-col sm:h-[107vh] sm:w-[100vw] sm:pb-[10vh]"
      style={{
        visibility:
          usersSavedProfile && usersSavedProfile.length > 0
            ? "visible"
            : "hidden",
        // display: "flex",

        // flexDirection: "column",
        // height: "100vh",
        // width: "100vw",
        // background: "red",
        color: primaryTextColor,
        // zIndex: "-3",
      }}>
      {/* //=====  NAVBAR ======= \\ */}
      <div
        className="md:flex md:basis-[11%]  sm:flex sm:basis-[8%]"
        // style={{ flex: ".11", display: "flex" }}
      >
        {/* // Logo Area */}

        <div
          style={{
            flex: ".18",
            paddingTop: "1%",
            display: "grid",
            placeContent: "center",
          }}>
          <div className="sm:block md:hidden">
            <SmallScreenMenuDrawer />{" "}
          </div>
          <img
            className="sm:hidden md:block"
            style={{ width: "110px" }}
            src={logoImage}
          />
          {/* <h4 style={{ marginTop: "2vh" }}>Talent Match</h4> */}
        </div>
        {/* // Search Area? */}
        <div
          style={{
            flex: ".60",
            paddingTop: "1%",
            // paddingLeft: "4vw",
            // background: "red",
            position: "relative",
          }}>
          <Marquee
            // className="sm:hidden md:block"

            speed={35}
            pauseOnClick={true}
            play
            loop={0}
            style={{
              width: "100%",
              position: "absolute",
              display: screenWidth < 1024 ? "none" : "flex",
            }}>
            {clubsInDatabase.map((data, index) => {
              const { clubImage, clubName } = data;
              return (
                <Tooltip key={index} title={clubName}>
                  <Avatar
                    src={clubImage}
                    sx={{ width: 38, height: 38, marginRight: 1.6 }}
                  />
                </Tooltip>
              );
            })}
          </Marquee>
          {/* {LoginUserDetails.accountId} */}

          {/* "#3D2A2F */}
          {/* <SeachBarTextField label={"Search Player"} marginLeft="3vw" />{" "} */}
        </div>
        {/* // profile details Area */}
        <div
          style={{
            // Should be 37
            flex: ".19",
            // background: "yellow",
            paddingTop: "1%",
            paddingLeft: "1.2vw",
            display: "flex",
          }}>
          {/* sx={{ , marginLeft: "1vw", borderBottom: "none" }} */}

          <UploadPlayer
            image={"duo"}
            info="Upload profile"
            studioUrl="/studio/dashboard"
          />

          <LightAndDarkModeSwitch />

          {/* <IconButton sx={{ marginTop: "1vh" }}> */}
          <div
            style={{
              marginTop: "1.5vh",
              marginLeft: "-1vw",
              marginRight: "1vw",
            }}>
            <NotificationsMenu />
          </div>
          {/* </IconButton> */}

          <ProfileMenu
            style={{ borderBottom: "none" }}
            name="Active user name"
          />
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div
        className="md:flex md:basis-[89%]  sm:flex sm:basis-[92%] sm:overflow-y-scroll sm:width-[100vw] "
        style={
          {
            // flex: ".89",
            // display: "flex",
            // background: "green",
            // overflowY: "visible",
          }
        }>
        {/* // NAV ARAEA */}
        <div
          className="md:basis-[18%] md:flex-shrink-0  md:pt-[5vh] md:flex-col md:flex md:block sm:hidden"
          style={
            {
              // flex: ".18",
              // display: "flex",
              // flexDirection: "column",
              // paddingTop: "5vh",
              // background: "yellow",
            }
          }>
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div style={{ flex: ".65", overflowY: "scroll", maxHeight: "45vh" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArray &&
                menuButtonsArray.map((data, index) => {
                  const { name, icon, path } = data;

                  if (name === "none") {
                    // this is to display the accordion list
                    return (
                      <li key={index}>
                        {" "}
                        <SavedFilters />
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <NavBarButton
                          ButtonName={name}
                          path={path}
                          ButtonImage={icon}
                        />
                      </li>
                    );
                  }
                })}
            </ul>
          </div>

          {/* // Navbar Second HALF */}

          <div style={{ flex: ".35" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArrayTWO2 &&
                menuButtonsArrayTWO2.map((data, index) => {
                  const { name, icon, path } = data;

                  if (name === "Logout") {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          dispatch(setLoginStatus(false));
                          dispatch(setIsSubscriptionActive(true));
                          dispatch(setUserDetailsObject({}));
                          dispatch(setUserSavedProfiles([]));
                          dispatch(
                            setSubscriptionFeatures({
                              canHideVisibility: false,
                              maxPlayersInAgency: 1,
                              maxProfiles: 1,
                              maxVideosPerPlayer: 1,
                            })
                          );
                          signOut(auth)
                            .then(() => {
                              Navigate("/login");
                            })
                            .catch((error) => {
                              console.log("error:", error);
                            });
                        }}>
                        <NavBarButton
                          ButtonName={name}
                          ButtonImage={icon}
                          path={path}
                          // buttonStyle={{ color: "#E4E8F9" }}
                        />
                      </li>
                    );
                  }

                  return (
                    <li key={index}>
                      <NavBarButton
                        ButtonName={name}
                        ButtonImage={icon}
                        path={path}
                        // buttonStyle={{ color: "#E4E8F9" }}
                      />
                    </li>
                  );
                })}
            </ul>
            <CreateProfileModal />
          </div>
          {/* Create New Profile Modal */}
        </div>

        {/* // ROUTES SECTION */}
        <div
          className="md:basis-[82%] sm:basis-[100%]"
          style={{
            // flex: ".82",
            padding: "2vh 1.5vw",

            // background: "blue",
          }}>
          <Outlet />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <BasicSnackBar />
      <AlertSnackBar
        open={boostPointsAlert}
        handleClose={handleboostPointsAlertClose}
        severity={"success"}
        icon={Check}
        message={"Boost Point Purchase Successful"}
      />
    </div>
  );
};

export default MotherComponent;
