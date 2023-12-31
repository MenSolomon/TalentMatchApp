// import { BarChart } from "@mui/x-charts/BarChart";

// const chartSetting = {
//   xAxis: [
//     {
//       label: "rainfall (mm)",
//     },
//   ],
//   width: 500,
//   height: 400,
// };
// const dataset = [
//   {
//     london: 59,
//     paris: 57,
//     newYork: 86,
//     seoul: 21,
//     month: "Jan",
//   },
//   {
//     london: 50,
//     paris: 52,
//     newYork: 78,
//     seoul: 28,
//     month: "Fev",
//   },
//   {
//     london: 47,
//     paris: 53,
//     newYork: 106,
//     seoul: 41,
//     month: "Mar",
//   },
//   {
//     london: 54,
//     paris: 56,
//     newYork: 92,
//     seoul: 73,
//     month: "Apr",
//   },
//   {
//     london: 57,
//     paris: 69,
//     newYork: 92,
//     seoul: 99,
//     month: "May",
//   },
//   {
//     london: 60,
//     paris: 63,
//     newYork: 103,
//     seoul: 144,
//     month: "June",
//   },
//   {
//     london: 59,
//     paris: 60,
//     newYork: 105,
//     seoul: 319,
//     month: "July",
//   },
//   {
//     london: 65,
//     paris: 60,
//     newYork: 106,
//     seoul: 249,
//     month: "Aug",
//   },
//   {
//     london: 51,
//     paris: 51,
//     newYork: 95,
//     seoul: 131,
//     month: "Sept",
//   },
//   {
//     london: 60,
//     paris: 65,
//     newYork: 97,
//     seoul: 55,
//     month: "Oct",
//   },
//   {
//     london: 67,
//     paris: 64,
//     newYork: 76,
//     seoul: 48,
//     month: "Nov",
//   },
//   {
//     london: 61,
//     paris: 70,
//     newYork: 103,
//     seoul: 25,
//     month: "Dec",
//   },
// ];

// const valueFormatter = (value) => `${value}mm`;

// function PlayerGoalDetailsGraph() {
//   return (
//     <BarChart
//       dataset={dataset}
//       yAxis={[{ scaleType: "band", dataKey: "month" }]}
//       series={[{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }]}
//       layout="horizontal"
//       {...chartSetting}
//     />
//   );
// }
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(BarElement, CategoryScale, Legend, LinearScale, Tooltip);

const PlayerGoalDetailsGraph = ({ TotalShots, ShotsOnTarget, GoalsScored }) => {
  const data = {
    labels: ["Total shots", "Shots on target", "Goals scored"],
    datasets: [
      {
        label: "Goals",
        data: [TotalShots, ShotsOnTarget, GoalsScored],
        backgroundColor: "#1A56DB",
        borderColor: "#1A56DB",
        borderRadius: 0,
        // #5585FE
        borderWidth: 0.4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: { display: true },
      y: { display: true },
    },
    roundedBars: {
      borderRadius: 15,
    },
  };

  return (
    <div
      className="md:mt-[1vh] md:pl-[.6vw] md:pr-[.6vw]    sm:mt-[1vh] sm:pl-[.6vw] sm:pr-[.6vw]"
      // style={{ marginTop: "1vh", paddingLeft: ".6vw", paddingRight: ".6vw" }}
    >
      {/* <h6 style={{ fontWeight: "bolder" }}>Last 5 matches G/A ratio</h6> */}
      <Bar
        data={data}
        options={options}
        style={{ marginTop: "0vh" }}
        className="md:w-[20%] md:h-[15vh] sm:w-[100%] sm:h-[35vh]"

        // style={{ background: "transparent" ,padding:"1px"}}
      ></Bar>
    </div>
  );
};

export default PlayerGoalDetailsGraph;
