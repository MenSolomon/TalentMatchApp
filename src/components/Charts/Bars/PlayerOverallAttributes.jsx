import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);
const PlayerOverallAttributes = () => {
  const data = {
    labels: [
      "attacking",
      "defending",
      "passing",
      "dribbling",
      "physical",
      "aeial",
      "speed",
    ],
    datasets: [
      {
        label: "Player Attributes",
        data: [13, 16, 19, 3, 8, 10, 3, 5],
        backgroundColor: "aqua",
        borderColor: "white",
        borderWidth: 2,
      },
      //   {
      //     label: "Defending",
      //     data: [3, 2, 19],
      //     backgroundColor: "red",
      //     borderColor: "black",
      //   },
    ],
  };

  const options = {};

  return (
    <div>
      <Radar data={data} options={options} style={{ width: "80%" }}></Radar>
    </div>
  );
};
// style={{ marginTop: "2vh", paddingLeft: ".6vw", paddingRight: ".6vw" }}
// > // <h6 style={{ fontWeight: "bolder" }}>Player Attributes</h6>

export default PlayerOverallAttributes;
