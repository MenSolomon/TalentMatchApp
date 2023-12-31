import React from "react";

const CountryStats = () => {
  return (
    <>
      {/* // Div for housing the statistics */}
      <div
        style={{
          width: "100%",
          // height: "100%",
          display: "flex",
          flexDirection: "column",
          // background: "blue",
          marginBottom: "2vh",
        }}
      >
        <div style={{ flex: ".15", width: "80%" }}>
          {" "}
          <h6 style={{ float: "left" }}>National Team statistics</h6>{" "}
          <div style={{ float: "right", color: "blue" }}>See all</div>{" "}
        </div>
        <div>
          <table className="primaryColor" style={{ width: "80%" }}>
            <thead style={{ height: "3vh" }}>
              <tr>
                {" "}
                <th> Competition </th> <th> FC </th> <th> FA </th> <th> YC </th>{" "}
                <th> RC </th> <th> G </th> <th> A </th> <th> SH </th>{" "}
                <th> ST </th> <th> OF </th> <th> MinP </th> <th> SubOn </th>{" "}
                <th> SubOff </th>{" "}
              </tr>
            </thead>
            <tbody>
              {" "}
              <tr style={{ borderBottom: "1px solid #F0F6F6" }}>
                {" "}
                <td>English Premier League</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
              </tr>{" "}
              <tr style={{ borderBottom: "1px solid #F0F6F6" }}>
                {" "}
                <td>English League Cup</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
              </tr>{" "}
            </tbody>
          </table>
        </div>
      </div>

      {/* Div for housing the last 5 Club Matches Statistics
       */}
      <div
        style={{
          width: "100%",
          // height: "100%",
          display: "flex",
          flexDirection: "column",
          // background: "blue",
        }}
      >
        <div style={{ flex: ".15", width: "80%", paddingTop: "2vh" }}>
          {" "}
          <h6 style={{ float: "left" }}>Last 5 National matches</h6>{" "}
          <div style={{ float: "right", color: "blue" }}>See all</div>{" "}
        </div>
        <div>
          <table style={{ width: "100%" }}>
            <thead style={{ height: "3vh" }}>
              <tr>
                {" "}
                <th> Competition </th> <th> Team </th> <th> Date </th>{" "}
                <th> Opp </th> <th> Result </th> <th> FC </th> <th> FA </th>{" "}
                <th> YC </th> <th> RC </th> <th> G </th> <th> A </th>{" "}
                <th> SH </th> <th> ST </th> <th> OF </th> <th> MinP </th>{" "}
                <th> SubOn </th> <th> SubOff </th>{" "}
              </tr>
            </thead>
            <tbody>
              {" "}
              <tr style={{ borderBottom: "1px solid #F0F6F6" }}>
                {" "}
                <td>English Premier League</td> <td>Man u</td>{" "}
                <td>fri 09/23</td> <td>CHE</td> <td>W4-0</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td>{" "}
              </tr>{" "}
              <tr style={{ borderBottom: "1px solid #F0F6F6" }}>
                {" "}
                <td>English Premier League</td> <td>Man u</td>{" "}
                <td>fri 09/23</td> <td>CHE</td> <td>W4-0</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td>{" "}
                <td>1</td>{" "}
              </tr>{" "}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CountryStats;
