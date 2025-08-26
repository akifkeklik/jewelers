<template>
  <v-card class="pa-4 mb-4 elevation-2" style="border-radius: 12px;">
    <v-form v-model="formValid" @submit.prevent="submitForm" ref="urunForm">
      <v-text-field v-model="urun.ad" label="Ürün Adı" outlined dense :rules="[v => !!v || 'Ürün adı zorunlu']"/>
      <v-select :menu-props="{offsetY:true}" v-model="urun.kategori" :items="['Altın', 'Gümüş', 'Pırlanta']" label="Kategori" outlined dense :rules="[v => !!v || 'Kategori seçiniz']"/>
      <v-text-field v-model="urun.gram" type="number" label="Gram" outlined dense :rules="[v => v > 0 || 'Gram > 0 olmalı']"/>
      <v-text-field v-model="urun.fiyat" type="number" label="Fiyat (₺)" outlined dense :rules="[v => v > 0 || 'Fiyat > 0 olmalı']"/>
      <v-text-field v-model="urun.barkod" label="Barkod" outlined dense />

      <v-btn type="submit" color="primary" class="mt-3" :disabled="!formValid">
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
        fiyat: "",
        barkod: ""
      },
      formValid: false
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.urunForm.validate()) {
        this.$emit("urunEklendi", { ...this.urun, id: Date.now() });
        this.urun = { ad: "", kategori: "", gram: "", fiyat: "", barkod: "" };
        this.$refs.urunForm.resetValidation();
      }
    }
  }
};
</script>
