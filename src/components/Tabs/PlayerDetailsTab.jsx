import React, { Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PlayerDetailsMenuTab({
  PlayerTabItemsArray,
  totalUnits,
  activeUnits,
  propertyImage1,
  propertyImage2,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            background: "#F3F0EB",
            borderRadius: "1vw",
            borderBottom: "none",
          }}
        >
          {/* REMIND ME TO ADD NAVIGATE BASED ON THE NAME OF THE SCREEN  */}

          {/* ======  The propertyDetails tabs are created with an array (PropertyTabItemsArray) a prop,  which is called when we use this component is used in the propertyDetails table .. This is for dynamic rendering of the NavBars in anyCase where we want to change or edit the menu items   */}

          {PlayerTabItemsArray.map((data, key) => {
            return (
              <Tab
                label={data}
                sx={{ width: "10vw", marginRight: "2vw", fontWeight: "900" }}
                {...a11yProps(key)}
              />
            );
          })}
        </Tabs>
      </Box>

      {/*=================== NOTES MUST READ ===================
   +==============================================================+
     This array (PropertyTabItemsArray), dynamically imports and lazy loads the contents of the menu Items .. Note that each menu item's component is already Created with the respective Name in the path below  (The names are caps sensitive) .. CustomTabPanel is the component that holds the display of the Dynamically iimported Component ... TaskBarComponent is the name chosen to as a parameter for displaying the component....
   At line 98 where data is ==="OVerview", we are trying to make sure that the totalUnits, activeUnits , propertyImage1 and propertyImage2 are specifically sent to the Overview Component ..  This will be done for passing specific values to the other components as well with the tenary operators */}

      {PlayerTabItemsArray.map((data, index) => {
        let TaskBarComponent = lazy(() =>
          import(`../../screens/subscreens/Player${data}`)
        );

        return (
          <>
            <CustomTabPanel value={value} index={index} key={index}>
              {/* {data} */}

              <Suspense fallback={<div> ...Loading </div>}>
                <TaskBarComponent />
              </Suspense>
            </CustomTabPanel>
          </>
        );
      })}
    </Box>
  );
}