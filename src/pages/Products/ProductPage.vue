<template>
  <v-container>
    <h2 class="mb-4">Stok Yönetimi</h2>
    <ProductForm @urunEklendi="urunEkle" />
    <ProductList :urunler="urunler" />
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
          { id: 1, ad: "Gram Altın", kategori: "Altın", gram: "1", fiyat: 2500 },
          { id: 2, ad: "Gümüş Çeyrek", kategori: "Gümüş", gram: "0.25", fiyat: 500 },
          { id: 3, ad: "Altın Yarım", kategori: "Altın", gram: "2.5", fiyat: 6250 },
          { id: 4, ad: "Tam Altın", kategori: "Altın", gram: "5", fiyat: 12500 },
          { id: 5, ad: "Gümüş Yarım", kategori: "Gümüş", gram: "1", fiyat: 150 }
      ],
    };
  },
  methods: {
    urunEkle(yeni) {
      this.urunler.push(yeni);
    }
  }
};
</script>
