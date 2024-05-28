import { Outlet, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/AppLogoBlue.png";
import FreetrialStepper from "../components/Stepper/FreetrialStepper";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import DatePickerToolCreateAccount from "../components/DatePicker/DatePickerCreateAccout";
import dayjs from "dayjs";
import CountrySelectCreateAccount, {
  countries,
} from "../components/Autocompletes/CountrySelectCreateAccount";
import ClubAutoComplete from "../components/Autocompletes/ClubAutoComplete";
import BasicAutoComplete from "../components/Autocompletes/BasicAutoComplete";
import BasicSelect from "../components/Selects/BasicSelect";
import { Person } from "@mui/icons-material";
import UploadIDCardAccount from "../components/Modals/UploadIDCardAccount";
import {
  selectCurrentBrowserSize,
  selectSoccerPostions,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import { useEffect, useRef, useState } from "react";
import { selectRoleSelected } from "../statemanager/slices/SignupStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import BasicSlider from "../CoachAgentScoutVersion/src/components/slider/BasicSlider";
import UploadIDCardAccountForAccountVerification from "../components/Modals/UploadIDCardAccountForAccountVerification";
import {
  selectImageWithMrzFileStoreForAccountVerification,
  selectUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { db, storage } from "../Firebase/Firebase";
import { v4 } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import moment from "moment/moment";
import emailjs from "@emailjs/browser";

const RequestExistingPlayerProfile = () => {
  const styles = `.react-international-phone-input {
  height: 100%;
  background-color: transparent;
}

.react-international-phone-country-selector {
  background-color: transparent;
}


.react-international-phone-input-container .react-international-phone-input{
  background-color: transparent ;
height:100%
}

.react-international-phone-country-selector-dropdown{
  z-index:100
  }

.react-international-phone-country-selector-button {
  background-color: transparent ;
height:100%



}`;

  const navigate = useNavigate();

  const selectedFile = useSelector(
    selectImageWithMrzFileStoreForAccountVerification
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const soccerPositions = useSelector(selectSoccerPostions);
  const roleSelected = useSelector(selectRoleSelected);
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  const userSignUpData = useSelector(selectUserSignUpData);

  const preferredFootArray = ["Left", "Right", "Both"];

  const [firstName, setfirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [Nationality, setNationality] = useState("");
  const [nationalityCodeFromMRZ, setNationalityCodeFromMRZ] = useState("");

  const [selectedClubName, setSelectedClubName] = useState("");
  const [DOB, setDOB] = useState("");
  const [DOBMui, setDOBMui] = useState("");

  const [passwordMatch, setPasswordMatch] = useState("");
  const [PlayerPosition, setPlayerPosition] = useState("");
  const [height, setHeight] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");
  const [idBackImage, setIdBackImage] = useState([]);
  const [idFrontImage, setIdFrontImage] = useState([]);

  useEffect(() => {
    console.log("Kvk", idFrontImage);
  }, [idFrontImage]);

  const sendEmail = (e, emailContent) => {
    e.preventDefault();

    emailjs
      .send("service_bv4yvq6", "template_4hazy9a", emailContent, {
        publicKey: "OhHvTX-uupdiCG0Nm",
      })
      .then(
        () => {
          console.log("SUCCESS!");

          alert("message sent successfully");
        },
        (error) => {
          alert("message FAILED");

          console.log("FAILED...", error.text);
        }
      );
  };

  const onSubmit = async (formData, e) => {
    const { email } = formData;
    const userData = {
      firstName,
      surname,
      DateOfBirth: DOB.toString(),
      email,
      Nationality,
      CountryCode,
      preferredFoot,
    };

    const EmailContent = {
      recipient_name: `${firstName} ${surname}`,
      subject: "Player Account Retrieval Request",
      message:
        "Your account verification has been received successfully we will verify and get back to you within 3-5 working days",
      recipient_email: email,
      // Add any other fields you want to include in the email
    };

    const retrievedFirstName = sessionStorage.getItem(
      "firstNameForAccountVerification"
    );
    const retrievedSurname = sessionStorage.getItem(
      "lastNameForAccountVerification"
    );
    const retrievedDOB = sessionStorage.getItem(
      "birthDateForAccountVerification"
    );

    const retrievedNationalityCode = sessionStorage.getItem(
      "nationalityForAccountVerification"
    );
    const uuid = v4();
    let formattedDateISODB =
      convertMRZDateToStandardFormatISOStandardForDatabase(retrievedDOB);

    const matchedCountry = countries.find(
      (country) =>
        country.mrzCode.toLowerCase() === retrievedNationalityCode.toLowerCase()
    );

    // if (DOB === "") {
    //   triggerWarningAlertModal(
    //     "Please make sure you select a date 16 older or above from today"
    //   );
    // }

    // if (Nationality === "" || Nationality === "False") {
    //   setNationality("False");
    // }

    // if (DOB === "" || DOB === "False") {
    //   setDOB("False");
    // }
    // if (height === "" || height === "False") {
    //   setHeight("False");
    // }
    // if (preferredFoot === "" || preferredFoot === "False") {
    //   setPreferredFoot("False");
    // }

    // ********** WRITE A CODE TO PREVENT USER FROM REQUESTING SAME PLAYER ACCOUNT TWICE ... SUCH THAT IF THE ROLE OF THE ACCOUNT CREATOR OF THE PLAYER PROFILE IS A PLAYER THE ALGO SHOULD PREVENT HIM *************

    console.log(
      retrievedFirstName.trim().toLowerCase(),
      "= ",
      firstName.trim().toLowerCase(),
      "== ",
      retrievedSurname.trim().toLowerCase(),
      surname.trim().toLowerCase(),
      formattedDateISODB.trim().toLowerCase(),
      DOB.trim().toLowerCase(),
      matchedCountry.label.trim().toLowerCase(),
      Nationality.trim().toLowerCase(),
      "bubashie"
    );

    if (
      idBackImage.length === 0 ||
      idFrontImage.length === 0 ||
      email === "" ||
      Nationality === "" ||
      DOB === "" ||
      preferredFoot === "" ||
      firstName === "" ||
      surname === ""
    ) {
      triggerWarningAlertModal(
        "Make sure all fields are filled and upload id images"
      );
    } else if (
      retrievedFirstName.trim().toLowerCase() !==
        firstName.trim().toLowerCase() ||
      retrievedSurname.trim().toLowerCase() !== surname.trim().toLowerCase() ||
      formattedDateISODB.trim().toLowerCase() !== DOB.trim().toLowerCase() ||
      matchedCountry.label.trim().toLowerCase() !==
        Nationality.trim().toLowerCase()
    ) {
      triggerWarningAlertModal(
        "Make sure all fields tally with information from the Id Card"
      );
    } else {
      let frontImageUrl = "";
      let backImageUrl = "";

      if (idFrontImage.length > 0) {
        // const base64Data = selectedFile.replace(/^data:(.*);base64,/, "");

        const profileImageRef = ref(
          storage,
          `Player_Verification_ID_Front_Image/${
            userData.firstName + "-" + uuid + "-" + "FrontImage"
          }`
        );
        // Upload the image
        //  await uploadBytes(profileImageRef, selectedFile);
        // await uploadString(profileImageRef, base64Data, "base64");
        await uploadBytes(profileImageRef, idFrontImage[0]);

        // Get the download URL
        frontImageUrl = await getDownloadURL(profileImageRef);
        // We have to clear the sessionStorage for all the datat stored
        // alert("Storing ID IMAGe", url);
      }

      if (idBackImage.length > 0) {
        const profileImageRef = ref(
          storage,
          `Player_Verification_ID_Back_Image/${
            userData.firstName + "-" + uuid + "-" + "BackImage"
          }`
        );
        // Upload the image
        await uploadBytes(profileImageRef, idBackImage[0]);
        //   await uploadString(profileImageRef, base64Data, "base64");

        // Get the download URL
        backImageUrl = await getDownloadURL(profileImageRef);
        // We have to clear the sessionStorage for all the datat stored
        // alert("Storing ID IMAGe", url);
      }

      await setDoc(doc(db, `Account_Requests`, uuid), {
        ...userData,
        dateRequested: moment().format("YYYY-MM-DD HH:mm:ss"),
        IdImageFront: frontImageUrl,
        IdImageBack: backImageUrl,
        requestStatus: "Pending",
        requestId: uuid,
        subscriptionPackage: userSignUpData?.subscriptionPackage,
        subscriptionPrice: userSignUpData?.subscriptionPrice,
      });

      await sendEmail(e, EmailContent);
      alert(
        "Your request has been sent successfully a followup message will be sent to your email in a few working days"
      );

      sessionStorage.setItem("firstNameForAccountVerification", "");
      sessionStorage.setItem("lastNameForAccountVerification", "");
      sessionStorage.setItem("nationalityForAccountVerification", "");
      sessionStorage.setItem("birthDateForAccountVerification", "");

      navigate("/login");
    }
  };
  // **** SHORT POLLING THE FIRST NAME FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****

  useEffect(() => {
    const intervalId = setInterval(() => {
      const retrievedFirstName = sessionStorage.getItem(
        "firstNameForAccountVerification"
      );
      if (retrievedFirstName === "") {
        setfirstName("");
      } else if (retrievedFirstName && retrievedFirstName !== firstName) {
        // alert(retrievedFirstName);

        setfirstName(retrievedFirstName);
      }
    }, 100); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [firstName]);

  // sessionStorage.setItem("firstName", "");

  // **** SHORT POLLING THE  SURNAME FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****
  useEffect(() => {
    const intervalId = setInterval(() => {
      const retrievedSurname = sessionStorage.getItem(
        "lastNameForAccountVerification"
      );
      if (retrievedSurname === "") {
        setSurname("");
      } else if (retrievedSurname && retrievedSurname !== surname) {
        // alert(retrievedSurname);

        setSurname(retrievedSurname);
      }
    }, 100); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [surname]);

  // **** SHORT POLLING THE  Date of Birth FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****
  useEffect(() => {
    const intervalId = setInterval(() => {
      const retrievedDOB = sessionStorage.getItem(
        "birthDateForAccountVerification"
      );

      if (retrievedDOB === "") {
        setDOBMui("");
        // setDOB("");
      } else if (retrievedDOB && retrievedDOB !== DOB) {
        // alert(retrievedSurname);
        // The iso if for material ui component display and standardDate
        // toLocaleString is for database stpre

        let formattedDateISOMUi =
          convertMRZDateToStandardFormatISOStandardForMUI(retrievedDOB);

        let formattedDateISODB =
          convertMRZDateToStandardFormatISOStandardForDatabase(retrievedDOB);

        // alert(formattedDate);
        setDOBMui(formattedDateISOMUi);
        setDOB(formattedDateISODB);
      }
    }, 100); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [DOB]);

  // **** SHORT POLLING THE  Nationality(country code) FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****

  useEffect(() => {
    const intervalId = setInterval(() => {
      const retrievedNationalityCode = sessionStorage.getItem(
        "nationalityForAccountVerification"
      );
      if (retrievedNationalityCode === "") {
        setNationalityCodeFromMRZ("");
      } else if (
        retrievedNationalityCode &&
        retrievedNationalityCode !== nationalityCodeFromMRZ
      ) {
        // alert(retrievedSurname);
        setNationalityCodeFromMRZ(retrievedNationalityCode);
      }
    }, 100); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [nationalityCodeFromMRZ]);

  const handleFirstNameChange = (e) => {
    const inputFirstName = e.target.value;
    setfirstName(inputFirstName);
    sessionStorage.setItem("firstNameForAccountVerification", inputFirstName);
  };

  const handlesurNameChange = (e) => {
    const inputSurname = e.target.value;
    setSurname(inputSurname);
    sessionStorage.setItem("lastNameForAccountVerification", inputSurname);
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

  useEffect(() => {
    console.log("Imasge", idBackImage);
  }, [idBackImage]);

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  return (
    <div
      className="md:w-[100%] md:h-[100vh] md:flex md:flex-col        
    sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col
    "
      style={{
        // width: "100vw",
        // height: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // background: "red",
        background: "#f7f7f9",
      }}
    >
      <div
        className="md:basis-[12%] sm:basis-[12%] md:pt-[1.5vh] md:pl-[1vw]  sm:pt-[1.5vh] sm:pl-[1vw]"

        // style={{ flex: ".12", paddingTop: "1.5vh", paddingLeft: "1vw" }}
      >
        <img
          onClick={() => {
            navigate("/login");
          }}
          style={{ width: "120px" }}
          src={logoImage}
        />
      </div>
      {/* <div
        className=" md:basis-[15%] sm:basis-[18%]  md:flex md:justify-center 
        sm:flex sm:justify-start sm:flex-shrink-0  md:flex-shrink-0
        "
        style={{
          // flex: "0.15",
          background: "yellow",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: "20px",
        }}
      >
        <FreetrialStepper />
      </div> */}
      <div
        className="md:basis-[88%]  sm:basis-[88%] "
        style={{
          overflowY: "scroll",
          marginBottom: "3vh",
          //   background: "yellow",
        }}
      >
        <div
          className="accountHeader"
          style={{
            flex: "0.4",
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
            <h2>Retreive your player profile</h2>
          </div>
          <div style={{ flex: "0.5", textAlign: "center" }}>
            <small style={{ fontWeight: "bold" }}>
              Please begin by providing your personal information in the User
              Credentials <br /> form below. These details should correspond to
              the player profile and as presented on your Id Card. <br />
            </small>
          </div>
        </div>

        <div
          className="md:pt-[7vh] md:flex md:flex-row     sm:pt-[15vh]  sm:pb-[10vh] sm:flex sm:flex-col "
          style={{
            flex: "0.6",
            // display: "grid",
            // placeContent: "center",
            overflowY: "scroll",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // These percentages are for pc
            paddingLeft: "15%",
            paddingRight: "10%",

            // paddingTop: "25vh", sm
          }}
        >
          <div style={{ flex: ".7" }}>
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
                    // defaultValue={userData.DOB}
                    dateValue={(e) => {
                      DOB === "" || DOB === undefined || DOB === null
                        ? setDOB(e)
                        : "";
                    }}
                    value={DOB && DOB !== "" ? dayjs(DOBMui) : dayjs(DOB)}
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
                    //   defaultValue={userData.email}
                    required
                  />
                  {errors.email && (
                    <p style={{ color: "red", margin: 0 }}>
                      Email is required.
                    </p>
                  )}
                </div>

                <div>
                  <CountrySelectCreateAccount
                    styles={{ width: browserWidth >= 1024 ? "15vw" : "80vw" }}
                    selectLabel="Nationality"
                    ImplememtCountryCode={nationalityCodeFromMRZ}
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
              </div>

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
                Send Request
              </Button>
              <div className="md:hidden sm:h-[3vh] "></div>
            </form>
          </div>
          <div style={{ flex: ".3", display: "flex" }}>
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
                {/* Selected files in column*/}
                <div
                  style={{
                    // background: "peru",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* column Top style  */}
                  <div style={{ flex: "0.2" }}></div>
                  {/* End of column Top style  */}

                  {/* CloudCircleOutlined  */}
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
                  {/* End of CloudCircleOutlined  */}

                  {/* Select_files */}
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
                          code and not more than 2mb {idBackImage.length}
                        </small>
                      </div>
                      <div>
                        <UploadIDCardAccountForAccountVerification
                          idCardImageWithoutMrz={(e) => {
                            // alert(e.length);
                            setIdBackImage(e);
                          }}
                          idCardImageWithMrz={(e) => {
                            // alert(e.length);
                            setIdFrontImage(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* End of Select_files */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />;
    </div>
  );
};

export default RequestExistingPlayerProfile;
