import { Paper } from "@mui/material";
import SubscribeTrialCardHeader from "../Cards/SubscribeTrialCardHeader";

const SubscribeTrialLeftPaper = ({ iconImage }) => {
  return (
    <>
      <div
        style={{
          width: "70%",
          height: "75%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "0.5",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: "0.3",

              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <img src={iconImage} width="100px" />
          </div>

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
                  Start your free trial for 15 <br /> days
                </h5>
                <h5 style={{ fontWeight: "bold" }}>Independent Coach</h5>
                <small>
                  Doesn't suit you ? <span>change your membership</span>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: "0.1",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <h6 style={{ fontWeight: "bold" }}>Video Packs</h6>
        </div>
        <div
          style={{
            flex: "0.4",
            // padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            // background: "red",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <SubscribeTrialCardHeader
              tittle={"Talent Video"}
              amount={"200.00"}
              text={"every"}
            />
            <SubscribeTrialCardHeader
              tittle={"Talent Video"}
              amount={"200.00"}
              text={"every"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribeTrialLeftPaper;
