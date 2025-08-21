<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="form.ad" label="Ad" outlined dense required />
    <v-text-field v-model="form.soyad" label="Soyad" outlined dense required />
    <v-text-field v-model="form.telefon" label="Telefon" outlined dense />
    <v-text-field v-model="form.email" label="E-posta" outlined dense />

    <v-btn type="submit" color="primary" class="mt-3">Kaydet</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "CustomerForm",
  data() {
    return {
      form: { ad: "", soyad: "", telefon: "", email: "" },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("ekle", { id: Date.now(), ...this.form });
      this.form = { ad: "", soyad: "", telefon: "", email: "" }; // reset
    },
  },
};
</script>

