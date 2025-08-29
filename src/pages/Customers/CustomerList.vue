<template>
  <v-data-table
      :headers="headers"
      :items="musteriler"
      :search="search"
      dense
      hide-default-footer
      :items-per-page="10"
  >
    <!-- İşlemler -->
    <template v-slot:item.actions="{ item }">
      <v-btn icon small @click="$emit('musteriDuzenle', item)">
        <v-icon color="blue">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon small @click="$emit('musteriSil', item._id)">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CustomerList",
  props: {
    musteriler: { type: Array, required: true },
    search: { type: String, default: "" }
  },
  data() {
    return {
      headers: [
        { text: "ID", value: "_id" },
        { text: "Ad Soyad", value: "name" },
        { text: "Telefon", value: "phone" },
        { text: "E-posta", value: "email" },
        { text: "Adres", value: "address" },
        { text: "Tür", value: "customerType" },
        { text: "İşlemler", value: "actions", sortable: false }
      ]
    };
  }
};
</script>
