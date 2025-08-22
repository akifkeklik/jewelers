<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
        v-model="musteri.ad"
        label="Ad"
        outlined
        dense
        :rules="[v => !!v || 'Ad gerekli']"
    ></v-text-field>

    <v-text-field
        v-model="musteri.soyad"
        label="Soyad"
        outlined
        dense
        :rules="[v => !!v || 'Soyad gerekli']"
    ></v-text-field>

    <v-text-field
        v-model="musteri.telefon"
        label="Telefon"
        outlined
        dense
        prepend-icon="mdi-phone"
        :rules="[v => !!v || 'Telefon gerekli']"
    ></v-text-field>

    <v-text-field
        v-model="musteri.email"
        label="E-posta"
        outlined
        dense
        prepend-icon="mdi-email"
        :rules="[
        v => !!v || 'E-posta gerekli',
        v => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta girin'
      ]"
    ></v-text-field>

    <v-select
        v-model="musteri.etiket"
        label="Etiket"
        :items="['VIP','Aktif','Yeni']"
        outlined
        dense
    ></v-select>

    <v-card-actions class="justify-end">
      <v-btn text color="grey" @click="$emit('close')">İptal</v-btn>
      <v-btn color="primary" :disabled="!valid" @click="kaydet">
        <v-icon left>mdi-content-save</v-icon> Kaydet
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  name: "CustomerForm",
  props: {
    musteriProp: { type: Object, default: null } // düzenleme için prop
  },
  data() {
    return {
      valid: false,
      musteri: this.musteriProp
          ? { ...this.musteriProp }
          : {
            id: null,
            ad: "",
            soyad: "",
            telefon: "",
            email: "",
            etiket: "Yeni",
            notlar: "",
            satislar: []
          }
    };
  },
  methods: {
    kaydet() {
      if (this.$refs.form.validate()) {
        if (!this.musteri.id) {
          this.musteri.id = Date.now(); // yeni müşteri için ID oluştur
        }
        this.$emit("ekle", { ...this.musteri });
        this.$emit("close");
        this.resetForm();
      }
    },
    resetForm() {
      this.musteri = {
        id: null,
        ad: "",
        soyad: "",
        telefon: "",
        email: "",
        etiket: "Yeni",
        notlar: "",
        satislar: []
      };
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    musteriProp: {
      handler(val) {
        this.musteri = val ? { ...val } : {
          id: null,
          ad: "",
          soyad: "",
          telefon: "",
          email: "",
          etiket: "Yeni",
          notlar: "",
          satislar: []
        };
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
