import { Button, TextField } from "@mui/material";
import logoImage from "../assets/images/AppLogoBlue.png";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useCallback, useEffect, useState } from "react";
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
  selectSoccerPostions,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import { CloudCircleOutlined, Person } from "@mui/icons-material";
import UploadIDCardAccount from "../components/Modals/UploadIDCardAccount";
import dayjs from "dayjs";
import DatePickerToolCreateAccount from "../components/DatePicker/DatePickerCreateAccout";
import CountrySelectCreateAccount from "../components/Autocompletes/CountrySelectCreateAccount";

const CreateAccount = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  const userData = useSelector(selectUserSignUpData);

  const soccerPositions = useSelector(selectSoccerPostions);

  const preferredFootArray = ["Left", "Right", "Both"];

  const [phoneNumber, setPhoneNumber] = useState(
    userData?.phoneNumber ? userData.phoneNumber : "+233"
  );

  const userFormDataWithOnlySubscriptionPackage =
    useSelector(selectUserSignUpData);
  const roleSelected = useSelector(selectRoleSelected);

  const { subscriptionPackage, paymentType, subscriptionPrice } =
    userFormDataWithOnlySubscriptionPackage;

  // const handlePhoneNumberChange = (value) => {
  //   setPhoneNumber(value);
  //   // alert(value);
  // };

  // FUNCTIONS FOR MOVING FROM ACCOUNT PAGE TO CONFIRM DETAILS PAGE
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTrialNavigation = async (email, password) => {
    // await console.log(email, password);
    await navigate("/create-account/confirm-details");
  };

  const completedStepsObject = useSelector(selectCompleteSteps);

  const handleStepsCompleted = () => {
    // dispatch(setCompletedSteps({ ...completedStepsObject, 2: true }));
    dispatch(setCompletedSteps({ ...completedStepsObject, 1: true }));
  };

  const [firstName, setfirstName] = useState(userData?.firstName);
  const [surname, setSurname] = useState(userData?.surname);
  const [CountryCode, setCountryCode] = useState(userData?.CountryCode);
  const [NationalityLabel, setNationality] = useState(userData?.Nationality);
  const [nationalityCodeFromMRZ, setNationalityCodeFromMRZ] = useState("");

  const [selectedClubName, setSelectedClubName] = useState("");
  const [DOB, setDOB] = useState(
    userData?.DateOfBirth !== undefined ? userData?.DateOfBirth : ""
  );
  const [DOBMui, setDOBMui] = useState("");

  const [passwordMatch, setPasswordMatch] = useState("");
  const [PlayerPosition, setPlayerPosition] = useState("");
  const [height, setHeight] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");

  // **** SHORT POLLING THE FIRST NAME FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const retrievedFirstName = sessionStorage.getItem("firstName");
  //     if (retrievedFirstName === "") {
  //       setfirstName("");
  //     } else if (retrievedFirstName && retrievedFirstName !== firstName) {
  //       // alert(retrievedFirstName);

  //       setfirstName(retrievedFirstName);
  //     }
  //   }, 100); // Adjust interval as needed

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, [firstName]);

  // sessionStorage.setItem("firstName", "");
  // sessionStorage.setItem("lastName", "");
  // sessionStorage.setItem("nationality", "");
  // sessionStorage.setItem("birthDate", "");

  // **** SHORT POLLING THE  SURNAME FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const retrievedSurname = sessionStorage.getItem("lastName");
  //     if (retrievedSurname === "") {
  //       setSurname("");
  //     } else if (retrievedSurname && retrievedSurname !== surname) {
  //       // alert(retrievedSurname);

  //       setSurname(retrievedSurname);
  //     }
  //   }, 100); // Adjust interval as needed

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, [surname]);

  // **** SHORT POLLING THE  Date of Birth FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const retrievedDOB = sessionStorage.getItem("birthDate");

  //     if (retrievedDOB === "") {
  //       setDOBMui("");
  //       // setDOB("");
  //     } else if (retrievedDOB && retrievedDOB !== DOB) {
  //       // alert(retrievedSurname);
  //       // The iso if for material ui component display and standardDate
  //       // toLocaleString is for database stpre

  //       let formattedDateISOMUi =
  //         convertMRZDateToStandardFormatISOStandardForMUI(retrievedDOB);

  //       let formattedDateISODB =
  //         convertMRZDateToStandardFormatISOStandardForDatabase(retrievedDOB);

  //       // alert(formattedDate);
  //       setDOBMui(formattedDateISOMUi);
  //       setDOB(formattedDateISODB);
  //     }
  //   }, 100); // Adjust interval as needed

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, [DOB]);

  // **** SHORT POLLING THE  Nationality(country code) FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const retrievedNationalityCode = sessionStorage.getItem("nationality");
  //     if (retrievedNationalityCode === "") {
  //       setNationalityCodeFromMRZ("");
  //     } else if (
  //       retrievedNationalityCode &&
  //       retrievedNationalityCode !== nationalityCodeFromMRZ
  //     ) {
  //       // alert(retrievedSurname);
  //       setNationalityCodeFromMRZ(retrievedNationalityCode);
  //     }
  //   }, 100); // Adjust interval as needed

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, [nationalityCodeFromMRZ]);

  const handleFirstNameChange = (e) => {
    const inputFirstName = e.target.value;
    setfirstName(inputFirstName);
    sessionStorage.setItem("firstName", inputFirstName);
  };

  const handlesurNameChange = (e) => {
    const inputSurname = e.target.value;
    setSurname(inputSurname);
    sessionStorage.setItem("lastName", inputSurname);
  };

  // Function to convert MRZ date format to standard date format
  function convertMRZDateToStandardFormatISOStandardForDatabase(mrzDate) {
    // Extracting components from MRZ date format
    const year = parseInt(mrzDate && mrzDate.substring(0, 2)); // Assuming two-digit year
    const month = parseInt(mrzDate && mrzDate.substring(2, 4));
    const day = parseInt(mrzDate && mrzDate.substring(4, 6));

    // Get the current year's last two digits
    const currentYearLastTwoDigits = parseInt(
      new Date().getFullYear().toString().slice(-2)
    );

    // Determine the century of the year based on the condition
    const century = year <= currentYearLastTwoDigits ? 2000 : 1900;

    // Creating a new Date object with the extracted components
    const standardDate = new Date(century + year, month - 1, day); // Add appropriate century to get full year, and subtract 1 from month since months are zero-based

    // Formatting the date into the desired format
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "GMT",
    };
    const formattedDate = standardDate.toLocaleString("en-US", options);

    return formattedDate;
  }
  function convertMRZDateToStandardFormatISOStandardForMUI(mrzDate) {
    // Extracting components from MRZ date format
    const year = parseInt(mrzDate && mrzDate.substring(0, 2)); // Assuming two-digit year
    const month = parseInt(mrzDate && mrzDate.substring(2, 4));
    const day = parseInt(mrzDate && mrzDate.substring(4, 6));

    // Get the current year's last two digits
    const currentYearLastTwoDigits = parseInt(
      new Date().getFullYear().toString().slice(-2)
    );

    // Determine the century of the year based on the condition
    const century = year <= currentYearLastTwoDigits ? 2000 : 1900;

    // Creating a new Date object with the extracted components
    const standardDate = new Date(century + year, month - 1, day); // Add appropriate century to get full year, and subtract 1 from month since months are zero-based

    // Formatting the date into the desired format
    const formattedDate = standardDate.toISOString().slice(0, 10); // Extracting only the yyyy-MM-dd part

    return formattedDate;
  }

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

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    console.log(formData);

    // declare email amd password to be passed to create-account page
    const {
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
      phoneNumber: phoneNumber,
      email,
      Nationality: NationalityLabel,
      password,
      CountryCode,
      subscriptionPrice,
      subscriptionPackage,
    };

    const userDataForPlayer = {
      firstName,
      surname,
      DateOfBirth: DOB.toString(),
      phoneNumber: "",
      email,
      Nationality: NationalityLabel,
      CountryCode,
      password,
      height,
      PlayerPosition,
      subscriptionPrice,
      subscriptionPackage,
      preferredFoot,
    };

    if (DOB === "") {
      triggerWarningAlertModal(
        "Please make sure you select a date 16 older or above from today"
      );
    } else if (NationalityLabel === "" || NationalityLabel === undefined) {
      triggerWarningAlertModal("Please select your nationality to continue");
    } else {
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
          // alert("DO NOTHING");
        } else {
          dispatch(
            setUserSignUpData({
              paymentType,
              ...userDataForPlayer,
            })
          );
          setNationality("");
          setDOB("");
          setPhoneNumber("");
          setHeight("");
          setPlayerPosition("");
          setPreferredFoot("");
          handleTrialNavigation(email, password);
          handleStepsCompleted();
        }
      } else {
        // USER DATA FOR OTHER ROLES EXCEPT PLAYER

        if (password === confirmPassword) {
          dispatch(
            setUserSignUpData({
              paymentType,
              ...userData,
            })
          );
          setNationality("");
          setDOB("");
          setPhoneNumber("");
          handleTrialNavigation(email, password);
          handleStepsCompleted();
        }
      }
    }

    // addEmail(selectedValue, formData.subject, formData.message, "no");
  };

  // const handleValueExtract = (e) => {
  //   alert(e);
  //   setPhoneNumber(e);
  // };

  /// RESETTING THE THEME WHEN YOU  Navigate to this  page -- this is a temporal solution to the text field label color chnage
  useEffect(() => {
    dispatch(setThemeProviderToLightMode());
  }, []);

  const PhoneInputWrapper = useCallback(
    () => (
      <PhoneInputComponent
        defaultValue={phoneNumber}
        mobilePhoneValue={(e) => {
          setPhoneNumber(e);
        }}
      />
    ),
    [setPhoneNumber]
  );

  return (
    <div
      className="md:h-[100%] md:w-[100%] md:flex md:flex-col   sm:h-[100vh] sm:w-[100%] sm:flex sm:flex-col"
      style={
        {
          // width: "100%",
          // height: "100%",
          // background: "red",
          // display: "flex",
          // flexDirection: "column",
        }
      }
    >
      {/* CREATE NEW ACCOUNT */}
      <div
        className="accountHeader"
        style={{
          flex: "0.22",
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
            Credentials form below. <br />
            <span
              onClick={() => {
                navigate("/player profile verification");
              }}
              style={{ color: "#5585FE", cursor: "pointer" }}
            >
              {" "}
              {roleSelected === "Player"
                ? "Click here if your player profile has already been created by a club or agent"
                : ""}{" "}
            </span>
          </small>
        </div>
      </div>

      {/* FORM AREA */}

      <div
        className="md:pt-[4vh] md:flex md:flex-row     sm:pt-[60vh] sm:flex sm:flex-col "
        style={{
          flex: "0.78",
          display: "grid",
          placeContent: "center",
          overflowY: "scroll",
          // background: "blue",

          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // These percentages are for pc
          paddingLeft: "15%",
          paddingRight: "10%",

          // paddingTop: "25vh", sm
        }}
      >
        <div style={{ flex: "1" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="md:flex md:flex-row      sm:flex sm:flex-col"
              style={{ gap: "2vw", marginBottom: "1.5vh" }}
            >
              {/* setfirstName
setSurname */}
              <div>
                <TextField
                  className="md:w-[15vw] sm:w-[80vw]"
                  color="primary"
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  onChange={handleFirstNameChange}
                  // {...register("firstName", { required: true })}
                  value={firstName}
                  required
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
                  color="primary"
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // {...register("surName", { required: true })}
                  onChange={handlesurNameChange}
                  value={surname}
                  required
                />
                {errors.surname && (
                  <p style={{ color: "red", margin: 0 }}>
                    surname is required.
                  </p>
                )}
              </div>
              {/* DATE OF BIRTH */}
              <div>
                <DatePickerToolCreateAccount
                  style={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                  containerStyle={{ marginTop: "-1vh" }}
                  label="Date of birth"
                  // defaultValue={
                  //   userData?.DateOfBirth
                  //     ? dayjs(
                  //         userData.DateOfBirth,
                  //         "ddd, DD MMM YYYY HH:mm:ss [GMT]"
                  //       ).toDate()
                  //     : null
                  // }
                  dateValue={(e) => {
                    alert(e);
                    setDOB(e);
                  }}
                  value={dayjs(DOB)}
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
                    inputComponent: PhoneInputWrapper,
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
                <CountrySelectCreateAccount
                  styles={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                  selectLabel="Nationality"
                  ImplememtCountryCode={nationalityCodeFromMRZ}
                  defaultValue={{
                    label: userData?.Nationality,
                    code: userData?.CountryCode,
                  }}
                  selectValue={(e) => {
                    setNationality(e);
                  }}
                  selectCountryCode={(e) => {
                    setCountryCode(e);
                    // alert(e);
                  }}
                />
                {/* write a statement for validation */}
                {NationalityLabel === "False" ? (
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
                      marginBottom: ".5vh",
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
                  <p style={{ color: "red", margin: 0 }}>
                    Password is required.
                  </p>
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
                  gap: "0vh 2vw",
                  // marginBottom: "1vh",
                  // alignItems: "center",
                  // justifyContent: "center",
                  paddingRight: "13%",
                }}
              >
                <div>
                  <BasicSelect
                    inputStyle={{
                      width: browserWidth >= 1024 ? "15vw" : "80vw",
                    }}
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
        {/* <div style={{ flex: ".3", display: "flex" }}>
          <div>
            <div
              style={{
                flex: "0.8",
                // background: "yellow",
                display: "flex",
                alignItems: "center",
                justifyContent: "center ",
                border: "1px dashed black",
                borderRadius: "1vw",
                padding: "1vw",
              }}
            >
              <div
                style={{
                  // background: "peru",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: "0.2" }}></div>
              
                <div
                  style={{
                    flex: "0.5",
                    // background: "yellow",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Person sx={{ fontSize: "5em" }} />
                </div>
]
                <div style={{ flex: "0.3" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      // gap: "5px",
                      // background: "green",
                    }}
                  >
                    <div>
                      <h5>Drag and drop image of your ID card</h5>
                      <small>
                        {" "}
                        The image should be any ID card of yours with an mrz
                        code and not more than 2mb{" "}
                      </small>
                    </div>
                    <div>
                      <UploadIDCardAccount />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CreateAccount;

function PhoneInputComponent({ mobilePhoneValue, defaultValue }) {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  const userData = useSelector(selectUserSignUpData);
  const dispatch = useDispatch();
  const [phoneNumberValue, setphoneNumberValue] = useState(defaultValue);

  const handlePhoneNumberChange = (value) => {
    // Pass the value to the parent component
    mobilePhoneValue(value);
    setphoneNumberValue(value);
    console.log(value);
  };

  return (
    <PhoneInput
      required
      style={{
        height: "8.5vh",
        position: "relative",
        width: browserWidth >= 1024 ? "14vw" : "80vw",
        borderRadius: "5px",
      }}
      defaultCountry="gh"
      value={phoneNumberValue}
      placeholder="Phone Number"
      onChange={(value) => handlePhoneNumberChange(value)} // Pass the value directly
    />
  );
}
