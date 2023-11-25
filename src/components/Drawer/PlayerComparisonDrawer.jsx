import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { PersonAddAlt1 } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import PlayerComparisonDrawerTab from "../Tabs/PlayerComparisonTab";

export default function PlayerComparisonDrawer() {
  const [state, setState] = React.useState({
    right: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const ComparsionMenuTab = ["Filter", "Search"];

  const list = (anchor) => (
    <Box
      className="cardBackground primaryTextColor md:w-[100%] md:h-[100%] md:flex md:flex-col   sm:h-[100%] sm:flex sm:flex-col sm:w-[100%]"
      sx={{
        // width: 400,
        // height: "100%",
        padding: "3vh 1vw",
        // display: "flex",
        // flexDirection: "column",
        zIndex: "10000",
      }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* // Header  */}

      <div style={{ flex: ".08" }}>
        {" "}
        <h3> Add a player </h3>{" "}
      </div>

      {/* //Search and Filter Sections */}
      <div style={{ flex: ".92" }}>
        <PlayerComparisonDrawerTab
          PlayerComparisonTabItemsArray={ComparsionMenuTab}
        />
      </div>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button>{anchor} sat </Button> */}

          <PlayerProfileAdd clickFunction={toggleDrawer(anchor, true)} />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const PlayerProfileAdd = ({ clickFunction }) => {
  const themeProviderObject = useSelector(selectThemeProviderObject);

  const { primaryTextColor } = themeProviderObject;

  return (
    <>
      <div
        className="md:w-[12vw] md:h-[25vh] md:flex md:items-center md:justify-center  sm:w-[42vw] sm:h-[20vh] sm:flex sm:items-center sm:justify-center"
        onClick={clickFunction}
        style={{
          // width: "12vw",
          // height: "25vh",
          //   background: "green",
          border: `2px dashed ${primaryTextColor}`,
          borderRadius: "50%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <PersonAddAlt1 sx={{ fontSize: "6em" }} />
      </div>
      <h5 style={{ textAlign: "center", marginTop: "2vh" }}>Add Player </h5>
    </>
  );
};
