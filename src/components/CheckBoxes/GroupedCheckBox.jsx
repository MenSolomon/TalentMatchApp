import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentProfileFilterObject } from "../../statemanager/slices/SavedProfileSlice";
import { selectFilterModalType } from "../../statemanager/slices/OtherComponentStatesSlice";

export default function CheckboxesGroup({
  CheckboxLabel,
  checkboxArray,
  checkBoxesSelected,
}) {
  // Note Write a function to save the values selected in an array
  const currentProfileFilterObject = useSelector(
    selectCurrentProfileFilterObject
  );

  const { ContractStatusCheckBoxes } = currentProfileFilterObject;

  // const [value, setValue] = React.useState(
  // [
  //   "Free Agent",
  //   "Loan Listed",
  //   "Youth Player",
  //   "Transfer Listed",
  //   "Contract Expiring less than 6 months",
  //   "Currently renewed contract",
  // ]
  // );

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    ContractStatusCheckBoxes === undefined
      ? [
          "Free Agent",
          "Loan Listed",
          "Youth Player",
          "Transfer Listed",
          "Contract Expiring less than 6 months",
          "Currently renewed contract",
        ]
      : ContractStatusCheckBoxes
  );
  //  []

  const handleCheckboxChange = (event) => {
    const label = event.target.name;
    if (event.target.checked) {
      setSelectedCheckboxes((prevCheckboxes) => [...prevCheckboxes, label]);

      // checkBoxesSelected(selectedCheckboxes);
    } else {
      setSelectedCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((item) => item !== label)
      );
    }
  };

  useEffect(() => {
    console.log(selectedCheckboxes, "Selected Boxes");
    checkBoxesSelected(selectedCheckboxes);
  }, [selectedCheckboxes]);

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{CheckboxLabel}</FormLabel>
      <FormGroup>
        {checkboxArray &&
          checkboxArray?.map((data, index) => {
            const matchedBoxes = selectedCheckboxes.filter((item) => {
              return item === data;
            });

            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={data}
                    defaultChecked={matchedBoxes.length > 0 ? true : false}
                    onChange={handleCheckboxChange}
                  />
                }
                label={data}
              />
            );
          })}
      </FormGroup>
    </FormControl>
  );
}
