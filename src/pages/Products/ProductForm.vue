<template>
  <v-card class="pa-4 mb-4">
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="urun.ad" label="Ürün Adı" outlined dense></v-text-field>
      <v-text-field v-model="urun.kategori" label="Kategori" outlined dense></v-text-field>
      <v-text-field v-model="urun.gram" type="number" label="Gram" outlined dense></v-text-field>
      <v-text-field v-model="urun.fiyat" type="number" label="Fiyat (₺)" outlined dense></v-text-field>

      <v-btn color="primary" class="mt-3" @click="submitForm">
        Kaydet
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      urun: {
        ad: "",
        kategori: "",
        gram: "",
        fiyat: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (!this.urun.ad || !this.urun.fiyat) return;
      this.$emit("urunEklendi", { ...this.urun, id: Date.now() });
      this.urun = { ad: "", kategori: "", gram: "", fiyat: "" };
    }
  }
};
</script>
