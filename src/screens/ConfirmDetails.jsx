import { useNavigate } from "react-router-dom";
import { selectRoleSelected } from "../statemanager/slices/SignupStepperSlice";
import { useSelector } from "react-redux";
import { Button, Card, Checkbox, FormControlLabel } from "@mui/material";
import PaymentModeSelect from "../components/Selects/PaymentModeSelect";
import BasicButton from "../components/Buttons/BasicButton";
import moment from "moment/moment";

const ConfirmDetails = () => {
  const navigate = useNavigate();
  const roleSelected = useSelector(selectRoleSelected);

  const today = moment();

  // Add one month to the current date
  const oneMonthLater = today.add(1, "months");

  // Now, 'oneMonthLater' contains the date one month from today
  console.log(oneMonthLater.format("MMMM Do YYYY, h:mm a"));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "0px 6vw",
      }}
    >
      {/*MEMEBERSHIP PLAN HEADER and USER DETAILS SUMMARY */}

      <div
        style={{
          flex: ".7",
          // background: "yellow",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* MEMBERSHIP PLAN HEADER CARD */}
        <div
          style={{
            flex: "0.3",
            display: "flex",
            paddingLeft: "10%",
          }}
        >
          {/* IMAGE AREA */}
          <div
            style={{
              flex: "0.3",

              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* 

 */}

            {roleSelected === "Player" ? (
              <img src="/public/playerImage.png" width="70px" height="80px" />
            ) : roleSelected === "Agent" ? (
              <img src="/public/agentImage.png" width="100px" />
            ) : roleSelected === "Coach" ? (
              <img src="/public/coachImage.png" width="100px" />
            ) : roleSelected === "Scout" ? (
              <img src="/public/scoutImage.png" width="100px" />
            ) : (
              <img alt="No Role selected" width="100px" />
            )}
          </div>
          {/* FREE TRIAL HEADER AND CHANGE MEMBERSHIP OPTION AREA */}
          <div
            style={{
              flex: "0.7",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <h5 style={{ fontWeight: "bold" }}>
                  Start your free trial for 90 <br /> days
                </h5>
                <h5 style={{ fontWeight: "bold" }}>{roleSelected}</h5>
                <small>
                  Doesn't suit you ?{" "}
                  <span
                    style={{ color: "#5585FE", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/create-account/freetrial");
                    }}
                  >
                    change your membership
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* USER DETAILS SUMMARY  */}
        <div
          style={{
            flex: "0.7",
            padding: "1vh 3vw",
            // background: "green",
            display: "flex",
          }}
        >
          {/* // PADDING CONTAINER */}
          <div style={{ flex: ".6" }}>
            <h5>User details</h5>
          </div>

          {/* ORDER CONFIRMATION CARD */}

          <div style={{ flex: ".4" }}>
            <Card sx={{ width: "97%", height: "100%", padding: ".5vw" }}>
              <h6 style={{ fontWeight: "bolder" }}>Package Summary</h6>

              <ul style={{ width: "90%", fontSize: ".8em" }}>
                {" "}
                <li>
                  Membership{" "}
                  <span style={{ float: "right", fontWeight: "bolder" }}>
                    $0
                  </span>{" "}
                </li>
                <li>
                  Package{" "}
                  <span style={{ float: "right", fontWeight: "bolder" }}>
                    $10
                  </span>{" "}
                </li>
                <li>
                  Subscription total{" "}
                  <span style={{ float: "right", fontWeight: "bolder" }}>
                    $10
                  </span>{" "}
                </li>
                <li>
                  Tax{" "}
                  <span style={{ float: "right", fontWeight: "bolder" }}>
                    $0
                  </span>{" "}
                </li>
                <li>
                  Discount{" "}
                  <span style={{ float: "right", fontWeight: "bolder" }}>
                    $0
                  </span>{" "}
                </li>
                <li style={{ fontSize: "1.4em" }}>
                  Total{" "}
                  <span style={{ float: "right", fontWeight: "bolder" }}>
                    $10
                  </span>{" "}
                </li>{" "}
              </ul>

              <BasicButton
                style={{ width: "90%", marginLeft: "5%" }}
                innerText="Start Trial"
              ></BasicButton>

              <span
                style={{
                  fontSize: ".7em",
                  fontStyle: "italic",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {" "}
                You will be automatically charged or prompted to pay on{" "}
                {oneMonthLater.format("MMMM Do YYYY, h:mm a")} after trial end{" "}
              </span>
            </Card>
          </div>
        </div>
      </div>
      {/* // INVOICE SUMMARY , PAYMENT MODE , TERMS AND CONDITION */}

      <div style={{ flex: ".3" }}>
        <h5>Terms and conditions</h5>

        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <div style={{ fontSize: ".8em" }}>
              {" "}
              I agree with the{" "}
              <span style={{ color: "#5585FE" }}>
                terms and conditions
              </span>{" "}
            </div>
          }
        />
        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <div style={{ fontSize: ".8em" }}>
              {" "}
              I accept Talent Match's
              <span style={{ color: "#5585FE" }}> privacy policy</span>{" "}
            </div>
          }
        />

        <h5 style={{ marginTop: "1vh" }}>Add payment</h5>

        <PaymentModeSelect />
      </div>
    </div>
  );
};

export default ConfirmDetails;
