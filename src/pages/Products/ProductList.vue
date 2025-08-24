<template>
  <v-data-table
      :headers="headers"
      :items="urunler"
      :search="search"
      class="elevation-1"
      dense
      hide-default-footer
      :items-per-page="10"
  >
    <template v-slot:item.fiyat="{ item }">
      {{ item.fiyat.toLocaleString() }} ₺
    </template>

    <template v-slot:item.actions="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on" @click="$emit('urunDuzenle', item)">
            <v-icon color="blue">mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Düzenle</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on" @click="$emit('urunSil', item.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Sil</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    urunler: Array,
    search: String
  },
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Ürün Adı", value: "ad" },
        { text: "Kategori", value: "kategori" },
        { text: "Gram", value: "gram" },
        { text: "Fiyat", value: "fiyat" },
        { text: "Barkod", value: "barkod" },
        { text: "İşlemler", value: "actions", sortable: false }
      ]
    };
  }
};
</script>
