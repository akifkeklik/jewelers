<template>
  <v-card class="pa-4 custom-card">
    <v-card-title class="card-title">Yeni Sarrafiye Fiyatları</v-card-title>
    <v-data-table
        :headers="headers"
        :items="yeniSarrafiye"
        hide-default-footer
        item-class="price-table-item"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "NewJewelryPrices",
  data() {
    return {
      headers: [
        { text: "Tür", value: "tur" },
        { text: "Alış", value: "alis" },
        { text: "Satış", value: "satis" },
      ],
      yeniSarrafiye: [
        { tur: "Yeni Çeyrek", alis: "7.181", satis: "7.216" },
        { tur: "Yeni Yarım", alis: "14.362", satis: "14.432" },
        { tur: "Yeni Tam", alis: "28.591", satis: "28.754" },
        { tur: "Yeni Ata", alis: "28.190", satis: "28.632" },
      ],
    };
  },
};
</script>

<style scoped>
.custom-card {
  background: #2c2c2c;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #ffd700;
  padding: 8px 15px;
  color: #2c2c2c;
  border-radius: 6px;
}
.price-table-item {
  color: #ffd700;
}
</style>
