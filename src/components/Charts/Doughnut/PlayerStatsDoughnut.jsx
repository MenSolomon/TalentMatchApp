import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJs.register(ArcElement, Tooltip, Legend);

// ChartJs.register(ArcElement, Tooltip);

const PlayerStatsDoughnut = ({ Percentage2ValuesArray }) => {
  const data = {
    labels: ["Yes", "No"],
    datasets: [
      {
        label: "Player Attributes",
        data: Percentage2ValuesArray,
        backgroundColor: ["#5585fe", "transparent"],
        borderColor: ["#5585fe", "transparent"],
        borderWidth: 0,
        borderRadius: 10,
      },
    ],
  };

  let successRate = Percentage2ValuesArray[0] / Percentage2ValuesArray[1];

  const options = {
    cutout: "80%", // Adjust this value to control the width
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return (
    <div style={{ position: "relative" }}>
      <Doughnut
        data={data}
        options={options}
        style={{ width: "50%", height: "10vh" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "32%",
          left: "28%",
          textAlign: "center",
        }}
      >
        {" "}
        {successRate && successRate}0% <br /> success{" "}
      </div>
    </div>
  );
};

export default PlayerStatsDoughnut;

// // datalabels: {
// //     color: "black", // Label text color
// //     font: {
// //       weight: "bold",
// //     },
// //     formatter: (value, context) => {
// //       // Display the label and percentage inside the segment
// //       const dataset = context.chart.data.datasets[0];
// //       const total = dataset.data.reduce(
// //         (acc, currentValue) => acc + currentValue
// //       );
// //       const percentage = ((value / total) * 100).toFixed(2);
// //       return `${
// //         context.chart.data.labels[context.dataIndex]
// //       }: ${percentage}%`;
// //     },
// //   },

// import React from "react";

// const PlayerStatsDoughnut = () => {
//   const getChartOptions = () => {
//     return {
//       series: [35.1, 23.5, 2.4, 5.4],
//       colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
//       chart: {
//         height: 320,
//         width: "100%",
//         type: "donut",
//       },
//       stroke: {
//         colors: ["transparent"],
//         lineCap: "",
//       },
//       plotOptions: {
//         pie: {
//           donut: {
//             labels: {
//               show: true,
//               name: {
//                 show: true,
//                 fontFamily: "Inter, sans-serif",
//                 offsetY: 20,
//               },
//               total: {
//                 showAlways: true,
//                 show: true,
//                 label: "Unique visitors",
//                 fontFamily: "Inter, sans-serif",
//                 formatter: function (w) {
//                   const sum = w.globals.seriesTotals.reduce((a, b) => {
//                     return a + b;
//                   }, 0);
//                   return `${sum}k`;
//                 },
//               },
//               value: {
//                 show: true,
//                 fontFamily: "Inter, sans-serif",
//                 offsetY: -20,
//                 formatter: function (value) {
//                   return value + "k";
//                 },
//               },
//             },
//             size: "80%",
//           },
//         },
//       },
//       grid: {
//         padding: {
//           top: -2,
//         },
//       },
//       labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
//       dataLabels: {
//         enabled: false,
//       },
//       legend: {
//         position: "bottom",
//         fontFamily: "Inter, sans-serif",
//       },
//       yaxis: {
//         labels: {
//           formatter: function (value) {
//             return value + "k";
//           },
//         },
//       },
//       xaxis: {
//         labels: {
//           formatter: function (value) {
//             return value + "k";
//           },
//         },
//         axisTicks: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//       },
//     };
//   };

//   if (
//     document.getElementById("donut-chart") &&
//     typeof ApexCharts !== "undefined"
//   ) {
//     const chart = new ApexCharts(
//       document.getElementById("donut-chart"),
//       getChartOptions()
//     );
//     chart.render();

//     // Get all the checkboxes by their class name
//     const checkboxes = document.querySelectorAll(
//       '#devices input[type="checkbox"]'
//     );

//     // Function to handle the checkbox change event
//     function handleCheckboxChange(event, chart) {
//       const checkbox = event.target;
//       if (checkbox.checked) {
//         switch (checkbox.value) {
//           case "desktop":
//             chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
//             break;
//           case "tablet":
//             chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
//             break;
//           case "mobile":
//             chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
//             break;
//           default:
//             chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
//         }
//       } else {
//         chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
//       }
//     }

//     // Attach the event listener to each checkbox
//     checkboxes.forEach((checkbox) => {
//       checkbox.addEventListener("change", (event) =>
//         handleCheckboxChange(event, chart)
//       );
//     });
//   }

//   return (
//     <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
//       {/* <!-- Line Chart --> */}
//       <div class="py-6" id="donut-chart"></div>

//       <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
//         <div class="flex justify-between items-center pt-5">
//           {/* <!-- Button --> */}
//           <button
//             id="dropdownDefaultButton"
//             data-dropdown-toggle="lastDaysdropdown"
//             data-dropdown-placement="bottom"
//             class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
//             type="button"
//           >
//             Last 7 days
//             <svg
//               class="w-2.5 m-2.5 ml-1.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 10 6"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="m1 1 4 4 4-4"
//               />
//             </svg>
//           </button>
//           <div
//             id="lastDaysdropdown"
//             class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
//           >
//             <ul
//               class="py-2 text-sm text-gray-700 dark:text-gray-200"
//               aria-labelledby="dropdownDefaultButton"
//             >
//               <li>
//                 <a
//                   href="#"
//                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Yesterday
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Today
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Last 7 days
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Last 30 days
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Last 90 days
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <a
//             href="#"
//             class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
//           >
//             Traffic analysis
//             <svg
//               class="w-2.5 h-2.5 ml-1.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="m1 9 4-4-4-4"
//               />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlayerStatsDoughnut;
