// // DatePickerTool.js

// import React from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { selectCurrentBrowserSize } from "../../../../statemanager/slices/OtherComponentStatesSlice";
// import { useSelector } from "react-redux";

// export default function DatePickerForEditPlayerModal({
//   label,
//   style,
//   containerStyle,
//   dateValue,
//   defaultValue,
// }) {
//   const handleDateChange = (date) => {
//     dateValue(date);
//   };

//   const browserSize = useSelector(selectCurrentBrowserSize);
//   let browserWidth = parseInt(browserSize?.width, 10);
//   // Parse the string into a Date object using dayjs
//   // const parsedDefaultValue = dayjs(defaultValue).toDate();
//   // const parsedDefaultValue = new Date(defaultValue);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer sx={{ ...containerStyle }} components={["DatePicker"]}>
//         <DatePicker
//           // value={dayjs(defaultValue)}
//           value={dayjs(defaultValue)}
//           onChange={handleDateChange}
//           sx={{ ...style, width: browserWidth >= 1024 ? "23vw" : "95vw" }}
//           // className="md:w-[23vw] sm:w-[100vw]"
//           label={label}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
// DatePickerTool.js

import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DatePickerForEditPlayerModal({
  label,
  style,
  containerStyle,
  dateValue,
  defaultValue,
}) {
  const handleDateChange = (date) => {
    dateValue(date);
  };

  // Parse the string into a Date object using dayjs
  // const parsedDefaultValue = dayjs(defaultValue).toDate();
  // const parsedDefaultValue = new Date(defaultValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ ...containerStyle }} components={["DatePicker"]}>
        <DatePicker
          // value={dayjs(defaultValue)}
          onChange={handleDateChange}
          sx={{ ...style }}
          label={label}
          className="md:w-[23vw] sm:w-[100%]"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
