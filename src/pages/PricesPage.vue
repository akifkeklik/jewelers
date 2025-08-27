<template>
  <v-container fluid>
    <v-row dense>
      <!-- Altın Fiyatları -->
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="card-title">Altın Fiyatları</v-card-title>
          <v-data-table
              :headers="headers"
              :items="altinFiyatlari"
              hide-default-footer
              item-class="price-table-item"
              class="price-data-table"
          >
            <template v-slot:item.alis="{ item }">
              <div :class="['price-box', getClass(item.alis)]">{{ cleanValue(item.alis) }}</div>
            </template>
            <template v-slot:item.satis="{ item }">
              <div :class="['price-box', getClass(item.satis)]">{{ cleanValue(item.satis) }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Döviz Fiyatları -->
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="card-title">Döviz Fiyatları</v-card-title>
          <v-data-table
              :headers="headers"
              :items="dovizFiyatlari"
              hide-default-footer
              item-class="price-table-item"
              class="price-data-table"
          >
            <template v-slot:item.alis="{ item }">
              <div :class="['price-box', getClass(item.alis)]">{{ cleanValue(item.alis) }}</div>
            </template>
            <template v-slot:item.satis="{ item }">
              <div :class="['price-box', getClass(item.satis)]">{{ cleanValue(item.satis) }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Yeni Sarrafiye -->
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="card-title">Sarrafiye Fiyatları (Yeni)</v-card-title>
          <v-data-table
              :headers="headers"
              :items="yeniSarrafiye"
              hide-default-footer
              item-class="price-table-item"
              class="price-data-table"
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
        <v-card class="pa-4">
          <v-card-title class="card-title">Sarrafiye Fiyatları (Eski)</v-card-title>
          <v-data-table
              :headers="headers"
              :items="eskiSarrafiye"
              hide-default-footer
              item-class="price-table-item"
              class="price-data-table"
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
        { text: "Tür", value: "tur", align: "left" },
        { text: "Alış", value: "alis", align: "center", width: "150px" },
        { text: "Satış", value: "satis", align: "center", width: "150px" },
      ],
      altinFiyatlari: [],
      dovizFiyatlari: [],
      yeniSarrafiye: [],
      eskiSarrafiye: [],
    };
  },
  mounted() {
    this.fetchPrices();
    setInterval(this.fetchPrices, 5000); // 5 saniyede bir güncelle
  },
  methods: {
    async fetchPrices() {
      try {
        // cache önleme için timestamp ekledik
        const response = await fetch("/prices.json?ts=" + new Date().getTime());
        const data = await response.json();
        this.altinFiyatlari = data.altinFiyatlari;
        this.dovizFiyatlari = data.dovizFiyatlari;
        this.yeniSarrafiye = data.yeniSarrafiye;
        this.eskiSarrafiye = data.eskiSarrafiye;
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    },
    getClass(value) {
      return value.includes("▲") ? "text-green" : value.includes("▼") ? "text-red" : "";
    },
    cleanValue(value) {
      return value.replace("▲", "").replace("▼", "").trim();
    },
  },
};
</script>

<style scoped>
/* Tablo için genel stiller */
.price-data-table ::v-deep(th),
.price-data-table ::v-deep(td) {
  padding: 0 16px !important;
}

/* Alış ve Satış sütunları için orta hizalama */
.price-data-table ::v-deep(th:nth-child(2)),
.price-data-table ::v-deep(th:nth-child(3)),
.price-data-table ::v-deep(td:nth-child(2)),
.price-data-table ::v-deep(td:nth-child(3)) {
  text-align: center !important;
}

.price-box {
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  padding: 6px;
  white-space: nowrap;
}

.text-green {
  color: #2e7d32 !important;
}

.text-red {
  color: #c62828 !important;
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
  color: #333 !important;
}
</style>
