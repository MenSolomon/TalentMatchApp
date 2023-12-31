import React, { Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentBrowserSize } from "../../statemanager/slices/OtherComponentStatesSlice";

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
          <Typography sx={{ fontWeight: "bolder", color: "white" }}>
            {children}
          </Typography>
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
  Nationality,
  PlaceOfBirth,
  DateOfBirth,
  clubName,
  contractStartDate,
  contactEndDate,
  Position,
  Statistics,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);

  return (
    <Box className="md:w-[100%]  sm:w-[90%]">
      <Box sx={{ borderColor: "divider" }}>
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

          {PlayerTabItemsArray.map((data, key) => {
            return (
              <Tab
                key={key}
                className="primaryColor"
                label={browserWidth >= 1024 ? data : `${data.slice(0, 3)}..`}
                // label={`${data.slice(0, 1)}..`}
                sx={{
                  maxWidth: browserWidth >= 1024 ? "10vw" : "0.5vw",
                  // width: "10vw",
                  // marginRight: "2vw",
                  fontWeight: "bold",
                  // textTransform: "none",
                }}
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
          import(`../../screens/subscreens/Player${data}.jsx`)
        );

        return (
          <>
            <CustomTabPanel value={value} index={index} key={index}>
              {/* {data} */}

              <Suspense
                fallback={
                  <div
                    className="md:w-[100%] md:flex md:justify-center  sm:w-[100%]  sm:flex sm:justify-center"
                    style={
                      {
                        // overflowY: "scroll",
                        // width: "100%",
                        // display: "flex",
                        // justifyContent: "center",
                      }
                    }
                  >
                    <CircularProgress />
                  </div>
                }
              >
                <TaskBarComponent
                  Nationality={Nationality}
                  PlaceOfBirth={PlaceOfBirth}
                  DateOfBirth={DateOfBirth}
                  clubName={clubName}
                  contractStartDate={contractStartDate}
                  contactEndDate={contactEndDate}
                  Position={Position}
                  Statistics={Statistics}
                />
              </Suspense>
            </CustomTabPanel>
          </>
        );
      })}
    </Box>
  );
}
