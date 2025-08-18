<template>
  <v-container fluid class="py-4">

    <!-- 1. ÜST ÖZET KPI KARTLARI -->
    <v-row dense class="mb-4">
      <v-col cols="12" sm="3" v-for="kpi in kpis" :key="kpi.title">
        <v-card :color="kpi.color" dark class="pa-4">
          <div class="text-subtitle-2">{{ kpi.title }}</div>
          <div class="text-h5 font-weight-bold">{{ kpi.value }}</div>
          <div class="caption">{{ kpi.subtitle }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 2. GRAFİKLER -->
    <v-row dense class="mb-4">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Satış Trend (Son 30 Gün)</v-card-title>
          <apexchart type="line" height="250" :options="trendOptions" :series="trendSeries"/>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">En Çok Satılan Ürünler</v-card-title>
          <apexchart type="bar" height="250" :options="topOptions" :series="topSeries"/>
        </v-card>
      </v-col>
    </v-row>

    <!-- 3. TABLOLAR -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Haftalık Rapor</v-card-title>
          <v-data-table :headers="orderHeaders" :items="weekOrders" dense hide-default-footer>
            <template v-slot:item.tutar="{ item }">{{ tl(item.tutar) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
          <v-divider/>
          <div class="pa-3">
            <strong>Ciro:</strong> {{ tl(sumTotal(weekOrders)) }} |
            <strong>Kâr:</strong> {{ tl(sumKar(weekOrders)) }}
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Aylık Rapor</v-card-title>
          <v-data-table :headers="orderHeaders" :items="monthOrders" dense hide-default-footer>
            <template v-slot:item.tutar="{ item }">{{ tl(item.tutar) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
          <v-divider/>
          <div class="pa-3">
            <strong>Ciro:</strong> {{ tl(sumTotal(monthOrders)) }} |
            <strong>Kâr:</strong> {{ tl(sumKar(monthOrders)) }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 4. EN ÇOK SATILANLAR / AZ KALAN STOK -->
    <v-row dense class="mt-4">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">En Çok Satılanlar (Ay)</v-card-title>
          <v-data-table :headers="topsHeaders" :items="topSellersMonth" dense hide-default-footer>
            <template v-slot:item.ciro="{ item }">{{ tl(item.ciro) }}</template>
            <template v-slot:item.kar="{ item }">{{ tl(item.kar) }}</template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Az Kalan Stok</v-card-title>
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

    <!-- 5. SON SATIŞLAR / NOTLAR -->
    <v-row dense class="mt-4">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Bugün Son 5 Satış</v-card-title>
          <v-list dense>
            <v-list-item v-for="o in last5Today" :key="o.id">
              <v-list-item-icon><v-icon color="primary">mdi-cash-register</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">
                  #{{ o.id }} — {{ o.urun }} ({{ o.adet }} adet)
                </v-list-item-title>
                <v-list-item-subtitle class="caption grey--text">{{ fmtDateTime(o.tarih) }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="subtitle-2 font-weight-bold">{{ tl(o.tutar) }}</v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1 font-weight-bold">Notlar</v-card-title>
          <v-card-text class="notes-box">
            Backend bağlanana kadar dummy veri gösteriliyor. Buraya kampanya/hatırlatma yazılabilir.
          </v-card-text>
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
      kpis: [
        { title: "Bugün", value: "₺12.500", subtitle: "8 sipariş", color: "blue" },
        { title: "Hafta", value: "₺85.200", subtitle: "42 sipariş", color: "cyan" },
        { title: "Ay", value: "₺312.400", subtitle: "188 sipariş", color: "teal" },
        { title: "Yıl", value: "₺4.120.000", subtitle: "2.300 sipariş", color: "deep-purple" },
      ],
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

      // 🟢 Dummy Data
      weekOrders: [
        { id: 1, tarihKisa: "12-08", urun: "Altın Bilezik", adet: 2, tutar: 37000, kar: 5000 },
        { id: 2, tarihKisa: "13-08", urun: "Pırlanta Yüzük", adet: 1, tutar: 22000, kar: 3500 },
        { id: 3, tarihKisa: "15-08", urun: "Saat", adet: 3, tutar: 18000, kar: 4000 },
      ],
      monthOrders: [
        { id: 10, tarihKisa: "02-08", urun: "Küpe", adet: 5, tutar: 7500, kar: 2000 },
        { id: 11, tarihKisa: "07-08", urun: "Bilezik", adet: 2, tutar: 18500, kar: 3000 },
        { id: 12, tarihKisa: "10-08", urun: "Saat", adet: 1, tutar: 6000, kar: 1200 },
        { id: 13, tarihKisa: "12-08", urun: "Kolye", adet: 1, tutar: 15000, kar: 2500 },
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
      last5Today: [
        { id: 201, urun: "Saat", adet: 1, tutar: 6000, tarih: "2025-08-17T09:12" },
        { id: 202, urun: "Altın Bilezik", adet: 1, tutar: 18500, tarih: "2025-08-17T11:20" },
        { id: 203, urun: "Kolye", adet: 2, tutar: 30000, tarih: "2025-08-17T13:45" },
        { id: 204, urun: "Küpe", adet: 1, tutar: 1500, tarih: "2025-08-17T15:10" },
        { id: 205, urun: "Yüzük", adet: 1, tutar: 8000, tarih: "2025-08-17T16:30" },
      ],

      // 🟢 Chart dummy
      trendOptions: { chart: { toolbar: { show: false } }, xaxis: { categories: ["01-08","05-08","10-08","15-08"] } },
      trendSeries: [{ name: "Ciro", data: [25000, 40000, 60000, 50000] }],
      topOptions: { chart: { toolbar: { show: false } }, xaxis: { categories: ["Bilezik","Yüzük","Saat"] } },
      topSeries: [{ name: "Adet", data: [24,18,30] }],
    };
  },
  methods: {
    tl(n) { return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(n || 0); },
    sumTotal(list) { return list.reduce((t, o) => t + (o.tutar || 0), 0); },
    sumKar(list) { return list.reduce((t, o) => t + (o.kar || 0), 0); },
    fmtDateTime(d) {
      const dd=new Date(d); const p=v=>String(v).padStart(2,"0");
      return `${dd.getFullYear()}-${p(dd.getMonth()+1)}-${p(dd.getDate())} ${p(dd.getHours())}:${p(dd.getMinutes())}`;
    }
  }
};
</script>

<style scoped>
.v-card { border-radius: 16px; }
.v-data-table tr:nth-child(even) { background: #fafafa; }
.v-data-table tr:hover { background: #f0f8ff; }
.notes-box { background: #f9f9f9; border-left: 4px solid #2196f3; font-style: italic; padding: 12px; }
</style>
