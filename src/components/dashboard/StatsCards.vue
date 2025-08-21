<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="3" v-for="card in cards" :key="card.title">
      <v-card class="pa-4 stats-card" elevation="6">
        <v-icon :color="card.color" size="36">{{ card.icon }}</v-icon>
        <div class="stat-value">{{ card.value }}</div>
        <div class="stat-title">{{ card.title }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "StatsCards",
  data() {
    return {
      cards: [
        { title: "Günlük Satış", value: "₺ 52.430", icon: "mdi-cash", color: "green" },
        { title: "Müşteri Sayısı", value: "128", icon: "mdi-account-group", color: "blue" },
        { title: "Stok", value: "865", icon: "mdi-diamond-stone", color: "orange" },
        { title: "Kâr", value: "₺ 12.340", icon: "mdi-trending-up", color: "red" },
      ],
    };
  },
};
</script>

<style scoped>
.stats-card {
  text-align: center;
  border-radius: 16px;
  transition: transform 0.2s ease;
}
.stats-card:hover {
  transform: translateY(-6px);
}
.stat-value {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 8px;
}
.stat-title {
  font-size: 0.9rem;
  color: #999;
}
</style>
