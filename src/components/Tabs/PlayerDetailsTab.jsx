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
  matchIdFromPlayerDatabase,
  allMatchesPlayedArray,
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
            color: "white",
            fontWeight: "bolder",
          }}
        >
          {PlayerTabItemsArray.map((data, key) => (
            <Tab
              key={key}
              className="primaryColor"
              label={browserWidth >= 1024 ? data : `${data.slice(0, 3)}..`}
              sx={{
                maxWidth: browserWidth >= 1024 ? "10vw" : "0.5vw",
                fontWeight: "bold",
              }}
              {...a11yProps(key)}
            />
          ))}
        </Tabs>
      </Box>

      {PlayerTabItemsArray.map((data, index) => {
        const TaskBarComponent = lazy(() =>
          import(`../../screens/subscreens/Player${data}.jsx`).catch(
            (error) => {
              console.error(`Error loading component Player${data}:`, error);
              return { default: () => <div>Error loading component</div> };
            }
          )
        );

        return (
          <React.Fragment key={index}>
            <CustomTabPanel value={value} index={index}>
              <Suspense
                fallback={
                  <div className="md:w-[100%] md:flex md:justify-center  sm:w-[100%]  sm:flex sm:justify-center">
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
                  matchIdFromPlayerDatabase={matchIdFromPlayerDatabase}
                  allMatchesPlayedArray={allMatchesPlayedArray}
                />
              </Suspense>
            </CustomTabPanel>
          </React.Fragment>
        );
      })}
    </Box>
  );
}
