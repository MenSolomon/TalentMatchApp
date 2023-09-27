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

const PlayerPositionStatsBarGraphSummary = () => {
  const data = {
    labels: ["match1", "match2", "match3", "match4", "match5"],
    datasets: [
      {
        label: "Assist",
        data: [1, 1, 2, 3, 2],
        backgroundColor: "#FDBA8C",
        borderColor: "#FDBA8C",
        borderRadius: 30,
        borderWidth: 0.3,
      },
      {
        label: "Goals",
        data: [1, 1, 3, 1, 3],
        backgroundColor: "#1A56DB",
        borderColor: "#1A56DB",
        borderRadius: 30,

        borderWidth: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: { display: false },
      y: { display: true },
    },
    roundedBars: {
      borderRadius: 15,
    },
  };

  return (
    <div
      style={{ marginTop: "1vh", paddingLeft: ".6vw", paddingRight: ".6vw" }}
    >
      <h6 style={{ fontWeight: "bolder" }}>Last 5 matches G/A ratio</h6>
      <Bar
        data={data}
        options={options}
        style={{ width: "100%" }}
        // style={{ background: "transparent" ,padding:"1px"}}
      ></Bar>
    </div>
  );
};

export default PlayerPositionStatsBarGraphSummary;

{
  /* <Doughnut data={...} /> */
}

// import React, { useEffect } from "react";
// import ApexCharts from "apexcharts";
// // ApexCharts options and config

// const options = {
//   colors: ["#1A56DB", "#FDBA8C"],
//   series: [
//     {
//       name: "Organic",
//       color: "#1A56DB",
//       data: [
//         { x: "Mon", y: 231 },
//         { x: "Tue", y: 122 },
//         { x: "Wed", y: 63 },
//         { x: "Thu", y: 421 },
//         { x: "Fri", y: 122 },
//         { x: "Sat", y: 323 },
//         { x: "Sun", y: 111 },
//       ],
//     },
//     {
//       name: "Social media",
//       color: "#FDBA8C",
//       data: [
//         { x: "Mon", y: 232 },
//         { x: "Tue", y: 113 },
//         { x: "Wed", y: 341 },
//         { x: "Thu", y: 224 },
//         { x: "Fri", y: 522 },
//         { x: "Sat", y: 411 },
//         { x: "Sun", y: 243 },
//       ],
//     },
//   ],
//   chart: {
//     type: "bar",
//     height: "320px",
//     fontFamily: "Inter, sans-serif",
//     toolbar: {
//       show: false,
//     },
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       columnWidth: "70%",
//       borderRadiusApplication: "end",
//       borderRadius: 8,
//     },
//   },
//   tooltip: {
//     shared: true,
//     intersect: false,
//     style: {
//       fontFamily: "Inter, sans-serif",
//     },
//   },
//   states: {
//     hover: {
//       filter: {
//         type: "darken",
//         value: 1,
//       },
//     },
//   },
//   stroke: {
//     show: true,
//     width: 0,
//     colors: ["transparent"],
//   },
//   grid: {
//     show: false,
//     strokeDashArray: 4,
//     padding: {
//       left: 2,
//       right: 2,
//       top: -14,
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   legend: {
//     show: false,
//   },
//   xaxis: {
//     floating: false,
//     labels: {
//       show: true,
//       style: {
//         fontFamily: "Inter, sans-serif",
//         cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
//       },
//     },
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//   },
//   yaxis: {
//     show: false,
//   },
//   fill: {
//     opacity: 1,
//   },
// };

// // if (
// //   document.getElementById("column-chart")
// //   // &&
// //   // typeof ApexCharts !== "undefined"
// // ) {

// useEffect(() => {
//   const chart = new ApexCharts(
//     document.getElementById("column-chart"),
//     options
//   );
//   chart.render();
// }, []);

// // }

// const PlayerPositionStatsBarGraphSummary = () => {
//   return (
//     <div>
//       <div class="">
//         <div id="column-chart"></div>
//       </div>
//     </div>
//   );
// };

// export default PlayerPositionStatsBarGraphSummary;
