<template>
  <v-container>
    <h1 class="mb-4">Toptancılar</h1>

    <!-- Arama Kutusu -->
    <v-text-field
        v-model="search"
        label="Firma Ara"
        outlined
        dense
        class="mb-4"
    />

    <!-- Toptancılar Tablosu -->
    <v-data-table
        :headers="headers"
        :items="filteredSuppliers"
        class="elevation-1"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :color="item.status ? 'green' : 'red'" dark>
          {{ item.status ? "Aktif" : "Pasif" }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Toptanci",
  data() {
    return {
      search: "",
      headers: [
        { text: "Firma Adı", value: "name" },
        { text: "Telefon", value: "phone" },
        { text: "Email", value: "email" },
        { text: "Durum", value: "status" },
      ],
      suppliers: [
        { name: "Altın Ticaret A.Ş.", phone: "0555 111 22 33", email: "info@altin.com", status: true },
        { name: "Gümüş Pazarlama Ltd.", phone: "0555 444 55 66", email: "iletisim@gumus.com", status: false },
        { name: "Pırlanta Kuyumculuk", phone: "0555 777 88 99", email: "destek@pirlanta.com", status: true },
      ],
    };
  },
  computed: {
    filteredSuppliers() {
      return this.suppliers.filter(s =>
          s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
