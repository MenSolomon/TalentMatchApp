import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export default function DatePickerToolCreateAccount({
  label,
  style,
  containerStyle,
  dateValue,
  defaultValue,
  value,
}) {
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

  // const [DOB, setDOB] = useState(null);

  // // **** SHORT POLLING THE  Date of Birth FROM THE MRZ STORED IN THE SESSIONS STORAGE  ****
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const retrievedDOB = sessionStorage.getItem("birthDate");
  //     if (retrievedDOB && retrievedDOB !== DOB) {
  //       let formattedDate = convertMRZDateToStandardFormat(retrievedDOB);
  //       setDOB(formattedDate);
  //     }
  //   }, 100); // Adjust interval as needed

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, [DOB]);

  // // Function to convert MRZ date format to standard date format
  // function convertMRZDateToStandardFormat(mrzDate) {
  //   // Extracting components from MRZ date format
  //   const year = parseInt(mrzDate && mrzDate.substring(0, 2)); // Assuming two-digit year
  //   const month = parseInt(mrzDate && mrzDate.substring(2, 4));
  //   const day = parseInt(mrzDate && mrzDate.substring(4, 6));

  //   // Get the current year's last two digits
  //   const currentYearLastTwoDigits = parseInt(
  //     new Date().getFullYear().toString().slice(-2)
  //   );

  //   // Determine the century of the year based on the condition
  //   const century = year <= currentYearLastTwoDigits ? 2000 : 1900;

  //   // Creating a new Date object with the extracted components
  //   const standardDate = new Date(century + year, month - 1, day); // Add appropriate century to get full year, and subtract 1 from month since months are zero-based

  //   // Formatting the date into the desired format
  //   const options = {
  //     weekday: "short",
  //     day: "2-digit",
  //     month: "short",
  //     year: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     timeZone: "GMT",
  //   };
  //   const formattedDate = standardDate.toLocaleString("en-US", options);

  //   return formattedDate;
  // }

  // Ensure DOB is a valid date object or null
  // const parsedDOB = DOB ? new Date(DOB) : null;
  // const [value, setValue] = (useState < Dayjs) | (null > null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ ...containerStyle }} components={["DatePicker"]}>
        <DatePicker
          value={value} // Use parsedDOB as the value
          // defaultValue={}
          onChange={handleDateChange}
          sx={{ ...style }}
          label={label}
          className="md:w-[23vw] sm:w-[100%]"
          disableFuture
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
