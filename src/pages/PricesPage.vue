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
        { text: "Tür", value: "tur", align: "left", class: "header-tur" },
        { text: "Alış", value: "alis", align: "center", width: "150px", class: "header-price" },
        { text: "Satış", value: "satis", align: "center", width: "150px", class: "header-price" },
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

/* Başlık stilleri */
.price-data-table ::v-deep(.header-tur) {
  font-weight: 600 !important;
  font-size: 1rem !important;
  color: #141e30 !important;
  letter-spacing: 0.5px;
}

.price-data-table ::v-deep(.header-price) {
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: #141e30 !important;
  text-align: center !important;
}

/* Alış ve Satış sütunları için orta hizalama */
.price-data-table ::v-deep(th:nth-child(2)),
.price-data-table ::v-deep(th:nth-child(3)),
.price-data-table ::v-deep(td:nth-child(2)),
.price-data-table ::v-deep(td:nth-child(3)) {
  text-align: center !important;
}

/* Tür sütunu stilleri */
.price-data-table ::v-deep(td:first-child) {
  font-weight: 600 !important;
  font-size: 1rem !important;
  color: #141e30 !important;
  padding: 12px 16px !important;
}

.price-box {
  font-weight: 700 !important;
  font-size: 1.2rem !important;
  text-align: center;
  padding: 10px 12px;
  white-space: nowrap;
  color: #141e30 !important;
  text-shadow: 0 0 8px rgba(20, 30, 48, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  margin: 4px 0;
  border: 1px solid rgba(20, 30, 48, 0.1);
}

.price-box:hover {
  background: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 12px rgba(20, 30, 48, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-green {
  color: #2e7d32 !important;
  text-shadow: 0 0 8px rgba(46, 125, 50, 0.3) !important;
}

.text-red {
  color: #c62828 !important;
  text-shadow: 0 0 8px rgba(198, 40, 40, 0.3) !important;
}

.card-title {
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 16px;
  color: #141e30 !important;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(20, 30, 48, 0.1), transparent);
  text-shadow: 0 0 6px rgba(20, 30, 48, 0.2);
  margin-bottom: 16px;
}

.price-table-item {
  color: #333 !important;
}

/* Koyu mod için stiller */
.v-application--is-dark .price-data-table ::v-deep(.header-tur),
.v-application--is-dark .price-data-table ::v-deep(.header-price),
.v-application--is-dark .price-data-table ::v-deep(td:first-child) {
  color: #f5f5f5 !important;
}

.v-application--is-dark .price-box {
  color: #f5f5f5 !important;
  background: rgba(36, 59, 85, 0.3);
  text-shadow: 0 0 10px rgba(192, 192, 192, 0.4);
  border: 1px solid rgba(192, 192, 192, 0.2);
}

.v-application--is-dark .price-box:hover {
  background: rgba(36, 59, 85, 0.5);
  text-shadow: 0 0 15px rgba(192, 192, 192, 0.6);
}

.v-application--is-dark .card-title {
  color: #f5f5f5 !important;
  background: linear-gradient(90deg, rgba(36, 59, 85, 0.3), transparent);
  text-shadow: 0 0 8px rgba(192, 192, 192, 0.3);
}
</style>