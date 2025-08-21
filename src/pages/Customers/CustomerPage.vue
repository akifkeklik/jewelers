<template>
  <v-container>
    <h2 class="mb-4">Müşteri Yönetimi</h2>

    <v-card class="pa-4 mb-6">
      <CustomerForm @ekle="musteriEkle" />
    </v-card>

    <v-card>
      <CustomerList :musteriler="musteriler" @sil="musteriSil" />
    </v-card>
  </v-container>
</template>

<script>
import CustomerForm from "./CustomerForm.vue";
import CustomerList from "./CustomerList.vue";

export default {
  name: "CustomerPage",
  components: { CustomerForm, CustomerList },
  data() {
    return {
      musteriler: [
        { id: 1, ad: "Ahmet", soyad: "Yılmaz", telefon: "05001234567", email: "ahmet@test.com" },
        { id: 2, ad: "Ayşe", soyad: "Demir", telefon: "05007654321", email: "ayse@test.com" },
          { id: 1, ad: "Ahmet", soyad: "Yılmaz", telefon: "05321234567", email: "ahmet@test.com" },
          { id: 2, ad: "Ayşe", soyad: "Demir", telefon: "05007654321", email: "ayse@test.com" },
          { id: 3, ad: "Mehmet", soyad: "Kaya", telefon: "05439876543", email: "mehmet@test.com" },
          { id: 4, ad: "Fatma", soyad: "Aydın", telefon: "05098765432", email: "fatma@test.com" }
      ],
    };
  },
  methods: {
    musteriEkle(yeniMusteri) {
      this.musteriler.push(yeniMusteri);
    },
    musteriSil(id) {
      this.musteriler = this.musteriler.filter((m) => m.id !== id);
    },
  },
};
</script>
