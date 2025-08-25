<template>
  <div class="dashboard">
    <div class="card-grid">
      <div
          v-for="(card, index) in cards"
          :key="index"
          class="dashboard-card"
          :style="{ background: card.gradient }"
          @click="goToPage(card.path)"
      >
        <div class="card-content">
          <v-icon class="dashboard-icon">{{ card.icon }}</v-icon>
          <span class="dashboard-title">{{ card.title }}</span>
          <small class="dashboard-subtitle">{{ card.subtitle }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      cards: [
        { title: "Değerler", subtitle: "Altın, gümüş ve taş fiyatları", icon: "mdi-diamond-stone", path: "/prices", gradient: "linear-gradient(135deg, #FFD700, #FFECB3)" },
        { title: "Satışlar", subtitle: "Satış ve fatura işlemleri", icon: "mdi-cart-outline", path: "/sales", gradient: "linear-gradient(135deg, #81D4FA, #4FC3F7)" },
        { title: "Ürünler", subtitle: "Stok yönetimi", icon: "mdi-cube-outline", path: "/products", gradient: "linear-gradient(135deg, #A5D6A7, #66BB6A)" },
        { title: "Müşteriler", subtitle: "Müşteri bilgileri ve ilişkiler", icon: "mdi-account-group", path: "/customers", gradient: "linear-gradient(135deg, #F48FB1, #EC407A)" },
        { title: "Raporlar", subtitle: "İş analitiği ve raporlar", icon: "mdi-chart-line", path: "/reports", gradient: "linear-gradient(135deg, #B39DDB, #7E57C2)" },
        { title: "Ayarlar", subtitle: "Sistem ayarları", icon: "mdi-cog-outline", path: "/settings", gradient: "linear-gradient(135deg, #CFD8DC, #90A4AE)" },
      ],
    };
  },
  methods: {
    goToPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* ekranın ortasında */
  width: 100%;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 sütun */
  gap: 20px; /* kartlar arası boşluk */
  width: 100%;
  max-width: 1000px; /* tüm düzen ortalanır */
}

.dashboard-card {
  border-radius: 16px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  color: #1a1a1a;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease, filter 0.4s ease;
}

.dashboard-card:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
  filter: brightness(1.1);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dashboard-icon {
  font-size: 2rem;
  margin-bottom: 6px;
}

.dashboard-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.dashboard-subtitle {
  font-size: 0.85rem;
  color: #333;
}
</style>
