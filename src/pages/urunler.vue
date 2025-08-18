<template>
  <v-container fluid>
    <!-- Başlık -->
    <v-row class="d-flex align-center mb-4">
      <v-col cols="6">
        <h2 class="font-weight-bold">🛒 Ürünler</h2>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="primary" dark>
          + Yeni Ürün Ekle
        </v-btn>
      </v-col>
    </v-row>

    <!-- Ürünler Tablosu -->
    <v-data-table
        :headers="headers"
        :items="products"
        class="elevation-1"
        dense
    >
      <!-- Fiyat Formatı -->
      <template v-slot:item.price="{ item }">
        <strong>{{ item.price }}</strong>
      </template>

      <!-- Stok Durumu -->
      <template v-slot:item.status="{ item }">
        <v-chip
            :color="item.status === 'Stokta' ? 'green' : 'red'"
            small
            dark
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "UrunlerPage",
  data() {
    return {
      headers: [
        { text: "Ürün Adı", value: "name" },
        { text: "Kategori", value: "category" },
        { text: "Fiyat", value: "price" },
        { text: "Stok", value: "stock" },
        { text: "Durum", value: "status" },
      ],
      products: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          category: "Elektronik",
          price: "58.999 ₺",
          stock: 12,
          status: "Stokta",
        },
        {
          id: 2,
          name: "Samsung Galaxy S23 Ultra",
          category: "Elektronik",
          price: "49.499 ₺",
          stock: 0,
          status: "Tükendi",
        },
        {
          id: 3,
          name: "Kot Pantolon",
          category: "Giyim",
          price: "899 ₺",
          stock: 45,
          status: "Stokta",
        },
        {
          id: 4,
          name: "Ofis Masası",
          category: "Mobilya",
          price: "4.500 ₺",
          stock: 2,
          status: "Stokta",
        },
        {
          id: 5,
          name: "Rahat Ofis Koltuğu",
          category: "Mobilya",
          price: "3.200 ₺",
          stock: 0,
          status: "Tükendi",
        },
      ],
    };
  },
};
</script>
