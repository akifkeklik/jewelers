<template>
  <v-data-table
      :headers="headers"
      :items="urunler"
      class="elevation-1"
      dense
  >
    <template v-slot:item.fiyat="{ item }">
      {{ item.fiyat }} ₺
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    urunler: Array
  },
  data() {
    return {
      headers: [
        { text: "Ürün Adı", value: "ad" },
        { text: "Kategori", value: "kategori" },
        { text: "Gram", value: "gram" },
        { text: "Fiyat", value: "fiyat" }
      ]
    };
  }
};
</script>
