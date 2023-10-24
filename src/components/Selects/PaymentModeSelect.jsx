import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

export default function PaymentModeSelect() {
  const [paymentMode, setPaymentMode] = React.useState("");
  const [CardType, setCardType] = React.useState("");
  const [Month, setMonth] = React.useState("");
  const [Year, setYear] = React.useState("");

  const handleChange = (event) => {
    setPaymentMode(event.target.value);
  };
  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
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
                <MenuItem value={"Cards"} style={{ display: "flex" }}>
                  Visa Card{" "}
                </MenuItem>
                <MenuItem value={"Cards"} style={{ display: "flex" }}>
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
            />
            {/* SURNAME */}
            <TextField
              sx={{ width: 150.5, marginBottom: 1.5 }}
              id="outlined-basic"
              label={"Surname"}
              variant="outlined"
            />
            {/* CARD NUMBER */}
            <TextField
              sx={{ width: 310, marginBottom: 1.5 }}
              id="outlined-basic"
              type="number"
              label={`${paymentMode} Number`}
              variant="outlined"
            />{" "}
            <br />
            {/* MONTH */}
            <FormControl sx={{ width: 92, marginBottom: 1.5, marginRight: 2 }}>
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
            <FormControl sx={{ width: 93, marginBottom: 1.5, marginRight: 2 }}>
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
              sx={{ width: 92, marginBottom: 1.5 }}
              id="outlined-basic"
              type="number"
              label={"CVV"}
              variant="outlined"
            />
          </div>
        ) : (
          <TextField
            sx={{ width: 310 }}
            id="outlined-basic"
            type="number"
            label={`${paymentMode} Number`}
            variant="outlined"
          />
        )}
      </div>
    </Box>
  );
}
