import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function GroupedRadio({ radioArray, labelName }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{labelName}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
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
