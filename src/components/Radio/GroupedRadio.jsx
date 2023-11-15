import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function GroupedRadio({
  radioArray,
  labelName,
  selectedValue,
  radioDefault,
}) {
  // const filterModalType = useSelector(selectFilterModalType);

  // const [value, setValue] = React.useState(
  //   filterModalType === "Create"
  //     ? [0, max]
  //     : filterModalType === "Edit"
  //     ? editDefaultValue
  //     : [0, max]
  // );

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{labelName}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={radioDefault}
        onChange={(e) => {
          selectedValue(e.target.value);
        }}
      >
        {radioArray &&
          radioArray?.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data}
              control={<Radio />}
              label={data}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
