/* eslint-disable @typescript-eslint/no-explicit-any */
// src/CustomChart.tsx
import React, { useRef, useEffect, useState } from "react";
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
import useInvoice from "../../../hook/useInvoice";
import Loader from "../../../components/utils/Lodder";

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
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [payment, setPayments] = useState<any[]>([]);
  const { data: invoice, isLoading } = useInvoice();

  // Filter approved invoices and process dates
useEffect(() => {
  const processDates = async () => {
    if (invoice) {
      const invoices = invoice.filter((data: any) => data.approve === "true");

      // Grouping invoices by day of the week
      const datePayments: { [key: string]: number } = {};

      invoices.forEach((invoice: any) => {
        const date = new Date(invoice.created_at);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });

        // Summing payments for each day
        if (!datePayments[day]) {
          datePayments[day] = 0;
        }
        datePayments[day] += Number(invoice.amount);
      });

      // Extracting labels and payments
      const resolvedDates = Object.keys(datePayments); // Days of the week (e.g., "Saturday")
      const resolvedPayments = Object.values(datePayments); // Summed payments for each day

      setChartLabels(resolvedDates);
      setPayments(resolvedPayments);
    }
  };

  processDates();
}, [invoice]);


  // Gradient effect for the line chart
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
  }, [chartLabels]);

  const data: ChartData<"line"> = {
    labels: chartLabels, // Use resolved labels here
    datasets: [
      {
        label: "Payments",
        data: payment,
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

  if (isLoading) {
    return <Loader />;
  }

  return <Line ref={chartRef} data={data} options={options} />;
};

export default CustomChart;
