<template>
  <v-data-table
      :headers="headers"
      :items="musteriler"
      :items-per-page="5"
      class="elevation-1"
      @click:row="$emit('sec', $event)"
  >
    <template v-slot:[`item.islemler`]="{ item }">
      <v-btn small icon color="red" @click.stop="$emit('sil', item.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

    <template v-slot:[`item.etiketler`]="{ item }">
      <v-chip v-for="e in item.etiketler" :key="e" small color="amber" class="mr-1">
        {{ e }}
      </v-chip>
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
        { text: "Etiketler", value: "etiketler" },
        { text: "İşlemler", value: "islemler", sortable: false },
      ],
    };
  },
};
</script>
