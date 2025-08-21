<template>
  <v-data-table
      :headers="headers"
      :items="musteriler"
      :items-per-page="5"
      class="elevation-1"
  >
    <template v-slot:[`item.islemler`]="{ item }">
      <v-btn small icon color="red" @click="$emit('sil', item.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CustomerList",
  props: {
    musteriler: { type: Array, required: true },
  },
  data() {
    return {
      headers: [
        { text: "Ad", value: "ad" },
        { text: "Soyad", value: "soyad" },
        { text: "Telefon", value: "telefon" },
        { text: "E-posta", value: "email" },
        { text: "İşlemler", value: "islemler", sortable: false },
      ],
    };
  },
};
</script>
