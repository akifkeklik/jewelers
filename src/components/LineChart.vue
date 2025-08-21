<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  name: "LineChart",
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#2c3e50",
              font: { size: 14, family: "Arial" },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(44, 62, 80, 0.85)",
            titleColor: "#ecf0f1",
            bodyColor: "#ecf0f1",
            borderColor: "#3498db",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: { color: "#34495e" },
            grid: { color: "rgba(0,0,0,0.05)" },
          },
          y: {
            ticks: { color: "#34495e" },
            grid: { color: "rgba(0,0,0,0.05)" },
          },
        },
      }
      ,
    };
  },
};
</script>
