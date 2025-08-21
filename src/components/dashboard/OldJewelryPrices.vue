<template>
  <v-card class="pa-4 custom-card">
    <v-card-title class="card-title">Eski Sarrafiye Fiyatları</v-card-title>
    <v-data-table
        :headers="headers"
        :items="eskiSarrafiye"
        hide-default-footer
        item-class="price-table-item"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "OldJewelryPrices",
  data() {
    return {
      headers: [
        { text: "Tür", value: "tur" },
        { text: "Alış", value: "alis" },
        { text: "Satış", value: "satis" },
      ],
      eskiSarrafiye: [
        { tur: "Eski Çeyrek", alis: "7.049", satis: "7.084" },
        { tur: "Eski Yarım", alis: "14.097", satis: "14.167" },
        { tur: "Eski Tam", alis: "28.194", satis: "28.330" },
        { tur: "Eski Ata", alis: "29.180", satis: "29.632" },
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
