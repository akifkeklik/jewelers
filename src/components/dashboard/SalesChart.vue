
<template>
  <v-card>
    <v-card-title>Satış Grafiği</v-card-title>
    <line-chart :chart-data="chartData" />
  </v-card>
</template>

<script>

import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  name: "SalesChart",
  components: { LineChart: Line },
  data() {
    return {
      chartData: {
        labels: ["Pzt", "Salı", "Çrş", "Prş", "Cum", "Cts", "Paz"],
        datasets: [
          {
            label: "Satışlar (₺)",
            data: [12000, 15000, 9000, 20000, 25000, 22000, 18000],
            borderColor: "#FFD700",
            backgroundColor: "rgba(255, 215, 0, 0.2)",
            fill: true,
          },
        ],
      },
    };
  },
};
</script>
