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
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJs.register(
  LineElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
  PointElement
);

const MarketValueGraph = ({ marketValueDates, MarketValuePrices }) => {
  const data = {
    labels: marketValueDates,
    datasets: [
      {
        label: "Value",
        data: MarketValuePrices,
        backgroundColor: "#1A56DB",
        borderColor: "#1A56DB",
        borderRadius: 0,
        // #5585FE
        borderWidth: 0.4,
        tension: 0.4,
        // fill:true
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {},
    },
  };

  return (
    <div
      style={{
        marginTop: "1vh",
        paddingLeft: ".6vw",
        paddingRight: ".6vw",
        height: "30vh",
      }}
    >
      {/* <h6 style={{ fontWeight: "bolder" }}>Last 5 matches G/A ratio</h6> */}
      <Line
        data={data}
        options={options}
        // className="md:w-[20%] md:h-[15vh] sm:w-[80%] sm:h-[25vh]"
        style={{ marginTop: "0vh" }}
        // style={{ background: "transparent" ,padding:"1px"}}
      ></Line>
    </div>
  );
};

export default MarketValueGraph;
