import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import BasicButton from "../Buttons/BasicButton";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../Firebase/Firebase";
import { selectUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentBrowserSize } from "../../statemanager/slices/OtherComponentStatesSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50vw",
  height: "52vh",
  border: "2px solid #000",
  borderRadius: "1vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const htagStyle = { margin: 0 };

export default function DeleteProfileModal({ profileName }) {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // width: browserWidth >= 1024 ? "9vw" : "40vw",

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const UserSavedProfiles = useSelector(selectUserSavedProfiles);
  const loginUserDetails = useSelector(selectUserDetailsObject);
  const handleDeleteProfile = async () => {
    try {
      alert(profileName);

      // Wriete a dispatch in the createProfile modal to reterieve the id of currently clickd profile so we can use tgat for easy deleting
      const filteredProfileObject = UserSavedProfiles.find((data) => {
        return data.label.toLowerCase() === profileName.toLowerCase();
      });

      console.log(filteredProfileObject);

      await deleteDoc(
        doc(
          db,
          `users_db/${loginUserDetails?.accountId}/SavedProfiles`,
          filteredProfileObject.labelId
        )
      );
      Navigate(`/profile/Default`);
      // write a snackbar funtion to aleret successful delete
    } catch (error) {
      console.error(error);
      alert("error deleting");
    }
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
        <Box className="sm:w-[85vw] md:w-[50vw]" sx={style}>
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
              <h3>Do you want to permanently delete this profile</h3>
            </div>
            {/* // Video and descriotion area */}
            <div style={{ flex: ".55", padding: "1vw" }}>
              <h2>
                {" "}
                <b> {profileName} </b>{" "}
              </h2>
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
                // className="sm:w-[35vw] md:w-[10vw]"
                style={{
                  width: browserWidth >= 1024 ? "10vw" : "40vw",
                  height: browserWidth >= 1024 ? "10vh" : "5vh",
                }}
                innerText="Cancel"
              />
              <BasicButton
                onClick={() => {
                  handleDeleteProfile();
                }}
                style={{
                  width: browserWidth >= 1024 ? "10vw" : "40vw",
                  height: browserWidth >= 1024 ? "10vh" : "5vh",
                }}
                // className="sm:w-[35vw] md:w-[10vw]"
                innerText="Delete"
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
