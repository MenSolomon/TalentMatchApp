import { Button, TextField } from "@mui/material";
import logoImage from "../assets/images/AppLogoBlue.png";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useEffect, useState } from "react";
import CountrySelect from "../components/Autocompletes/CountrySelect";
import BasicButton from "../components/Buttons/BasicButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompleteSteps,
  selectRoleSelected,
  setCompletedSteps,
} from "../statemanager/slices/SignupStepperSlice";
import { useForm } from "react-hook-form";
import {
  selectUserSignUpData,
  setUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import DatePickerTool from "../components/DatePicker/DatePicker";
import ClubAutoComplete from "../components/Autocompletes/ClubAutoComplete";
import { setThemeProviderToLightMode } from "../statemanager/slices/ThemeProviderSlice";
import { selectClubsInDatabase } from "../statemanager/slices/ClubsInDatabaseSlice";
import BasicAutoComplete from "../components/Autocompletes/BasicAutoComplete";
import BasicSlider from "../CoachAgentScoutVersion/src/components/slider/BasicSlider";
import GroupedRadio from "../components/Radio/GroupedRadio";
import BasicSelect from "../components/Selects/BasicSelect";
import {
  selectCurrentBrowserSize,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";

const CreateAccount = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  const soccerPositions = [
    "Goalkeeper (GK)",
    "Defender (D)",
    "Center Back (CB)",
    "Full-back (FB)",
    "Wing-back (WB)",
    "Midfielder (MF)",
    "Central Midfielder (CM)",
    "Defensive Midfielder (CDM)",
    "Attacking Midfielder (CAM)",
    "Wide Midfielder (WM)",
    "Forward (F)",
    "Striker (ST)",
    "Center Forward (CF)",
    "Winger (W)",
  ];

  const preferredFootArray = ["Left", "Right", "Both"];

  const [phoneNumber, setPhoneNumber] = useState("");

  const userFormDataWithOnlySubscriptionPackage =
    useSelector(selectUserSignUpData);
  const roleSelected = useSelector(selectRoleSelected);

  const { subscriptionPackage, paymentType } =
    userFormDataWithOnlySubscriptionPackage;

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // alert(value);
  };

  // FUNCTIONS FOR MOVING FROM ACCOUNT PAGE TO CONFIRM DETAILS PAGE
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTrialNavigation = () => {
    navigate("/create-account/confirm-details");
  };

  const completedStepsObject = useSelector(selectCompleteSteps);

  const handleStepsCompleted = () => {
    dispatch(setCompletedSteps({ ...completedStepsObject, 2: true }));
  };

  const [CountryCode, setCountryCode] = useState("");

  const [Nationality, setNationality] = useState("");
  const [selectedClubName, setSelectedClubName] = useState("");
  const [DOB, setDOB] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [PlayerPosition, setPlayerPosition] = useState("");
  const [height, setHeight] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");

  const handleClubSelect = (selectedClubName) => {
    // Do something with the selected clubName
    // alert(selectedClubName);
    setSelectedClubName(selectedClubName);
    // console.log("Selected club:", selectedClubName);
  };
  const clubsInDatabase = useSelector(selectClubsInDatabase);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const onSubmit = (formData, e) => {
    e.preventDefault();
    console.log(formData);
    const {
      firstName,
      surname,
      organization,
      // phoneNumber,
      email,
      password,
      confirmPassword,
    } = formData;

    const userData = {
      firstName,
      surname,
      DateOfBirth: DOB.toString(),
      // DOB,
      ...(roleSelected === "Player"
        ? ""
        : roleSelected === "Club"
        ? { club: selectedClubName }
        : { organization }),
      phoneNumber: "",
      email,
      Nationality,
      password,
      CountryCode,
    };

    const userDataForPlayer = {
      firstName,
      surname,
      DateOfBirth: DOB.toString(),
      phoneNumber: "",
      email,
      Nationality,
      CountryCode,
      password,
      height,
      PlayerPosition,
      preferredFoot,
    };

    if (Nationality === "" || Nationality === "False") {
      setNationality("False");
    }

    if (DOB === "" || DOB === "False") {
      setDOB("False");
    }

    if (password !== confirmPassword) {
      setPasswordMatch("False");
    }

    if (roleSelected === "Player") {
      if (height === "" || height === "False") {
        setHeight("False");
      }
      if (preferredFoot === "" || preferredFoot === "False") {
        setPreferredFoot("False");
      }
      if (PlayerPosition === "" || PlayerPosition === "False") {
        setPlayerPosition("False");
      }

      if (
        height === "" ||
        height === "False" ||
        PlayerPosition === "" ||
        PlayerPosition === "False" ||
        preferredFoot === "" ||
        preferredFoot === "False" ||
        password !== confirmPassword
      ) {
        ("DO NOTHING");
      } else {
        dispatch(
          setUserSignUpData({
            paymentType,
            subscriptionPackage,
            ...userDataForPlayer,
          })
        );
        setNationality("");
        setDOB("");
        setPhoneNumber("");
        setHeight("");
        setPlayerPosition("");
        setPreferredFoot("");
        handleTrialNavigation();
        handleStepsCompleted();
      }
    } else {
      // USER DATA FOR OTHER ROLES EXCEPT PLAYER

      if (password === confirmPassword) {
        dispatch(
          setUserSignUpData({
            paymentType,
            subscriptionPackage,
            ...userData,
          })
        );
        setNationality("");
        setDOB("");
        setPhoneNumber("");
        handleTrialNavigation();
        handleStepsCompleted();
      }
    }

    // addEmail(selectedValue, formData.subject, formData.message, "no");
  };

  const userData = useSelector(selectUserSignUpData);

  // const handleValueExtract = (e) => {
  //   alert(e);
  //   setPhoneNumber(e);
  // };

  useEffect(() => {
    console.log(phoneNumber, "PH");
  }, [phoneNumber]);

  /// RESETTING THE THEME WHEN YOU  Navigate to this  page -- this is a temporal solution to the text field label color chnage
  useEffect(() => {
    dispatch(setThemeProviderToLightMode());
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: "red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* CREATE NEW ACCOUNT */}
      <div
        className="accountHeader"
        style={{
          flex: "0.3",
          // background: "red",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "0.5",
            // background: "red",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img src={logoImage} style={{ width: "100px" }} />
          <h2>Create new account</h2>
        </div>
        <div style={{ flex: "0.5", textAlign: "center" }}>
          <small style={{ fontWeight: "bold" }}>
            Please begin by providing your personal information in the User
            Credentials <br /> form below. These details should correspond to
            the account administrator.
          </small>
        </div>
      </div>

      {/* FORM AREA */}

      <div
        className="md:pt-[7vh]     sm:pt-[55vh] "
        style={{
          flex: "0.7",
          display: "grid",
          placeContent: "center",
          overflowY: "scroll",
          //   background: "red",
          alignItems: "center",
          paddingLeft: "5%",
          // paddingTop: "25vh", sm
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="md:flex md:flex-row      sm:flex sm:flex-col"
            style={{ gap: "2vw", marginBottom: "1.5vh" }}
          >
            <div>
              <TextField
                className="md:w-[15vw] sm:w-[80vw]"
                color="primary"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                {...register("firstName", { required: true })}
                required
                defaultValue={userData.firstName}
              />

              {errors.firstName && (
                <p style={{ color: "red", margin: 0 }}>
                  firstName is required.
                </p>
              )}
            </div>
            {/* SURNAME */}
            <div>
              <TextField
                className="md:w-[15vw] sm:w-[80vw]"
                id="outlined-basic"
                label="Surname"
                variant="outlined"
                {...register("surname", { required: true })}
                required
                defaultValue={userData.surname}
              />{" "}
              {errors.surname && (
                <p style={{ color: "red", margin: 0 }}>surname is required.</p>
              )}
            </div>
            {/* DATE OF BIRTH */}
            <div>
              <DatePickerTool
                style={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                containerStyle={{ marginTop: "-1vh" }}
                label="Date of birth"
                defaultValue={userData.DOB}
                dateValue={(e) => {
                  setDOB(e);
                }}
              />
              {DOB === "False" ? (
                <p style={{ color: "red", margin: 0, fontSize: ".8em" }}>
                  Select your date of birth.
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* EMAIL AND PHONE NUMBER */}
          <div
            className="md:flex md:flex-row      sm:flex sm:flex-col"
            style={{ gap: "2vw", marginBottom: "1.5vh" }}
          >
            <div>
              <TextField
                className="md:w-[15vw] sm:w-[80vw]"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                {...register("email", { required: true })}
                defaultValue={userData.email}
                required
              />
              {errors.email && (
                <p style={{ color: "red", margin: 0 }}>Email is required.</p>
              )}
            </div>
            {/* PHONE */}
            <div>
              <TextField
                // label="Phone Number"

                variant="outlined"
                className="md:w-[15vw] sm:w-[80vw]"
                InputProps={{
                  startAdornment: "",
                  inputComponent: PhoneInputComponent,
                  inputProps: {
                    style: { width: "10%" },
                  },
                }}
              />
              {errors.phoneNumber && (
                <p style={{ color: "red", margin: 0 }}>
                  Phone Number is required.
                </p>
              )}
            </div>

            <div>
              <CountrySelect
                styles={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                selectLabel="Nationality"
                // defaultValue={userData.Nationality}
                selectValue={(e) => {
                  setNationality(e);
                }}
                selectCountryCode={(e) => {
                  setCountryCode(e);
                  // alert(e);
                }}
              />
              {/* write a statement for validation */}
              {Nationality === "False" ? (
                <p style={{ color: "red", margin: 0, fontSize: ".8em" }}>
                  Select your nationality.
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          {/*ORGANIZATION/CLUB NAME AND PASSWORDS*/}
          <div
            className="md:flex md:flex-row      sm:flex sm:flex-col"
            style={{ gap: "2vw", marginBottom: "1vh" }}
          >
            {roleSelected === "Club" ? (
              <ClubAutoComplete
                ListArray={clubsInDatabase}
                label="Select a club"
                style={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                onClubSelect={handleClubSelect}
              />
            ) : roleSelected === "Player" ? (
              <div>
                <BasicAutoComplete
                  style={{
                    // ...inputStyles,
                    width: browserWidth >= 1024 ? "15vw" : "80vw",
                    marginBottom: "2.5vh",
                    color: "black",
                  }}
                  ListArray={soccerPositions}
                  label="Position * "
                  AutoCompleteValue={(e) => {
                    setPlayerPosition(e);
                    // alert(e);
                  }}
                  // defaultValue={PlayerPositionAutoCompleteValue}
                />
                {PlayerPosition === "False" ? (
                  <p style={{ color: "red", margin: 0, fontSize: ".8em" }}>
                    Position is required
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <TextField
                className="md:w-[15vw] sm:w-[80vw]"
                id="outlined-basic"
                label="Organization Name"
                variant="outlined"
                defaultValue={userData.organization}
                {...register("organization", { required: false })}
              />
            )}

            {/* {PASSWORDS} */}
            <div>
              <TextField
                className="md:w-[15vw] sm:w-[80vw]"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...register("password", { required: true })}
                required
              />
              {errors.password && (
                <p style={{ color: "red", margin: 0 }}>Password is required.</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <TextField
                className="md:w-[15vw] sm:w-[80vw]"
                //                   className='md:w-[15vw] sm:w-[80vw]'

                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                {...register("confirmPassword", { required: true })}
                required
              />
              {passwordMatch === "False" ? (
                <p style={{ color: "red", margin: 0, fontSize: ".8em" }}>
                  Passwords dont match
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          {roleSelected === "Player" ? (
            <div
              className="md:flex md:flex-row      sm:flex sm:flex-col"
              style={{
                // display: "flex",
                gap: "2vw",
                marginBottom: "1vh",
                // alignItems: "center",
                // justifyContent: "center",
                paddingRight: "13%",
              }}
            >
              <div>
                <BasicSelect
                  inputStyle={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                  label={"Preferred foot *"}
                  itemsArray={preferredFootArray}
                  selectedValue={(e) => {
                    setPreferredFoot(e);
                  }}
                />
                {preferredFoot === "False" ? (
                  <p style={{ color: "red", margin: 0, fontSize: ".8em" }}>
                    Preferred foot is required
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div>
                <BasicSlider
                  style={{
                    width: browserWidth >= 1024 ? "15vw" : "80vw",
                    color: "black",
                  }}
                  rangeName="Height (m) *"
                  max={2.5}
                  min={0.3}
                  steps={0.1}
                  sliderValue={(e) => {
                    setHeight(e);
                  }}
                />
                {height === "False" ? (
                  <p style={{ color: "red", margin: 0, fontSize: ".8em" }}>
                    Height is required
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          <Button
            className="md:w-[37vw] sm:w-[50vw]"
            type="submit"
            sx={{
              background: "#5585FE",
              borderRadius: ".5vw",
              color: "white",
              textTransform: "none",
              // width: "37vw",
              marginLeft: "13%",
              marginTop: "1vh",

              // color: buttonColor,
            }}
          >
            Create Account
          </Button>
          <div className="md:hidden sm:h-[3vh] "></div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

function PhoneInputComponent() {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  const userData = useSelector(selectUserSignUpData);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // alert(value);

    dispatch(setUserSignUpData({ ...userData, phoneNumber: value }));
    // numberPhone(value);
    // alert(numberPhone(e));
  };
  return (
    <PhoneInput
      required
      style={{
        height: "8.5vh",
        position: "relative",
        width: browserWidth >= 1024 ? "14vw" : "80vw",

        // width: "30%",
        // border: "2px solid ",
        borderRadius: "5px",
      }}
      defaultCountry="gh"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
    />
  );
}
