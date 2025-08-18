<template>
  <v-container fluid>
    <!-- ÜST KISIM: DASHBOARD KARTLAR -->
    <v-row class="mb-6">
      <v-col cols="12" sm="3" v-for="card in summaryCards" :key="card.title">
        <v-card outlined class="pa-6 text-center elevation-2 rounded-lg">
          <h3 class="text-h6 font-weight-medium mb-2">{{ card.title }}</h3>
          <h2 class="font-weight-bold text-h5">{{ card.value }}</h2>
        </v-card>
      </v-col>
    </v-row>

    <!-- ORTA KISIM: TABLO & SATIŞ ALANI -->
    <v-row>
      <!-- Sol: Stok Tablosu -->
      <v-col cols="12" md="8">
        <v-card outlined class="pa-6 elevation-2 rounded-lg">
          <h3 class="text-h6 font-weight-medium mb-4">Stok Yönetimi</h3>
          <v-data-table
              :headers="headers"
              :items="stocks"
              class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn small color="primary" class="mr-2" @click="editProduct(item)">Düzenle</v-btn>
              <v-btn small color="error" @click="deleteProduct(item)">Sil</v-btn>
            </template>
          </v-data-table>
          <v-btn class="mt-4" color="success" @click="addProduct">+ Yeni Ürün</v-btn>
        </v-card>
      </v-col>

      <!-- Sağ: Satış Alanı -->
      <v-col cols="12" md="4">
        <v-card outlined class="pa-6 elevation-2 rounded-lg">
          <h3 class="text-h6 font-weight-medium mb-4">Satış Alanı</h3>
          <v-select
              v-model="selectedProduct"
              :items="stocks"
              item-title="name"
              item-value="id"
              label="Ürün Seç"
              outlined
              dense
          ></v-select>
          <v-text-field
              v-model="quantity"
              type="number"
              label="Adet"
              outlined
              dense
              class="mt-3"
          ></v-text-field>
          <v-btn color="primary" block class="mt-3" @click="addToCart">Sepete Ekle</v-btn>

          <!-- Sepet -->
          <div v-if="cart.length" class="mt-5">
            <h4 class="text-subtitle-1 font-weight-medium mb-3">Sepet</h4>
            <v-list dense>
              <v-list-item v-for="(item, index) in cart" :key="index" class="py-2">
                <v-list-item-content>
                  {{ item.name }} - {{ item.quantity }} Adet
                </v-list-item-content>
                <v-btn icon @click="removeFromCart(index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
            <v-btn color="success" block class="mt-3" @click="completeSale">Satışı Tamamla</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- ALT KISIM: RAPOR & GRAFİKLER -->
    <v-row class="mt-6">
      <!-- Gün Sonu Özeti -->
      <v-col cols="12" md="4">
        <v-card outlined class="pa-6 elevation-2 rounded-lg">
          <h3 class="text-h6 font-weight-medium mb-3">Gün Sonu Özeti</h3>
          <p class="mb-1">Toplam Satış: {{ dailyReport.sales }} ₺</p>
          <p class="mb-1">Maliyet: {{ dailyReport.cost }} ₺</p>
          <p>Kar: <b>{{ dailyReport.profit }} ₺</b></p>
        </v-card>
      </v-col>

      <!-- Satış Grafiği -->
      <v-col cols="12" md="4">
        <v-card outlined class="pa-6 elevation-2 rounded-lg">
          <h3 class="text-h6 font-weight-medium mb-3">Satış Grafiği</h3>
          <canvas id="salesChart"></canvas>
        </v-card>
      </v-col>

      <!-- Stok Dağılımı -->
      <v-col cols="12" md="4">
        <v-card outlined class="pa-6 elevation-2 rounded-lg">
          <h3 class="text-h6 font-weight-medium mb-3">Stok Dağılımı</h3>
          <canvas id="stockChart"></canvas>
        </v-card>
      </v-col>
    </v-row>

    <!-- Export -->
    <v-row class="mt-4">
      <v-col cols="12" class="text-right">
        <v-btn color="info" class="mr-2">Excel Çıktısı</v-btn>
        <v-btn color="error">PDF Çıktısı</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  data() {
    return {
      summaryCards: [
        { title: "Toplam Ürün", value: 125 },
        { title: "Toplam Stok", value: 540 },
        { title: "Toplam Değer", value: "85,000 ₺" },
        { title: "Kar", value: "22,000 ₺" },
      ],
      headers: [
        { text: "Ürün Adı", value: "name" },
        { text: "Stok", value: "stock" },
        { text: "Birim Fiyat", value: "price" },
        { text: "İşlemler", value: "actions", sortable: false },
      ],
      stocks: [
        { id: 1, name: "Ürün A", stock: 120, price: 50 },
        { id: 2, name: "Ürün B", stock: 80, price: 75 },
        { id: 3, name: "Ürün C", stock: 45, price: 100 },
      ],
      selectedProduct: null,
      quantity: 1,
      cart: [],
      dailyReport: { sales: 4500, cost: 2500, profit: 2000 },
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    addProduct() {
      alert("Yeni ürün ekleme ekranı açılacak.");
    },
    editProduct(item) {
      alert(item.name + " düzenlenecek.");
    },
    deleteProduct(item) {
      this.stocks = this.stocks.filter((s) => s.id !== item.id);
    },
    addToCart() {
      const product = this.stocks.find((s) => s.id === this.selectedProduct);
      if (product && this.quantity > 0) {
        this.cart.push({ ...product, quantity: this.quantity });
        this.quantity = 1;
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    completeSale() {
      alert("Satış başarıyla tamamlandı!");
      this.cart = [];
    },
    renderCharts() {
      new Chart(document.getElementById("salesChart"), {
        type: "line",
        data: {
          labels: ["Pzt", "Salı", "Çar", "Per", "Cum"],
          datasets: [
            {
              label: "Satış (₺)",
              data: [500, 800, 1200, 900, 1500],
              borderColor: "blue",
              fill: false,
            },
          ],
        },
      });

      new Chart(document.getElementById("stockChart"), {
        type: "doughnut",
        data: {
          labels: this.stocks.map((s) => s.name),
          datasets: [
            {
              data: this.stocks.map((s) => s.stock),
              backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726"],
            },
          ],
        },
      });
    },
  },
};
</script>
