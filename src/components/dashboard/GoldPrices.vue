<template>
  <v-card class="custom-card">
    <v-card-title class="card-title">Altın Fiyatları</v-card-title>
    <v-data-table :headers="headers" :items="altinFiyatlari" hide-default-footer>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "GoldPrices",
  data() {
    return {
      headers: [
        { text: "Tür", value: "tur" },
        { text: "Alış", value: "alis" },
        { text: "Satış", value: "satis" },
      ],
      altinFiyatlari: [
        { tur: "Altın/ONS", alis: "3.337,59", satis: "3.337,96" },
        { tur: "Altın/TL", alis: "4.405,29", satis: "4.413,52" },
      ],
    };
  },
};
</script>
