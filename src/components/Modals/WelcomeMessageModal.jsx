import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import welcomMessageImage from "../../assets/images/WelcomeImage.jpg";
// import welcomMessageImage from "../../assets/images/animatedFootbal.svg";
import logoImage from "../../assets/images/AppLogoBlue.png";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import BasicButton from "../Buttons/BasicButton";
import CreateProfileModal from "./CreateProfileModal";
import { selectUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92.5%",
  height: "97%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "4vw",
  paddingLeft: "4.5vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

export default function WelcomeMessageModal() {
  const LoginUserDetails = useSelector(selectUserDetailsObject);
  const userSavedProfiles = useSelector(selectUserSavedProfiles);

  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  //   const handleClose = () => setOpen(false);

  // const { savedProfile } = LoginUserDetails;
  const [open, setOpen] = React.useState(
    userSavedProfiles.length > 0 ? false : true
  );

  React.useEffect(() => {
    if (userSavedProfiles.length > 0) {
      setOpen(false);
    }
  }, [userSavedProfiles]);

  return (
    <div>
      {/* <Button
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
      </Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cardBackground primaryTextColor" style={style}>
          {/* // Container DIV */}

          <div style={{ width: "100%", height: "100%", display: "flex" }}>
            {/* MEssage Area */}
            <div style={{ flex: ".4" }}>
              <img
                style={{ width: "120px", marginBottom: "6vh" }}
                src={logoImage}
              />

              <h1>Hello!</h1>
              <h2 style={{ marginBottom: "4vh" }}>
                Welcome {LoginUserDetails.firstName}{" "}
              </h2>

              <h5
                style={{
                  lineHeight: "1.5",
                  marginBottom: "3vh",
                  color: "#9FA4B1",
                }}
              >
                Step into the world of football talent discovery! 🌟 Your
                journey starts here. Create your default search profile and dive
                into a sea of potential. Together, we'll unlock stars waiting to
                shine. Get scouting and let the talent hunt begin!" 🚀
                {/*  🌠💫 */}
              </h5>

              <CreateProfileModal />

              <p>
                Learn more our{" "}
                <span style={{ color: "#5585FE", cursor: "pointer" }}>
                  terms and conditions{" "}
                </span>{" "}
                and{" "}
                <span style={{ color: "#5585FE", cursor: "pointer" }}>
                  privacy policy{" "}
                </span>{" "}
                .
              </p>
            </div>
            {/* IMAGE AREA */}
            <div
              style={{
                flex: ".6",
                // background: "red",
                padding: "2vw",
                paddingLeft: "7%",
                // backgroundImage: `url(${welcomMessageImage})`,
                // backgroundSize: "cover",
              }}
            >
              <img
                //  src={welcomMessageImage}
                src="https://img.freepik.com/free-vector/sports-games-abstract-concept-illustration_335657-3748.jpg?w=740&t=st=1699350181~exp=1699350781~hmac=f6d2e24718cbb074e2d045449df6b748f1ca15ab8978f571dab6db342f17b2ef"
                width="550px"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
