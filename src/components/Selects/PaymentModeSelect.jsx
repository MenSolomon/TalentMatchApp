import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserSignUpData,
  setUserSignUpData,
} from "../../statemanager/slices/UserDataSlice";
import { PhoneInput } from "react-international-phone";

export default function PaymentModeSelect({ paymentType }) {
  const userData = useSelector(selectUserSignUpData);

  const [paymentMode, setPaymentMode] = React.useState(userData.paymentType);
  const [CardType, setCardType] = React.useState("Visa Card");
  const [Month, setMonth] = React.useState("");
  const [Year, setYear] = React.useState("");

  React.useEffect(() => {
    if (userData.paymentType === "Cards") {
      const { paymentDetails } = userData;
      setMonth(paymentDetails.ExpiryMonth);
      setCardType(paymentDetails.CardType);
      setYear(paymentDetails.ExpiryYear);
    }
  }, [userData.paymentType]);

  const handleChange = (event) => {
    setPaymentMode(event.target.value);
    paymentType(event.target.value);
  };
  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);

    dispatch(
      setUserSignUpData({
        ...userData,
        paymentDetails: {
          ...userData.paymentDetails,
          CardType: event.target.value,
        },
      })
    );
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    dispatch(
      setUserSignUpData({
        ...userData,
        paymentDetails: {
          ...userData.paymentDetails,
          ExpiryMonth: event.target.value,
        },
      })
    );
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
    dispatch(
      setUserSignUpData({
        ...userData,
        paymentDetails: {
          ...userData.paymentDetails,
          ExpiryYear: event.target.value,
        },
      })
    );
  };

  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const Years = [];

  for (let i = 23; i < 33; i++) {
    Years.push(`20${i}`);
  }

  const dispatch = useDispatch();

  const [cardDetails, setCardDetails] = React.useState(
    userData?.paymentType !== undefined &&
      userData?.paymentDetails !== undefined
      ? userData.paymentType === "Cards"
        ? {
            CardType: userData.paymentDetails.CardType,
            FirstName: userData.paymentDetails.FirstName,
            Surname: userData.paymentDetails.Surname,
            CardNumber: userData.paymentDetails.CardNumber,
            ExpiryMonth: userData.paymentDetails.ExpiryMonth,
            CVV: userData.paymentDetails.CVV,
          }
        : userData.paymentType !== ""
        ? { phoneNumber: userData.paymentDetails.phoneNumber }
        : ""
      : ""
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 310 }}>
        <InputLabel id="demo-simple-select-label">Payment Mode </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentMode}
          label="PaymentModeSelect"
          onChange={handleChange}
        >
          <MenuItem value={"Cards"} style={{ display: "flex" }}>
            Credit Card{" "}
            <img
              src="/public/VisaCardMasterCard.png"
              width="50px"
              style={{ marginLeft: "1vw" }}
            />{" "}
          </MenuItem>
          <MenuItem value={"MTN Mobile Money"}>
            MTN Mobile Money{" "}
            <img
              src="/public/MTNMobileMoney.png"
              width="30px"
              style={{ marginLeft: "1vw" }}
            />{" "}
          </MenuItem>
          <MenuItem value={"Vodafone Cash"}>
            Vodafone Cash{" "}
            <img
              src="/public/VodafoneCash.png"
              width="30px"
              style={{ marginLeft: "1vw" }}
            />{" "}
          </MenuItem>
          <MenuItem value={"AirtelTigo Money"}>
            AirtelTigo Money{" "}
            <img
              src="/public/AirtelTigoCash.png"
              width="30px"
              style={{ marginLeft: "1vw" }}
            />{" "}
          </MenuItem>
        </Select>
      </FormControl>

      {/* // FORM DISPLAY */}
      <div style={{ marginTop: "2vh" }}>
        {paymentMode === "" ? (
          ""
        ) : paymentMode === "Cards" ? (
          // CARDS FORM
          <div>
            <FormControl sx={{ width: 310, marginBottom: 1.5 }}>
              <InputLabel id="demo-simple-select-label">
                Payment Mode{" "}
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={CardType}
                label="PaymentModeSelect"
                onChange={handleCardTypeChange}
              >
                <MenuItem value={"Visa Card"} style={{ display: "flex" }}>
                  Visa Card{" "}
                </MenuItem>
                <MenuItem value={"Master Card"} style={{ display: "flex" }}>
                  Master Card{" "}
                </MenuItem>
              </Select>
            </FormControl>{" "}
            <br />
            {/* FIRST NAME */}
            <TextField
              sx={{ width: 150.5, marginBottom: 1.5, marginRight: 1 }}
              id="outlined-basic"
              label={"First Name"}
              variant="outlined"
              defaultValue={
                cardDetails !== "Cards" || cardDetails !== ""
                  ? cardDetails.FirstName
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  setUserSignUpData({
                    ...userData,
                    paymentDetails: {
                      ...userData.paymentDetails,
                      FirstName: e.target.value,
                    },
                  })
                );
              }}
            />
            {/* SURNAME */}
            <TextField
              sx={{ width: 150.5, marginBottom: 1.5 }}
              id="outlined-basic"
              label={"Surname"}
              variant="outlined"
              defaultValue={
                cardDetails !== "Cards" || cardDetails !== ""
                  ? cardDetails.Surname
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  setUserSignUpData({
                    ...userData,
                    paymentDetails: {
                      ...userData.paymentDetails,
                      Surname: e.target.value,
                    },
                  })
                );
              }}
            />
            {/* CARD NUMBER */}
            <TextField
              sx={{ width: 310, marginBottom: 1.5 }}
              id="outlined-basic"
              type="number"
              label={`${paymentMode} Number`}
              variant="outlined"
              defaultValue={
                cardDetails !== "Cards" || cardDetails !== ""
                  ? cardDetails.CardNumber
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  setUserSignUpData({
                    ...userData,
                    paymentDetails: {
                      ...userData.paymentDetails,
                      CardNumber: e.target.value,
                    },
                  })
                );
              }}
            />{" "}
            <br />
            {/* MONTH */}
            <FormControl
              sx={{ width: 92, marginBottom: 1.5, marginRight: 1.5 }}
            >
              <InputLabel id="demo-simple-select-label">Month </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Month}
                label="PaymentModeSelect"
                onChange={handleMonthChange}
              >
                {month.map((data, index) => (
                  <MenuItem
                    key={index}
                    value={data}
                    style={{ display: "flex" }}
                  >
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>{" "}
            {/* YEAR */}
            <FormControl sx={{ width: 91, marginBottom: 1, marginRight: 2 }}>
              <InputLabel id="demo-simple-select-label">Year </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Year}
                label="Year"
                onChange={handleYearChange}
              >
                {Years.map((data, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={data}
                      style={{ display: "flex" }}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* CVV */}
            <TextField
              sx={{ width: 94, marginBottom: 1.5 }}
              id="outlined-basic"
              type="number"
              label={"CVV"}
              defaultValue={
                cardDetails !== "Cards" || cardDetails !== ""
                  ? cardDetails.CVV
                  : ""
              }
              variant="outlined"
              onChange={(e) => {
                dispatch(
                  setUserSignUpData({
                    ...userData,
                    paymentDetails: {
                      ...userData.paymentDetails,
                      CVV: e.target.value,
                    },
                  })
                );
              }}
            />
          </div>
        ) : (
          // <TextField
          //   sx={{ width: 310 }}
          //   id="outlined-basic"
          //   type="number"
          //   label={`${paymentMode} Number`}
          //   variant="outlined"
          // />

          <TextField
            // label="Phone Number"

            variant="outlined"
            sx={{ width: 310 }}
            InputProps={{
              startAdornment: "",
              inputComponent: PhoneInputComponent,
              inputProps: {
                style: { width: "10%" },
              },
            }}
          />
        )}
      </div>
    </Box>
  );
}

function PhoneInputComponent() {
  const userData = useSelector(selectUserSignUpData);

  const { paymentType } = userData;

  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    userData?.paymentType !== undefined &&
    userData?.paymentDetails !== undefined
      ? paymentType !== "Cards" || paymentType !== ""
        ? setPhoneNumber(userData.paymentDetails.phoneNumber)
        : ""
      : "";
  }, [userData.cardDetails]);
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // alert(value);

    if (userData.paymentType !== "Cards" || userData.paymentType !== "") {
      dispatch(
        setUserSignUpData({
          ...userData,
          paymentDetails: { phoneNumber: value },
        })
      );
    }
    // numberPhone(value);
    // alert(numberPhone(e));
  };
  return (
    <PhoneInput
      required
      style={{
        height: "8.5vh",
        position: "relative",
        // width: "30vw",
        // width: "30%",
        // border: "2px solid ",
        borderRadius: "5px",
      }}
      defaultCountry="gh"
      // countries={["gh"]}
      // countries={["gh"]}
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
    />
  );
}
