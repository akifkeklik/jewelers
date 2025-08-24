<template>
  <v-container fluid class="py-6">

    <!-- KPI Kartları -->
    <v-row dense class="mb-6">
      <v-col cols="12" md="3" v-for="kpi in kpis" :key="kpi.title">
        <v-card outlined class="pa-6 text-center kpi-card">
          <v-icon x-large class="mb-3" :color="kpi.color">{{ kpi.icon }}</v-icon>
          <h2 class="kpi-value">{{ kpi.value }}</h2>
          <p class="kpi-title">{{ kpi.title }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- 1. Satır: Günlük Rapor Tablo + Günlük Rapor Grafik -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-card outlined class="report-card">
          <v-card-title class="subtitle-1 font-weight-bold amber--text">GÜNLÜK RAPOR (Tablo)</v-card-title>
          <v-data-table :headers="orderHeaders" :items="dayOrders" dense hide-default-footer>
            <template v-slot:item.tutar="{ item }">{{ tl(item.tutar) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
          <v-divider/>
          <div class="pa-3 text-right font-weight-bold">
            Toplam Satış: {{ dayOrders.length }} |
            Ciro: {{ tl(sumTotal(dayOrders)) }} |
            Kâr: {{ tl(sumKar(dayOrders)) }}
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined class="report-card">
          <v-card-title class="subtitle-1 font-weight-bold amber--text">GÜNLÜK RAPOR (Grafik)</v-card-title>
          <apexchart type="bar" height="250" :options="dailyOptions" :series="dailySeries"/>
        </v-card>
      </v-col>
    </v-row>

    <!-- 2. Satır: Haftalık ve Aylık Rapor -->
    <v-row dense class="mt-4">
      <v-col cols="12" md="6">
        <v-card outlined class="report-card">
          <v-card-title class="subtitle-1 font-weight-bold amber--text">HAFTALIK RAPOR</v-card-title>
          <v-data-table :headers="orderHeaders" :items="weekOrders" dense hide-default-footer>
            <template v-slot:item.tutar="{ item }">{{ tl(item.tutar) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
          <v-divider/>
          <div class="pa-3 text-right font-weight-bold">
            Ciro: {{ tl(sumTotal(weekOrders)) }} | Kâr: {{ tl(sumKar(weekOrders)) }}
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined class="report-card">
          <v-card-title class="subtitle-1 font-weight-bold amber--text">AYLIK RAPOR</v-card-title>
          <v-data-table :headers="orderHeaders" :items="monthOrders" dense hide-default-footer>
            <template v-slot:item.tutar="{ item }">{{ tl(item.tutar) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
          <v-divider/>
          <div class="pa-3 text-right font-weight-bold">
            Ciro: {{ tl(sumTotal(monthOrders)) }} | Kâr: {{ tl(sumKar(monthOrders)) }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 3. Satır: En Çok Satılanlar + Az Kalan Stok -->
    <v-row dense class="mt-4">
      <v-col cols="12" md="6">
        <v-card outlined class="report-card">
          <v-card-title class="subtitle-1 font-weight-bold amber--text">BU AY EN ÇOK SATILANLAR</v-card-title>
          <v-data-table :headers="topsHeaders" :items="topSellersMonth" dense hide-default-footer>
            <template v-slot:item.ciro="{ item }">{{ tl(item.ciro) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined class="report-card">
          <v-card-title class="subtitle-1 font-weight-bold amber--text">AZ KALAN STOK!</v-card-title>
          <v-data-table :headers="lowHeaders" :items="lowStock" dense hide-default-footer>
            <template v-slot:item.stok="{ item }">
              <v-chip :color="item.stok <= 0 ? 'red' : item.stok <= 5 ? 'orange' : 'green'" text-color="white" small>
                <v-icon left small>
                  {{ item.stok <= 0 ? 'mdi-alert-circle' : item.stok <= 5 ? 'mdi-alert' : 'mdi-check-circle' }}
                </v-icon>
                {{ item.stok }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "RaporlarPage",
  components: { apexchart: VueApexCharts },
  data() {
    return {
      orderHeaders: [
        { text: "No", value: "id", width: 70 },
        { text: "Tarih", value: "tarihKisa", width: 110 },
        { text: "Ürün", value: "urun" },
        { text: "Adet", value: "adet", align: "right", width: 70 },
        { text: "Tutar", value: "tutar", align: "right", width: 120 },
        { text: "Kâr", value: "kar", align: "right", width: 120 },
      ],
      topsHeaders: [
        { text: "Ürün", value: "urun" },
        { text: "Adet", value: "adet", align: "right", width: 80 },
        { text: "Ciro", value: "ciro", align: "right", width: 120 },
        { text: "Kâr", value: "kar", align: "right", width: 120 },
      ],
      lowHeaders: [
        { text: "Ürün", value: "isim" },
        { text: "Stok", value: "stok", align: "right", width: 90 },
      ],

      dayOrders: [
        { id: 301, tarihKisa: "09:00", urun: "Saat", adet: 1, tutar: 6000, kar: 1200 },
        { id: 302, tarihKisa: "11:00", urun: "Altın Bilezik", adet: 1, tutar: 18500, kar: 4000 },
        { id: 303, tarihKisa: "13:00", urun: "Kolye", adet: 2, tutar: 30000, kar: 6000 },
        { id: 304, tarihKisa: "15:00", urun: "Küpe", adet: 1, tutar: 1500, kar: 300 },
        { id: 305, tarihKisa: "17:00", urun: "Yüzük", adet: 1, tutar: 8000, kar: 1800 },
      ],
      weekOrders: [
        { id: 1, tarihKisa: "12-08", urun: "Altın Bilezik", adet: 2, tutar: 37000, kar: 5000 },
        { id: 2, tarihKisa: "13-08", urun: "Pırlanta Yüzük", adet: 1, tutar: 22000, kar: 3500 },
        { id: 3, tarihKisa: "17-08", urun: "Altın Küpe", adet: 3, tutar: 18000, kar: 4000 },
      ],
      monthOrders: [
        { id: 10, tarihKisa: "02-08", urun: "Küpe", adet: 5, tutar: 7500, kar: 2000 },
        { id: 11, tarihKisa: "09-08", urun: "Bilezik", adet: 2, tutar: 18500, kar: 3000 },
        { id: 12, tarihKisa: "16-08", urun: "Saat", adet: 1, tutar: 6000, kar: 1200 },
        { id: 13, tarihKisa: "23-08", urun: "Kolye", adet: 1, tutar: 15000, kar: 2500 },
      ],
      topSellersMonth: [
        { urun: "Altın Bilezik", adet: 24, ciro: 320000, kar: 45000 },
        { urun: "Pırlanta Yüzük", adet: 18, ciro: 396000, kar: 70000 },
        { urun: "Saat", adet: 30, ciro: 360000, kar: 90000 },
      ],
      lowStock: [
        { isim: "Altın Küpe", stok: 3 },
        { isim: "Pırlanta Yüzük", stok: 1 },
        { isim: "Gümüş Bileklik", stok: 0 },
      ],

      // Günlük grafik
      dailyOptions: {
        chart: { toolbar: { show: false } },
        plotOptions: { bar: { borderRadius: 6 } },
        dataLabels: { enabled: true },
        colors: ["#42a5f5"],
        xaxis: { categories: ["09:00", "11:00", "13:00", "15:00", "17:00"] },
      },
      dailySeries: [{ name: "Ciro", data: [6000, 18500, 30000, 1500, 8000] }]
    };
  },
  computed: {
    kpis() {
      const toplamCiro = this.sumTotal(this.weekOrders) + this.sumTotal(this.monthOrders);
      const toplamKar = this.sumKar(this.weekOrders) + this.sumKar(this.monthOrders);
      const toplamAdet = [...this.weekOrders, ...this.monthOrders].reduce((t,o)=>t+(o.adet||0),0);

      return [
        { title: "Toplam Ciro", value: this.tl(toplamCiro), icon: "mdi-cash", color: "amber" },
        { title: "Toplam Kâr", value: this.tl(toplamKar), icon: "mdi-trending-up", color: "light-blue" },
        { title: "Toplam Satış Adedi", value: toplamAdet, icon: "mdi-cart", color: "deep-purple" },
        { title: "Toplam Müşteri", value: 480, icon: "mdi-account-group", color: "orange" },
      ];
    }
  },
  methods: {
    tl(n) { return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(n || 0); },
    sumTotal(list) { return list.reduce((t, o) => t + (o.tutar || 0), 0); },
    sumKar(list) { return list.reduce((t, o) => t + (o.kar || 0), 0); },
  }
};
</script>

<style scoped>
/* Genel yazı tipi */
* { font-family: "Inter", "Roboto", sans-serif; }

/* Satırlarda kartların aynı boyda olması için */
.v-row {
  align-items: stretch !important;
}
.v-col {
  display: flex;
  flex-direction: column;
}
.report-card,
.kpi-card {
  flex: 1;        /* tüm yükseklik doldur */
  height: 100%;   /* eşit boy */
  display: flex;
  flex-direction: column;
}

/* Kart stilleri */
.report-card {
  background: linear-gradient(135deg, #4b5d70, #5a6f84);
  color: #fff;
  border-radius: 20px;
  transition: 0.3s;
}
.report-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

/* KPI Kartları */
.kpi-card {
  background: linear-gradient(135deg, #5a6f84, #6c8296);
  border-radius: 20px;
  color: white;
  transition: 0.3s;
}
.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
}
.kpi-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffca28;
}
.kpi-title {
  font-size: 0.95rem;
  color: #ddd;
}

/* Tablo */
.v-data-table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: white;
}
.v-data-table thead {
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  color: #ffca28;
}
.v-data-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>

