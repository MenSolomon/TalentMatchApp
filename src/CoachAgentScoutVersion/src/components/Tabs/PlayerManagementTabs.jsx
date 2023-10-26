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
          <Typography sx={{ fontWeight: "bolder" }}>{children}</Typography>
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

export default function PlayerManagementTabs({
  PlayerManagementTabItemsArray,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ borderColor: "divider", flex: ".1" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            background: "transparent",
            borderRadius: "1vw",
            // border: "2px solid #5585fe",
            color: "white",
            // borderRight: "1px solid #0d818e",
            fontWeight: "bolder",
            // border: "1px solid green",
          }}
        >
          {/* REMIND ME TO ADD NAVIGATE BASED ON THE NAME OF THE SCREEN  */}

          {/* ======  The propertyDetails tabs are created with an array (PropertyTabItemsArray) a prop,  which is called when we use this component is used in the propertyDetails table .. This is for dynamic rendering of the NavBars in anyCase where we want to change or edit the menu items   */}

          {PlayerManagementTabItemsArray.map((data, key) => {
            return (
              <Tab
                className="primaryColor"
                label={data}
                sx={{
                  minWidth: "7vw",
                  // marginRight: "2vw",
                  fontWeight: "bold",
                }}
                {...a11yProps(key)}
              />
            );
          })}
        </Tabs>
      </Box>

      <Box sx={{ flex: ".9" }}>
        {PlayerManagementTabItemsArray.map((data, index) => {
          let TaskBarComponent = lazy(() =>
            import(
              `../../screens/playerManagementScreen/PlayerManagement${data
                .split(" ")
                .join("")}`
            )
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
    </Box>
  );
}
