<template>
  <v-container fluid>
    <!-- Özet Kartlar -->
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="(kpi, index) in kpis" :key="index">
        <v-card class="pa-4 text-center elevation-2" outlined>
          <v-icon size="32" class="mb-2" color="amber darken-2">{{ kpi.icon }}</v-icon>
          <div class="text-h6">{{ kpi.label }}</div>
          <div class="font-weight-bold text-h5">{{ kpi.value }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filtreleme -->
    <v-card class="mt-6 pa-4">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
              v-model="searchQuery"
              label="Satış Ara"
              prepend-icon="mdi-magnify"
              outlined
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-menu v-model="dateRangeMenu" :close-on-content-click="false" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Tarih Aralığı"
                  prepend-icon="mdi-calendar"
                  readonly
                  outlined
                  :value="formattedDateRange"
              />
            </template>
            <v-date-picker v-model="dateRange" range @input="updateDateRange" />
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
              v-model="selectedCustomer"
              :items="uniqueCustomers"
              label="Müşteri Seç"
              outlined
              clearable
          />
        </v-col>

        <v-col cols="12" md="3" class="d-flex align-center">
          <v-btn color="primary" class="mr-2" @click="openAddSaleModal">
            <v-icon left>mdi-plus</v-icon> Yeni Satış
          </v-btn>
          <v-btn color="error" @click="resetFilters">Temizle</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Satışlar Tablosu -->
    <v-card class="mt-6">
      <v-data-table
          :headers="headers"
          :items="filteredSales"
          item-key="id"
          :search="searchQuery"
          :items-per-page="5"
          class="elevation-1"
      >
        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>
        <template v-slot:item.total="{ item }">
          {{ formatCurrency(item.total) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon small @click="editSale(item)">
            <v-icon color="blue">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small @click="deleteSale(item)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Grafikler -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Aylık Satışlar</v-card-title>
          <div style="height:300px;">
            <BarChart :data="salesChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>Ürün Bazlı Dağılım</v-card-title>
          <div style="height:300px;">
            <PieChart :data="productChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Yeni Satış Modal -->
    <v-dialog v-model="addSaleDialog" max-width="500">
      <v-card>
        <v-card-title>Yeni Satış Ekle</v-card-title>
        <v-card-text>
          <v-text-field v-model="newSale.customer" label="Müşteri" outlined />
          <v-text-field v-model="newSale.product" label="Ürün" outlined />
          <v-text-field v-model="newSale.quantity" type="number" label="Miktar" outlined />
          <v-text-field v-model="newSale.total" type="number" label="Toplam Tutar" outlined />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <!-- İptal butonunu kırmızı yapıyoruz -->
          <v-btn color="error" @click="addSaleDialog=false">Vazgeç</v-btn>
          <!-- Kaydet butonunu mavi yapıyoruz -->
          <v-btn color="primary" @click="saveSale">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Satış Düzenleme Dialog -->
    <v-dialog v-model="editSaleDialog" max-width="500">
      <v-card>
        <v-card-title>Satışı Düzenle</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedSale.customer" label="Müşteri" outlined />
          <v-text-field v-model="editedSale.product" label="Ürün" outlined />
          <v-text-field v-model="editedSale.quantity" type="number" label="Miktar" outlined />
          <v-text-field v-model="editedSale.total" type="number" label="Toplam Tutar" outlined />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="error" @click="editSaleDialog=false">Vazgeç</v-btn>
          <v-btn color="primary" @click="saveEditedSale">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    BarChart: Bar,
    PieChart: Pie,
  },
  data() {
    return {
      searchQuery: "",
      dateRangeMenu: false,
      dateRange: [null, null],
      formattedDateRange: "",
      selectedCustomer: null,
      addSaleDialog: false,
      editSaleDialog: false,
      newSale: { customer: "", product: "", quantity: 1, total: 0 },
      editedSale: { customer: "", product: "", quantity: 1, total: 0 },

      headers: [
        { text: "Satış ID", value: "id" },
        { text: "Müşteri", value: "customer" },
        { text: "Ürün", value: "product" },
        { text: "Miktar", value: "quantity" },
        { text: "Toplam Tutar", value: "total" },
        { text: "Tarih", value: "date" },
        { text: "İşlemler", value: "actions", sortable: false },
      ],

      salesData: [
        { id: 1, customer: "Ahmet Yılmaz", product: "Altın Yüzük", quantity: 2, total: 1200, date: "2025-08-20" },
        { id: 2, customer: "Fatma Akın", product: "Gümüş Kolye", quantity: 1, total: 300, date: "2025-08-19" },
        { id: 3, customer: "Mehmet Kaya", product: "Altın Bilezik", quantity: 3, total: 4500, date: "2025-08-18" },
        { id: 4, customer: "Ayşe Demir", product: "Gümüş Yüzük", quantity: 1, total: 200, date: "2025-08-17" },
      ],

      kpis: [
        { label: "Toplam Satış", value: "4", icon: "mdi-cart" },
        { label: "Toplam Ciro", value: "₺6.200", icon: "mdi-cash" },
        { label: "En Çok Satılan", value: "Altın Bilezik", icon: "mdi-star" },
        { label: "Müşteri Sayısı", value: "4", icon: "mdi-account-group" },
      ],

      salesChartData: {
        labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs"],
        datasets: [
          { label: "Aylık Satışlar", backgroundColor: "#FFD700", data: [2000, 2500, 3000, 3500, 4000] },
        ],
      },
      productChartData: {
        labels: ["Altın Yüzük", "Gümüş Kolye", "Altın Bilezik", "Gümüş Yüzük"],
        datasets: [
          {
            label: "Ürünler",
            backgroundColor: ["#FFD700", "#C0C0C0", "#DAA520", "#A9A9A9"],
            data: [2, 1, 3, 1],
          },
        ],
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#333", font: { size: 14 } } },
        },
        scales: {
          x: { ticks: { color: "#333" }, grid: { color: "#eee" } },
          y: { ticks: { color: "#333" }, grid: { color: "#eee" } },
        },
      },
    };
  },
  computed: {
    uniqueCustomers() {
      return [...new Set(this.salesData.map((s) => s.customer))];
    },
    filteredSales() {
      let data = this.salesData;
      if (this.selectedCustomer) {
        data = data.filter((s) => s.customer === this.selectedCustomer);
      }
      if (this.dateRange[0] && this.dateRange[1]) {
        const [start, end] = this.dateRange.map((d) => new Date(d));
        data = data.filter((s) => {
          const saleDate = new Date(s.date);
          return saleDate >= start && saleDate <= end;
        });
      }
      return data;
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("tr-TR");
    },
    formatCurrency(val) {
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(val);
    },
    resetFilters() {
      this.selectedCustomer = null;
      this.dateRange = [null, null];
      this.searchQuery = "";
      this.formattedDateRange = "";
    },
    updateDateRange(val) {
      this.formattedDateRange = `${new Date(val[0]).toLocaleDateString("tr-TR")} - ${new Date(val[1]).toLocaleDateString("tr-TR")}`;
      this.dateRangeMenu = false;
    },
    openAddSaleModal() {
      this.addSaleDialog = true;
    },
    saveSale() {
      const newId = this.salesData.length + 1;
      this.salesData.push({ ...this.newSale, id: newId, date: new Date().toISOString().split("T")[0] });
      this.addSaleDialog = false;
      this.newSale = { customer: "", product: "", quantity: 1, total: 0 };
    },
    editSale(item) {
      this.editedSale = { ...item };
      this.editSaleDialog = true;
    },
    saveEditedSale() {
      const index = this.salesData.findIndex((sale) => sale.id === this.editedSale.id);
      if (index !== -1) {
        this.salesData[index] = this.editedSale;
        this.editSaleDialog = false;
      }
    },
    deleteSale(item) {
      this.salesData = this.salesData.filter((s) => s.id !== item.id);
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: #f5f6fa !important;
}
</style>
