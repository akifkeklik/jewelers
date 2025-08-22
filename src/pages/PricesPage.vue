<template>
  <v-container fluid>
    <v-row dense>
      <!-- Altın Fiyatları -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 custom-gold-card">
          <v-card-title class="card-title">Altın Fiyatları</v-card-title>
          <v-data-table
              :headers="headers"
              :items="altinFiyatlari"
              hide-default-footer
              item-class="price-table-item"
          >
            <template v-slot:item.alis="{ item }">
              <div class="price-box">
                <span :class="getClass(item.alis)">{{ cleanValue(item.alis) }}</span>
              </div>
            </template>
            <template v-slot:item.satis="{ item }">
              <div class="price-box">
                <span :class="getClass(item.satis)">{{ cleanValue(item.satis) }}</span>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Döviz Fiyatları -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 custom-gold-card">
          <v-card-title class="card-title">Döviz Fiyatları</v-card-title>
          <v-data-table
              :headers="headers"
              :items="dovizFiyatlari"
              hide-default-footer
              item-class="price-table-item"
          >
            <template v-slot:item.alis="{ item }">
              <div class="price-box">
                <span :class="getClass(item.alis)">{{ cleanValue(item.alis) }}</span>
              </div>
            </template>
            <template v-slot:item.satis="{ item }">
              <div class="price-box">
                <span :class="getClass(item.satis)">{{ cleanValue(item.satis) }}</span>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Yeni Sarrafiye -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 custom-gold-card">
          <v-card-title class="card-title">Sarrafiye Fiyatları (Yeni)</v-card-title>
          <v-data-table
              :headers="headers"
              :items="yeniSarrafiye"
              hide-default-footer
              item-class="price-table-item"
          >
            <template v-slot:item.alis="{ item }">
              <div class="price-box">{{ item.alis }}</div>
            </template>
            <template v-slot:item.satis="{ item }">
              <div class="price-box">{{ item.satis }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Eski Sarrafiye -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 custom-gold-card">
          <v-card-title class="card-title">Sarrafiye Fiyatları (Eski)</v-card-title>
          <v-data-table
              :headers="headers"
              :items="eskiSarrafiye"
              hide-default-footer
              item-class="price-table-item"
          >
            <template v-slot:item.alis="{ item }">
              <div class="price-box">{{ item.alis }}</div>
            </template>
            <template v-slot:item.satis="{ item }">
              <div class="price-box">{{ item.satis }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Tür", value: "tur" },
        { text: "Alış", value: "alis" },
        { text: "Satış", value: "satis" },
      ],
      altinFiyatlari: [
        { tur: "Altın/ONS", alis: "3.337,59", satis: "3.337,96" },
        { tur: "Gümüş/ONS", alis: "38,0440", satis: "38,0500" },
        { tur: "Altın/TL", alis: "4.405,29", satis: "4.113,52" },
        { tur: "Altın/KG/USD", alis: "107.270,00", satis: "107.000,00" },
        { tur: "Altın/KG/EUR", alis: "91.824,00", satis: "92.225,00" },
        { tur: "Gümüş/TL", alis: "49,9313 ▲", satis: "50,5687 ▲" },
      ],
      dovizFiyatlari: [
        { tur: "USD/TL", alis: "40,8500", satis: "40,9000" },
        { tur: "EUR/TL", alis: "47,5700", satis: "47,7500" },
        { tur: "GBP/TL", alis: "54,8491 ▼", satis: "55,1604 ▼" },
        { tur: "AUD/TL", alis: "25,9986 ▲", satis: "26,4013 ▲" },
        { tur: "CHF/TL", alis: "50,1926", satis: "50,8714" },
        { tur: "CAD/TL", alis: "29,2921 ▲", satis: "29,6661" },
      ],
      yeniSarrafiye: [
        { tur: "Yeni Çeyrek", alis: "7.181", satis: "7.216" },
        { tur: "Yeni Yarım", alis: "14.362", satis: "14.432" },
        { tur: "Yeni Tam", alis: "28.591", satis: "28.754" },
        { tur: "Yeni Ata", alis: "28.190", satis: "28.632" },
      ],
      eskiSarrafiye: [
        { tur: "Eski Çeyrek", alis: "7.049", satis: "7.084" },
        { tur: "Eski Yarım", alis: "14.097", satis: "14.167" },
        { tur: "Eski Tam", alis: "28.194", satis: "28.330" },
        { tur: "Eski Ata", alis: "29.180", satis: "29.632" },
      ],
    };
  },
  methods: {
    getClass(value) {
      return value.includes("▲")
          ? "text-green"
          : value.includes("▼")
              ? "text-red"
              : "";
    },
    cleanValue(value) {
      return value.replace("▲", "").replace("▼", "").trim();
    },
  },
};
</script>

<style scoped>
.custom-gold-card {
  color: #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;

  /* Açık altın rengi arka plan */
  background-color: rgba(255, 223, 100, 0.25);
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 215, 0, 0.4);
}

.custom-gold-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(255, 215, 0, 0.5);
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 15px;
  color: #2c2c2c;
  border-radius: 4px;
}

.price-table-item {
  /* Kart rengine karşı okunabilir koyuluk */
  color: #333 !important;
}

.price-box {
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  padding: 6px;
}

.text-green {
  color: #2e7d32 !important;
}

.text-red {
  color: #c62828 !important;
}
</style>
