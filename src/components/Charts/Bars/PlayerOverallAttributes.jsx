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
        backgroundColor: "red", // Set the background color here
        borderColor: "#5585FE",
        borderWidth: 2,
        pointBackgroundColor: "#5585FE", // Set the dot color
        pointBorderColor: "white", // Set the dot border color
        fill: "origin", // Connect dots with filled area
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 20,
        ticks: {
          stepSize: 1,
          callback: (value, tick, values) => {
            console.log(value);
          },
        },
        pointLabels: {
          display: true,
          font: 0,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <div>
      <Radar data={data} options={options} style={{ width: "80%" }}></Radar>
    </div>
  );
};
// style={{ marginTop: "2vh", paddingLeft: ".6vw", paddingRight: ".6vw" }}
// > // <h6 style={{ fontWeight: "bolder" }}>Player Attributes</h6>

export default PlayerOverallAttributes;
