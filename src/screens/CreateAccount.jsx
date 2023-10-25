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
  setCompletedSteps,
} from "../statemanager/slices/SignupStepperSlice";
import { useForm } from "react-hook-form";
import {
  selectUserSignUpData,
  setUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import DatePickerTool from "../components/DatePicker/DatePicker";

const CreateAccount = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    alert(value);
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

  const [Nationality, setNationality] = useState("");
  const [DOB, setDOB] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    const {
      firstName,
      surname,
      organization,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = formData;

    const userData = {
      firstName,
      surname,
      DateOfBirth: DOB.toString(),
      DOB,
      organization,
      phoneNumber: phoneNumber,
      email,
      Nationality,
      password,
    };

    if (Nationality === "" || Nationality === "False") {
      setNationality("False");
    } else {
      if (DOB === "" || DOB === "False") {
        setDOB("False");
      } else {
        if (password !== confirmPassword) {
          setPasswordMatch("False");
        } else {
          alert("Form Taken");
          dispatch(setUserSignUpData(userData));
          setNationality("");
          setDOB("");
          setPhoneNumber("");
          handleTrialNavigation();
          handleStepsCompleted();
        }
      }
    }

    // addEmail(selectedValue, formData.subject, formData.message, "no");
  };

  const userData = useSelector(selectUserSignUpData);

  const handleValueExtract = (e) => {
    alert(e);
    setPhoneNumber(e);
  };

  useEffect(() => {
    console.log(phoneNumber, "PH");
  }, [phoneNumber]);

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
        style={{
          flex: "0.7",
          display: "grid",
          placeContent: "center",
          //   background: "red",
          alignItems: "center",
          paddingLeft: "5%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", gap: "2vw", marginBottom: "3vh" }}>
            <div>
              <TextField
                sx={{ width: "15vw" }}
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
                sx={{ width: "15vw" }}
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
                style={{ width: "15vw" }}
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
          <div style={{ display: "flex", gap: "2vw", marginBottom: "3vh" }}>
            <div>
              <TextField
                sx={{ width: "15vw" }}
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
                sx={{ width: "15vw" }}
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
                styles={{ width: "15vw" }}
                selectLabel="Nationality"
                // defaultValue={userData.Nationality}
                selectValue={(e) => {
                  setNationality(e);
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
          <div style={{ display: "flex", gap: "2vw", marginBottom: "3vh" }}>
            <TextField
              sx={{ width: "15vw" }}
              id="outlined-basic"
              label="Organization/Club Name"
              variant="outlined"
              defaultValue={userData.organization}
              {...register("organization", { required: false })}
            />

            {/* {PASSWORDS} */}
            <div>
              <TextField
                sx={{ width: "15vw" }}
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
                sx={{ width: "15vw" }}
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

          <div
            style={{
              display: "flex",
              gap: "2vw",
              marginBottom: "3vh",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "13%",
            }}
          ></div>
          <Button
            type="submit"
            sx={{
              background: "#5585FE",
              borderRadius: ".5vw",
              color: "white",
              textTransform: "none",
              width: "37vw",
              marginLeft: "13%",

              // color: buttonColor,
            }}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

function PhoneInputComponent() {
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
        width: "14vw",
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
