import PlayerStatsDoughnut from "../../../../components/Charts/Doughnut/PlayerStatsDoughnut";

const Distribution = () => {
  return (
    <div
      className="primaryColor"
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      {/* PASS SUCCESS GRAPHS */}
      <div style={{ flex: ".4", display: "flex" }}>
        {/* Successful passes */}
        <div
          style={{
            flex: ".5",
            display: "grid",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          {" "}
          Passes
          <PlayerStatsDoughnut Percentage2ValuesArray={[50, 10]} />{" "}
        </div>
        <div
          style={{
            flex: ".5",
            display: "grid",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          Long Passes
          <PlayerStatsDoughnut Percentage2ValuesArray={[50, 10]} />{" "}
        </div>
      </div>
      {/* Pass Direction , Passing Area and Other Ball Distribution info */}
      <div style={{ flex: ".6", display: "flex" }}>
        {/* // Passing Areas */}
        <div style={{ flex: ".3", padding: ".75vw" }}>
          {" "}
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid #5585fe",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* // Box to divide the field */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderBottom: "2px solid #5585fe",
                flex: ".5",
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Opp Half
              {/* // Center Circle div Nested in the box to divide the field */}
              <div
                style={{
                  position: "absolute",
                  width: "35%",
                  height: "62%",
                  border: "2px solid #5585fe",
                  borderRadius: "50%",
                  bottom: "-30%",
                }}
              ></div>
            </div>
            <div
              style={{ flex: ".5", display: "grid", placeContent: "center" }}
            >
              Own half
            </div>
          </div>{" "}
        </div>
        <div style={{ flex: ".35", padding: ".75vw", textAlign: "center" }}>
          {/* // diagonal Container */}
          Pass Direction
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              // border: "1.5px solid white",
            }}
          >
            {/* TOp direction */}
            <span
              style={{
                textAlign: "center",
                position: "absolute",
                left: "40%",
                top: "2vh",
              }}
            >
              {" "}
              Top <br /> 10%{" "}
            </span>
            {/* left Direction */}
            <span
              style={{
                textAlign: "center",
                position: "absolute",
                left: "15%",
                top: "10vh",
              }}
            >
              {" "}
              Left <br /> 10%{" "}
            </span>
            {/* Right Direction */}
            <span
              style={{
                textAlign: "center",
                position: "absolute",
                left: "70%",
                top: "10vh",
              }}
            >
              {" "}
              Right <br /> 10%{" "}
            </span>
            {/* Bottom Direction */}
            <span
              style={{
                textAlign: "center",
                position: "absolute",
                left: "37%",
                top: "19vh",
              }}
            >
              {" "}
              Bottom <br /> 10%{" "}
            </span>
            {/* // Line One  */}
            <div
              style={{
                width: "100%",
                height: "1px",
                position: "absolute",
                background: "black",
                opacity: ".4",
                transform: "rotate(45deg)",
                top: "calc(50% - 1px)",
                left: "0",
              }}
            ></div>
            {/* Line Two */}
            <div
              style={{
                width: "100%",
                height: "1px",
                position: "absolute",
                opacity: ".4",
                background: "black",
                transform: "rotate(-45deg)",
                top: "calc(50% - 1px)",
                left: "0",
              }}
            ></div>
            {/* Circle */}
            <div
              style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                borderRadius: "50%",
                background: "#5585fe",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            flex: ".35",
            display: "flex",
            gap: ".8vw",
            flexWrap: "wrap",
          }}
        >
          <AttributesToFormat name="Total passes" number="120" />
          <AttributesToFormat name="Successful passes" number="60" />

          <AttributesToFormat name="Passes per 90mins" number="6" />
          <AttributesToFormat name="Key passes" number="15" />
        </div>
      </div>
    </div>
  );
};

export default Distribution;

export const AttributesToFormat = ({ number, name }) => {
  return (
    <span className="primaryColor" style={{ textAlign: "center" }}>
      {" "}
      <span
        style={{
          margin: "0",
          color: "#5585fe",
          fontWeight: "bolder",
          fontSize: "1.2em",
        }}
      >
        {number}
      </span>{" "}
      <br />
      <span style={{ fontSize: ".8em" }}> {name} </span>{" "}
    </span>
  );
};
