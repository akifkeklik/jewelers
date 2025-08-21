<template>
  <v-card class="custom-card">
    <v-card-title class="card-title">Döviz Fiyatları</v-card-title>
    <v-data-table :headers="headers" :items="dovizFiyatlari" hide-default-footer>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "CurrencyPrices",
  data() {
    return {
      headers: [
        { text: "Tür", value: "tur" },
        { text: "Alış", value: "alis" },
        { text: "Satış", value: "satis" },
      ],
      dovizFiyatlari: [
        { tur: "USD/TL", alis: "40,85", satis: "40,90" },
        { tur: "EUR/TL", alis: "47,57", satis: "47,75" },
      ],
    };
  },
};
</script>
