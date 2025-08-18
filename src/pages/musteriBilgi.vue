<template>
  <v-container fluid class="pa-6">

    <!-- Sayfa Başlığı -->
    <v-row>
      <v-col>
        <h2 class="mb-4">📋 Müşteri Listesi</h2>
      </v-col>
    </v-row>

    <!-- Arama ve Filtre -->
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
            v-model="search"
            label="Müşteri Ara"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
            v-model="statusFilter"
            :items="['Tümü', 'Aktif', 'Pasif']"
            label="Durum Filtrele"
            outlined
            dense
        />
      </v-col>
    </v-row>

    <!-- Müşteri Tablosu -->
    <v-data-table
        :headers="headers"
        :items="filteredCustomers"
        class="elevation-1"
        :items-per-page="10"
        dense
    >
      <template v-slot:item.durum="{ item }">
        <v-chip
            :color="item.durum === 'Aktif' ? 'green' : 'red'"
            dark
            small
        >
          {{ item.durum }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon color="primary" @click="goToDetail(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon color="orange">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "MusteriListesi",
  data() {
    return {
      search: "",
      statusFilter: "Tümü",
      headers: [
        { text: "Müşteri Kodu", value: "kod" },
        { text: "Ad Soyad / Firma", value: "ad" },
        { text: "Telefon", value: "telefon" },
        { text: "E-posta", value: "email" },
        { text: "Borç (₺)", value: "borc" },
        { text: "Bakiye (₺)", value: "bakiye" },
        { text: "Durum", value: "durum" },
        { text: "İşlemler", value: "actions", sortable: false },
      ],
      customers: [
        {
          kod: "M-001",
          ad: "Ahmet Yılmaz",
          telefon: "0532 123 45 67",
          email: "ahmet@example.com",
          borc: 1500,
          bakiye: -500,
          durum: "Aktif",
        },
        {
          kod: "M-002",
          ad: "Mehmet Demir",
          telefon: "0543 987 65 43",
          email: "mehmet@example.com",
          borc: 0,
          bakiye: 2000,
          durum: "Pasif",
        },
        {
          kod: "M-003",
          ad: "ABC İnşaat Ltd.",
          telefon: "0212 555 44 33",
          email: "info@abcinsaat.com",
          borc: 3200,
          bakiye: -1200,
          durum: "Aktif",
        },
      ],
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((c) => {
        const matchesSearch =
            c.ad.toLowerCase().includes(this.search.toLowerCase()) ||
            c.kod.toLowerCase().includes(this.search.toLowerCase());
        const matchesStatus =
            this.statusFilter === "Tümü" || c.durum === this.statusFilter;
        return matchesSearch && matchesStatus;
      });
    },
  },
  methods: {
    goToDetail(item) {
      alert(`${item.ad} detay sayfasına gidilecek...`);
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
