import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import IconTooltip from "../../components/Tooltip/IconToolTip";
const StatisticsCurrentOverview = () => {
  const statisticsMenu = [
    {
      value: "Summary",
      label: "Summary",
    },
    {
      value: "Defensive",
      label: "Defensive",
    },
    {
      value: "Offensive",
      label: "Offensive",
    },

    {
      value: "Distribution",
      label: "Distribution",
    },
  ];
  const [statsCategory, setStatsCategory] = useState("Summary");

  const handleCategoryChange = (e) => {
    setStatsCategory(e.target.value);
    // alert(e.target.value);
  };

  useEffect(() => {
    console.log(statsCategory);
  }, [statsCategory]);

  // This is to lazy load the different category menus
  let TaskBarComponent = null;
  for (let i = 0; i < statisticsMenu.length; i++) {
    const { value } = statisticsMenu[i];

    if (statsCategory === value) {
      TaskBarComponent = lazy(() =>
        import(`./2ndDegreeSubScreens/OverviewScreen/${value}.jsx`)
      );
      break;
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", background: "red" }}
    >
      {/* <div style={{ flex: ".1", background: "red" }}>
        {" "}
        StatisticsCurrentOverview
      </div> */}
      <div style={{ flex: ".1", display: "flex", gap: "1vw" }}>
        {" "}
        <TextField
          id="outlined-select-currency"
          size="small"
          select
          onChange={handleCategoryChange}
          // label="Select"
          defaultValue="Summary"
          style={{
            width: "15%",
            marginRight: "1vw",

            border: ".6px solid white",
            borderRadius: ".3vw",
          }}
        >
          {statisticsMenu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* // TOOL TIP`` */}
        <IconTooltip
          info={
            "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
          }
          image="help"
        />
      </div>
      <div style={{ flex: ".9", paddingTop: "1.5vh" }}>
        {
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            }
          >
            <TaskBarComponent />
          </Suspense>
        }{" "}
      </div>
    </div>
  );
};

export default StatisticsCurrentOverview;
