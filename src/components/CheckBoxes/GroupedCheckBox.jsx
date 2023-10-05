import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxesGroup({ CheckboxLabel, checkboxArray }) {
  // Note Write a function to save the values selected in an array
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{CheckboxLabel}</FormLabel>
      <FormGroup>
        {checkboxArray &&
          checkboxArray?.map((data, index) => {
            return (
              <FormControlLabel
                key={index}
                control={<Checkbox name={data} />}
                label={data}
              />
            );
          })}
      </FormGroup>
    </FormControl>
  );
}
