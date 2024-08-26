// src/CustomChart.tsx
import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Chart,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const CustomChart: React.FC = () => {
  const chartRef = useRef<Chart<"line">>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
      gradient.addColorStop(0, "#dc02ce");
      gradient.addColorStop(1, "#5c53fe");

      chart.data.datasets[0].borderColor = gradient;
      chart.update();
    }
  }, []);

  const data: ChartData<"line"> = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Payments",
        data: [1200, 1900, 300, 500, 200, 300, 7000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointStyle: "rectRot",
        pointRadius: 7,
        pointHoverRadius: 10,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payments over a Week",
      },
    },
  };

  return <Line ref={chartRef} data={data} options={options} />;
};

export default CustomChart;
