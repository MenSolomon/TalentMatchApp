import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerTool({
  label,
  style,
  containerStyle,
  dateValue,
  defaultValue,
}) {
  const handleDateChange = (date) => {
    dateValue(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ ...containerStyle }} components={["DatePicker"]}>
        <DatePicker
          className="md:w-[23vw] sm:w-[100%]"
          onChange={handleDateChange}
          sx={{ ...style }}
          label={label}
          defaultValue={defaultValue}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
