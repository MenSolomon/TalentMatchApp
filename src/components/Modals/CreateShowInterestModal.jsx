import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "65vh",
  width: "55vw",
  bgcolor: "background.paper",
  //   border: "2px solid wheat",
  //   boxShadow: 24,
  borderRadius: "1vw",
  p: 5,
};

export default function CreateShowInterestModal({ playerName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {/* ========================= */}
      <Button
        sx={{
          textTransform: "none",

          fontWeight: "900",
          marginRight: "1vw",
          color: "white",
          background: "#5585FE",
        }}
        onClick={handleOpen}
      >
        {" "}
        Show Interest{" "}
      </Button>
      {/* ========================= */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="primaryTextColor cardBackground">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Player Name: Benjamin Bature
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <TextField
              id="outlined-multiline-static"
              label="Messages"
              rows={7}
              multiline
              //   defaultValue="Messages"
              sx={{ width: "45vw" }}
              type="text"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <Button
              sx={{
                textTransform: "none",

                fontWeight: "900",
                // marginLeft: "35vw",
                color: "white",
                background: "#5585FE",
              }}
            >
              submit
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
