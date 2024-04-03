// DatePickerTool.js

import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { selectCurrentBrowserSize } from "../../../../statemanager/slices/OtherComponentStatesSlice";
import { useSelector } from "react-redux";

export default function DatePickerToolCreatePlayer({
  label,
  style,
  containerStyle,
  dateValue,
  defaultValue,
}) {
  // const handleDateChange = (date) => {
  //   dateValue(date);
  // };

  const handleDateChange = (date) => {
    // Check if selected date is older than 16 years from today
    const minAgeInMilliseconds = 16 * 365.25 * 24 * 60 * 60 * 1000;
    const today = dayjs();
    const selectedDate = dayjs(date);
    const ageInMilliseconds = today.diff(selectedDate);

    // alert(ageInMilliseconds < minAgeInMilliseconds);
    if (ageInMilliseconds < minAgeInMilliseconds) {
      // alert("You must be 16 years or older to select a date.");
      return; // Prevent setting invalid date
    } else {
      dateValue(date);
      // alert(date.toString());
      console.log(date);
    }
  };

  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // Parse the string into a Date object using dayjs
  // const parsedDefaultValue = dayjs(defaultValue).toDate();
  // const parsedDefaultValue = new Date(defaultValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ ...containerStyle }} components={["DatePicker"]}>
        <DatePicker
          // value={dayjs(defaultValue)}
          value={dayjs(defaultValue)}
          onChange={handleDateChange}
          sx={{ ...style, width: browserWidth >= 1024 ? "23vw" : "95vw" }}
          // className="md:w-[23vw] sm:w-[100vw]"
          label={label}
          disableFuture
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
