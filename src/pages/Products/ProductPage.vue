<template>
  <v-container>
    <h2 class="mb-4">Ürün & Stok Yönetimi</h2>

    <!-- Ürün Ekleme Formu -->
    <ProductForm @urunEklendi="urunEkle" />

    <!-- Ürün Listesi -->
    <ProductList
        :urunler="urunler"
        @urunSil="urunSil"
        @urunDuzenle="urunDuzenle"
    />
  </v-container>
</template>

<script>
import ProductForm from "./ProductForm.vue";
import ProductList from "./ProductList.vue";

export default {
  components: { ProductForm, ProductList },
  data() {
    return {
      urunler: [
        { id: 1, ad: "Gram Altın", kategori: "Altın", gram: "1", fiyat: 2500 },
        { id: 2, ad: "Çeyrek Altın", kategori: "Altın", gram: "1.75", fiyat: 4200 },
        { id: 3, ad: "Gümüş Çeyrek", kategori: "Gümüş", gram: "0.25", fiyat: 500 },
        { id: 4, ad: "Altın Yarım", kategori: "Altın", gram: "2.5", fiyat: 6250 },
        { id: 5, ad: "Tam Altın", kategori: "Altın", gram: "5", fiyat: 12500 },
        { id: 6, ad: "Gümüş Yarım", kategori: "Gümüş", gram: "1", fiyat: 150 }
      ],
    };
  },
  methods: {
    urunEkle(yeni) {
      this.urunler.push(yeni);
    },
    urunSil(id) {
      this.urunler = this.urunler.filter((u) => u.id !== id);
    },
    urunDuzenle(guncel) {
      const index = this.urunler.findIndex((u) => u.id === guncel.id);
      if (index !== -1) this.$set(this.urunler, index, guncel);
    }
  }
};
</script>
