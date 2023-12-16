import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import BasicButton from "../../../../components/Buttons/BasicButton";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../Firebase/Firebase";
import {
  setCloseCircularLoadBackdrop,
  setOpenCircularLoadBackdrop,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "52vh",
  border: "2px solid #000",
  borderRadius: "1vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const htagStyle = { margin: 0 };

export default function DeleteVideoModal({
  title,
  uploadedDate,
  views,
  url,
  id,
  uploaderId,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

  const handleDeleteVideo = async () => {
    const storage = getStorage();

    // Replace %20 with a space and %2F with a slash (/) in the extracted path
    const correctedPath = decodeURIComponent(
      url.replace(/%20/g, " ").replace(/%2F/g, "/")
    );

    // Use a regular expression to capture the desired part
    const matchResult = correctedPath.match(
      /\/videos\/([^?]+)\?alt=media&token=/
    );

    // Extract the captured part
    const correctedString = matchResult ? matchResult[1] : "";
    // alert(`videos/${correctedString}`);

    const userWhoUploadedId = uploaderId || userLoginDetailsObject?.accountId;

    // alert(
    //   uploaderId +
    //     userWhoUploadedId +
    //     userLoginDetailsObject?.accountId +
    //     "    " +
    //     correctedString
    // );
    dispatch(setOpenCircularLoadBackdrop());

    // Create a reference to the file to delete
    const desertRef = ref(storage, `videos/${correctedString}`);
    deleteObject(desertRef)
      .then(async () => {
        // File deleted successfully
        if (userWhoUploadedId === undefined) {
          await deleteDoc(
            doc(
              db,
              `players_database/${userLoginDetailsObject?.accountId}/videos`,
              id
            )
          );

          handleClose();
        } else {
          await deleteDoc(
            doc(db, `players_database/${userWhoUploadedId}/videos`, id)
          );

          handleClose();
        }
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        dispatch(setCloseCircularLoadBackdrop());
      });
    dispatch(setCloseCircularLoadBackdrop());
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        {" "}
        <DeleteForever />{" "}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              height: "100%",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: ".2" }}>
              {" "}
              <h3>Do you want to permanently delete this video</h3>
            </div>
            {/* // Video and descriotion area */}
            <div style={{ flex: ".55", padding: "1vw" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",

                  display: "flex",
                  gap: "1vw",
                }}
              >
                {/* // video */}
                <div style={{ flex: ".3" }}>
                  <video style={{ height: "18vh" }} src={url}></video>
                </div>
                <div style={{ flex: ".6" }}>
                  <h6>{title}</h6>
                  <h6>Uploaded {uploadedDate}</h6>
                  <h6 style={{ ...htagStyle }}>views {views}</h6> {uploaderId}
                </div>
              </div>
            </div>
            {/* // Confirmation buttons */}
            <div
              style={{
                flex: ".25",

                display: "flex",
                gap: "1.5vw",
                padding: "1vw",
              }}
            >
              <BasicButton
                onClick={() => {
                  handleClose();
                }}
                style={{ width: "10vw" }}
                innerText="Cancel"
              />
              <BasicButton
                onClick={() => {
                  handleDeleteVideo();
                }}
                style={{ width: "10vw" }}
                innerText="Delete"
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
