import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { AddOutlined, Close } from "@mui/icons-material";
import PlayerComparisonDrawer from "../Drawer/PlayerComparisonDrawer";
import PlayerCompareDisplayCard from "../Cards/PlayerComparisonFilterPageCards/PlayerCompareDisplayCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "95%",
  width: "95%",
  bgcolor: "background.paper",
  //   bgcolor: "peru",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  borderRadius: "10px",
  flexDirection: "column",
};

export default function PlayerComparisonModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton
        size="small"
        sx={{ background: "#5585FE" }}
        onClick={handleOpen}
      >
        <AddOutlined style={{ color: "white" }} />{" "}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="primaryTextColor background" sx={style}>
          {/* // COMPARISON HEADER */}

          <div
            style={{
              flex: "0.1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Player Comparison</h4>

            <IconButton style={{ position: "absolute", right: "0" }}>
              {" "}
              <Close />
            </IconButton>
          </div>

          {/* // PLAYER COMPARISON CARDS  */}
          <div style={{ flex: "0.9", display: "flex" }}>
            {/* =========================== */}

            {/* // FIRST PLAYER CARD AREA  */}
            <div
              style={{
                flex: ".33",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PlayerCompareDisplayCard />
            </div>

            {/* // SECOND PLAYER CARD AREA */}

            <div
              style={{
                flex: ".33",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PlayerComparisonDrawer />
            </div>

            {/* // THIRD PLAYER CARD AREA */}

            <div
              style={{
                flex: ".34",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>

            {/* ============================ */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
