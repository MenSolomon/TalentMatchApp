import { Checkbox } from "@mui/material";

const InboxMessageCard = () => {
  return (
    <div
      className="messageCard cardBackground"
      style={{
        width: "100%",
        height: "24%",
        marginBottom: "1%",
        // background: "blue",
        display: "flex",
        padding: ".2vw",
        borderRadius: ".5vw",
        // borderLeft: "3px solid white",
        // border: "1px solid black",
      }}
    >
      {/* // CHECKBOX AREA */}
      <div style={{ flex: ".1" }}>
        <Checkbox />
      </div>
      {/* // MESSAGE CONTENT AREA */}
      <div
        style={{
          flex: ".9",
          display: "flex",
          flexDirection: "column",
          fontSize: ".9em",
        }}
      >
        {/* // FROM AND DATE */}
        <div style={{ flex: ".3", display: "flex" }}>
          {/* // MESSAGE FROM */}
          <span style={{ flex: ".7" }}>Dabo Academy</span>
          {/* // DATE RECEIVED */}
          <span
            style={{
              flex: ".3",
              textAlign: "right",
            }}
          >
            01/10/2023
          </span>
        </div>

        {/* // SUBJECT AND MESSAGE */}
        <div
          style={{
            flex: ".7",

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* SUBJECT */}
          <div style={{ flex: ".4" }}>Subject area</div>

          {/* MESSAGE */}
          <div style={{ flex: ".6" }}>
            MEssage this will work and it wikk wirk
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxMessageCard;
