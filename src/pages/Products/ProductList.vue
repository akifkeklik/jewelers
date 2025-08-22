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

    <template v-slot:item.actions="{ item }">
      <v-btn icon small @click="$emit('urunDuzenle', item)">
        <v-icon color="blue">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon small @click="$emit('urunSil', item.id)">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
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
        { text: "Fiyat", value: "fiyat" },
        { text: "İşlemler", value: "actions", sortable: false }
      ]
    };
  }
};
</script>
