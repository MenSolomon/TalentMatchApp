import { CircularProgress, MenuItem, TextField } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
// import ClubStatisticsTable from "./2ndDegreeSubScreens/PlayerStats/ClubStatisticsTable";

const PlayerStats = ({ Statistics }) => {
  const statisticsMenu = [
    // {
    //   value: "Club Stats",
    //   label: "Club Stats",
    // },
    // {
    //   value: "Country Stats",
    //   label: "Country Stats",
    // },
    {
      value: "General",
      label: "General",
    },
    {
      value: "Attack",
      label: "Attack",
    },
    {
      value: "Defense",
      label: "Defense",
    },
    {
      value: "Distribution",
      label: "Distribution",
    },
    {
      value: "Discipline",
      label: "Discipline",
    },
  ];
  const seasonsMenu = [
    // {
    //   value: "Overall",
    //   label: "Overall",
    // },
    {
      value: "23/24",
      label: "23/24",
    },
    {
      value: "22/23",
      label: "22/23",
    },
    {
      value: "21/22",
      label: "21/22",
    },
    {
      value: "20/21",
      label: "20/21",
    },
    {
      value: "19/20",
      label: "19/20",
    },
  ];

  const [statsCategory, setStatsCategory] = useState("Attack");
  const [statsSeason, setStatsSeason] = useState("23/24");

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
        import(`./2ndDegreeSubScreens/PlayerStats/${value}.jsx`)
      );
      break;
    }
  }

  return (
    <div
      className="md:w-[100%] md:flex md:overflow-y-hidden md:flex-col md:h-[40vh]  sm:w-[100%] sm:flex sm:flex-col sm:overflow-y-scroll sm:h-[40vh] sm:gap-[2vh]"
      style={
        {
          // background: "yellow",
          // width: "100%",
          // height: "40vh",
          // display: "flex",
          // flexDirection: "column",
          // overflowY: "scroll",
        }
      }
    >
      {/* // Select Category area */}
      <div
        className="md:flex md:flex-row md:gap-[0em]  sm:gap-[1em] sm:flex sm:flex-col"
        style={{ flex: ".18" }}
      >
        <TextField
          id="outlined-select-currency"
          size="small"
          select
          onChange={handleCategoryChange}
          // label="Select"
          defaultValue="Attack"
          className="md:w-[15%] sm:w-[90%]"
          style={{
            // width: "15%",
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
        <TextField
          id="outlined-select-currency"
          size="small"
          select
          // label="Select"
          defaultValue="23/24"
          className="md:w-[15%] sm:w-[90%]"
          // style={{ width: "15%" }}
          onChange={(e) => {
            // alert(e.target.value);
            setStatsSeason(e.target.value);
          }}
        >
          {seasonsMenu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{ flex: "82", paddingTop: "3vh" }}>
        {/* 
          <Suspense fallback={<div> ...Loading </div>}>
            <TaskBarComponent />
          </Suspense>
        } */}
        {TaskBarComponent ? (
          <Suspense
            fallback={
              <div
                // className="sm:flex md:flex-col"
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
            <TaskBarComponent
              Statistics={Statistics}
              Period={statsSeason.toString()}
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

export default PlayerStats;
