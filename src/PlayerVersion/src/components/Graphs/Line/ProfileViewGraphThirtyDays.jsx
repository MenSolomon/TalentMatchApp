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

const ProfileViewGraphThirtyDays = () => {
  const data = {
    labels: [
      "Sep 10",
      "Sep 18, 2023",
      "Sep 25, 2023",
      "Sep 29, 2023",
      "Oct 5, 2023",
      "Oct 11, 2023",
      "Oct 18, 2023",
    ],
    datasets: [
      {
        label: "Views",
        data: [0, 2, 0, 0, 1, 3, 4],
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
      className="md:mt-[1vh] md:pl-[0.6vw] md:pr-[6vw]     sm:mt-[1vh] sm:pl-[0.6vw] sm:pr-[6vw]"
      // style={{ marginTop: "1vh", paddingLeft: ".6vw", paddingRight: ".6vw" }}
    >
      {/* <h6 style={{ fontWeight: "bolder" }}>Last 5 matches G/A ratio</h6> */}
      <Line
        data={data}
        options={options}
        className="md:w-[20%] md:h-[15vh]  md:mt-[0vh] sm:w-[20%] sm:mt-[0vh] sm:h-[15vh]"
        // style={{ marginTop: "0vh" }}
        // style={{ background: "transparent" ,padding:"1px"}}
      ></Line>
    </div>
  );
};

export default ProfileViewGraphThirtyDays;
