<template>
  <v-card class="pa-4 mb-4">
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="urun.ad" label="Ürün Adı" outlined dense></v-text-field>
      <v-select
          v-model="urun.kategori"
          :items="['Altın', 'Gümüş', 'Pırlanta']"
          label="Kategori"
          outlined
          dense
      />
      <v-text-field v-model="urun.gram" type="number" label="Gram" outlined dense></v-text-field>
      <v-text-field v-model="urun.fiyat" type="number" label="Fiyat (₺)" outlined dense></v-text-field>

      <v-btn type="submit" color="primary" class="mt-3">
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
      if (!this.urun.ad || !this.urun.fiyat) {
        alert("Ürün adı ve fiyat zorunludur!");
        return;
      }
      this.$emit("urunEklendi", { ...this.urun, id: Date.now() });
      this.urun = { ad: "", kategori: "", gram: "", fiyat: "" };
    }
  }
};
</script>
