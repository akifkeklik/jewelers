<template>
  <v-container fluid>
    <!-- Başlık -->
    <v-row class="d-flex align-center mb-4">
      <v-col cols="6">
        <h2 class="font-weight-bold">📂 Kategoriler </h2>
      </v-col>
    </v-row>

    <!-- Kategoriler Tablosu -->
    <v-data-table
        :headers="headers"
        :items="categories"
        item-value="id"
        show-expand
        :expanded.sync="expanded"
        class="elevation-1"
    >
      <!-- Durum Chip -->
      <template v-slot:item.status="{ item }">
        <v-chip :color="item.status === 'Aktif' ? 'green' : 'red'" dark small>
          {{ item.status }}
        </v-chip>
      </template>

      <!-- Expand (Kategoriye Tıklayınca Ürünler) -->
      <template v-slot:expanded-row="{ item }">
        <v-card flat class="ma-2 pa-2">
          <h4 class="mb-2">🛒 {{ item.name }} Kategorisindeki Ürünler</h4>
          <v-data-table
              :headers="productHeaders"
              :items="item.products"
              dense
              hide-default-footer
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status === 'Stokta' ? 'blue' : 'orange'" dark small>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "KategorilerUrunler",
  data() {
    return {
      expanded: [],
      headers: [
        { text: "Kategori Adı", value: "name" },
        { text: "Açıklama", value: "description" },
        { text: "Ürün Sayısı", value: "productCount" },
        { text: "Durum", value: "status" },
      ],
      productHeaders: [
        { text: "Ürün Adı", value: "name" },
        { text: "Fiyat", value: "price" },
        { text: "Stok", value: "stock" },
        { text: "Durum", value: "status" },
      ],
      categories: [
        {
          id: 1,
          name: "Elektronik",
          description: "Telefon, Bilgisayar, Tablet",
          productCount: 3,
          status: "Aktif",
          products: [
            { id: 101, name: "iPhone 15 Pro Max", price: "58.999 ₺", stock: 10, status: "Stokta" },
            { id: 102, name: "Samsung Galaxy S23 Ultra", price: "49.499 ₺", stock: 4, status: "Stokta" },
            { id: 103, name: "Asus Zenbook Laptop", price: "27.500 ₺", stock: 0, status: "Tükendi" },
          ],
        },
        {
          id: 2,
          name: "Giyim",
          description: "Kadın & Erkek Giyim Ürünleri",
          productCount: 2,
          status: "Aktif",
          products: [
            { id: 201, name: "Kot Pantolon", price: "899 ₺", stock: 50, status: "Stokta" },
            { id: 202, name: "Beyaz Tişört", price: "249 ₺", stock: 100, status: "Stokta" },
          ],
        },
        {
          id: 3,
          name: "Mobilya",
          description: "Ev & Ofis Mobilyaları",
          productCount: 2,
          status: "Pasif",
          products: [
            { id: 301, name: "Ofis Masası", price: "4.500 ₺", stock: 3, status: "Stokta" },
            { id: 302, name: "Rahat Ofis Koltuğu", price: "3.200 ₺", stock: 1, status: "Stokta" },
          ],
        },
      ],
    };
  },
};
</script>
