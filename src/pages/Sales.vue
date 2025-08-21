<template>
  <v-container fluid>
    <!-- Satışlar Başlığı ve Filtreleme -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title class="text-h6">Satışlar</v-card-title>

          <!-- Satış Arama ve Filtreleme -->
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="searchQuery"
                  label="Satış Ara"
                  prepend-icon="mdi-magnify"
                  outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-menu v-model="dateRangeMenu" :close-on-content-click="false" transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      label="Tarih Aralığı"
                      prepend-icon="mdi-calendar"
                      readonly
                      :value="formattedDateRange"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateRange" range @input="dateRangeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn color="primary" @click="openAddSaleModal">Yeni Satış Ekle</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Satışlar Tablosu -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-data-table
              :headers="headers"
              :items="salesData"
              item-key="id"
              :search="searchQuery"
              :items-per-page="5"
              class="elevation-1"
          >
            <template v-slot:item.date="{ item }">
              <span>{{ formatDate(item.date) }}</span>
            </template>
            <template v-slot:item.total="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs">{{ item.total | currency }}</span>
                </template>
                <span>Toplam Satış Tutarı</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Satış Grafik -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Aylık Satışlar</v-card-title>
          <v-chart :data="salesChartData" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      dateRangeMenu: false,
      dateRange: [null, null],
      formattedDateRange: '',
      headers: [
        { text: 'Satış ID', value: 'id' },
        { text: 'Müşteri', value: 'customer' },
        { text: 'Ürün', value: 'product' },
        { text: 'Miktar', value: 'quantity' },
        { text: 'Toplam Tutar', value: 'total' },
        { text: 'Satış Tarihi', value: 'date' },
      ],
      salesData: [
        { id: 1, customer: 'Ahmet Yılmaz', product: 'Altın Yüzük', quantity: 2, total: 1200, date: '2025-08-20' },
        { id: 2, customer: 'Fatma Akın', product: 'Gümüş Kolye', quantity: 1, total: 300, date: '2025-08-19' },
          { id: 1, customer: 'Ahmet Yılmaz', product: 'Altın Yüzük', quantity: 2, total: 1200, date: '2025-08-20' },
          { id: 2, customer: 'Fatma Akın', product: 'Gümüş Kolye', quantity: 1, total: 300, date: '2025-08-19' },
          { id: 3, customer: 'Mehmet Kaya', product: 'Altın Bilezik', quantity: 3, total: 4500, date: '2025-08-18' },
          { id: 4, customer: 'Ayşe Demir', product: 'Gümüş Yüzük', quantity: 1, total: 200, date: '2025-08-17' }

        // Diğer satış verileri
      ],
      salesChartData: {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
        datasets: [
          {
            label: 'Aylık Satışlar',
            backgroundColor: '#FFD700',
            data: [2000, 2500, 3000, 3500, 4000],
          },
        ],
      },
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}

</style>
