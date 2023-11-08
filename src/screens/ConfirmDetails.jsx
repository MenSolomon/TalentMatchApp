import { useNavigate } from "react-router-dom";
import { selectRoleSelected } from "../statemanager/slices/SignupStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Checkbox, FormControlLabel } from "@mui/material";
import PaymentModeSelect from "../components/Selects/PaymentModeSelect";
import BasicButton from "../components/Buttons/BasicButton";
import moment from "moment/moment";
import {
  selectUserSignUpData,
  setUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import { useEffect, useState } from "react";
import {
  selectTempUsersDatabase,
  setTempUsersDatabase,
} from "../statemanager/slices/TempDatabaseSlice";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../Firebase/Firebase";
import { selectUsersDatabase } from "../statemanager/slices/DatabaseSlice";

const ConfirmDetails = () => {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleSelected = useSelector(selectRoleSelected);
  const userData = useSelector(selectUserSignUpData);
  const allUsers = useSelector(selectUsersDatabase);
  const today = moment();
  //
  const [agreement, setAgreement] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const { firstName, surname, DateOfBirth, phoneNumber, email, Nationality } =
    userData;
  // Add one month to the current date
  const oneMonthLater = today.add(1, "months");

  // Now, 'oneMonthLater' contains the date one month from today
  console.log(oneMonthLater.format("MMMM Do YYYY, h:mm a"));

  // const [pa, setPa] = useState("");

  const extractPaymentTypeSelected = (e) => {
    // setPa(e);

    dispatch(setUserSignUpData({ ...userData, paymentType: e }));
  };

  useEffect(() => {
    if (userData.paymentType === "Cards") {
      dispatch(setUserSignUpData({ ...userData, paymentDetails: {} }));
    }
  }, [userData.paymentType]);

  // useEffect(() => {
  //   alert(pa);
  // }, [pa]);

  const handleStartFreeTrial = () => {
    const uuid = uuidv4();
    if (roleSelected === "") {
      alert("Please complete step 1 (Select your role before starting trial");
    } else {
      if (userData.subscriptionPackage === "") {
        alert("Please complete step 2 (Choose a package before starting trial");
      } else {
        if (userData.firstname === "") {
          alert("Please complete step 3 (Create account before starting trial");
        } else {
          if (userData.paymentType === "" || !userData.paymentType) {
            alert("Please select a payment type");
          } else {
            if (agreement === false || privacy === false) {
              alert(
                "please read terms and condition as well as our privacy policy and tick the boxes to agree"
              );
            } else {
              // CHECKING IF THE USER ALREADY EXISTS
              if (allUsers.length > 0) {
                const userExistence = allUsers.filter((data) => {
                  return data.email === userData.email;
                });

                console.log(allUsers, "Existence", userExistence);

                if (userExistence.length > 0) {
                  alert("Account Exists");
                } else {
                  // THis is the part where you finally navigate to login page and accept data
                  // alert("sending data and setting up account for freetrial");

                  dispatch(
                    setTempUsersDatabase([
                      ...allUsers,
                      {
                        ...userData,
                        role: roleSelected,
                        savedProfile: [],
                        accountId: uuid,

                        // dateCreated: serverTimestamp(),
                      },
                    ])
                  );

                  // db function
                  setDoc(doc(db, `users_db`, uuid), {
                    ...userData,
                    role: roleSelected,
                    savedProfile: [],
                    dateCreated: serverTimestamp(),
                    accountId: uuid,
                  });
                  //
                  // dispatch(setLoginStatus(true));
                  // dispatch(setUserDetailsObject(userData));
                  // navigate("/");

                  navigate("/login");
                }
              } else {
                // THIS IS THE PART WHERE THAT HANDLES AN EMPTY DATABASE WHICH WILL BE USED PREFEREABLY ONLY ONCE
                // alert(
                //   "sending first user into our database and setting up account for freetrial"
                // );
                dispatch(
                  setTempUsersDatabase([
                    {
                      ...userData,
                      role: roleSelected,
                      savedProfile: [],
                      accountId: uuid,
                    },
                  ])
                );

                setDoc(doc(db, `users_db`, uuid), {
                  ...userData,
                  role: roleSelected,
                  savedProfile: [],
                  dateCreated: serverTimestamp(),
                  accountId: uuid,
                });
                navigate("/login");
              }
            }
          }
        }
      }
    }
  };

  //

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "0px 6vw",
      }}
    >
      {/*MEMEBERSHIP PLAN HEADER and USER DETAILS SUMMARY */}

      <div
        style={{
          flex: ".7",
          // background: "yellow",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* MEMBERSHIP PLAN HEADER CARD */}
        <div
          style={{
            flex: "0.3",
            display: "flex",
            paddingLeft: "0%",
          }}
        >
          {/* IMAGE AREA */}
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
              <img src="/public/PlayerBlue.png" width="70px" height="80px" />
            ) : roleSelected === "Agent" ? (
              <img src="/public/AgentBlue.png" width="100px" />
            ) : roleSelected === "Coach" ? (
              <img src="/public/CoachBlue.png" width="100px" />
            ) : roleSelected === "Scout" ? (
              <img src="/public/ScoutBlue.png" width="100px" />
            ) : (
              <img alt="No Role selected" width="100px" />
            )}
          </div>
          {/* FREE TRIAL HEADER AND CHANGE MEMBERSHIP OPTION AREA */}
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

        {/* USER DETAILS SUMMARY  */}
        <div
          style={{
            flex: "0.7",
            padding: "1vh 3vw",
            // background: "green",
            display: "flex",
          }}
        >
          {/* // PADDING CONTAINER */}
          <div style={{ flex: ".6", paddingLeft: "8vw" }}>
            <h5 style={{ marginTop: "1vh" }}>
              User details{" "}
              <span
                style={{
                  color: "#5585FE",
                  fontSize: ".7em",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/create-account/user-form");
                }}
              >
                &nbsp; edit
              </span>{" "}
            </h5>

            {/* User FORM */}
            <div>
              <ul
                style={{
                  fontSize: ".9em",
                  listStyleType: "disc",
                  color: "#9FA4B1",
                  fontWeight: "bolder",
                }}
              >
                <li>
                  First name:{" "}
                  <span style={{ color: "black" }}> {firstName} </span>{" "}
                </li>
                <li>
                  Surname: <span style={{ color: "black" }}> {surname} </span>{" "}
                </li>
                <li>
                  Date of birth:{" "}
                  <span style={{ color: "black" }}> {DateOfBirth} </span>{" "}
                </li>
                <li>
                  Email: <span style={{ color: "black" }}> {email} </span>{" "}
                </li>
                <li>
                  Phone number:
                  <span style={{ color: "black" }}> {phoneNumber}</span>{" "}
                </li>
                <li>
                  Nationality:{" "}
                  <span style={{ color: "black" }}> {Nationality} </span>{" "}
                </li>
                <li>
                  {roleSelected === "Player" ? "Club Name" : "Organisation"}
                  <span style={{ color: "black" }}>
                    {" "}
                    {roleSelected === "Player"
                      ? userData?.club
                      : userData?.organization}{" "}
                  </span>{" "}
                </li>
              </ul>
            </div>
          </div>

          <div style={{ flex: ".4" }}>
            <h5 style={{ marginTop: "1vh" }}>Add payment</h5>

            <PaymentModeSelect paymentType={extractPaymentTypeSelected} />
          </div>
        </div>
      </div>
      {/* // INVOICE SUMMARY , PAYMENT MODE , TERMS AND CONDITION */}

      <div style={{ flex: ".3" }}>
        {/* ORDER CONFIRMATION CARD */}

        <h5>Terms and conditions</h5>

        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(e) => {
                setAgreement(e.target.checked);
              }}
            />
          }
          label={
            <div style={{ fontSize: ".8em" }}>
              {" "}
              I agree with the{" "}
              <span style={{ color: "#5585FE" }}>
                terms and conditions
              </span>{" "}
            </div>
          }
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(e) => {
                setPrivacy(e.target.checked);
              }}
            />
          }
          label={
            <div style={{ fontSize: ".8em" }}>
              {" "}
              I accept Talent Match's
              <span style={{ color: "#5585FE" }}> privacy policy</span>{" "}
            </div>
          }
        />
        <Card
          sx={{
            width: "84%",
            height: "68%",
            padding: ".5vw",
            marginTop: "3vh",
          }}
        >
          <h6 style={{ fontWeight: "bolder" }}>Package Summary</h6>

          <ul style={{ width: "90%", fontSize: ".8em" }}>
            {" "}
            <li>
              {roleSelected} membership{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li>
              {userData.subscriptionPackage}{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                {userData.subscriptionPackage === "Starter Pack"
                  ? "$40"
                  : userData.subscriptionPackage === "Premium Pack"
                  ? "$100"
                  : ""}
              </span>{" "}
            </li>
            <li>
              Subscription total{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                {userData.subscriptionPackage === "Starter Pack"
                  ? "$40"
                  : userData.subscriptionPackage === "Premium Pack"
                  ? "$100"
                  : ""}
              </span>{" "}
            </li>
            <li>
              Tax{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li>
              Discount{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li style={{ fontSize: "1.4em" }}>
              Total{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                {" "}
                {userData.subscriptionPackage === "Starter Pack"
                  ? "$40"
                  : userData.subscriptionPackage === "Premium Pack"
                  ? "$100"
                  : ""}
              </span>{" "}
            </li>{" "}
          </ul>

          {/* div to handle Click of start free trial */}
          <div onClick={handleStartFreeTrial}>
            <BasicButton
              style={{ width: "90%", marginLeft: "5%" }}
              innerText="Start Trial"
            ></BasicButton>
          </div>
          <span
            style={{
              fontSize: ".7em",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {" "}
            You will be automatically charged or prompted to pay on{" "}
            {oneMonthLater.format("MMMM Do YYYY, h:mm a")} after trial end{" "}
          </span>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmDetails;
