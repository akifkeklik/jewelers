<template>
  <v-container fluid>
    <!-- Hoşgeldiniz -->
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h2 class="font-weight-bold mb-4">KUYUMCU PRO'ya HOŞGELDİNİZ !</h2>
        <!-- Gece Modu Butonu -->
        <v-switch
            v-model="$vuetify.theme.dark"
            inset
            label="🌙 Gece Modu"
        ></v-switch>
      </v-col>
    </v-row>

    <!-- Üst Bilgi Kartları -->
    <v-row dense>
      <v-col cols="12" sm="6" md="3" v-for="kpi in kpis" :key="kpi.title">
        <v-card class="pa-4" outlined>
          <v-icon x-large class="mb-2" :color="kpi.color">{{ kpi.icon }}</v-icon>
          <div class="subtitle-2 grey--text">{{ kpi.title }}</div>
          <div class="text-h5 font-weight-bold">{{ kpi.value }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Döviz ve Altın -->
    <v-row dense class="mt-4">
      <v-col cols="12" sm="6" md="3" v-for="d in dovizler" :key="d.title">
        <v-card class="pa-4" outlined>
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="subtitle-2 grey--text">{{ d.title }}</div>
              <div class="text-h6 font-weight-bold">{{ d.value }}</div>
            </div>
            <v-chip
                :color="d.change >= 0 ? 'green' : 'red'"
                text-color="white"
                small
            >
              <v-icon left small>
                {{ d.change >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
              {{ d.change }}%
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Satış Trend Grafiği + Hesap Makinesi + Bildirimler -->
    <v-row dense class="mt-4">
      <v-col cols="12" md="8">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Satış Trendleri</v-card-title>
          <v-card-text>
            <apexchart
                type="line"
                height="300"
                :options="chartOptions"
                :series="chartSeries"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <!-- Hesap Makinesi -->
        <v-card outlined class="mb-4">
          <v-card-title class="subtitle-1 font-weight-bold">Hesap Makinesi</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select
                    v-model="hesap.from"
                    :items="birimler"
                    label="Dönüştür"
                    dense
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                    v-model="hesap.to"
                    :items="birimler"
                    label="TL veya Diğer"
                    dense
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model.number="hesap.miktar"
                    label="Miktar"
                    type="number"
                    dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="text-subtitle-1 font-weight-bold green--text mt-2">
              {{ hesapSonuc }}
            </div>
          </v-card-text>
        </v-card>

        <!-- Bildirimler -->
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Bildirimler</v-card-title>
          <v-list dense>
            <v-list-item v-for="(b, i) in bildirimler" :key="i">
              <v-list-item-icon>
                <v-icon :color="b.color">{{ b.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ b.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Hızlı İşlemler -->
    <v-row dense class="mt-4">
      <v-col cols="12">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Hızlı İşlemler</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col
                  cols="6" sm="3" md="3"
                  v-for="(btn, i) in hizliIslemler"
                  :key="i"
              >
                <v-card
                    class="d-flex flex-column align-center justify-center pa-4"
                    :color="btn.color"
                    dark
                    style="cursor:pointer; transition: transform 0.2s"
                    :to="{ name: btn.to }"
                    link
                    hover
                    @mouseover="hovered = i"
                    @mouseleave="hovered = null"
                    :style="{ transform: hovered === i ? 'scale(1.05)' : 'scale(1)' }"
                >
                  <div class="mt-2 subtitle-1 text-center font-weight-bold">{{ btn.label }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "HomePage",
  components: { apexchart: VueApexCharts },
  data() {
    return {
      hovered: null,
      kpis: [
        { title: "Toplam Satış", value: "₺1.200.000", icon: "mdi-cash", color: "green" },
        { title: "Stok Değeri", value: "₺850.000", icon: "mdi-archive", color: "blue" },
        { title: "Kâr", value: "₺320.000", icon: "mdi-trending-up", color: "orange" },
        { title: "Müşteri", value: "1450", icon: "mdi-account", color: "purple" },
      ],
      dovizler: [
        { title: "Gram Altın", value: "₺2.450", change: 0.85 },
        { title: "Dolar", value: "₺32.45", change: -0.15 },
        { title: "Euro", value: "₺35.12", change: 0.30 },
        { title: "Sterlin", value: "₺41.25", change: -0.10 },
      ],
      birimler: ["Gram Altın", "USD", "EUR", "GBP", "TL"],
      hesap: {
        from: "USD",
        to: "TL",
        miktar: 1,
      },
      chartOptions: {
        chart: { id: "satis-trend", toolbar: { show: false } },
        xaxis: { categories: ["Pzt", "Salı", "Çar", "Per", "Cum", "Cmt", "Paz"] },
        colors: ["#4caf50"],
        stroke: { curve: "smooth" },
      },
      chartSeries: [
        { name: "Satış", data: [12000, 15000, 8000, 20000, 18000, 22000, 25000] },
      ],
      bildirimler: [
        { text: "Yeni müşteri kaydı yapıldı.", icon: "mdi-account-plus", color: "blue" },
        { text: "Stok azaldı: Altın Yüzük", icon: "mdi-alert", color: "orange" },
        { text: "Satış başarıyla onaylandı.", icon: "mdi-check-circle", color: "green" },
      ],
      hizliIslemler: [
        { label: "Yeni Satış", color: "indigo", to: "satis" },
        { label: "Stok Ekle", color: "green", to: "stok" },
        { label: "Müşteri Bilgisi", color: "purple", to: "musteriBilgi" },
        { label: "Raporlar", color: "orange", to: "raporlar" },
        { label: "Kargo", color: "blue", to: "kargo" },
        { label: "Ürünler", color: "pink", to: "urunler" },
        { label: "Kategoriler", color: "teal", to: "kategoriler" },
        { label: "Toptancılar", color: "brown", to: "toptancilar" },
      ],
    };
  },
  computed: {
    hesapSonuc() {
      const rates = {
        "USD": 32.45,
        "EUR": 35.12,
        "GBP": 41.25,
        "Gram Altın": 2450,
        "TL": 1,
      };

      const fromRate = rates[this.hesap.from];
      const toRate = rates[this.hesap.to];

      if (!fromRate || !toRate) return "Seçim yapınız";

      const sonuc = (this.hesap.miktar * fromRate) / toRate;

      return `${this.hesap.miktar} ${this.hesap.from} = ${sonuc.toFixed(2)} ${this.hesap.to}`;
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}

/* Gece Modu */
.theme--dark {
  background-color: #121212 !important;
  color: #e0e0e0 !important;
}
</style>

