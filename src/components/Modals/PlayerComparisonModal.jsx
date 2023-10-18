import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { AddOutlined, Close } from "@mui/icons-material";
import PlayerComparisonDetails from "./PlayerComparisonDetails/PlayerComparisonDetails";

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
};

export default function PlayerComparisonModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="primaryTextColor cardBackground">
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
        <Box className="background" sx={style}>
          <div
            style={{
              flex: ".33",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlayerComparisonDetails />
          </div>
          <div
            style={{
              flex: ".33",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlayerComparisonDetails />
          </div>
          <div
            style={{
              flex: ".32",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlayerComparisonDetails />
          </div>
          <div
            style={{
              flex: ".02",

              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
            }}
            onClick={handleClose}
          >
            <Close />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
